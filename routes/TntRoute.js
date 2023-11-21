import express from "express";
import {
    getTnt,
    getTntById,
    getKodeBankall,
    getKodeBankById,
    createTnt,
    updateTnt,
    updateResponTnt,
    deleteTnt,
    updateLockTnt,
    getTntLaporan,
    konfirmTransTnt

} from "../controllers/Tnt.js";
import { verifyUser, verifyToken } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/tnt/:iduser/:tgl1/:tgl2', verifyUser, verifyToken, getTnt);
router.get('/tnt/:id', verifyUser, verifyToken, getTntById);
router.post('/tnt', verifyUser, verifyToken, createTnt);
router.patch('/tnt/:id', verifyUser, verifyToken, updateTnt);
router.patch('/respontnt/:id', verifyUser, verifyToken, updateResponTnt);
router.patch('/locktnt/:id', verifyUser, verifyToken, updateLockTnt);
router.delete('/tnt/:id/:userid', verifyUser, verifyToken, deleteTnt);



router.get('/kodebank', verifyUser, verifyToken, getKodeBankall);
router.get('/kodebank/:id', verifyUser, verifyToken, getKodeBankById);
router.get('/cetaklaporantnt/:kodekakas/:tgl1/:tgl2', verifyUser, verifyToken, getTntLaporan);

router.patch('/konfirmtranstnt/:id', verifyUser, verifyToken, konfirmTransTnt);


export default router;