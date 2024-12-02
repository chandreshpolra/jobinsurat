const express = require('express');
const { createCompany, getCompanyInfo } = require('../controllers/companyController');
const { sendMailToClient } = require('../controllers/sendMailController');
const { authenticate } = require('../middlewares/authMiddleware');
const 
router = express.Router();

router.get('/company-info', authenticate, getCompanyInfo);

router.post('/create-company', authenticate, createCompany);

router.post('/apply-for-job', authenticate, sendMailToClient);

module.exports = router;
