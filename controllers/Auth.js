import User from "../models/UserModel.js";
import UserExt from "../models/UserExtModel.js";
import AppConfig from "../models/AppConfigModel.js";
import argon2 from "argon2";
import jwt from 'jsonwebtoken';
import crypto from "crypto"
import { createCanvas, registerFont } from "canvas";
import moment from "moment"
import { Sequelize } from "sequelize";


let errorCount = 0;
let jamserver = '';

registerFont('fonts/roboto/Roboto-Italic.ttf', { family: 'Roboto' });


const generateCaptcha = () => {
    const captcha = crypto.randomBytes(2).toString('hex').toUpperCase();
    return captcha;
  };

const createCaptchaImage = (captcha) => {
    const canvas = createCanvas(200, 40);
    const ctx = canvas.getContext('2d');
  
    ctx.fillStyle = '#EAEAEA';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    const lineColor = 'red';
    const lineWidth = 2;
    const lineCount = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < lineCount; i++) {
      const startY = Math.random() * canvas.height;
      const endY = Math.random() * canvas.height; 
  
      ctx.beginPath();
      ctx.moveTo(0, startY);
      ctx.lineTo(canvas.width, endY);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  
    const characters = captcha.split('');
    const characterWidth = canvas.width / captcha.length;
    const characterHeight = canvas.height;
    characters.forEach((char, index) => {
      ctx.save();
  
      const x = index * characterWidth + characterWidth / 2;
      const y = characterHeight / 2;
      const rotateAngle = Math.random() * Math.PI / 4;
      ctx.translate(x, y);
      ctx.rotate(rotateAngle);
      ctx.translate(-x, -y);
  
      ctx.font = '25px Roboto';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char, x, y);
  
      ctx.restore();
    });
  
    return canvas.toBuffer();
  };


export const refreshCaptcha = async (req, res) => {
    const captchaString = generateCaptcha();
    const captchaImage = createCaptchaImage(captchaString);
  
    const captchaData = {
      captcha: captchaString,
      image: captchaImage.toString('base64')
    };
  
    res.json(captchaData);
  };


  export const  getMaxAge = async (req, res) => {
    // const milliseconds = req.session.cookie.maxAge; 
    // const seconds = Math.floor((req.session.cookie.maxAge / 1000) % 60);
    // const minutes = Math.floor((req.session.cookie.maxAge / (1000 * 60)) % 60);
    // const hours = Math.floor((req.session.cookie.maxAge / (1000 * 60 * 60)) % 24);
    // const time = `${hours} jam, ${minutes} menit, ${seconds} detik`;
    //res.json(parseInt(req.session.cookie.maxAge));
    res.json(req.session.cookie.maxAge);
    // console.log(req.session.cookie.maxAge); 
  };



