const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Job = require('../../models/Job');
const Application = require('../../models/Application');
const Organization = require('../../models/Organization');
const orgAuth = require('../../middleware/orgAuth');
const auth = require('../../middleware/auth');

// ─── @route  POST /api/jobs ───────────────────────────────────────────────────
// @desc  Post a new job
// @access Private (org)
router.post(
  '/',
  orgAuth,
  [
    check('title', 'Job title is required').notEmpty(),
    check('description', 'Job description is required').notEmpty(),
    check('jobType', 'Job type is required').notEmpty(),
    check('workMode', 'Work mode is required').notEmpty(),
    check('location', 'Location is required').notEmpty(),
    check('noticePeriod', 'Notice period is required').notEmpty(),
    check('experienceRequired', 'Experience required is required').notEmpty(),
    check('skills', 'At least one skill is required').isArray({ min: 1 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      jobType,
      workMode,
      location,
      salary,
      noticePeriod,
      experienceRequired,
      skills,
      openings,
      applicationDeadline
    } = req.body;

    try {
      const job = new Job({
        organization: req.org.id,
        title,
        description,
        jobType,
        workMode,
        location,
        salary: salary || { min: 0, max: 0, currency: 'USD', period: 'year' },
        noticePeriod,
        experienceRequired,
        skills,
        openings: openings || 1,
        applicationDeadline: applicationDeadline || null
      });

      await job.save();
      const populated = await Job.findById(job._id).populate('organization', [
        'name',
        'logo',
        'industry',
        'location'
      ]);
      res.json(populated);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// ─── @route  GET /api/jobs ────────────────────────────────────────────────────
// @desc  Get all open jobs (with optional filters via query params)
// @access Public
router.get('/', async (req, res) => {
  try {
    const filter = { status: 'Open' };
    if (req.query.jobType) filter.jobType = req.query.jobType;
    if (req.query.workMode) filter.workMode = req.query.workMode;
    if (req.query.location) filter.location = new RegExp(req.query.location, 'i');

    const jobs = await Job.find(filter)
      .populate('organization', ['name', 'logo', 'industry', 'location'])
      .sort({ datePosted: -1 });

    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ─── @route  GET /api/jobs/org ────────────────────────────────────────────────
// @desc  Get all jobs posted by the authenticated organization
// @access Private (org)
router.get('/org', orgAuth, async (req, res) => {
  try {
    const jobs = await Job.find({ organization: req.org.id }).sort({
      datePosted: -1
    });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ─── @route  GET /api/jobs/:id ────────────────────────────────────────────────
// @desc  Get single job
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('organization', [
      'name',
      'logo',
      'industry',
      'location',
      'website',
      'description',
      'employeesCount',
      'establishedYear'
    ]);
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ─── @route  PUT /api/jobs/:id ────────────────────────────────────────────────
// @desc  Update a job posting
// @access Private (org)
router.put('/:id', orgAuth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.organization.toString() !== req.org.id) {
      return res.status(403).json({ msg: 'Not authorized to edit this job' });
    }

    const updatableFields = [
      'title', 'description', 'jobType', 'workMode', 'location',
      'salary', 'noticePeriod', 'experienceRequired', 'skills',
      'openings', 'applicationDeadline', 'status'
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) job[field] = req.body[field];
    });

    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ─── @route  DELETE /api/jobs/:id ─────────────────────────────────────────────
// @desc  Delete a job posting
// @access Private (org)
router.delete('/:id', orgAuth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.organization.toString() !== req.org.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this job' });
    }

    await Promise.all([
      Job.findByIdAndDelete(req.params.id),
      Application.deleteMany({ job: req.params.id })
    ]);

    res.json({ msg: 'Job deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ──────────────────────── APPLICATION ROUTES ──────────────────────────────────

// ─── @route  POST /api/jobs/:id/apply ─────────────────────────────────────────
// @desc  Apply to a job (developer)
// @access Private (user)
router.post(
  '/:id/apply',
  auth,
  [check('coverLetter', 'Cover letter is required').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ msg: 'Job not found' });
      if (job.status !== 'Open') {
        return res.status(400).json({ msg: 'This job is no longer accepting applications' });
      }

      const existing = await Application.findOne({
        job: req.params.id,
        applicant: req.user.id
      });
      if (existing) {
        return res.status(400).json({ msg: 'You have already applied to this job' });
      }

      const application = new Application({
        job: req.params.id,
        applicant: req.user.id,
        organization: job.organization,
        coverLetter: req.body.coverLetter,
        resumeUrl: req.body.resumeUrl || ''
      });

      await application.save();

      const populated = await Application.findById(application._id)
        .populate('job', ['title', 'jobType', 'location'])
        .populate('applicant', ['name', 'avatar']);

      res.json(populated);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ msg: 'You have already applied to this job' });
      }
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// ─── @route  GET /api/jobs/:id/applications ───────────────────────────────────
// @desc  Get all applications for a specific job (org view)
// @access Private (org)
router.get('/:id/applications', orgAuth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.organization.toString() !== req.org.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const applications = await Application.find({ job: req.params.id })
      .populate('applicant', ['name', 'avatar', 'email'])
      .sort({ dateApplied: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ─── @route  GET /api/jobs/applications/org ───────────────────────────────────
// @desc  Get all applications across all jobs for the org
// @access Private (org)
router.get('/applications/org', orgAuth, async (req, res) => {
  try {
    const applications = await Application.find({ organization: req.org.id })
      .populate('job', ['title', 'jobType', 'location', 'status'])
      .populate('applicant', ['name', 'avatar', 'email'])
      .sort({ dateApplied: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ─── @route  GET /api/jobs/applications/me ────────────────────────────────────
// @desc  Get all applications the current developer has made
// @access Private (user)
router.get('/applications/me', auth, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', ['title', 'jobType', 'location', 'status'])
      .populate('organization', ['name', 'logo'])
      .sort({ dateApplied: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ─── @route  PUT /api/jobs/applications/:appId/status ─────────────────────────
// @desc  Update application status (org action)
// @access Private (org)
router.put('/applications/:appId/status', orgAuth, async (req, res) => {
  const { status, orgNotes } = req.body;
  const validStatuses = ['Pending', 'Under Review', 'Shortlisted', 'Rejected', 'Accepted'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ msg: 'Invalid status value' });
  }

  try {
    const app = await Application.findById(req.params.appId);
    if (!app) return res.status(404).json({ msg: 'Application not found' });

    if (app.organization.toString() !== req.org.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    app.status = status;
    if (orgNotes !== undefined) app.orgNotes = orgNotes;
    await app.save();

    res.json(app);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
