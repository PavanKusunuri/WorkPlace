import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded.id)
        req.user = await User.findById(decoded.id);
        next()
    } catch (err) {
        console.error(err)
        res.status(401)
        throw new Error('Not authorized, new ')
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
})

export { protect }