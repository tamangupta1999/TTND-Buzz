const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        default: ''
    },
    profileUrl: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    userRole: {
        type: String,
        default: "employee",
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;