const mongoose = require('mongoose');
const { User } = require('./user.model');
const { Task } = require('./task.model');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    tasks:{
        type: [Task]
    },
    users:{
        type: [User]
    },
    dueDate:{
        type: Date
    }
}, {timestamps: true});

module.exports.Project = mongoose.model('Project', ProjectSchema);