export const Login = async (req, res) =>{

const jam_mulai = await AppConfig.findOne({where: {keyname: 'jam_mulai'}});
const jam_selesai = await AppConfig.findOne({where: {keyname: 'jam_selesai'}});

const jamsekarang = moment(new Date(), 'HH:mm:ss').format('HH:mm:ss');
const jammulai = moment(jam_mulai.keyvalue, 'HH:mm:ss').format('HH:mm:ss');
const jamselesai = moment(jam_selesai.keyvalue, 'HH:mm:ss').format('HH:mm:ss');

    const {emailpost , password , captcha, captchatext } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailpost == '' && password == '' && captcha == '') {
        return res.status(404).json({msg: "ID, Password dan Kode Keamanan wajib diisi"});
    }else if(emailpost == '' && password != '' && captcha != '') {
        return res.status(404).json({msg: "ID wajib diisi"});
    }else if(emailpost != '' && password == '' && captcha != '') {
        return res.status(404).json({msg: "Password wajib diisi"});
    }else if(emailpost != '' && password != '' && captcha == '') {
        return res.status(404).json({msg: "Kode Keamanan wajib diisi"});
    }else if (!emailRegex.test(emailpost)) {
        return res.status(404).json({ msg: "ID tidak valid" });
    } else if(emailpost == '' && password == '' && captcha != '') {
        return res.status(404).json({msg: "ID dan Password wajib diisi"});
    }else if(emailpost != '' && password == '' && captcha == '') {
        return res.status(404).json({msg: "Password dan Kode Keamanan wajib diisi"});
    }else if(emailpost == '' && password != '' && captcha == '') {
        return res.status(404).json({msg: "ID dan Kode Keamanan wajib diisi"});
    }

        const userint = 
        await User.findOne({
            attributes:['id', 'uuid', 'kode_user_cbs', 'nama_user_cbs', 'name', 'alamat', 'norek', 'nama_kecamatan', 'email', 'password', 'role', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'is_tnt', 'menu', 'type_user', 'flag'],
            where: {
                    email: emailpost
            },
            raw: true,
        });

        const userext = 
            await UserExt.findOne({
            attributes:['id', 'uuid', ['kode_instansi', 'kode_user_cbs'], 'nama_user_cbs', 'name', 'alamat', 'norek', 'nama_kecamatan', 'email', 'password', 'role', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'is_tnt', 'menu', 'type_user', 'flag'],
            where: {
                email: emailpost
            },
            raw: true,
        });
      
        const users = {userint, userext};
        if(!users) return res.status(404).json({msg: "User tidak ditemukan"});

 
     
        if(users.userint){
         
            if(users.userint.is_login == '1' && users.userint.role != 'admin') return res.status(404).json({msg: "User sudah aktif di device lain"});
            if((users.userint.role != 'admin') && (jammulai != '00:00:00' && jamselesai != '00:00:00') && (jamsekarang < jammulai || jamsekarang > jamselesai)) return res.status(404).json({msg: "Melebihi atau kurang dari jam operasional"});
    
            const match = await argon2.verify(users.userint.password, password);
            req.session.userId = users.userint.uuid;
            const uuid = users.userint.uuid;
            const kode_user_cbs = users.userint.kode_user_cbs;
            const nama_user_cbs = users.userint.nama_user_cbs;
            const name = users.userint.name;
            const alamat = users.userint.alamat;
            const norek = users.userint.norek;
            const email = users.userint.email;
            const role = users.userint.role;
            const kode_kantor = users.userint.kode_kantor;
            const kode_kantor_kas = users.userint.kode_kantor_kas;
            const is_tnt = users.userint.is_tnt;
            const menu = users.userint.menu;
         
            if((match && users.userint.flag == '0' && users.userint.role != 'admin') || (match && users.userint.role == 'admin')){
        
                  if(captcha != captchatext) {
                    return res.status(404).json({msg: "Kode Keamanan tidak sama"});
                  } else if(captcha === captchatext) {
                    
                            const accessToken=jwt.sign({uuid,name,email},process.env.ACCESS_TOKEN_SECRET,{
                                expiresIn:"20s"
                            })
                            const refreshToken=jwt.sign({uuid,name,email},process.env.REFRESH_TOKEN_SECRET,{
                                expiresIn:"1d"
                            })
                            errorCount = 0;
                            await User.update({refreshToken:refreshToken, flag:'0', wrong_pass:'0', is_login:'1'},{
                                where:{
                                    uuid:uuid
                                }
                            })
                             res.cookie('refreshToken',refreshToken,{
                        secure: true,
                        httpOnly:true,
                        sameSite: 'none',
                        maxAge:12*60*60*1000,
                    })
                            res.status(200).json({uuid, kode_user_cbs, nama_user_cbs, name, alamat, norek, email, role, kode_kantor, kode_kantor_kas, is_tnt, menu, accessToken});
                    
                    }
        
          }else if((match && users.userint.flag == '1') && (users.userint.role != 'admin')){
                return res.status(404).json({msg: "user diblokir"});
          }else{
            errorCount++;
            const user = await User.findOne({
                where: {
                    uuid: uuid
                }
            });
        
            if(users.userint.role != 'admin' && user.wrong_pass < 3){
                await User.update({wrong_pass:errorCount},{
                    where:{
                        uuid:uuid
                    }
                })
            }
        
            if(users.userint.role != 'admin' && user.wrong_pass === 2){
                errorCount = 0;
                await User.update({flag:'1', wrong_pass:'0'},{
                    where:{
                        uuid:uuid
                    }
                })
        
                return res.status(404).json({msg:"Anda telah 3 kali salah memasukan password."});
            }else{
                return res.status(404).json({msg:"Password salah."});
            }
         }


        }else if(users.userext){
            if ((users.userext.role != 'admin') && (jammulai != '00:00:00' && jamselesai != '00:00:00') && (jamsekarang < jammulai || jamsekarang > jamselesai)) return res.status(404).json({msg: "Melebihi atau kurang dari jam operasional"});

            const match = await argon2.verify(users.userext.password, password);
            req.session.userId = users.userext.uuid;
            const uuid = users.userext.uuid;
            const kode_user_cbs = users.userext.kode_user_cbs;
            const nama_user_cbs = users.userext.nama_user_cbs;
            const name = users.userext.name;
            const alamat = users.userext.alamat;
            const norek = users.userext.norek;
            const email = users.userext.email;
            const role = users.userext.role;
            const kode_kantor = users.userext.kode_kantor;
            const kode_kantor_kas = users.userext.kode_kantor_kas;
            const is_tnt = users.userext.is_tnt;
            const menu = users.userext.menu;
        
            if(match && users.userext.flag == '0'){
        
                  if(captcha != captchatext) {
                    return res.status(404).json({msg: "Kode Keamanan tidak sama"});
                  } else if(captcha === captchatext) {
                    
                            const accessToken=jwt.sign({uuid,name,email},process.env.ACCESS_TOKEN_SECRET,{
                                expiresIn:"20s"
                            })
                            const refreshToken=jwt.sign({uuid,name,email},process.env.REFRESH_TOKEN_SECRET,{
                                expiresIn:"1d"
                            })
                            errorCount = 0;
                            await UserExt.update({refreshToken:refreshToken, flag:'0', wrong_pass:'0'},{
                                where:{
                                    uuid:uuid
                                }
                            })
                            res.cookie('refreshToken',refreshToken,{
                        secure: true,
                        httpOnly:true,
                        sameSite: 'none',
                        maxAge:12*60*60*1000,
                    })
        
                            res.status(200).json({uuid, kode_user_cbs, nama_user_cbs, name, alamat, norek, email, role, kode_kantor, kode_kantor_kas, is_tnt, menu, accessToken});                  
                    }
        
          }else if(match && users.userext.flag == '1'){
                return res.status(404).json({msg: "user diblokir, silahkan hubungi petugas"});
          }else{
            errorCount++;
            const user = await UserExt.findOne({
                where: {
                    uuid: uuid
                }
            });
        
            if(user.wrong_pass < 3){
                await UserExt.update({wrong_pass:errorCount},{
                    where:{
                        uuid:uuid
                    }
                })
            }
        
            if(user.wrong_pass === 2){
                errorCount = 0;
                await UserExt.update({flag:'1', wrong_pass:'0'},{
                    where:{
                        uuid:uuid
                    }
                })
        
                return res.status(404).json({msg:"Anda telah 3 kali salah memasukan password."});
            }else{
                return res.status(404).json({msg:"Password salah."});
            }
         }
        }
}



