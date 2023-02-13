import express from "express";
import { addPhoto, editPhotoDesc, getAllPhotosByUser, removeAPhoto } from '../controllers/favoritePhotosController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addPhoto)
router.delete('/:id', protect, removeAPhoto)
router.put('/:id', protect, editPhotoDesc)
router.get('/', protect, getAllPhotosByUser)

export { router as favoritePhotosRouter };
