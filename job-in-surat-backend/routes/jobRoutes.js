const express = require('express');
const { createJob, getJobs, getJobFilters, getJobsDetails, getJobsDetailsQuery, getJobsCategory, getTopJobCompanies } = require('../controllers/jobController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getJobs);
router.get('/filters', getJobFilters);
router.get('/categories', getJobsCategory);
router.get('/top-job-company', getTopJobCompanies);

router.post('/create-job', authenticate, createJob);
router.post('/job-details', getJobsDetails);
router.post('/job-details-filter', getJobsDetailsQuery);

module.exports = router;
