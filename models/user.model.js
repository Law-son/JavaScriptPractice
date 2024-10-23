const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userModel = db.model('User', userSchema);

module.exports = userModel;
