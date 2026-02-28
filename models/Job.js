const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organization',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
    required: true
  },
  workMode: {
    type: String,
    enum: ['On-site', 'Remote', 'Hybrid'],
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    period: {
      type: String,
      enum: ['year', 'month'],
      default: 'year'
    }
  },
  noticePeriod: {
    type: String,
    required: true // e.g., "Immediate", "15 days", "30 days", "60 days", "90 days"
  },
  experienceRequired: {
    type: String,
    required: true // e.g., "0–1 years", "2–4 years", "5+ years"
  },
  skills: [
    {
      type: String,
      trim: true
    }
  ],
  openings: {
    type: Number,
    default: 1,
    min: 1
  },
  applicationDeadline: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'On Hold'],
    default: 'Open'
  },
  datePosted: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('job', JobSchema);
