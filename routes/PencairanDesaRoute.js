import express from "express";
import {
    getPencairanDesa,
    getPencairanDesaById,
    createPencairanDesa,
    updatePencairanDesa,
    deletePencairanDesa,
    getPencairanTransById,
    VerifyPencairanDesa,
    sendToAdminTntTransfer,
    sendToAdminTntPajak,
    sendToAdminTntBpjs,
    getPencairanDesaLaporan,
    getPencairanDesaLaporanRincianTrans,
    getPencairanDesaLaporanKantor,
    getPencairanDesaLaporanRincianTransKantor,
    getPencairanId,
    updateStatusTransInternal,
    updateLockPencairanDesa
} from "../controllers/PencairanDesa.js";
import { verifyUser, verifyToken } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/pencairan/:kodeinstansi/:tgl1/:tgl2', verifyUser, verifyToken, getPencairanDesa);
router.get('/pencairan/:id', verifyUser, verifyToken, getPencairanDesaById);
router.post('/pencairan', verifyUser, verifyToken, createPencairanDesa);
router.patch('/pencairan/:id', verifyUser, verifyToken, updatePencairanDesa);
router.delete('/pencairan/:id', verifyUser, verifyToken, deletePencairanDesa);

router.patch('/verifypencairandesa/:id', verifyUser, verifyToken, VerifyPencairanDesa);
router.get('/pencairantrans/:id', verifyUser, verifyToken, getPencairanTransById);

router.post('/sendadmintnttransfer', verifyUser, verifyToken, sendToAdminTntTransfer);
router.post('/sendadmintntpajak', verifyUser, verifyToken, sendToAdminTntPajak);
router.post('/sendadmintntbpjs', verifyUser, verifyToken, sendToAdminTntBpjs);
router.get('/cetaklaporan/:role/:kodedesa/:tgl1/:tgl2', verifyUser, verifyToken, getPencairanDesaLaporan);
router.get('/cetaklaporanrinciantrans/:role/:kodedesa/:tgl1/:tgl2/:jenistrans', verifyUser, verifyToken, getPencairanDesaLaporanRincianTrans);

router.get('/cetaklaporankantor/:kodekas/:tgl1/:tgl2', verifyUser, verifyToken, getPencairanDesaLaporanKantor);
router.get('/cetaklaporanrinciantranskantor/:kodekas/:tgl1/:tgl2/:jenistrans', verifyUser, verifyToken, getPencairanDesaLaporanRincianTransKantor);
router.get('/idpencairan/:kodedesa/:tglentry', verifyUser, verifyToken, getPencairanId);
router.patch('/updatetransinternal/:uuid', verifyUser, verifyToken, updateStatusTransInternal);
router.patch('/lockpencairandesa/:id', verifyUser, verifyToken, updateLockPencairanDesa);


export default router;



