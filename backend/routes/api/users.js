const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const config = require("config");
const { check, validationResult } = require('express-validator/check');
const { registerUser } = require("../../controllers/userController")
const User = require("../../models/userModel.js");

router.route('/').post(registerUser);


module.exports = router;