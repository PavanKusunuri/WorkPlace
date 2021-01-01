import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'

// @route GET api/auth
// @desc  Test route
// @access Public

const getAuthentication = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
    } catch (err) {
        res.status(500).send("Server Error");
    }
    sendTokenResponse(user, 200, res);
})


//  @route POST api/auth
//  @desc Authenticate user & get token
//  @access Public

const postAuthenticatedUser = asyncHandler(async (req, res) => {


    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: "dentials" }] });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        res.status(500).send("Server error");
    }
}
);





// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
    });
};

export { getAuthentication, postAuthenticatedUser }