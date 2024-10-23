const AuthenticationServices = require('../services/authentication.services');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // For password hashing

// Function to sign up
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user data with hashed password
        let user = await AuthenticationServices.storeUserData(email, hashedPassword);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Error creating account'
            });
        }

        // Generate JWT Token after successful signup
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            "HELLOWORLD", // Secret Key
            { expiresIn: '1h' } // Token expiration time
        );

        return res.status(200).json({
            success: true,
            message: 'Account created successfully',
            token: token // Send the JWT token to the client
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Function to login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fetch the user by email
        let user = await AuthenticationServices.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            "HELLOWORLD", // Secret Key
            { expiresIn: '1h' } // Token expiration time
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token // Send JWT token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Function to logout
exports.logout = (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Logout successful. Please clear the token from your client.'
    });
};


// Function to access the dashboard (protected route)
exports.dashboard = async (req, res) => {
    try {
        // req.user is populated by the verifyToken middleware
        const user = req.user;

        return res.status(200).json({
            success: true,
            message: `Welcome to your dashboard, ${user.email}`,
            user: user // You can send back more detailed user info if needed
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};