export const Me = async (req, res) =>{
    const maxAge = req.session.cookie.maxAge;

    if(!req.session.userId){
      
        const Token = req.cookies.refreshToken

        if(Token){

            const userint = 
            await User.findOne({
                attributes:['id', 'uuid', 'kode_user_cbs', 'nama_user_cbs', 'name', 'alamat', 'norek', 'nama_kecamatan', 'email', 'password', 'role', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'is_tnt', 'menu', 'type_user', 'flag'],
                where: {
                    refreshToken:req.cookies.refreshToken
                },
                raw: true,
            });
    
    
            const userext = 
                await UserExt.findOne({
                    attributes:['id', 'uuid', ['kode_instansi', 'kode_user_cbs'], 'nama_user_cbs', 'name', 'alamat', 'norek', 'nama_kecamatan', 'email', 'password', 'role', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'is_tnt', 'menu', 'type_user', 'flag'],
                where: {
                    refreshToken:req.cookies.refreshToken
                },
                raw: true,
            });
          
            const users = {userint, userext};

            if(users.userint){
                await User.update({refreshToken:null, is_login:'0'},{
                    where:{
                        refreshToken:req.cookies.refreshToken
                    }
                })           
                res.clearCookie('refreshToken')

            }else if(users.userext){
                await UserExt.update({refreshToken:null},{
                    where:{
                        refreshToken:req.cookies.refreshToken
                    }
                })           
                res.clearCookie('refreshToken')
            }
        
        }

        
        
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }


    const userint = 
    await User.findOne({
        attributes:['id', 'uuid', 'kode_user_cbs', 'nama_user_cbs', 'name', 'alamat', 'norek', 'nama_kecamatan', 'email', 'password', 'role', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'is_tnt', 'menu', 'type_user', 'flag'],
        where: {
            uuid: req.session.userId
        },
        raw: true,
    });


    const userext = 
        await UserExt.findOne({
            attributes:['id', 'uuid', ['kode_instansi', 'kode_user_cbs'], 'nama_user_cbs', 'name', 'alamat', 'norek', 'nama_kecamatan', 'email', 'password', 'role', 'kode_kantor', 'kode_kantor_kas', 'is_login', 'is_tnt', 'menu', 'type_user', 'flag'],
        where: {
            uuid: req.session.userId
        },
        raw: true,
    });
  
  
    const users = {userint, userext};
  
    if(users.userint){
        res.status(200).json(users.userint);
    }else if(users.userext){
        res.status(200).json(users.userext);
    }else{
        res.status(404).json({msg: "User tidak ditemukan"});
    }

}
 

