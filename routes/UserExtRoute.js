import express from "express";
import {
    getUserExt,
    getUserExtById,
    createUserExt,
    updateUserExt,
    deleteUserExt
} from "../controllers/UsersExt.js";
import { verifyUser, adminOnly, verifyToken } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/usersext', verifyUser, adminOnly, verifyToken, getUserExt);
router.get('/usersext/:id', verifyUser, adminOnly, verifyToken, getUserExtById);
router.post('/usersext', verifyUser, adminOnly, verifyToken, createUserExt);
router.patch('/usersext/:id', verifyUser, adminOnly, verifyToken, updateUserExt);
router.delete('/usersext/:id', verifyUser, adminOnly, verifyToken, deleteUserExt);

export default router;