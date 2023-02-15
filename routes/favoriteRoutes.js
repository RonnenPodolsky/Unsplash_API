import express from "express";
import { addPhoto, editPhotoDesc, getAllPhotosByUser, removeFavPhoto } from '../controllers/favoritesController.js';

const router = express.Router();

router.post('/add', addPhoto)
router.route('/:id').delete(removeFavPhoto).put(editPhotoDesc)
router.get('/', getAllPhotosByUser)

export { router as favoriteRouter };
