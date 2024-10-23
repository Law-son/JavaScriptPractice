const router = require('express').Router();
const authenticationController = require('../controllers/authentication.controller');
const { verifyToken } = require('../middleware/auth.middleware'); // For protected routes

// Signup Route - to create a new user
router.post('/signup', authenticationController.signup);

// Login Route - to authenticate a user and return a JWT
router.post('/login', authenticationController.login);

// Protected Dashboard Route - user must be authenticated
router.get('/dashboard', verifyToken, authenticationController.dashboard);

// Logout Route - handle token blacklisting (if necessary)
router.post('/logout', authenticationController.logout);

module.exports = router;
