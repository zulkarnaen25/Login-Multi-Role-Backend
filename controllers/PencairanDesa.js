import PencairanDesa from "../models/PencairanDesaModel.js";
import PencairanFile from "../models/PencairanDesaFileModel.js";
import PencairanTrans from "../models/PencairanDesaTransModel.js";
import Tnt from "../models/TntModel.js";
import User from "../models/UserModel.js";
import UserExt from "../models/UserExtModel.js";
import { Sequelize } from "sequelize";
import path from "path";
import fs from "fs";


  const getIdTnt = async(kodekantorkas) =>{
    try {        

        const idTnt = await Tnt.findOne({
        replacements: [kodekantorkas, kodekantorkas, kodekantorkas, kodekantorkas],
          attributes: [
            [Sequelize.literal("IF(\n\
                (select count(tnt_id) FROM tb_tnt WHERE left(tnt_id,4)= 'TNT.' and substr(tnt_id,5,2)=? \n\
                ORDER BY tnt_id)<1,concat('TNT.',LPAD(?,2,'0'),'.','000001'), \n\
                (SELECT concat('TNT.',LPAD(?,2,'0'),'.',LPAD((substr(max(tnt_id),8,6)+1),6,'0')) FROM tb_tnt WHERE left(tnt_id,4)='TNT.' \n\
                and substr(tnt_id,5,2)=? ORDER BY tnt_id) \n\
                )"), 
                'id_tnt']
            ]
        })
        return idTnt;
    } catch (error) {
        throw error;
    }

  }


 export const getIdPencairan = async(kodedesa, tglentry) =>{
    try {

        const idPencairan = await PencairanDesa.findOne({
        replacements: [kodedesa, tglentry, kodedesa, tglentry, kodedesa, tglentry, kodedesa, tglentry],
          attributes: [
            [Sequelize.literal("IF((select count(pencairan_id) FROM tb_pencairan_desa WHERE left(pencairan_id,7) = LPAD(?,7,'0') and substr(pencairan_id,9,8)=REPLACE(REPLACE(?,'-',''),'/','') \n\
                ORDER BY pencairan_id)<1,concat(LPAD(?,7,'0'),'.',REPLACE(REPLACE(?,'-',''),'/',''),'.','01'), \n\
                (SELECT concat(LPAD(?,7,'0'), '.', REPLACE(REPLACE(?,'-',''),'/',''), '.', LPAD((substr(max(pencairan_id),18,2)+1),2,'0'))  FROM tb_pencairan_desa WHERE left(pencairan_id,7) = LPAD(?,7,'0') \n\
                and substr(pencairan_id,9,8)=REPLACE(REPLACE(?,'-',''),'/','') ORDER BY pencairan_id))"), 'pencairan_id']
            ]
        })

        return idPencairan;
    } catch (error) {
        throw error;
        
    }
  }


  const getIdPencairanFile = async(idpencairan) =>{
    try {        

        const idFilePencairan = await PencairanFile.findOne({
        replacements: [idpencairan, idpencairan, idpencairan, idpencairan],
          attributes: [
            [Sequelize.literal("IF((select count(file_id) FROM tb_pencairan_desa_file WHERE left(file_id,5)= 'file.' and substr(file_id,6,19)=? \n\
                ORDER BY file_id)<1,concat('file.',?,'.','01'), \n\
                (SELECT concat('file.',?,'.',LPAD((substr(max(file_id),26,2)+1),2,'0')) FROM tb_pencairan_desa_file WHERE left(file_id,5)='file.' \n\
                and substr(file_id,6,19)=? ORDER BY file_id))"), 'file_id']
            ]
        })

    
        return idFilePencairan;
    } catch (error) {
        throw error;
       
    }
  }


export const getPencairanId = async(req, res) =>{ 
    const idpencairandt = await getIdPencairan( req.params.kodedesa, req.params.tglentry);
    const idpencairan = idpencairandt.pencairan_id;
    res.status(200).json(idpencairan);
}



