import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const tokenValidiation = (authorization, res) => {
    const emptyAuthotizationHeader = !authorization
    const firstAuthWordIsBearer = authorization?.split(' ')[0] === 'Bearer'

    if (emptyAuthotizationHeader || !firstAuthWordIsBearer) {
        res.status(401)
        throw new Error('not authorized, bearer token missing')
    }
}

const isUserCreatedFaild = (user, res) => {
    if (!user) {
        res.status(400);
        throw new Error("user was not found"); // deleted from db even if jwt is valid
    }
}

const verifyToken = (token, res) => {
    let id;
    jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
        if (err) {
            res.status(401)
            throw new Error(err.message == 'jwt expired' ? err.message : 'invalid token')
        }
        else {
            id = userId.id
        }
    })
    return id;
}

export const protect = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers
    tokenValidiation(authorization, res)

    const token = authorization.split(' ')[1];
    const id = verifyToken(token, res)

    req.user = await User.findById(id).select('-password') // don't store the hashedPassword in the request 
    isUserCreatedFaild(req.user, res)

    next()
})