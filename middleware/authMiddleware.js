import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const id = jwt.verify(token, process.env.JWT_SECRET).id

            req.user = await User.findById(id).select('-password')
            if (!req.user) {
                res.status(400);
                throw new Error("user was not found");
            }

            next()
        }
        catch (e) {
            res.status(401)
            throw new Error('not authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('not authorized, no token')
    }
})

