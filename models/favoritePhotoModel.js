import mongoose from 'mongoose';

const favoritePhotoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    url: {
        type: String,
        required: [true, 'please add a url']
    },
    description: {
        type: String,
        required: [true, 'please add a description']
    },
    username: {
        type: String,
        required: [true, 'please add a username']
    }
}, { timestamps: true })

export default mongoose.model('FavoritePhoto', favoritePhotoSchema);