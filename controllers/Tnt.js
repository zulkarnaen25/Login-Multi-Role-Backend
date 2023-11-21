import KodeBankUmum from "../models/KodeBankModel.js";
import User from "../models/UserModel.js";
import Kantor from "../models/KodeKantorModel.js";
import Tnt from "../models/TntModel.js";
import PencairanTrans from "../models/PencairanDesaTransModel.js";
import TntFileRequest from "../models/TntFileRequestModel.js";
import TntFileRespon from "../models/TntFileResponModel.js";
import PencairanFile from "../models/PencairanDesaFileModel.js";
import { Sequelize } from "sequelize";
import path from "path";
import fs from "fs";
import Jimp from "jimp";
import { PDFDocument } from "pdf-lib";



export const getKodeBankall = async(req, res) =>{
    try {
        const response = await KodeBankUmum.findAll({
            attributes:['nama_bank', 'kode_bank']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKodeBankById = async(req, res) =>{
    try {
        const response = await KodeBankUmum.findOne({
            attributes:['nama_bank', 'kode_bank'],
            where: {
                kode_bank: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getTnt = async(req, res) =>{

    const user = await User.findOne({
        attributes:['is_tnt','kode_kantor_kas', 'role'],
        where: {
            kode_user_cbs: req.params.iduser
        }
    });

    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});

    const isTnt = user.is_tnt;

    let condition = {};

    if (isTnt === 'requester') {
    condition = {
        sandi_kantor: user.kode_kantor_kas,
        tgl_permohonan: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]}
    };
    }else if(isTnt === 'executor'){
    condition = {
        user_processed: req.params.iduser ,
        tgl_permohonan: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]}
    };
    }else if(isTnt === 'controller' || user.role === 'admin'){
        condition = {
            tgl_permohonan: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]}
        };
    }
    
  
    try {

        Tnt.belongsTo(Kantor, { foreignKey: 'sandi_kantor', targetKey: 'kode_kantor_kas' });
        Tnt.belongsTo(KodeBankUmum, { foreignKey: 'bank_tujuan', targetKey: 'kode_bank' });
     
        const response = await Tnt.findAll({
            attributes:['uuid','tnt_id', 'tgl_permohonan', 'sandi_kantor', 'jenis_tnt', 'nama_nasabah', 'norek_nasabah', 'user_created', 'user_processed', 
            'jumlah_disetor', 'bank_tujuan', 'norek_tujuan', 'status', 'is_lock', 
            [Sequelize.literal('kode_kantor.nama_kantor'), 'nama_kantor'],
            [Sequelize.literal('kode_bank_umum.nama_bank'), 'nama_bank'],
            [Sequelize.literal('(select nama_user_cbs from users where kode_user_cbs = user_created)'), 'pemohon'],
            [Sequelize.literal('(select nama_user_cbs from users where kode_user_cbs = user_processed)'), 'pemproses'],
            [Sequelize.literal('(select GROUP_CONCAT(file_nama SEPARATOR "|") from tb_tnt_file_request where file_id_tnt = tnt_id)'), 'filerequest'],
            [Sequelize.literal('(select GROUP_CONCAT(file_nama SEPARATOR "|") from tb_pencairan_desa_file where file_id_pencairan = pencairan_id)'), 'filerequestdesa'],
            [Sequelize.literal('(select GROUP_CONCAT(file_nama SEPARATOR "|") from tb_tnt_file_respon where file_id_tnt = tnt_id)'), 'filerespon'],

        ],
        include: [
            { model: Kantor },
            { model: KodeBankUmum },
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

  const getIdTntReq = async(idtnt) =>{
    try {        

        const idFileTntRequest = await Tnt.findOne({
        replacements: [idtnt, idtnt, idtnt, idtnt],
          attributes: [
            [Sequelize.literal("IF((select count(file_id) FROM tb_tnt_file_request WHERE left(file_id,4)= 'REQ.' and substr(file_id,5,13)=? \n\
                ORDER BY file_id)<1,concat('REQ.',?,'.','01'), \n\
                (SELECT concat('REQ.',?,'.',LPAD((substr(max(file_id),19,2)+1),2,'0')) FROM tb_tnt_file_request WHERE left(file_id,4)='REQ.' \n\
                and substr(file_id,5,13)=? ORDER BY file_id) \n\
                )"), 
                'req_file_id']
            ]
        })

        return idFileTntRequest;
    } catch (error) {
        throw error;
    }

  }


  const getIdTntRespon = async(idtnt) =>{
    try {        

        const idFileTntRespon = await Tnt.findOne({
        replacements: [idtnt, idtnt, idtnt, idtnt],
          attributes: [
            [Sequelize.literal("IF((select count(file_id) FROM tb_tnt_file_respon WHERE left(file_id,4)= 'RES.' and substr(file_id,5,13)=? \n\
                ORDER BY file_id)<1,concat('RES.',?,'.','01'), \n\
                (SELECT concat('RES.',?,'.',LPAD((substr(max(file_id),19,2)+1),2,'0')) FROM tb_tnt_file_respon WHERE left(file_id,4)='RES.' \n\
                and substr(file_id,5,13)=? ORDER BY file_id))"), 
                'res_file_id']
            ]
        })
    
        return idFileTntRespon;
    } catch (error) {
        throw error;

    }

  }



export const createTnt = async(req, res) =>{

    const {kodekantorkas, kodekantor, jenistnt, namanasabah, norek, alamatnasabah, kodebank, rekeningpenerima, namapenerima, jumlahsetorantransfer,
            perihaltransfer, catatantransfer, userexecutor, useribs, createdat, lock, tglsekarang, idbilling, jumlahsetoranpajak, jenispajak,
            masapajak,  catatanpajak, virtualaccount, jumlahsetoranbpjs, catatanbpjs } = req.body;


    const idtntdt = await getIdTnt(kodekantorkas);
    const idtnt = idtntdt.dataValues.id_tnt;

    try {

    if(jenistnt == '1'  ){   
         await Tnt.create({
            tnt_id: idtnt,
            sandi_kantor: kodekantorkas , 
            sandi_cabang: kodekantor, 
            jenis_tnt: jenistnt, 
            nama_nasabah: namanasabah, 
            norek_nasabah: norek, 
            alamat_nasabah: alamatnasabah,
            bank_tujuan: kodebank, 
            norek_tujuan: rekeningpenerima,
            nama_pemilik_rekening_tujuan: namapenerima,
            jumlah_disetor: jumlahsetorantransfer, 
            perihal: perihaltransfer,
            catatan: catatantransfer,     
            user_processed: userexecutor,        
            user_created: useribs,
            created_at: createdat,        
            is_lock: lock,
            tgl_permohonan: tglsekarang,
        });


    } else if (jenistnt == '2'){

        await Tnt.create({
            tnt_id: idtnt,
            sandi_kantor: kodekantorkas , 
            sandi_cabang: kodekantor, 
            jenis_tnt: jenistnt, 
            nama_nasabah: namanasabah, 
            norek_nasabah: norek, 
            alamat_nasabah: alamatnasabah,
            jenis_pajak: jenispajak,
            masa_pajak: masapajak,
            id_biling: idbilling, 
            jumlah_disetor: jumlahsetoranpajak,
            catatan: catatanpajak,   
            user_processed: userexecutor,        
            user_created: useribs,
            created_at: createdat,        
            is_lock: lock,
            tgl_permohonan: tglsekarang,
    });


    } else if (jenistnt == '3'){
        await Tnt.create({
            tnt_id: idtnt,
            sandi_kantor: kodekantorkas, 
            sandi_cabang: kodekantor, 
            jenis_tnt: jenistnt, 
            nama_nasabah: namanasabah, 
            norek_nasabah: norek, 
            alamat_nasabah: alamatnasabah,
            nomor_virtual_account: virtualaccount,
            jumlah_disetor: jumlahsetoranbpjs,
            catatan: catatanbpjs,   
            user_processed: userexecutor,        
            user_created: useribs,
            created_at: createdat,        
            is_lock: lock,
            tgl_permohonan: tglsekarang,
        });

    }   

    if (!req.files || !req.files.files) {
        return res.status(200).send('No files were uploaded.');
    }else{
        let { files } = req.files;

        if (!Array.isArray(files)) {
            files = [files];
        }
  


        for (let i = 0; i < files.length; i++) {
            const idfiletntdt = await getIdTntReq(idtnt);
            const idfiletnt = idfiletntdt.dataValues.req_file_id;
          
            const file = files[i];
            const fileExtension = path.extname(file.name);
            const name_file = `${idfiletnt}${fileExtension}`;
          
            const filePath = `./public/upload_tnt_request/${name_file}`;
            await file.mv(filePath);
          
            await TntFileRequest.create({
              file_id: idfiletnt,
              file_id_tnt: idtnt,
              file_nama: name_file,
            });

            if (fileExtension.toLowerCase() === '.jpg' || fileExtension.toLowerCase() === '.jpeg' || fileExtension.toLowerCase() === '.png') {
                const image = await Jimp.read(filePath);
                image.quality(50); // Ganti dengan kualitas yang diinginkan (0-100)
                await image.writeAsync(filePath); // Menyimpan gambar yang telah diproses
            } else if (fileExtension.toLowerCase() === '.pdf') {
            
                const pdfBytes = fs.readFileSync(filePath);
                const pdfDoc = await PDFDocument.load(pdfBytes);
                const pages = pdfDoc.getPages();
            
                for (const page of pages) {
                  // Mengurangi kualitas gambar pada setiap halaman
                  for (const key in page.xobjects) {
                    if (page.xobjects[key].image) {
                      page.xobjects[key].image.data = page.xobjects[key].image.data.slice(0, page.xobjects[key].image.data.length * 0.5);
                    }
                  }
                }         
                // Menyimpan PDF yang telah dimodifikasi
                const modifiedPdfBytes = await pdfDoc.save();
                fs.writeFileSync(filePath, modifiedPdfBytes);
              }
              
          }
      }

        res.status(201).json({msg: "Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


export const getTntById = async(req, res) =>{
    try {
        const response = await Tnt.findOne({
            where: {
                tnt_id: req.params.id
            }
        });

        const tnt_file_request = await TntFileRequest.findAll({
             attributes:['file_nama'],
             where:{
             file_id_tnt: req.params.id
            }
        });


        const formattedFilesReq = tnt_file_request.map((file) => {
            const fileExtension = path.extname(file.file_nama);
            const filepath = `/upload_tnt_request/${file.file_nama}`;
                return {
                    name: file.file_nama,
                    type: 'server',
                    ext: fileExtension,
                    src: filepath
                };
          });

        const tnt_file_respon = await TntFileRespon.findAll({
            attributes:['file_nama'],
            where:{
            file_id_tnt: req.params.id
           }
       });

        const formattedFilesRes = tnt_file_respon.map((file) => {
        const fileExtension = path.extname(file.file_nama);
        const filepath = `/upload_tnt_respon/${file.file_nama}`;
               return {
                   name: file.file_nama,
                   type: 'server',
                   ext: fileExtension,
                   src: filepath
               };
         });

       

    if(response.pencairan_id){  
        const tnt_desa_file = await PencairanFile.findAll({
            attributes:['file_nama'],
            where:{
                file_id_pencairan: response.pencairan_id
           }
       });


        const formattedFilesReqDesa = tnt_desa_file.map((file) => {
        const fileExtension = path.extname(file.file_nama);
        const filepath = `/pencairan_desa/${file.file_nama}`;
               return {
                   name: file.file_nama,
                   type: 'server',
                   ext: fileExtension,
                   src: filepath
               };
         });

        res.status(200).json({response, formattedFilesReq, formattedFilesRes, formattedFilesReqDesa});
    }else if(!response.pencairan_id){
        res.status(200).json({response, formattedFilesReq, formattedFilesRes});
    }

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const deleteTnt = async(req, res) =>{
  
    const tnt = await Tnt.findOne({
        where: {
            tnt_id: req.params.id
        }
    });

    const user = await User.findOne({
        where: {
            kode_user_cbs: req.params.userid
        }
    });


    if(!tnt) return res.status(404).json({msg: "Data tidak ditemukan"});
    if(tnt.is_lock == 'lock' && user.role != 'admin') return res.status(404).json({msg: "Data sudah di lock, tidak bisa dihapus"});

    const tntfilerequest = await TntFileRequest.findAll({
        where: {
            file_id_tnt: req.params.id
        }
    });

    const tntfilerespon = await TntFileRespon.findAll({
        where: {
            file_id_tnt: req.params.id
        }
    });


    try {

        tntfilerequest.forEach(file => {
            const filepath = `./public/upload_tnt_request/${file.file_nama}`;
            fs.unlinkSync(filepath);
        });


        await TntFileRequest.destroy({
            where:{
                file_id_tnt: req.params.id
            }
        });

        tntfilerespon.forEach(file => {
            const filepath = `./public/upload_tnt_respon/${file.file_nama}`;
            fs.unlinkSync(filepath);
        });

        await TntFileRespon.destroy({
            where:{
                file_id_tnt: req.params.id
            }
        });

        await Tnt.destroy({
            where:{
                tnt_id: tnt.tnt_id
            }
        });

        res.status(200).json({msg: "Data Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


export const updateTnt = async(req, res) =>{
    const {jenistnt, namanasabah, norek, kodebank, rekeningpenerima, namapenerima, jumlahsetorantransfer, perihaltransfer, catatantransfer,
        userexecutor, useribs, modifiedat, idbilling, jumlahsetoranpajak, jenispajak, masapajak,  catatanpajak,
        virtualaccount, jumlahsetoranbpjs, catatanbpjs, alamatnasabah } = req.body;
    let { fileexistdel } = req.body

    const tnt = await Tnt.findOne({
        where: {
            tnt_id: req.params.id
        }
    });

    const user = await User.findOne({
        where: {
            kode_user_cbs: useribs
        }
    });

    if(!tnt) return res.status(404).json({msg: "Data tidak ditemukan"});
    if(tnt.is_lock == 'lock' && user.role != 'admin') return res.status(404).json({msg: "Data sudah di lock, tidak bisa melakukan edit"});

    try {
        if(jenistnt == '1'  ){ 
            await Tnt.update({
                nama_nasabah: namanasabah, 
                norek_nasabah: norek, 
                alamat_nasabah: alamatnasabah,
                bank_tujuan: kodebank, 
                norek_tujuan: rekeningpenerima,
                nama_pemilik_rekening_tujuan: namapenerima,
                jumlah_disetor: jumlahsetorantransfer, 
                perihal: perihaltransfer,
                catatan: catatantransfer,     
                user_processed: userexecutor,        
                user_modified: useribs,
                modified_at: modifiedat,        
            },{
                where:{
                    tnt_id: tnt.tnt_id
                }
            });

        } else if (jenistnt == '2'){

            await Tnt.update({
                nama_nasabah: namanasabah, 
                norek_nasabah: norek, 
                alamat_nasabah: alamatnasabah,
                jenis_pajak: jenispajak,
                masa_pajak: masapajak,
                id_biling: idbilling, 
                jumlah_disetor: jumlahsetoranpajak,
                catatan: catatanpajak,   
                user_processed: userexecutor,        
                user_modified: useribs,
                modified_at: modifiedat,        
            },{
                where:{
                    tnt_id: tnt.tnt_id
                }
            });

        } else if (jenistnt == '3'){

            await Tnt.update({
                nama_nasabah: namanasabah, 
                norek_nasabah: norek, 
                alamat_nasabah: alamatnasabah,
                nomor_virtual_account: virtualaccount,
                jumlah_disetor: jumlahsetoranbpjs,
                catatan: catatanbpjs,   
                user_processed: userexecutor,               
                user_modified: useribs,
                modified_at: modifiedat,        
            },{
                where:{
                    tnt_id: tnt.tnt_id
                }
            });
        }


    if(fileexistdel){
        if (!Array.isArray(fileexistdel)) {
            fileexistdel = [fileexistdel];
          }

        for (let i = 0; i < fileexistdel.length; i++) {
            const tntfilerequest = await TntFileRequest.findOne({
              where: { file_nama: fileexistdel[i] },
            });
      
            if (tntfilerequest) {
              const filepath = `./public/upload_tnt_request/${tntfilerequest.file_nama}`;
              fs.unlinkSync(filepath);
              await TntFileRequest.destroy({
                where: {
                  id: tntfilerequest.id,
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
                    const idfiletntrequestdt = await getIdTntReq(req.params.id);
                    const idfiletntrequest = idfiletntrequestdt.dataValues.req_file_id;

                    const file = files[i];
                    const fileExtension = path.extname(file.name);
                    const name_file = `${idfiletntrequest}${fileExtension}`;
      
                  let filePath = `./public/upload_tnt_request/${name_file}`;
                  await file.mv(filePath);
            
                    await TntFileRequest.create({
                        file_id: idfiletntrequest,
                        file_id_tnt: req.params.id,
                        file_nama: name_file
                    });

                    if (fileExtension.toLowerCase() === '.jpg' || fileExtension.toLowerCase() === '.jpeg' || fileExtension.toLowerCase() === '.png') {
                        const image = await Jimp.read(filePath);
                        image.quality(50); // Ganti dengan kualitas yang diinginkan (0-100)
                        await image.writeAsync(filePath); // Menyimpan gambar yang telah diproses
                    } else if (fileExtension.toLowerCase() === '.pdf') {
                    
                        const pdfBytes = fs.readFileSync(filePath);
                        const pdfDoc = await PDFDocument.load(pdfBytes);
                        const pages = pdfDoc.getPages();
                    
                        for (const page of pages) {
                          // Mengurangi kualitas gambar pada setiap halaman
                          for (const key in page.xobjects) {
                            if (page.xobjects[key].image) {
                              page.xobjects[key].image.data = page.xobjects[key].image.data.slice(0, page.xobjects[key].image.data.length * 0.5);
                            }
                          }
                        }         
                        // Menyimpan PDF yang telah dimodifikasi
                        const modifiedPdfBytes = await pdfDoc.save();
                        fs.writeFileSync(filePath, modifiedPdfBytes);
                      }

                    
                  }
        }

       
        res.status(200).json({msg: "Data Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}




export const updateResponTnt = async(req, res) =>{
    const tnt = await Tnt.findOne({
        where: {
            tnt_id: req.params.id
        }
    });
    if(!tnt) return res.status(404).json({msg: "Data tidak ditemukan"});
    const {norekaba, noalternatif, namaaba, jenisaba, processedat} = req.body;

    let { fileresexistdel } = req.body



    try {
      
            await Tnt.update({
                norek_aba: norekaba, 
                no_alternatif_aba: noalternatif, 
                nama_aba: namaaba, 
                jenis_aba: jenisaba,
                processed_at: processedat    
            },{
                where:{
                    tnt_id: tnt.tnt_id
                }
            });

       


    if(fileresexistdel){
        if (!Array.isArray(fileresexistdel)) {
            fileresexistdel = [fileresexistdel];
          }

        for (let i = 0; i < fileresexistdel.length; i++) {
            const tntresfile = await TntFileRespon.findOne({
              where: { file_nama: fileresexistdel[i] },
            });
      
            if (tntresfile) {
              const filepath = `./public/upload_tnt_respon/${tntresfile.file_nama}`;
              fs.unlinkSync(filepath);
              await TntFileRespon.destroy({
                where: {
                  id: tntresfile.id,
                },
              });
            }
            
        }
    }
     


        if (!req.files || !req.files.files) {
            return res.status(200).send('No files were uploaded.');
        }else{
            let { files } = req.files;
    
                if (!Array.isArray(files)) {
                    files = [files];
                  }

                  for (let i = 0; i < files.length; i++) {
                    const idfilerestntdt = await getIdTntRespon(req.params.id);
                    const idfilerestnt = idfilerestntdt.dataValues.res_file_id;

                    const file = files[i];
                    const fileExtension = path.extname(file.name);
                    const name_file = `${idfilerestnt}${fileExtension}`;
      
                  let filePath = `./public/upload_tnt_respon/${name_file}`;
                  await file.mv(filePath);
            
                    await TntFileRespon.create({
                        file_id: idfilerestnt,
                        file_id_tnt: req.params.id,
                        file_nama: name_file
                    });
                    
                  }
        }

       
        res.status(200).json({msg: "Data Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}



export const updateLockTnt = async(req, res) =>{
    const tnt = await Tnt.findOne({
        where: {
            tnt_id: req.params.id
        }
    });
    if(!tnt) return res.status(404).json({msg: "Data tidak ditemukan"});
    const {lock} = req.body;

    try {
      
            await Tnt.update({
                is_lock: lock, 
            },{
                where:{
                    tnt_id: tnt.tnt_id
                }
            });

           
        res.status(200).json({msg: "Data Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}





  export const getTntLaporan = async(req, res) =>{

    try {
        Tnt.belongsTo(Kantor, { foreignKey: 'sandi_kantor', targetKey: 'kode_kantor_kas' });
        Tnt.belongsTo(KodeBankUmum, { foreignKey: 'bank_tujuan', targetKey: 'kode_bank' });
      
        const response = await Tnt.findAll({
            attributes:['uuid','tnt_id', 'tgl_permohonan', 'sandi_kantor', 'jenis_tnt', 'nama_nasabah', 'norek_nasabah', 'user_created', 'user_processed', 
            'jumlah_disetor', 'bank_tujuan', 'norek_tujuan', 'norek_aba', 'status', 'is_lock', 
            [Sequelize.literal("CASE WHEN jenis_tnt = '1' THEN 'Transfer' WHEN jenis_tnt = '2' THEN 'Pajak' WHEN jenis_tnt = '3' THEN 'BPJS' END"), 'jenistnt'],
            [Sequelize.literal('kode_kantor.nama_kantor'), 'nama_kantor'],
            [Sequelize.literal('kode_bank_umum.nama_bank'), 'nama_bank'],
            [Sequelize.literal('(select nama_user_cbs from users where kode_user_cbs = user_created)'), 'pemohon'],
            [Sequelize.literal('(select nama_user_cbs from users where kode_user_cbs = user_processed)'), 'pemproses'],

        ],     
      include: [
      { model: Kantor },
      { model: KodeBankUmum },
    ],
        where: {sandi_kantor: req.params.kodekakas,
        tgl_permohonan: {[Sequelize.Op.between] : [req.params.tgl1, req.params.tgl2]}},
        order: [
            ['createdAt', 'DESC']
        ]
        });
        res.status(200).json(response);
       
               
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const konfirmTransTnt = async(req, res) =>{
    const {statustrans, userfinished, finishedat, tgltrans, jamtrans} = req.body;

        try {
      
            await Tnt.update({
                user_finished: userfinished, 
                finished_at: finishedat, 
            },{
                where:{
                    tnt_id: req.params.id
                }
            });


            await PencairanTrans.update({
                status_trans: statustrans, 
                tgl_trans: tgltrans,
                jam_trans: jamtrans
            },{
                where:{
                    tnt_id: req.params.id
                }
            });

            res.status(200).json({msg: "Konfirmasi Sukses"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }


}





