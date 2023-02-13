import axios from 'axios';
import express from "express";
const router = express.Router();

import { getPhoto, getPhotos, getUserPhotos } from '../controllers/photoController.js';


// router.route('/').get(protect, getGoals).post(protect, setGoals)
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

const unsplash = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: { 'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
});


router.get('/user/:username', getUserPhotos)
router.get('/:id', getPhoto)
router.get('/', getPhotos)

export { router as photosRouter };
