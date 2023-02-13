import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).json({ message: 'Email already exists.' })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username, email, password: hashedPassword
    })

    if (user) {
        const { id, name, email } = user;
        res.status(201).json({
            _id: id, name, email
        })
    }
    else {
        res.status(400).json({ message: 'user not created' })
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    const { id } = user;
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            token: jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            })
        })
    }
    else {
        res.status(400).json({ message: 'auth arror' })
    }
})

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({ user: req.user })
})


export { register, login, getMe };


