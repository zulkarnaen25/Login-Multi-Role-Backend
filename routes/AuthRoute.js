import express from "express";
import {Login, logOut, Me, refreshCaptcha, changePassword, getLocalIP, getMaxAge} from "../controllers/Auth.js";
import { refreshToken } from '../controllers/RefreshToken.js';
import {verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.get('/token',refreshToken);
router.delete('/logout', logOut);
router.patch('/changepassword/:id', changePassword);
router.get('/captcha', refreshCaptcha);
router.get('/local-ip', verifyUser, getLocalIP);
router.get('/getmaxage', getMaxAge);




export default router;