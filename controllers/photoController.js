import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

const unsplash = axios.create({
    baseURL: 'http://api.unsplash.com/',
    headers: { 'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
});

const handleError = (e, res) => {
    res.
        status(e.response?.status || 500).
        json({ message: e.response?.statusText || 'Server error. Please try again later' })
}

const getUserPhotos = async (req, res) => {
    try {
        const { username } = req.params
        const response = await unsplash.get(`/users/${username}/photos/`)
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
    catch (e) {
        handleError(e, res)
    }
}

const getPhoto = async (req, res) => {
    try {
        const { id } = req.params
        const response = await unsplash.get(`photos/${id}`)
        const data = await response.data;
        res.status(200).json(data);
    }
    catch (e) {
        handleError(e, res)
    }
}

const getPhotos = async (req, res) => {
    try {
        const response = await unsplash.get('photos?per_page=25')
        const data = await response.data;
        const raw_urls = data.map(v => v.urls.raw)
        res.status(200).json(raw_urls);
    }
    catch (e) {
        handleError(e, res)
    }
}

export { getUserPhotos, getPhoto, getPhotos };
