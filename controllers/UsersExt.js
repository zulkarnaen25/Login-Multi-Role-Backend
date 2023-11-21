import UserExt from "../models/UserExtModel.js";
import argon2 from "argon2";

export const getUserExt = async(req, res) =>{
    try {
        const response = await UserExt.findAll({
            attributes:['uuid','kode_instansi', 'norek', 'name', 'nama_kecamatan', 'email', 'role', 'flag', 'kode_kantor', 'kode_kantor_kas', 'menu'],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getUserExtById = async(req, res) =>{
    try {
        const response = await UserExt.findOne({
            attributes:['uuid','kode_instansi', 'norek', 'name', 'nama_kecamatan', 'email', 'role', 'flag', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'menu'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const createUserExt = async(req, res) =>{
    const {kodeinstansi, norek, namaext, alamat, kecamatan, emailext, role, status, password, confPassword, kodekantor, kodekantorkas, islogin, menu} = req.body;
    if(role == 'des'){
        const norekext = await UserExt.findOne({
            attributes:['norek'],
            where: {
                norek: norek
            }
        });
        if(norekext) return res.status(404).json({msg: "Nomor rekening sudah ada!"});  
    }

    if(role == 'kec'){
        const kodeinstansiext = await UserExt.findOne({
            attributes:['kode_instansi'],
            where: {
                kode_instansi: kodeinstansi
            }
        });
        if(kodeinstansiext) return res.status(404).json({msg: "Kode instansi sudah ada!"});  
    }
    
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await UserExt.create({
            kode_instansi: kodeinstansi,
            norek: norek,
            name: namaext,
            alamat: alamat,
            nama_kecamatan: kecamatan,
            email: emailext,
            role: role,
            flag: status,
            password: hashPassword,
            kode_kantor: kodekantor,
            kode_kantor_kas: kodekantorkas,
            is_login: islogin,
            type_user: 'ext',
            menu: menu
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUserExt = async(req, res) =>{
    const user = await UserExt.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {namaext, alamat, kecamatan, role, status, password, confPassword, kodekantor, kodekantorkas, islogin, menu} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await UserExt.update({     
            name: namaext,
            alamat: alamat,
            nama_kecamatan: kecamatan,       
            role: role,
            flag: status,
            password: hashPassword,
            kode_kantor: kodekantor,
            kode_kantor_kas: kodekantorkas,
            is_login: islogin,
            menu: menu
        },{
            where:{
                uuid: user.uuid
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUserExt = async(req, res) =>{
    const user = await UserExt.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await UserExt.destroy({
            where:{
                uuid: user.uuid
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}