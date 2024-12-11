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


    // try {
    //     const { username, password } = req.body;
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const user = new User({ username, password: hashedPassword });
    //     await user.save();
    //     return res.status(201).json(new ApiResponse(201, { user }, "User registered successfully"));
    // } catch (error) {
    //     return res.status(500).json(new ApiResponse(500, null, "Server error"));
    // }


    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user to the database
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        return res.status(201).json(new ApiResponse(201, { newUser }, "User registered successfully"));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, null, "Server error"));
    }

};

exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );


        return res.status(200).json(new ApiResponse(200, { accessToken }, "User logged in successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Server error"));
    }
};

exports.logout = (req, res) => {
    return res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
};

