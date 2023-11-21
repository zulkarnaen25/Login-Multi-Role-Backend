import User from "../models/UserModel.js";
import UserExt from "../models/UserExtModel.js";
import jwt from "jsonwebtoken";

export const refreshToken =async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)
 
        const userint = 
        await User.findAll({
            where: {
                refreshToken:refreshToken
            },
            raw: true,
        });
    
    
        const userext = 
            await UserExt.findAll({  
                where: {
                refreshToken:refreshToken
            },
            raw: true,
        });
      
        const users = [...userint, ...userext];

        if (!users[0]) return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            const [uuid, name, email] = [users[0].uuid, users[0].name, users[0].email]
            const accessToken = jwt.sign({ uuid, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "20s"
            })
            res.json({accessToken})
        })
       

    } catch (error) {
        console.log(error)
    }
}