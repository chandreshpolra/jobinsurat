const express = require('express');
const { register, login, logout, refreshToken } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken); // New route for refreshing tokens

module.exports = router;
