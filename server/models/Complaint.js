const mongoose = require('mongoose');
const shortid = require('shortid');
const moment = require('moment');


const complaintSchema = new mongoose.Schema({
    complaintId: {
        type: String,
        default: shortid.generate
    },
    concern: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    issueTitle: {
        type: String,
        required: true
    },
    lockedBy: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        default: 'Not Updated Yet'
    },
    email: {
        type: String,
        required: true
    },
    attachement: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        required: true
    },
    estimatedTime: {
        type: String,
        default: 'Not Updated Yet'
    },
    createdOn: {
        type: Date,
        default: moment.now
    },
    updatedOn: {
        type: Date,
        default: ''
    },
    comments: {
        type: [Object]
    }
});
// enum checking
complaintSchema.path('status').options.enum;

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;