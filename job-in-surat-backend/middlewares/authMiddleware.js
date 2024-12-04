const jwt = require('jsonwebtoken');
const User = require('../models/userInfo');

exports.authenticate = (req, res, next) => {
    const token = req.cookies.accessToken; // Get access token from cookies
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = await User.findById(decoded.id);
        next();
    });
};
