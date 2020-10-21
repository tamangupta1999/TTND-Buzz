const mongoose = require('mongoose');
const shortid = require('shortid');
const moment = require('moment');


const buzzSchema = new mongoose.Schema({
    buzzId: {
        type: String,
        default: shortid.generate
    },
    createdBy: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    buzzMessage: {
        type: String,
        required: true
    },
    buzzImage: {
        type: [String],
        default: []
    },
    likes: {
        type: [String]
    },
    dislikes: {
        type: [String]
    },
    createdOn: {
        type: Date,
        default: moment.now
    },
    updatedOn: {
        type: Date,
        default: ''
    }
});

const Buzz = mongoose.model('Buzz', buzzSchema);

module.exports = Buzz;