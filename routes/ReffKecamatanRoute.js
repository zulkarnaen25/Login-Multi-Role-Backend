import express from "express";
import {
    getReffKecamatan,
    getReffKecamatanById,
    createReffKecamatan,
    updateReffKecamatan,
    deleteReffKecamatan,
    getReffKecByKodeInstansi
} from "../controllers/ReffKecamatan.js";
import { verifyUser, adminOnly, verifyToken } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/reffkecamatan', verifyUser, adminOnly, verifyToken, getReffKecamatan);
router.get('/reffkecamatan/:id', verifyUser, adminOnly, verifyToken, getReffKecamatanById);
router.post('/reffkecamatan', verifyUser, adminOnly, verifyToken, createReffKecamatan);
router.patch('/reffkecamatan/:id', verifyUser, adminOnly, verifyToken, updateReffKecamatan);
router.delete('/reffkecamatan/:id', verifyUser, adminOnly, verifyToken, deleteReffKecamatan);
router.get('/reffkecbykodeinstansi/:kodeinstansi', verifyUser, adminOnly, verifyToken, getReffKecByKodeInstansi);


export default router;