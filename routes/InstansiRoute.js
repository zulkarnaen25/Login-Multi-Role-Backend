import express from "express";
import {
    getInstansilogin,
    getInstansi,
    getInstansiById,
    createInstansi,
    updateInstansi,
    deleteInstansi
} from "../controllers/Instansi.js";
import { verifyUser, verifyToken } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/instansilogin', getInstansilogin);
router.get('/instansi',verifyUser, verifyToken, getInstansi);
router.get('/instansi/:id',verifyUser, verifyToken, getInstansiById);
router.post('/instansi',verifyUser, verifyToken, createInstansi);
router.patch('/instansi/:id',verifyUser, verifyToken, updateInstansi);
router.delete('/instansi/:id',verifyUser, verifyToken, deleteInstansi);

export default router;