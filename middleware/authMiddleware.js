import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    const { authorization } = req.headers

    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1]
        const id = jwt.verify(token, process.env.JWT_SECRET).id // if fails throws error

        req.user = await User.findById(id).select('-password')
        if (!req.user) {
            res.status(400);
            throw new Error("user was not found");
        }

        next()
    }

    if (!token) { // meaning no authorization token in body of request
        res.status(401)
        throw new Error('not authorized, no token')
    }
})