import express from "express";
import {
    getConfig,
    getConfigById,
    getConfigByKeyname,
    createConfig,
    updateConfig,
    deleteConfig
} from "../controllers/AppConfig.js";
import { verifyUser, adminOnly, verifyToken } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/config', verifyUser, adminOnly, verifyToken, getConfig);
router.get('/config/:id', verifyUser, adminOnly, verifyToken, getConfigById);
router.get('/configvalue/:keyname', verifyUser, verifyToken, getConfigByKeyname);
router.post('/config', verifyUser, adminOnly, verifyToken, createConfig);
router.patch('/config/:id', verifyUser, adminOnly, verifyToken, updateConfig);
router.delete('/config/:id', verifyUser, adminOnly, verifyToken, deleteConfig);

export default router;