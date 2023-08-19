import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js';

import config from 'config'

// @route GET api/auth
// @desc  Test route
// @access Public

const getAuthentication = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        await sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(500).send("Server Error 123");
    }
})


//  @route POST api/auth
//  @desc Authenticate user & get token
//  @access Public

const postAuthenticatedUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})






// // Get token from model, create cookie and send response
// const sendTokenResponse = (user, statusCode, res) => {
//     // Create token
//     const token = user.getSignedJwtToken();

//     const options = {
//         expires: new Date(
//             Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//         ),
//         httpOnly: true,
//     };

//     if (process.env.NODE_ENV === "production") {
//         options.secure = true;
//     }

//     res.status(statusCode).cookie("token", token, options).json({
//         success: true,
//         token,
//     });
// };

export { getAuthentication, postAuthenticatedUser }