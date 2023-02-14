import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
const { hash, compare, genSalt } = bcrypt

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const isbodyMissing = ({ username, password, email }, res) => {
    if (!username && !email && !password) {
        res.status(400)
        throw new Error('Request body is missing')
    }
}

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    isbodyMissing({ username, email, password }, res)

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(409)
        throw new Error('user already exists')
    }

    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)
    const user = await User.create({ username, email, password: hashedPassword })

    res.status(201).json({
        id: user.id, username, email
    })
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    isbodyMissing({ email, password }, res)

    const user = await User.findOne({ email })
    if (!user) {
        res.status(404)
        throw new Error('no such email registered')
    }

    const { id } = user; // Mongo Id
    if (await compare(password, user.password)) {
        res.status(200).json({ token: generateToken(id) })
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
