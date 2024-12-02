const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyLogo: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyAbout: {
        type: String,
        required: true
    },
    companyFounded: {
        type: String,
        required: true
    },
    companyEmployeeCount: {
        type: String,
        required: true
    },
    companyWebsite: {
        type: String,
        required: true
    },
    companyHeadquarters: {
        type: String,
        required: true
    },
    companyType: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    companyPhone: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
