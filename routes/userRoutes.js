import express from "express";
import { getMe, login, register } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)

export { router as usersRouter };
