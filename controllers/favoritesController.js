import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import FavoritePhoto from '../models/favoritePhotoModel.js';
dotenv.config()

const getAllPhotosByUser = asyncHandler(async (req, res) => {
    const favoritePhotos = await FavoritePhoto.find({ user: req.user._id })
    res.status(200).json({ favoritePhotos })
})

const removeAPhoto = asyncHandler(async (req, res) => {
    const photo = await FavoritePhoto.findById(req.params.id)
    if (!photo) {
        res.status(400)
        throw new Error('photo not found')
    }

    if (photo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    await photo.remove()

    res.status(200).json({ id: req.params.id })
})

const addPhoto = asyncHandler(async (req, res) => {
    if (!req.body.description && !req.body.url && !req.body.username) {
        res.status(400)
        throw new Error("Request body is missing");
    }
    const newFavoritePhoto = await FavoritePhoto.create({
        user: req.user._id,
        url: req.body.url,
        description: req.body.description,
        username: req.body.username
    });
    res.status(201).json(newFavoritePhoto);
});

const editPhotoDesc = asyncHandler(async (req, res) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        throw new Error('invalid photo id')
    }

    const photo = await FavoritePhoto.findById(req.params.id)
    if (!photo) {
        res.status(400)
        throw new Error('photo not found')
    }

    if (photo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    if (!req.body.description) {
        res.status(400)
        throw new Error('provide a description to change')
    }

    const updatedPhotoDesc = await FavoritePhoto.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedPhotoDesc)
})

export { addPhoto, getAllPhotosByUser, removeAPhoto, editPhotoDesc };

