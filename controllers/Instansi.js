
import Instansi from "../models/InstansiModel.js";
import path from "path";
import fs from "fs";


export const getInstansi = async (req, res) =>{
    try {
        
        const response = await Instansi.findAll({});
       
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getInstansilogin = async (req, res) =>{
    try {
        
        const response = await Instansi.findOne({});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getInstansiById = async(req, res) =>{
    try {
        const instansi = await Instansi.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!instansi) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
       
            response = await Instansi.findOne({
                where:{
                    id: instansi.id
                   
                }
            });
       
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createInstansi = async(req, res) =>{

    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});

    const {namainstansi, alamatinstansi, telpinstansi, warnaslip} = req.body;
    const file = req.files.file;
   
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = 'logo' + ext;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});


    await file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Instansi.create({instansi_nama: namainstansi, instansi_alamat: alamatinstansi,  instansi_telp: telpinstansi, instansi_logo: fileName, warna_slip: warnaslip});
            res.status(201).json({msg: "Instansi Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateInstansi = async(req, res) =>{
   
    try {
        const instansi = await Instansi.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!instansi) return res.status(404).json({msg: "Data tidak ditemukan"});
        
        const {namainstansi, alamatinstansi, telpinstansi, hapusfile, warnaslip} = req.body;

        if(req.files === null ){
          
            if(hapusfile == "true"){
                const filepath = `./public/images/${instansi.instansi_logo}`;
                fs.unlinkSync(filepath);
                await Instansi.update({instansi_logo: null},{
                    where:{
                        id: instansi.id
                    }
                });
            }

          
            await Instansi.update({instansi_nama: namainstansi, instansi_alamat : alamatinstansi, instansi_telp : telpinstansi, warna_slip: warnaslip},{
                    where:{
                        id: instansi.id
                    }
                });
           


        }else{
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            const fileName = 'logo' + ext;
            const allowedType = ['.png','.jpg','.jpeg'];

            if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
            if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

            const filepath = `./public/images/${instansi.instansi_logo}`;
            if(instansi.instansi_logo){
            fs.unlinkSync(filepath);
            }
            
        file.mv(`./public/images/${fileName}`, async(err)=>{

        if(err) return res.status(500).json({msg: err.message});
        try {
                await Instansi.update({instansi_nama: namainstansi, instansi_alamat : alamatinstansi, instansi_telp : telpinstansi, instansi_logo : fileName, warna_slip: warnaslip},{
                    where:{
                        id: instansi.id
                        }
                });
                  
        } catch (error) {
            console.log(error.message);
        }
    })
   
        }

        res.status(200).json({msg: "Instansi updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteInstansi = async(req, res) =>{
    try {
        const instansi = await Instansi.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!instansi) return res.status(404).json({msg: "Data tidak ditemukan"});

            await Instansi.destroy({
                where:{
                    id: instansi.id
                }
            });
       
        const filepath = `./public/images/${instansi.instansi_logo}`;
        if(instansi.instansi_logo){
            fs.unlinkSync(filepath);
            }
        res.status(200).json({msg: "Instansi deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}