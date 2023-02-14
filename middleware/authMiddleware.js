import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    const { authorization } = req.headers

    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1]
        const id = jwt.verify(token, process.env.JWT_SECRET).id // if jwt.verify fails throws 'invalid signature' error
        req.user = await User.findById(id).select('-password') // don't store the hashedPassword in the request

        if (!req.user) {
            res.status(400);
            throw new Error("user was not found"); // deleted from db even if jwt is valid
        }

        next()
    }

    if (!token) { // meaning authorization empty in body of request
        res.status(401)
        throw new Error('not authorized, no token attached to request')
    }
})