import asyncHandler from 'express-async-handler'
import Profile from '../models/profileModel.js';
import User from '../models/userModel.js';

// const Profile = require("../../models/profileModel.js");
// const User = require("../../models/userModel.js");

// @route  GET api/profile/me
// @desc   Get current users Profile
// @access Public

// const registerUser =  => {

const getUserProfileDetails = asyncHandler(async (req, res) => {
    console.log("Get user Details is being calledd...")
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate("user", ["name", "avatar"]);

        console.log("Profile"+ profile)

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }

        res.json(profile);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});


// @route  POST api/profile/me
// @desc   Create or Update user Profile
// @access Private

const updateProfileDetails = asyncHandler(async (req, res) => {


    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = req.body;

    //  Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Build Social Object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {

            //    Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile);
        }

        else {

        //    Create
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
        }
    } catch (err) {
        console.log("Error"+ error)
        res.status(500).send("Server Error");
    }
}
);



// @route GET  api/profile
// @desc  GET all  profile
// @access Private

const getAllRegisterUsers = asyncHandler(async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "avatar"]);
        res.json(profiles);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});


// @route  GET api/profile/user/:user_id
// @desc   GET profile by user ID
// @access Public

const getUserProfileById = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate("user", ["name", "avatar"]);

        if (!profile)
            return res.status(400).json({ msg: "There is no profile for this user" });

        res.json(profile);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});



// @route DELETE api/profile
// @desc  Delete profile, user & posts
// access Private
const deleteProfile = asyncHandler(async (req, res) => {
    try {
        // remove user posts
        await this.post.deleteMany({ user: req.user.id });
        // remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // remove user
        await User.findByIdAndRemove({ _id: req.user.id });
        res.json({ msg: "User deleted" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});


// @route  PUT api/profile/experience
// @desc   Add Profile experience
// @access Private

const addWorkExperience = asyncHandler(async (req, res) => {

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}
);



// @route  DELETE api/profile/experience/:exp_id
// @desc   DELETE experience from profile
// @access Private
const deleteWorkExperience = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get Remove Index
        const removeIndex = profile.experience
            .map((item) => item.id)
            .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});


// @route  PUT api/profile/education
// @desc   Add Profile education
// @access Private

const updateEducationDetails = asyncHandler(async (req, res) => {


    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}
);




// @route  DELETE api/profile/education/:exp_id
// @desc   DELETE education from profile
// @access Private
const deleteEducationDetails = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get Remove Index
        const removeIndex = profile.education
            .map((item) => item.id)
            .indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});



// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access Public

const getUserRepositories = asyncHandler(async (req, res) => {

    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos
            ?per_page=5&sort=created:asc&client_id=${config.get(
                "githubClientId"
            )}&client_secret=${config.get("githubSecret")}`,
            method: "GET",
            headers: { "user-agent": "node.js" },
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: "No Github profile found" });
            }

            res.json(JSON.parse(body));
        });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});


export {
    getUserRepositories,
    deleteEducationDetails,
    updateEducationDetails,
    deleteWorkExperience,
    addWorkExperience,
    deleteProfile,
    getUserProfileById,
    getAllRegisterUsers,
    getUserProfileDetails,
    updateProfileDetails
}