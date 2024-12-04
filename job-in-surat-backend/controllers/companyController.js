const Company = require('../models/company');
const cloudinary = require('cloudinary').v2;
const ApiResponse = require('../utils/ApiResponse');


exports.createCompany = async (req, res) => {
  try {
    const file = req.files.companyLogo;
    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath).catch((error) => {
        console.log(error);
    });
    req.body.companyLogo = uploadResult.url;
    const createdCompanyObj = req.body;
    const company = new Company(createdCompanyObj);
    await company.save();
    return res.status(201).json(new ApiResponse(201, { company }, "Company created successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};

exports.getCompanyInfo = async (req, res) => {
  try {
    const company = await Company.find({}, 'companyName companyAddress companyLogo');
    return res.status(200).json(new ApiResponse(200, company, "Company fetched successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};
