import User from "../models/UserModel.js";
import UserExt from "../models/UserExtModel.js";
import jwt from 'jsonwebtoken'

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }

    const userint = 
    await User.findOne({
        where: {
            uuid: req.session.userId
        },
        raw: true,
    });


    const userext = 
        await UserExt.findOne({
        where: {
            uuid: req.session.userId
        },
        raw: true,
    });
  
    const users = {userint, userext};

    if(users.userint && !users.userext){
        req.userId = users.userint.id;
        req.role = users.userint.role; 
        next();
    }else if(users.userext && !users.userint){
        req.userId = users.userext.id;
        req.role = users.userext.role; 
        next();
    }else{
        res.status(404).json({msg: "User tidak ditemukan"});
    }



}

export const adminOnly = async (req, res, next) =>{
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.role !== "admin") return res.status(403).json({msg: "Akses terlarang"});
    next();
}

export const verifyToken=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    const token=authHeader&&authHeader.split(' ')[1]
    if(token==null)return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.sendStatus(403)
        req.email=decoded.email
        next()
    })
}