export const getPencairanDesa = async(req, res) =>{

    const userint = 
    await User.findAll({
        attributes:['id', 'uuid', 'kode_user_cbs', 'kode_kantor_kas', 'role'],       
        where: {
            kode_user_cbs: req.params.kodeinstansi
        },
        raw: true,
    });

    const userext = 
        await UserExt.findAll({
            attributes:['id', 'uuid', ['kode_instansi', 'kode_user_cbs'], 'kode_kantor_kas', 'role'],        
            where: {
            kode_instansi: req.params.kodeinstansi
        },
        raw: true,
    });
  
    const users = [...userint, ...userext];
    if(!users[0]) return res.status(404).json({msg: "User tidak ditemukan"});

    const role = users[0].role;

    let condition = {};

    if (role === 'des') {
    condition = {
        user_created: req.params.kodeinstansi,
        tgl_entry: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]}
    };
    }else if(role === 'kec' || role === 'operator'){
    condition = {
        kode_kantor_kas: users[0].kode_kantor_kas ,
        tgl_entry: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]}
    };
    }else if(role === 'kab' || role === 'admin' || role === 'supervisor'){
        condition = {
            tgl_entry: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]}
        };
    }
    
  
    try {

        const response = await PencairanDesa.findAll({
            attributes:['uuid','pencairan_id', 'no_spp', 'tgl_entry', 'kode_desa', 'nama_desa', 'kode_kantor', 'kode_kantor_kas', 'keterangan',
            'is_verified', 'is_lock', 'user_created', 'status_trans_internal', 'status_trans_external', 'status_pencairan_desa',        
            [Sequelize.literal('(CONCAT_WS("|", status_internal, status_transfer, status_pajak, status_bpjs))'), 'status_trans'],
            [Sequelize.literal('(select nama_kantor from kode_kantor where kode_kantor.kode_kantor_kas = tb_pencairan_desa.kode_kantor_kas)'), 'nama_kantor'],
            [Sequelize.literal('(select GROUP_CONCAT(file_nama SEPARATOR "|") from tb_pencairan_desa_file where file_id_pencairan = pencairan_id)'), 'filepencairan'],      
        ],
     
        where: condition,
        order: [
            ['createdAt', 'DESC']
        ]
        });
        res.status(200).json(response);
      
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const getPencairanDesaById = async(req, res) =>{
    try {
        const response = await PencairanDesa.findOne({
            attributes:['uuid','pencairan_id', 'no_spp', 'tgl_entry', 'kode_desa', 'nama_desa', 'norek_desa',  'alamat_desa', 'kode_kantor', 'kode_kantor_kas', 'keterangan', 'user_created', 
            'is_verified', 'is_lock', 'status_trans_internal', 'status_trans_external', 'status_pencairan_desa',
            [Sequelize.literal('(select nama_kantor from kode_kantor where kode_kantor.kode_kantor_kas = tb_pencairan_desa.kode_kantor_kas)'), 'nama_kantor']
        ],
            where: {
                pencairan_id: req.params.id
            }
        });

        
        const pencairan_file = await PencairanFile.findAll({
            attributes:['file_nama'],
            where:{
            file_id_pencairan: req.params.id
           }
       });


       const formattedFiles = pencairan_file.map((file) => {
           const fileExtension = path.extname(file.file_nama);
           const filepath = `/pencairan_desa/${file.file_nama}`;
               return {
                   name: file.file_nama,
                   type: 'server',
                   ext: fileExtension,
                   src: filepath
               };
         });


        const pencairan_trans = await PencairanTrans.findAll({
            attributes:['uuid', ['norek_tujuan','no_rekening'],['nama_tujuan','nama'], ['nominal_ob','nominal'], 'keterangan', ['jenis_transaksi','jenistransaksi'], ['bank_tujuan','namabank'], 'kode_bank_umum', 'kantor_sumber', 'norek_sumber', 'status_trans', 'id_biling', 'jenis_pajak', 'masa_pajak',  'nomor_virtual_account', 'urut_excel', 'pencairan_id',
                [Sequelize.literal('(select GROUP_CONCAT(file_nama SEPARATOR "|") from tb_tnt_file_respon where file_id_tnt = tnt_id)'), 'filerespontnt']
            ],
            where:{
            pencairan_id: req.params.id
           },
           order: [
            ['urut_excel', 'ASC']
          ]
       });


        res.status(200).json({response, formattedFiles, pencairan_trans});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getPencairanTransById = async(req, res) =>{
    try {     
         const response = await PencairanTrans.findAll({
            attributes:['uuid', ['norek_tujuan','no_rekening'], ['nominal_ob','nominal'], 'keterangan', ['jenis_transaksi','jenistransaksi'], 'norek_sumber', 'status_trans', 'tgl_trans', 'jam_trans', 'kode_bank_umum'],
            where:{
            pencairan_id: req.params.id,
            status_trans: '1'
           }
       });
        res.status(200).json({response});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const createPencairanDesa = async(req, res) =>{


    const {nospp, tglentry, kodedesa, norekdesa, namadesa, alamatdesa, kodekantor, kodekantorkas, keterangan, usercreated, verified} = req.body;  
    let datarekeninginternal    = JSON.parse(req.body.datarekeninginternal);
    let datarekeningtransfer    = JSON.parse(req.body.datarekeningtransfer);
    let datapajak               = JSON.parse(req.body.datapajak);
    let databpjs                = JSON.parse(req.body.databpjs);
   
    const idpencairandt = await getIdPencairan(kodedesa, tglentry);
    const idpencairan = idpencairandt.pencairan_id;
  
    
    try {

        await PencairanDesa.create({
            pencairan_id: idpencairan,
            no_spp: nospp,
            tgl_entry: tglentry,
            kode_desa: kodedesa,
            nama_desa: namadesa,
            norek_desa: norekdesa,
            alamat_desa: alamatdesa,
            kode_kantor: kodekantor,
            kode_kantor_kas: kodekantorkas,
            keterangan: keterangan,
            user_created: usercreated,
            is_verified: verified,
            is_lock: 'unlock',
            status_internal: datarekeninginternal.length > 0 ? 'Internal : Jumlah '+datarekeninginternal.length+ ', Berhasil 0' : null,
            status_transfer: datarekeningtransfer.length > 0 ? 'Transfer : Jumlah '+datarekeningtransfer.length+ ', Berhasil 0' : null,
            status_pajak: datapajak.length > 0 ? 'Pajak : Jumlah '+datapajak.length+ ', Berhasil 0' : null,
            status_bpjs: databpjs.length > 0 ? 'BPJS : Jumlah '+databpjs.length+ ', Berhasil 0' : null,
            status_trans_internal: '0',
            status_trans_external: '0'
        });

        
    if (!req.files || !req.files.files) {

    }else{
        let { files } = req.files;

        if (!Array.isArray(files)) {
            files = [files];
        }

        for (let i = 0; i < files.length; i++) {
        const idfilepencairandt = await getIdPencairanFile(idpencairan);
        const idfilepencairan = idfilepencairandt.file_id;

          const file = files[i];
          const fileExtension = path.extname(file.name);
          const name_file = `${idfilepencairan}${fileExtension}`;

        const filePath = `./public/pencairan_desa/${name_file}`;
        await file.mv(filePath);


        await PencairanFile.create({
            file_id: idfilepencairan,
            file_id_pencairan: idpencairan,
            file_nama: name_file
        });


        }
  
      }
   
        if (datarekeninginternal) {
            for (let i = 0; i < datarekeninginternal.length; i++) {
                                 PencairanTrans.create({
                                    pencairan_id: idpencairan,
                                    norek_sumber: norekdesa,
                                    nama_sumber: namadesa,                        
                                    kantor_sumber: kodekantor,
                                    jenis_transaksi: '0',
                                    urut_excel: datarekeninginternal[i].idurut,
                                    bank_tujuan: datarekeninginternal[i].namabank,
                                    norek_tujuan: datarekeninginternal[i].no_rekening,
                                    nama_tujuan: datarekeninginternal[i].nama,
                                    nominal_ob: datarekeninginternal[i].nominal.replace(/([.])/g, '').replace(',', '.'),
                                    user_created: usercreated,
                                    keterangan: datarekeninginternal[i].keterangan,
                                    tgl_entry: tglentry,
                                    status_trans: '0'
                                });
                     
                          
            }
      
          }


          if (datarekeningtransfer) {
            for (let i = 0; i < datarekeningtransfer.length; i++) {
                                 PencairanTrans.create({
                                    pencairan_id: idpencairan,
                                    norek_sumber: norekdesa,
                                    nama_sumber: namadesa,
                                    kantor_sumber: kodekantor,              
                                    jenis_transaksi: '1',
                                    kode_bank_umum: datarekeningtransfer[i].kodebank,
                                    bank_tujuan: datarekeningtransfer[i].namabank,
                                    norek_tujuan: datarekeningtransfer[i].no_rekening,
                                    nama_tujuan: datarekeningtransfer[i].nama,
                                    nominal_ob: datarekeningtransfer[i].jumlahsetoran.replace(/([.])/g, '').replace(',', '.'),
                                    user_created: usercreated,
                                    keterangan: datarekeningtransfer[i].keterangan,
                                    tgl_entry: tglentry,
                                    status_trans: '0'
                                    
                                });
                   
                          
            }
          }

          if (datapajak) {
            for (let i = 0; i < datapajak.length; i++) {
                                 PencairanTrans.create({
                                    pencairan_id: idpencairan,
                                    norek_sumber: norekdesa,
                                    nama_sumber: namadesa,
                                    kantor_sumber: kodekantor,
                                    jenis_transaksi: '2',
                                    id_biling: datapajak[i].idbilling,
                                    jenis_pajak: datapajak[i].jenispajak,
                                    masa_pajak: datapajak[i].masapajak,
                                    nominal_ob: datapajak[i].jumlahsetoran.replace(/([.])/g, '').replace(',', '.'),
                                    user_created: usercreated,
                                    keterangan: datapajak[i].keterangan,
                                    tgl_entry: tglentry,
                                    status_trans: '0'
                                });
                   
                          
            }
          }

          
          if (databpjs) {
            for (let i = 0; i < databpjs.length; i++) {
                                 PencairanTrans.create({
                                    pencairan_id: idpencairan,
                                    norek_sumber: norekdesa,
                                    nama_sumber: namadesa,
                                    kantor_sumber: kodekantor,
                                    jenis_transaksi: '3',
                                    nomor_virtual_account: databpjs[i].nova,
                                    nominal_ob: databpjs[i].jumlahsetoran.replace(/([.])/g, '').replace(',', '.'),
                                    user_created: usercreated,
                                    keterangan: databpjs[i].keterangan,
                                    tgl_entry: tglentry,
                                    status_trans: '0'
                                });
                   
                          
            }
          }

        res.status(201).json({msg: "Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}




export const updatePencairanDesa = async(req, res) =>{
    const pencairan = await PencairanDesa.findOne({
        where: {
            pencairan_id: req.params.id
        }
    });
    if(!pencairan) return res.status(404).json({msg: "Data tidak ditemukan"});
    if(pencairan.is_verified == 'verified') return res.status(404).json({msg: "Data sudah di kunci oleh petugas, tidak bisa melakukan edit data"});
    const {idpencairan, nospp, tglentry, norekdesa, namadesa, kodekantor, keterangan, usermodified} = req.body;
    let datarekeninginternal    = JSON.parse(req.body.datarekeninginternal);
    let datarekeningtransfer    = JSON.parse(req.body.datarekeningtransfer);
    let datapajak               = JSON.parse(req.body.datapajak);
    let databpjs                = JSON.parse(req.body.databpjs);



    let { fileexistdel } = req.body

    try {
        await PencairanDesa.update({
            no_spp: nospp,     
            keterangan: keterangan,
            user_modified: usermodified,
            status_internal: datarekeninginternal.length > 0 ? 'Internal : Jumlah '+datarekeninginternal.length+ ', Berhasil 0' : null,
            status_transfer: datarekeningtransfer.length > 0 ? 'Transfer : Jumlah '+datarekeningtransfer.length+ ', Berhasil 0' : null,
            status_pajak: datapajak.length > 0 ? 'Pajak : Jumlah '+datapajak.length+ ', Berhasil 0' : null,
            status_bpjs: databpjs.length > 0 ? 'BPJS : Jumlah '+databpjs.length+ ', Berhasil 0' : null,
            status_trans_internal: '0',
            status_trans_external: '0'

        },{
            where:{
                uuid: pencairan.uuid
            }
        });


    if(fileexistdel){
        if (!Array.isArray(fileexistdel)) {
            fileexistdel = [fileexistdel];
          }

        for (let i = 0; i < fileexistdel.length; i++) {
            const pencairanfile = await PencairanFile.findOne({
              where: { file_nama: fileexistdel[i] },
            });
      
            if (pencairanfile) {
              const filepath = `./public/pencairan_desa/${pencairanfile.file_nama}`;
              fs.unlinkSync(filepath);
              await PencairanFile.destroy({
                where: {
                  id: pencairanfile.id,
                },
              });
            }
            
        }
    }
     


        if (!req.files || !req.files.files) {

        }else{
            let { files } = req.files;
    
                if (!Array.isArray(files)) {
                    files = [files];
                  }

                  for (let i = 0; i < files.length; i++) {
                    const idfilepencairandt = await getIdPencairanFile(idpencairan);
                    const idfilepencairan = idfilepencairandt.file_id;
            
                      const file = files[i];
                      const fileExtension = path.extname(file.name);
                      const name_file = `${idfilepencairan}${fileExtension}`;
            
                    const filePath = `./public/pencairan_desa/${name_file}`;
                    await file.mv(filePath);
              
            
                    await PencairanFile.create({
                        file_id: idfilepencairan,
                        file_id_pencairan: idpencairan,
                        file_nama: name_file
                    });
                    
                  }
        }

        await PencairanTrans.destroy({
            where:{
                pencairan_id: req.params.id
            }
        });

             if (datarekeninginternal) {
                
                 for (let i = 0; i < datarekeninginternal.length; i++) { 
                                      PencairanTrans.create({
                                         pencairan_id: idpencairan,
                                         norek_sumber: norekdesa,
                                         nama_sumber: namadesa,
                                         kantor_sumber: kodekantor,
                                         jenis_transaksi: '0',
                                         urut_excel: datarekeninginternal[i].idurut,
                                         bank_tujuan: datarekeninginternal[i].namabank,
                                         norek_tujuan: datarekeninginternal[i].no_rekening,
                                         nama_tujuan: datarekeninginternal[i].nama,
                                         nominal_ob: datarekeninginternal[i].nominal.replace(/([.])/g, '').replace(',', '.'),
                                         user_created: usermodified,
                                         keterangan: datarekeninginternal[i].keterangan,
                                         tgl_entry: pencairan.tgl_entry,
                                         status_trans: '0'
                                     });
         
                         
                 }
           
               }
     
               if (datarekeningtransfer) {
                for (let i = 0; i < datarekeningtransfer.length; i++) {
                                     PencairanTrans.create({
                                        pencairan_id: idpencairan,
                                        norek_sumber: norekdesa,
                                        nama_sumber: namadesa,
                                        kantor_sumber: kodekantor,
                                        jenis_transaksi: '1',
                                        kode_bank_umum: datarekeningtransfer[i].kodebank,
                                        bank_tujuan: datarekeningtransfer[i].namabank,
                                        norek_tujuan: datarekeningtransfer[i].no_rekening,
                                        nama_tujuan: datarekeningtransfer[i].nama,
                                        nominal_ob: datarekeningtransfer[i].jumlahsetoran.replace(/([.])/g, '').replace(',', '.'),
                                        user_created: usermodified,
                                        keterangan: datarekeningtransfer[i].keterangan,
                                        tgl_entry: tglentry,
                                        status_trans: '0'
                                    });
                       
                              
                }
              }

              if (datapajak) {
                for (let i = 0; i < datapajak.length; i++) {
                                     PencairanTrans.create({
                                        pencairan_id: idpencairan,
                                        norek_sumber: norekdesa,
                                        nama_sumber: namadesa,
                                        kantor_sumber: kodekantor,
                                        jenis_transaksi: '2',
                                        id_biling: datapajak[i].idbilling,
                                        jenis_pajak: datapajak[i].jenispajak,
                                        masa_pajak: datapajak[i].masapajak,
                                        nominal_ob: datapajak[i].jumlahsetoran.replace(/([.])/g, '').replace(',', '.'),
                                        user_created: usermodified,
                                        keterangan: datapajak[i].keterangan,
                                        tgl_entry: tglentry,
                                        status_trans: '0'
                                    });
                       
                              
                }
              }
    
              
              if (databpjs) {
                for (let i = 0; i < databpjs.length; i++) {
                                     PencairanTrans.create({
                                        pencairan_id: idpencairan,
                                        norek_sumber: norekdesa,
                                        nama_sumber: namadesa,
                                        kantor_sumber: kodekantor,
                                        jenis_transaksi: '3',
                                        nomor_virtual_account: databpjs[i].nova,
                                        nominal_ob: databpjs[i].jumlahsetoran.replace(/([.])/g, '').replace(',', '.'),
                                        user_created: usermodified,
                                        keterangan: databpjs[i].keterangan,
                                        tgl_entry: tglentry,
                                        status_trans: '0'
                                    });
                       
                              
                }
              }
        res.status(200).json({msg: "Data Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


export const VerifyPencairanDesa = async(req, res) =>{
    const pencairandesa = await PencairanDesa.findOne({
        where: {
            pencairan_id: req.params.id
        }
    });
    if(!pencairandesa) return res.status(404).json({msg: "Data tidak ditemukan"});
    const {verified} = req.body;

    try {
      
            await PencairanDesa.update({
                is_verified: verified, 
            },{
                where:{
                    pencairan_id: pencairandesa.pencairan_id
                }
            });

           
        res.status(200).json({msg: "Data Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deletePencairanDesa = async(req, res) =>{
  
    const pencairan = await PencairanDesa.findOne({
        where: {
            pencairan_id: req.params.id
        }
    });

    if(!pencairan) return res.status(404).json({msg: "Data tidak ditemukan"});

    const pencairanfile = await PencairanFile.findAll({
        where: {
            file_id_pencairan: req.params.id
        }
    });

 
    try {

        pencairanfile.forEach(file => {
            const filepath = `./public/pencairan_desa/${file.file_nama}`;
            fs.unlinkSync(filepath);
        });


        await PencairanFile.destroy({
            where:{
                file_id_pencairan: req.params.id
            }
        });

        await PencairanTrans.destroy({
            where:{
                pencairan_id: req.params.id
            }
        });

        await PencairanDesa.destroy({
            where:{
                pencairan_id: pencairan.pencairan_id
            }
        });

        res.status(200).json({msg: "Data Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


export const sendToAdminTntTransfer = async(req, res) =>{

    const { userprocessed } = req.body;
    let datatransfertnt  = JSON.parse(req.body.datarekeningtransfer);
        try {
            for (let i = 0; i < datatransfertnt.length; i++) {
                const idtntdt = await getIdTnt(datatransfertnt[i].kodekantorkas);
                const idtnt = idtntdt.dataValues.id_tnt;
            
                if(idtnt){
                await PencairanTrans.update({
                    status_trans: '2', 
                    tnt_id: idtnt
                },{
                    where:{
                        uuid: datatransfertnt[i].uuid
                    }
                });
                
                await Tnt.create({
                    tnt_id: idtnt,
                    sandi_kantor: datatransfertnt[i].kodekantorkas, 
                    sandi_cabang: datatransfertnt[i].kodekantor, 
                    jenis_tnt: datatransfertnt[i].jenistnt, 
                    nama_nasabah: datatransfertnt[i].namanasabah, 
                    norek_nasabah: datatransfertnt[i].norek, 
                    alamat_nasabah: datatransfertnt[i].alamatnasabah,
                    bank_tujuan: datatransfertnt[i].kodebank, 
                    norek_tujuan: datatransfertnt[i].no_rekening,
                    nama_pemilik_rekening_tujuan: datatransfertnt[i].nama,
                    jumlah_disetor: datatransfertnt[i].jumlahsetoran.replace(/([.])/g, '').replace(',', '.'), 
                    catatan: datatransfertnt[i].keterangan,     
                    user_processed: userprocessed,        
                    tgl_permohonan: datatransfertnt[i].tglsekarang,
                    user_created: datatransfertnt[i].useribs,
                    created_at: datatransfertnt[i].createdat,
                    is_lock: datatransfertnt[i].lock,
                    pencairan_id: datatransfertnt[i].idpencairan   
                });
            }
        }
          
            res.status(200).json({msg: "Data berhasil di kirim"});
        } catch (error) {
            res.status(400).json({ error: "Gagal memproses data", msg: "Terjadi kesalahan: " + error.message });
        }
  
}


export const sendToAdminTntPajak = async(req, res) =>{

    const { userprocessed  } = req.body;
    let datapajaktnt  = JSON.parse(req.body.datapajak);
        try {
            for (let i = 0; i < datapajaktnt.length; i++) {
                const idtntdt = await getIdTnt(datapajaktnt[i].kodekantorkas);
                const idtnt = idtntdt.dataValues.id_tnt;
              
                if(idtnt){
                await PencairanTrans.update({
                    status_trans: '2',
                    tnt_id: idtnt 
                },{
                    where:{
                        uuid: datapajaktnt[i].uuid
                    }
                });

                await Tnt.create({
                    tnt_id: idtnt,
                    sandi_kantor: datapajaktnt[i].kodekantorkas, 
                    sandi_cabang: datapajaktnt[i].kodekantor, 
                    jenis_tnt: datapajaktnt[i].jenistnt, 
                    nama_nasabah: datapajaktnt[i].namanasabah, 
                    norek_nasabah: datapajaktnt[i].norek, 
                    alamat_nasabah: datapajaktnt[i].alamatnasabah,
                    jenis_pajak: datapajaktnt[i].jenispajak, 
                    masa_pajak: datapajaktnt[i].masapajak,
                    id_biling: datapajaktnt[i].idbilling,
                    jumlah_disetor: datapajaktnt[i].jumlahsetoran.replace(/([.])/g, '').replace(',', '.'), 
                    catatan: datapajaktnt[i].keterangan,     
                    user_processed: userprocessed,                
                    tgl_permohonan: datapajaktnt[i].tglsekarang,
                    user_created: datapajaktnt[i].useribs,
                    created_at: datapajaktnt[i].createdat,
                    is_lock: datapajaktnt[i].lock,
                    pencairan_id: datapajaktnt[i].idpencairan      
                });
            }
        }
            res.status(200).json({msg: "Data berhasil di kirim"});
        } catch (error) {
            res.status(400).json({ error: "Gagal memproses data", msg: "Terjadi kesalahan: " + error.message });
        }

  
}


export const sendToAdminTntBpjs = async(req, res) =>{

        const { userprocessed } = req.body;
        let databpjstnt  = JSON.parse(req.body.databpjs);
        try {
            for (let i = 0; i < databpjstnt.length; i++) {
                const idtntdt = await getIdTnt(databpjstnt[i].kodekantorkas);
                const idtnt = idtntdt.dataValues.id_tnt;
    
                if(idtnt){
                await PencairanTrans.update({
                    status_trans: '2',
                    tnt_id: idtnt
                },{
                    where:{
                        uuid: databpjstnt[i].uuid
                    }
                });

                await Tnt.create({
                    tnt_id: idtnt,
                    sandi_kantor: databpjstnt[i].kodekantorkas, 
                    sandi_cabang: databpjstnt[i].kodekantor, 
                    jenis_tnt: databpjstnt[i].jenistnt, 
                    nama_nasabah: databpjstnt[i].namanasabah, 
                    norek_nasabah: databpjstnt[i].norek, 
                    alamat_nasabah: databpjstnt[i].alamatnasabah,
                    nomor_virtual_account: databpjstnt[i].nova, 
                    jumlah_disetor: databpjstnt[i].jumlahsetoran.replace(/([.])/g, '').replace(',', '.'), 
                    catatan: databpjstnt[i].keterangan,     
                    user_processed: userprocessed,        
                    tgl_permohonan: databpjstnt[i].tglsekarang,
                    user_created: databpjstnt[i].useribs,
                    created_at: databpjstnt[i].createdat,
                    is_lock: databpjstnt[i].lock,
                    pencairan_id: databpjstnt[i].idpencairan      
                });
            }
        }
            res.status(200).json({msg: "Data berhasil di kirim"});
        } catch (error) {
            res.status(400).json({ error: "Gagal memproses data", msg: "Terjadi kesalahan: " + error.message });
        }

  
}

export const getPencairanDesaLaporan = async(req, res) =>{


    let condition = {};

    if (req.params.role === 'des') {
    condition = {
        user_created: req.params.kodedesa,
        tgl_entry: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]}
    };
    }else if(req.params.role === 'kec' || req.params.role === 'operator'){
    let kodedesaarray = req.params.kodedesa.split(',');
    condition = {
        user_created: {[Sequelize.Op.in]: kodedesaarray},
        tgl_entry: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]}
    };
    }else if(req.params.role === 'kab' || req.params.role === 'admin' || req.params.role === 'supervisor'){
        let kodedesaarray = req.params.kodedesa.split(',');
        condition = {
            user_created: {[Sequelize.Op.in]: kodedesaarray},
            tgl_entry: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]}
        };
    }
    
  
    try {

        const response = await PencairanDesa.findAll({
            attributes:['uuid','pencairan_id', 'no_spp', 'tgl_entry', 'kode_desa', 'nama_desa', 'status_pencairan_desa', 'kode_kantor', 'kode_kantor_kas', 'keterangan',
            'is_verified', 'user_created', 'norek_desa',
            [Sequelize.literal('(CONCAT_WS("|", status_internal, status_transfer, status_pajak, status_bpjs))'), 'status_trans'],
            [Sequelize.literal('(select nama_kantor from kode_kantor where kode_kantor.kode_kantor_kas = tb_pencairan_desa.kode_kantor_kas)'), 'nama_kantor'],
            [Sequelize.literal('(select KECAMATAN from tb_reff_desa where KODE_DESA = tb_pencairan_desa.kode_desa)'), 'nama_kecamatan'],
            [Sequelize.literal('(select sum(nominal_ob) from tb_pencairan_desa_trans where tb_pencairan_desa_trans.pencairan_id = tb_pencairan_desa.pencairan_id)'), 'total_nominal'],      
        ],
     
        where: condition
        });

         res.status(200).json(response);

               
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPencairanDesaLaporanRincianTrans = async(req, res) =>{

  
    try {

        const response = await PencairanTrans.findAll({
            attributes:['uuid', 'norek_tujuan', 'nama_tujuan', 'nominal_ob', 'keterangan', 'jenis_transaksi', 'bank_tujuan', 'kode_bank_umum', 'kantor_sumber', 'norek_sumber', 
            'nama_sumber', 'status_trans', 'id_biling', 'jenis_pajak', 'masa_pajak',  'nomor_virtual_account', 'urut_excel', 'pencairan_id', 'tgl_trans','tgl_entry',
            [Sequelize.literal('(select no_spp from tb_pencairan_desa where tb_pencairan_desa.pencairan_id= tb_pencairan_desa_trans.pencairan_id)'), 'no_spp'],
            [Sequelize.literal('(select nama_bank from kode_bank_umum where kode_bank= kode_bank_umum)'), 'nama_bank']
            ],
            where:{
                user_created: req.params.kodedesa,
                tgl_entry: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]},
                jenis_transaksi: req.params.jenistrans
               },
            order: [
                ['urut_excel', 'ASC']
            ]
       });

         res.status(200).json(response);

               
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const getPencairanDesaLaporanKantor = async(req, res) =>{

      
    try {

        const response = await PencairanDesa.findAll({
            attributes:['uuid','pencairan_id', 'no_spp', 'tgl_entry', 'kode_desa', 'nama_desa', 'status_pencairan_desa', 'kode_kantor', 'kode_kantor_kas', 'keterangan',
            'is_verified', 'user_created', 'norek_desa',
            [Sequelize.literal('(CONCAT_WS("|", status_internal, status_transfer, status_pajak, status_bpjs))'), 'status_trans'],
            [Sequelize.literal('(select nama_kantor from kode_kantor where kode_kantor.kode_kantor_kas = tb_pencairan_desa.kode_kantor_kas)'), 'nama_kantor'],
            [Sequelize.literal('(select KECAMATAN from tb_reff_desa where KODE_DESA = tb_pencairan_desa.kode_desa)'), 'nama_kecamatan'],
            [Sequelize.literal('(select sum(nominal_ob) from tb_pencairan_desa_trans where tb_pencairan_desa_trans.pencairan_id = tb_pencairan_desa.pencairan_id)'), 'total_nominal'],      
        ],
        where:{
            
            kode_kantor_kas: req.params.kodekas,
            tgl_entry: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]}
           }
        });

         res.status(200).json(response);

               
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPencairanDesaLaporanRincianTransKantor = async(req, res) =>{

  
    try {


        PencairanTrans.belongsTo(PencairanDesa, { foreignKey: 'pencairan_id', targetKey: 'pencairan_id' });
        
        const response = await PencairanTrans.findAll({
            attributes:['uuid', 'norek_tujuan', 'nama_tujuan', 'nominal_ob', 'keterangan', 'jenis_transaksi', 'bank_tujuan', 'kode_bank_umum', 'kantor_sumber', 'norek_sumber', 
            'nama_sumber', 'status_trans', 'id_biling', 'jenis_pajak', 'masa_pajak',  'nomor_virtual_account', 'urut_excel', 'pencairan_id', 'tgl_trans','tgl_entry',
            [Sequelize.literal('tb_pencairan_desa.no_spp'), 'no_spp'],
            [Sequelize.literal('tb_pencairan_desa.kode_kantor_kas'), 'kode_kantor_kas'],
            [Sequelize.literal('(select nama_bank from kode_bank_umum where kode_bank= kode_bank_umum)'), 'nama_bank'],
            [Sequelize.literal('(select nama_kantor from kode_kantor where kode_kantor.kode_kantor_kas = tb_pencairan_desa.kode_kantor_kas)'), 'nama_kantor']
            ],
            include: [
                { model: PencairanDesa },
            ],
            where:{
                '$tb_pencairan_desa.kode_kantor_kas$': req.params.kodekas, 
                tgl_entry: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]},
                jenis_transaksi: req.params.jenistrans
               },
            order: [
                ['id', 'ASC']
            ]
       });

         res.status(200).json(response);
       

               
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const updateStatusTransInternal = async(req, res) =>{
    const { statustrans, tglkonfirmasi, jam } = req.body;
      await PencairanTrans.update({
          status_trans: statustrans, 
          tgl_trans: tglkonfirmasi,
          jam_trans: jam
      },{
          where:{
              uuid: req.params.uuid
          }
      });
      res.status(200).json({msg: "Data Berhasil di konfirmasi"});
    
}


export const updateLockPencairanDesa = async(req, res) =>{
    const pencairandesa = await PencairanDesa.findOne({
        where: {
            pencairan_id: req.params.id
        }
    });
    if(!pencairandesa) return res.status(404).json({msg: "Data tidak ditemukan"});
    const {lock} = req.body;
    try {
      
            await PencairanDesa.update({
                is_lock: lock, 
            },{
                where:{
                    pencairan_id: pencairandesa.pencairan_id
                }
            });

           
        res.status(200).json({msg: "Data Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

