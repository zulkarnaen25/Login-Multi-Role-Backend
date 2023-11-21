import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createLogUser,
    getUserExecutorTnt
} from "../controllers/Users.js";
import { verifyUser, adminOnly, verifyToken } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/users', verifyUser, adminOnly, verifyToken, getUsers);
router.get('/users/:id', verifyUser, adminOnly, verifyToken, getUserById);
router.post('/users', verifyUser, adminOnly, verifyToken, createUser);
router.patch('/users/:id', verifyUser, adminOnly, verifyToken, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, verifyToken, deleteUser);
router.post('/logusers', createLogUser);

router.get('/userexe/:istnt', verifyUser, verifyToken, getUserExecutorTnt);
export default router;