import express from "express";
import {
    getReffDesa,
    getReffDesaById,
    getReffDesaByNorek,
    createReffDesa,
    updateReffDesa,
    deleteReffDesa,
    getKodeDesByKec,
    getKodeDesByKas
} from "../controllers/ReffDesa.js";
import { verifyUser, adminOnly, verifyToken } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/reffdesa', verifyUser, adminOnly, verifyToken, getReffDesa);
router.get('/reffdesa/:id', verifyUser, adminOnly, verifyToken, getReffDesaById);
router.get('/reffdesabynorek/:norek', verifyUser, adminOnly, verifyToken, getReffDesaByNorek);
router.post('/reffdesa', verifyUser, adminOnly, verifyToken, createReffDesa);
router.patch('/reffdesa/:id', verifyUser, adminOnly, verifyToken, updateReffDesa);
router.delete('/reffdesa/:id', verifyUser, adminOnly, verifyToken, deleteReffDesa);
router.get('/reffdesakec/:id', verifyUser, verifyToken, getKodeDesByKec);
router.get('/reffdesakas/:id', verifyUser, verifyToken, getKodeDesByKas);

export default router;