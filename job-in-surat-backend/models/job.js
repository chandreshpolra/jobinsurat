const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    experience: {
        min: {
            type: Number,
            default: false
        },
        max: {
            type: Number,
            default: false
        }
    },
    vacancies: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        default: 'N/A'
    },
    genders: {
        type: String,
        required: true
    },
    jobTime: {
        type: String,
        required: true
    },
    jobDescription: {
        type: [String],
        required: true
    },
    otherDetails: {
        type: String,
        required: true
    },
    contactPerson: {
        type: String,
        required: true
    },
    interviewAddress: {
        type: String,
        required: true
    },
    jobBenefits: {
        type: String,
        required: true
    },
    asset: {
        type: String,
        required: true
    },
    faqsAboutJob: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true 
    },
    isPhoneNoShow: {
        type: Boolean,
        default: true 
    },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
