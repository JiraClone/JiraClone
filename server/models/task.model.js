const mongoose = require('mongoose');
const { User } = require('./user.model');
const {Message} = require('./message.model');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description:{
        type: String
    },
    comments:{
        type: [Message]
    },
    type:{
        type: String
    },
    dueDate:{
        type: Date
    },
    priority:{
        type: String
    },
    assignee:{
        type: User
    },
    creator:{
        type: User
    },
    estimate:{
        type: Number
    },
    timeTracked:{
        type: Number
    },
    labels:{
        type: String
    },
    status:{
        type: String
    },
}, {timestamps: true});

module.exports.Task = mongoose.model('Task', TaskSchema);