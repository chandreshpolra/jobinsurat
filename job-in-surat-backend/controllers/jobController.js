const Job = require('../models/Job');
const Filter = require('../models/filters');
const cloudinary = require('cloudinary').v2;
const ApiResponse = require('../utils/ApiResponse');


exports.createJob = async (req, res) => {
  try {
    req.body.experience = JSON.parse(req.body.experience);
    const createdJobObj = { ...req.body, ...{ postedBy: req.user.id } };
    const job = new Job(createdJobObj);
    await job.save();
    return res.status(201).json(new ApiResponse(201, { job }, "Job created successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'username').populate('companyId', 'companyLogo companyName companyAddress companyEmail companyPhone');
    return res.status(200).json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};

exports.getJobsDetails = async (req, res) => {
  try {
    const job = await Job.findById(req.body.id).populate('postedBy', 'username').populate('companyId', 'companyLogo companyName companyAddress companyEmail companyPhone');
    return res.status(200).json(new ApiResponse(200, job, "Jobs details fetched successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};

exports.getJobsDetailsQuery = async (req, res) => {
  try {
    const { category, type, salary, experience, genders, qualification, query } = req.body;
    let filter = {};
    if (category && category.length > 0) {
      filter.category = {
        $in: category.map(cat => new RegExp(cat, 'i'))
      };
    }
    if (type && type.length > 0) {
      filter.type = {
        $in: type.map(cat => new RegExp(cat, 'i'))
      };
    }
    if (salary) {
      filter.salary = { $gte: Number(salary) };
    }
    if (genders) {
      filter.genders = genders;
    }
    if (qualification) {
      filter.qualification = qualification;
    }
    
    if (experience || experience == 0) {
      filter['experience.max'] = { $lte: experience };
    }

    if (query) {
      filter = {
        $or: [
          { title: { $regex: new RegExp(query, 'i') }  },
          { companyName: { $regex: new RegExp(query, 'i') }  },
          { category: { $regex: new RegExp(query, 'i') }  },
          { genders: { $regex: new RegExp(query, 'i') }  },
        ]
      };
    }

    if (experience && experience == 5) {
      filter['experience.max'] = experience;
    } else if (experience || experience == 0) {
      filter['experience.max'] = { $lte: experience };
    }
    
    const jobs = await Job.find(filter).populate('companyId', 'companyLogo companyName companyAddress companyEmail companyPhone');
    return res.status(200).json(new ApiResponse(200, jobs, "Jobs details fetched successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};

exports.getJobFilters = async (req, res) => {
  try {
    const storeFilter = await Filter.find();
    return res.status(200).json(new ApiResponse(200, storeFilter[0], "Filter fetched successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};

exports.getJobsCategory = async (req, res) => {
  try {
    const category = await Job.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1
        }
      }
    ]);
    return res.status(200).json(new ApiResponse(200, category, "Categories fetched successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};

exports.getTopJobCompanies = async (req, res) => {
  try {
    const companies = await Job.find({}, 'companyId').limit(4).populate('companyId', 'companyLogo companyName');
    return res.status(200).json(new ApiResponse(200, companies, "Companies fetched successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};


// Data to be added
const filterData = {
  jobCategory: [
    "Driver", "Delivery", "Warehouse Logistics", "Manufacturing", "Peon",
    "Housekeeping", "Security Guard", "Painter", "LabourHelper", "Technician",
    "Refrigerator AC Technician", "Beautician", "Cook Chef", "Waiter Steward",
    "Ward Boy", "Nurse Compounder", "Lab Technician Pharmacist", "Trainer",
    "Event Management", "Back Office Data Entry", "Telesales Telemarketing",
    "Customer Support TeleCaller", "Sales Business Development", "Digital Marketing",
    "Marketing", "Content Writer", "Field Sales", "Retail Counter Sales",
    "Cashier", "Recruiter HR Admin", "Receptionist", "Teacher Tutor",
    "Video Editor", "Graphic Web Designer", "IT Hardware Network Engineer",
    "Electrician", "Carpenter", "Plumber", "Mechanic",
    "Architect Interior Designer", "Fashion Designer", "Legal", "Accountant"
  ],
  salaryRanges: [5000, 10000, 20000, 30000, 40000, 50000],
  experienceLevels: ["Freshers", "1", "2", "3", "4", "5"],
  genders: ["Jobs for Women", "Jobs for Men", "All genders"],
  qualifications: ["All Education levels", "10th Pass", "12th Pass", "Diploma", "Graduate", "Post Graduate"]
};

// Save the data to the collection
const addFilterData = async () => {
  try {
    const newFilter = new Filter(filterData);
    await newFilter.save();
    console.log('Filter data added successfully');
  } catch (error) {
    console.error('Error adding filter data:', error);
  }
};

// Call the function to add data
//   addFilterData();