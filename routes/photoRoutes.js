import axios from 'axios';
import express from "express";
const router = express.Router();

import { getPhoto, getPhotos, getUserPhotos } from '../controllers/photoController.js';

router.get('/user/:username', getUserPhotos)
router.get('/:id', getPhoto)
router.get('/', getPhotos)

export { router as photosRouter };
