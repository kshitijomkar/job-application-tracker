const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  interviewDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview Scheduled', 'Rejected', 'Accepted'],
    default: 'Applied'
  },
  notes: {
    type: String
  },
  resume: {
    type: String // Could be a file path or Cloudinary URL later
  },
  coverLetter: {
    type: String
  }
});

module.exports = mongoose.model('Job', jobSchema);
