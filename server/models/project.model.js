const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    tasks:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    users:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    dueDate:{
        type: Date
    }
}, {timestamps: true});

module.exports.Project = mongoose.model('Project', ProjectSchema);