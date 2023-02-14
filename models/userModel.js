import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please add an email'],
    },
}, { timestamps: true })

export default mongoose.model('User', userSchema)
