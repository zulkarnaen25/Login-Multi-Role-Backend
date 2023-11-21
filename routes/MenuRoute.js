import express from "express";
import { getMenuId, getReffMenu } from '../controllers/Menu.js';
import { verifyToken } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/menu/:id', verifyToken, getMenuId);
router.get('/menu', verifyToken, getReffMenu);

export default router;