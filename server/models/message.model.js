const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { User } = require('./user.model');

const MessageSchema = new mongoose.Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Sender is required"]
    },
    message:{
        type: String
    },
}, {timestamps: true});

module.exports.Message = mongoose.model('Message', MessageSchema);