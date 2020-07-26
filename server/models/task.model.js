const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
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
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    estimate:{
        type: Number
    },
    timeTracked:{
        type: Number
    },
    labels:[
        {
            type: Schema.Types.ObjectId,
            ref: "Label"
        }
    ],
    status:{
        type: String
    },
}, {timestamps: true});

module.exports.Task = mongoose.model('Task', TaskSchema);