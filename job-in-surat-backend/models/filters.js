const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  jobCategory: {
    type: [String], 
    required: true
  },
  salaryRanges: {
    type: [], 
    required: true
  },
  experienceLevels: {
    type: [String],
    required: true
  },
  genders: {
    type: [String],
    required: true
  },
  qualifications: {
    type: [String],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Filter', filterSchema);
