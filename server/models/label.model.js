const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
    label:{
        type: String,
        required: [true, "Label is required"]
    },
}, {timestamps: true});

module.exports.Label = mongoose.model('Label', LabelSchema);