import express from "express";
import { addPhoto, editPhotoDesc, getAllPhotosByUser, removeFavPhoto } from '../controllers/favoritesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addPhoto)
router.route('/:id').delete(protect, removeFavPhoto).put(protect, editPhotoDesc)
router.get('/', protect, getAllPhotosByUser)

export { router as favoriteRouter };
