const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: ''
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  establishedYear: {
    type: Number,
    required: true
  },
  employeesCount: {
    type: String,
    enum: ['1–10', '11–50', '51–200', '201–500', '501–1000', '1000+'],
    required: true
  },
  website: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    required: true
  },
  socialLinks: {
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('organization', OrganizationSchema);
