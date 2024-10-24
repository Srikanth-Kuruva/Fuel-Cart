import express from 'express'
import { getUser, login, logout, register } from "../controllers/userController.js";
import {checkAuth} from '../middlewares/checkAuth.js';

const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.get("/logout", checkAuth ,logout);
router.get("/getuser", checkAuth ,getUser);

export default router