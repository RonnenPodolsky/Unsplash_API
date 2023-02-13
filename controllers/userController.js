import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username && !email && !password) {
        res.status(400)
        throw new Error('Request body is missing')

    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('user already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        username, email, password: hashedPassword
    })

    res.status(201).json({
        id: user.id, username, email
    })
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error('no such email registered')
    }

    const { id } = user;
    if (await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            token: jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            })
        })
    }
    else {
        res.status(401)
        throw new Error('wrong password, not authorized')
    }
})

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({ user: req.user })
})


export { register, login, getMe };


