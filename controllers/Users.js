import User from "../models/UserModel.js";
import UserExt from "../models/UserExtModel.js";
import LogUser from "../models/LogUserModel.js";
import argon2 from "argon2";
import { Sequelize } from "sequelize";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['uuid','kode_user_cbs', 'nama_user_cbs', 'name', 'email','role', 'is_tnt', 'flag', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'menu'],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            attributes:['uuid','kode_user_cbs', 'nama_user_cbs', 'name',  'email','role', 'flag', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'is_tnt', 'menu'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserExecutorTnt = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['uuid','kode_user_cbs', 'nama_user_cbs', 'name', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'is_tnt'],
            where: {
                is_tnt: req.params.istnt
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const createUser = async(req, res) =>{
    const {kode_user_cbs, nama_user_cbs, name, email, password, confPassword, role, status, kode_kantor, kode_kantor_kas, is_login, is_tnt, menu} = req.body;
 
    const useribs = await User.findOne({
        attributes:['kode_user_cbs'],
        where: {
            kode_user_cbs: kode_user_cbs
        }
    });
    if(useribs) return res.status(400).json({msg: "User sudah terdaftar"});
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            kode_user_cbs: kode_user_cbs,
            nama_user_cbs: nama_user_cbs,
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            flag: status,
            kode_kantor: kode_kantor,
            kode_kantor_kas: kode_kantor_kas,
            is_login: is_login,
            is_tnt: is_tnt,
            menu: menu,
            type_user: 'int'
        });
        res.status(200).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {kode_user_cbs, nama_user_cbs, name, email,password, confPassword, role, status, kode_kantor, kode_kantor_kas, is_login, is_tnt, menu} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await User.update({
            kode_user_cbs:kode_user_cbs,
            nama_user_cbs: nama_user_cbs,
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            flag: status,
            kode_kantor: kode_kantor,
            kode_kantor_kas: kode_kantor_kas,
            is_login: is_login,
            is_tnt: is_tnt,
            menu: menu,
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async(req, res) =>{
  
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const createLogUser = async(req, res) =>{
    const {user_ibs, ip_address, action, table_name} = req.body;
   
    try {
        await LogUser.create({
            user_ibs:user_ibs,
            ip_address: ip_address,
            action: action,
            table_name : table_name
        });
        res.status(201).json({msg: "Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


  export const getUsersUnion = async(req, res) =>{
    try {
        const userint = 
        await User.findAll({
            attributes:['id', 'uuid', 'kode_user_cbs', 'nama_user_cbs', 'name', 'norek', 'nama_kecamatan', 'email', 'password', 'role', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'is_tnt', 'menu', 'type_user'],
            where: {
                email: req.params.id
            },
            raw: true,
        });
        const userext = 
            await UserExt.findAll({
            attributes:['id', 'uuid', ['kode_desa', 'kode_user_cbs'], 'nama_user_cbs', ['nama_desa', 'name'], ['norek_desa', 'norek'], 'nama_kecamatan', 'email', 'password', 'role', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'is_tnt', 'menu', 'type_user'],
            where: {
                email: req.params.id
            },
            raw: true,
        })
      
        const users = [...userint, ...userext];
        
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
