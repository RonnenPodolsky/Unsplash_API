import dotenv from 'dotenv';
import express from "express";
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
dotenv.config()

import { getMe, login, register } from '../controllers/userController.js';

router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)

export { router as usersRouter };
