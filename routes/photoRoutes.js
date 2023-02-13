import axios from 'axios';
import dotenv from 'dotenv';
import express from "express";
const router = express.Router();
dotenv.config()

// router.route('/').get(protect, getGoals).post(protect, setGoals)
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

const unsplash = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: { 'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
});


router.get('/user/:username', async (req, res) => {
    try {
        const { username } = req.params
        const response = await unsplash
            .get(`/users/${username}/photos/`)
        const data = await response.data;
        let userPhotos = data.map(photo => {
            return {
                id: photo.id,
                user: photo.user.username,
                description: photo.description ? photo.description : "No description provided.",
                url: photo.urls.raw
            }
        })
        res.status(200).json(userPhotos);
    }
    catch (error) {
        console.log(error.response);
        res.status(error.response.status).json({ message: error.response.statusText })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const response = await unsplash
            .get(`photos/${id}`)
        const data = await response.data;
        res.status(200).json(data);
    }
    catch (e) {
        console.log(e.message)
        res.status(500).json({ message: 'Server error. Please try again later.' })
    }
})


router.get('/', async (req, res) => {
    try {
        const response = await unsplash
            .get('photos/')
        const data = await response.data;
        const raw_urls = data.map(v => v.urls.raw)
        res.status(200).json(raw_urls);
    }
    catch (e) {
        console.log(e.message)
        res.status(500).json({ message: 'Server error. Please try again later.' })
    }
})




export { router as photosRouter };
