const mongoose = require('mongoose');
const { User } = require('./user.model');

const MessageSchema = new mongoose.Schema({
    sender: {
        type: User,
        required: [true, "Sender is required"]
    },
    message:{
        type: String
    },
}, {timestamps: true});

module.exports.Message = mongoose.model('Message', MessageSchema);