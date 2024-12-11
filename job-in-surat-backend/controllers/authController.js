const User = require('../models/userInfo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/ApiResponse');


const createAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const createRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
    // const { username, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const user = new User({ username, password: hashedPassword });
    // await user.save();
    // res.status(201).json({ message: 'User registered' });


    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        return res.status(201).json(new ApiResponse(201, { user }, "User registered successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Server error"));
    }

};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json(new ApiResponse(401, null, "Invalid credentials"));
        }

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        res.cookie('accessToken', accessToken, { httpOnly: false, secure: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: false, secure: true });

        return res.status(200).json(new ApiResponse(200, { user }, "User logged in successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Server error"));
    }
};

exports.logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
};

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(401);
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        
        const accessToken = createAccessToken(user);
        res.cookie('accessToken', accessToken, { httpOnly: false, secure: true });
        res.json({ accessToken });
    });
};
