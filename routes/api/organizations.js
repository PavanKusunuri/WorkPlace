const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Organization = require('../../models/Organization');
const orgAuth = require('../../middleware/orgAuth');

// ─── @route  POST /api/organizations/register ────────────────────────────────
// @desc  Register a new organization
// @access Public
router.post(
  '/register',
  [
    check('name', 'Organization name is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('industry', 'Industry is required').notEmpty(),
    check('establishedYear', 'Established year is required').isNumeric(),
    check('employeesCount', 'Employees count is required').notEmpty(),
    check('location', 'Location is required').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      industry,
      establishedYear,
      employeesCount,
      website,
      description,
      location,
      socialLinks
    } = req.body;

    try {
      let org = await Organization.findOne({ email });
      if (org) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'An organization with this email already exists' }] });
      }

      org = new Organization({
        name,
        email,
        password,
        industry,
        establishedYear,
        employeesCount,
        website: website || '',
        description: description || '',
        location,
        socialLinks: socialLinks || {}
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      org.password = await bcrypt.hash(password, salt);

      await org.save();

      // Return JWT
      const payload = { org: { id: org.id } };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// ─── @route  POST /api/organizations/login ───────────────────────────────────
// @desc  Login organization
// @access Public
router.post(
  '/login',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const org = await Organization.findOne({ email });
      if (!org) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, org.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = { org: { id: org.id } };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// ─── @route  GET /api/organizations/me ───────────────────────────────────────
// @desc  Get current organization profile
// @access Private (org)
router.get('/me', orgAuth, async (req, res) => {
  try {
    const org = await Organization.findById(req.org.id).select('-password');
    if (!org) return res.status(404).json({ msg: 'Organization not found' });
    res.json(org);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ─── @route  GET /api/organizations ──────────────────────────────────────────
// @desc  Get all organizations
// @access Public
router.get('/', async (req, res) => {
  try {
    const orgs = await Organization.find().select('-password').sort({ date: -1 });
    res.json(orgs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ─── @route  GET /api/organizations/:id ──────────────────────────────────────
// @desc  Get organization by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id).select('-password');
    if (!org) return res.status(404).json({ msg: 'Organization not found' });
    res.json(org);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ─── @route  PUT /api/organizations/me ───────────────────────────────────────
// @desc  Update organization profile
// @access Private (org)
router.put(
  '/me',
  orgAuth,
  [check('name', 'Organization name is required').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      industry,
      establishedYear,
      employeesCount,
      website,
      description,
      location,
      logo,
      socialLinks
    } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (industry) updateFields.industry = industry;
    if (establishedYear) updateFields.establishedYear = establishedYear;
    if (employeesCount) updateFields.employeesCount = employeesCount;
    if (website !== undefined) updateFields.website = website;
    if (description !== undefined) updateFields.description = description;
    if (location) updateFields.location = location;
    if (logo !== undefined) updateFields.logo = logo;
    if (socialLinks) updateFields.socialLinks = socialLinks;

    try {
      const org = await Organization.findByIdAndUpdate(
        req.org.id,
        { $set: updateFields },
        { new: true }
      ).select('-password');
      res.json(org);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
