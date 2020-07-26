const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    tasks:{
        type: [User]
    },
    users:{
        type: [User]
    },
    dueDate:{
        type: Date
    }
}, {timestamps: true});

module.exports.Task = mongoose.model('Task', TaskSchema);