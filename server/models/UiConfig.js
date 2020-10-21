const mongoose = require('mongoose');

const uiConfigSchema = new mongoose.Schema({
    department: {
        type: [String],
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    userRole: {
        type: [String],
        required: true,
    }
});

const UiConfig = mongoose.model('UiConfig', uiConfigSchema);

module.exports = UiConfig;