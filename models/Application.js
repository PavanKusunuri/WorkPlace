const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organization',
    required: true
  },
  coverLetter: {
    type: String,
    default: ''
  },
  resumeUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Shortlisted', 'Rejected', 'Accepted'],
    default: 'Pending'
  },
  orgNotes: {
    type: String,
    default: ''
  },
  dateApplied: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate applications
ApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('application', ApplicationSchema);
