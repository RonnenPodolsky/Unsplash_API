import asyncHandler from 'express-async-handler';
import FavoritePhoto from '../models/favoritePhotoModel.js';

const isInvalidId = (id, res) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        throw new Error('invalid photo id')
    }
}
const isPhotoExists = (photo, res) => {
    if (!photo) {
        res.status(404)
        throw new Error('photo not found')
    }
}

const isUserAccessingOwnPhoto = (photo, id, res) => {
    if (photo.user.toString() !== id.toString()) {
        res.status(403)
        throw new Error('user not authorized to access this resource')
    }
}

const isDescriptionSpecified = (description, res) => {
    if (!description) {
        res.status(400)
        throw new Error('provide a description')
    }
}

const getAllPhotosByUser = asyncHandler(async (req, res) => {
    const favoritePhotos = await FavoritePhoto.find({ user: req.user._id })
    res.status(200).json({ favoritePhotos })
})

const addPhoto = asyncHandler(async (req, res) => {
    const { description, url, username } = req.body

    if (!description && !url && !username) {
        res.status(400)
        throw new Error("Request body desc, url and username are all missing");
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
    isInvalidId(req.params.id, res)

    const photo = await FavoritePhoto.findById(req.params.id)
    isPhotoExists(photo, res)
    isUserAccessingOwnPhoto(photo, req.user._id, res)
    isDescriptionSpecified(req.body.description, res)
    
    const { description } = req.body
    const updatedPhotoDesc = await FavoritePhoto.findByIdAndUpdate(req.params.id, { description }, { new: true })
    res.status(200).json(updatedPhotoDesc)
})

const removeFavPhoto = asyncHandler(async (req, res) => {
    isInvalidId(req.params.id, res)

    const photo = await FavoritePhoto.findById(req.params.id)
    isPhotoExists(photo, res)
    isUserAccessingOwnPhoto(photo, req.user._id, res)

    await photo.remove()
    res.status(200).json({ id: req.params.id })
})


export { addPhoto, getAllPhotosByUser, removeFavPhoto, editPhotoDesc };
