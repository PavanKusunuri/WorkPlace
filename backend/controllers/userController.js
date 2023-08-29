// const express = require("express");
// const router = express.Router();
// const gravatar = require("gravatar");
// const express = require('express');
import asyncHandler from 'express-async-handler'
// const config = require("config");
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js";

// @route   GET api/users
// @desc    Register user
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const userExists = await User.findOne({ email: email })
    if (userExists) {
        res.status(400)
        throw new Error('User already Exists')
    }
    const user = await User.create({
        firstName, lastName, email, password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

export { registerUser } 
