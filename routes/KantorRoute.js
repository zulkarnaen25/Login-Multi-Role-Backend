import express from "express";
import {
    getKantor,
    getKantorCabang,
    getKantorById,
    getKantorByKodeCabang,
    createKantor,
    updateKantor,
    deleteKantor
} from "../controllers/Kantor.js";
import { verifyUser, adminOnly, verifyToken } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/kantor', verifyUser, adminOnly, verifyToken, getKantor);
router.get('/kantorkas', verifyUser, verifyToken, getKantor);
router.get('/kantorcabang', verifyUser, adminOnly, verifyToken, getKantorCabang);
router.get('/kantor/:id', verifyUser, adminOnly, verifyToken, getKantorById);
router.get('/kantorkas/:kode_cabang', verifyUser, adminOnly, verifyToken, getKantorByKodeCabang);
router.post('/kantor', verifyUser, adminOnly, verifyToken, createKantor);
router.patch('/kantor/:id', verifyUser, adminOnly, verifyToken, updateKantor);
router.delete('/kantor/:id', verifyUser, adminOnly, verifyToken, deleteKantor);

export default router;