export const logOut=async(req,res)=>{
    
    const refreshToken=req.cookies.refreshToken

    if(!refreshToken) return res.sendStatus(204)

    const userint = 
    await User.findOne({
        attributes:['id', 'uuid', 'type_user'],
        where: {
            refreshToken:refreshToken
        },
        raw: true,
    });


    const userext = 
        await UserExt.findOne({
            attributes:['id', 'uuid', 'type_user'],        
            where: {
            refreshToken:refreshToken
        },
        raw: true,
    });
  
    const users = {userint, userext};

    if(users.userint){
        await User.update({refreshToken:null, is_login:'0'},{
            where:{
                uuid:users.userint.uuid
            }
        })
    }
    else if (users.userext){
        await UserExt.update({refreshToken:null},{
            where:{
                uuid:users.userext.uuid
            }
        })
    }
    
    res.clearCookie('connect.sid')
    res.clearCookie('refreshToken') 
    req.session.destroy()  
    return res.sendStatus(200)
}

export const changePassword = async(req, res) =>{
    const {oldpassword, newpassword} = req.body;

    const userint = 
    await User.findOne({
        attributes:['id', 'uuid', 'password'],
        where: {
            uuid: req.params.id
        },
        raw: true,
    });

    const userext = 
        await UserExt.findOne({
            attributes:['id', 'uuid', 'password'],        
            where: {
            uuid: req.params.id
        },
        raw: true,
    });
  
    const users = {userint, userext};
    if(!users) return res.status(404).json({msg: "User tidak ditemukan"});
    if(users.userint){
    const match = await argon2.verify(users.userint.password, oldpassword);
    if(match){
    let hashPassword;
    hashPassword = await argon2.hash(newpassword);
    try {

        await User.update({password: hashPassword, refreshToken:null, is_login:'0'
            },{
                where:{
                    uuid: users.userint.uuid
                }
            });

        res.clearCookie('connect.sid')
        res.clearCookie('refreshToken') 
        req.session.destroy()  
        res.status(200).json({msg: "Password Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
   }else{
        res.status(400).json({msg: "Password lama tidak cocok"});
   }

    } else if (users.userext){

        const match = await argon2.verify(users.userext.password, oldpassword);
        if(match){
        let hashPassword;
        hashPassword = await argon2.hash(newpassword);
        try {
    
            await UserExt.update({password: hashPassword, refreshToken:null, is_login:'0'
                },{
                    where:{
                        uuid: users.userext.uuid
                    }
                });
    
            res.clearCookie('connect.sid')
            res.clearCookie('refreshToken') 
            req.session.destroy()  
            res.status(200).json({msg: "Password Updated"});
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
       }else{
            res.status(400).json({msg: "Password lama tidak cocok"});
       }
    }

}


export const getLocalIP = (req, res) => {
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.json({ ip: clientIP });
};
 

 