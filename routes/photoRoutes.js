import express from "express";
import { getPhoto, getPhotos, getUserPhotos } from '../controllers/photoController.js';

const router = express.Router();

router.get('/user/:username', getUserPhotos)
router.get('/:id', getPhoto)
router.get('/', getPhotos)

export { router as photosRouter };
