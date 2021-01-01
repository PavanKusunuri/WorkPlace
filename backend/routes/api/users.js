const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const config = require("config");
const { check, validationResult } = require('express-validator/check');

const User = require("../../models/userModel.js");



module.exports = router;