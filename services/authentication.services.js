const userModel = require('../models/user.model');

class AuthenticationServices {
    // Store user data (email and hashed password)
    static async storeUserData(email, password) {
        try {
            const user = new userModel({ email, password });
            await user.save(); // Save the user to the database
            return user;
        } catch (error) {
            console.error('Error storing user data:', error);
            return null;
        }
    }

    // Find user by email
    static async findUserByEmail(email) {
        try {
            const user = await userModel.findOne({ email }); // Search for user by email
            return user;
        } catch (error) {
            console.error('Error finding user by email:', error);
            return null;
        }
    }
}

module.exports = AuthenticationServices;
