const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'name',
      'avatar',
      'followers',
      'following'
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      }).populate('user', ['name', 'avatar']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      // Attach followers/following from the User model so the frontend can render follow state
      const user = await User.findById(user_id).select(
        'followers following followRequests'
      );
      const profileObj = profile.toObject();
      profileObj.user = {
        ...profileObj.user,
        followers: user ? user.followers : [],
        following: user ? user.following : [],
        followRequests: user ? user.followRequests : []
      };

      return res.json(profileObj);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id })
    ]);

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  '/experience',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('company', 'Company is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  auth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldofstudy', 'Field of study is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});

// @route    PUT api/profile/follow/:user_id
// @desc     Follow a user (or send request if profile is private)
// @access   Private
router.put(
  '/follow/:user_id',
  auth,
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      if (req.params.user_id === req.user.id) {
        return res.status(400).json({ msg: 'You cannot follow yourself' });
      }

      const targetUser = await User.findById(req.params.user_id);
      const currentUser = await User.findById(req.user.id);

      if (!targetUser) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Check if already following
      const alreadyFollowing = targetUser.followers.some(
        (f) => f.user.toString() === req.user.id
      );
      if (alreadyFollowing) {
        return res
          .status(400)
          .json({ msg: 'You are already following this user' });
      }

      // Check if request already sent
      const alreadyRequested = targetUser.followRequests.some(
        (r) => r.user.toString() === req.user.id
      );
      if (alreadyRequested) {
        return res.status(400).json({ msg: 'Follow request already sent' });
      }

      // Check target profile privacy
      const targetProfile = await Profile.findOne({ user: req.params.user_id });
      const isPrivate = targetProfile && targetProfile.isPrivate;

      if (isPrivate) {
        // Send follow request instead of directly following
        targetUser.followRequests.unshift({ user: req.user.id });
        await targetUser.save();
        return res.json({
          requested: true,
          followRequests: targetUser.followRequests
        });
      }

      // Public profile — follow directly
      targetUser.followers.unshift({ user: req.user.id });
      currentUser.following.unshift({ user: req.params.user_id });

      await targetUser.save();
      await currentUser.save();

      return res.json({
        followers: targetUser.followers,
        following: currentUser.following
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/profile/unfollow/:user_id
// @desc     Unfollow a user
// @access   Private
router.put(
  '/unfollow/:user_id',
  auth,
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      if (req.params.user_id === req.user.id) {
        return res.status(400).json({ msg: 'You cannot unfollow yourself' });
      }

      const targetUser = await User.findById(req.params.user_id);
      const currentUser = await User.findById(req.user.id);

      if (!targetUser) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Check if actually following
      const isFollowing = targetUser.followers.some(
        (f) => f.user.toString() === req.user.id
      );
      if (!isFollowing) {
        return res.status(400).json({ msg: 'You are not following this user' });
      }

      // Remove from target's followers
      targetUser.followers = targetUser.followers.filter(
        (f) => f.user.toString() !== req.user.id
      );
      // Remove from current user's following
      currentUser.following = currentUser.following.filter(
        (f) => f.user.toString() !== req.params.user_id
      );

      await targetUser.save();
      await currentUser.save();

      return res.json({
        followers: targetUser.followers,
        following: currentUser.following
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile/followers/:user_id
// @desc     Get followers of a user
// @access   Private
router.get(
  '/followers/:user_id',
  auth,
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id)
        .populate('followers.user', ['name', 'avatar'])
        .select('-password');

      if (!user) return res.status(404).json({ msg: 'User not found' });

      res.json(user.followers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile/following/:user_id
// @desc     Get users that user_id is following
// @access   Private
router.get(
  '/following/:user_id',
  auth,
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id)
        .populate('following.user', ['name', 'avatar'])
        .select('-password');

      if (!user) return res.status(404).json({ msg: 'User not found' });

      res.json(user.following);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile/follow-requests
// @desc     Get current user's incoming follow requests
// @access   Private
router.get('/follow-requests', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('followRequests.user', ['name', 'avatar'])
      .select('-password');

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user.followRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/accept-request/:user_id
// @desc     Accept a follow request
// @access   Private
router.put(
  '/accept-request/:user_id',
  auth,
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      const currentUser = await User.findById(req.user.id);
      const requester = await User.findById(req.params.user_id);

      if (!requester) return res.status(404).json({ msg: 'User not found' });

      // Check the request exists
      const requestExists = currentUser.followRequests.some(
        (r) => r.user.toString() === req.params.user_id
      );
      if (!requestExists) {
        return res
          .status(400)
          .json({ msg: 'No follow request from this user' });
      }

      // Remove from followRequests
      currentUser.followRequests = currentUser.followRequests.filter(
        (r) => r.user.toString() !== req.params.user_id
      );

      // Add to followers/following
      currentUser.followers.unshift({ user: req.params.user_id });
      requester.following.unshift({ user: req.user.id });

      await currentUser.save();
      await requester.save();

      res.json({
        followRequests: currentUser.followRequests,
        followers: currentUser.followers
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/profile/reject-request/:user_id
// @desc     Reject a follow request
// @access   Private
router.put(
  '/reject-request/:user_id',
  auth,
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      const currentUser = await User.findById(req.user.id);

      // Remove from followRequests
      currentUser.followRequests = currentUser.followRequests.filter(
        (r) => r.user.toString() !== req.params.user_id
      );

      await currentUser.save();

      res.json({ followRequests: currentUser.followRequests });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/profile/cancel-request/:user_id
// @desc     Cancel an outgoing follow request
// @access   Private
router.put(
  '/cancel-request/:user_id',
  auth,
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      const targetUser = await User.findById(req.params.user_id);

      if (!targetUser) return res.status(404).json({ msg: 'User not found' });

      targetUser.followRequests = targetUser.followRequests.filter(
        (r) => r.user.toString() !== req.user.id
      );

      await targetUser.save();

      res.json({
        msg: 'Follow request cancelled',
        followRequests: targetUser.followRequests
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
