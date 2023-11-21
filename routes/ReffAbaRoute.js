import express from "express";
import {
    getReffAba,
    getReffAbaById,
    getReffAbaByNorek,
    createReffAba,
    updateReffAba,
    deleteReffAba
} from "../controllers/ReffAba.js";
import { verifyUser, adminOnly, verifyToken } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/aba', verifyUser, verifyToken, getReffAba);
router.get('/aba/:id', verifyUser,adminOnly, verifyToken, getReffAbaById);
router.get('/getaba/:norek', verifyUser, verifyToken, getReffAbaByNorek);
router.post('/aba', verifyUser, adminOnly, verifyToken, createReffAba);
router.patch('/aba/:id', verifyUser, adminOnly, verifyToken, updateReffAba);
router.delete('/aba/:id', verifyUser, adminOnly, verifyToken, deleteReffAba);


export default router;