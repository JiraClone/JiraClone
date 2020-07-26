const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: String,
    comments:[
        {
            sender: String,
            message: String
        }
    ],
    type: String,
    dueDate: Date,
    priority: String,
    assignee:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    estimate: Number, 
    timeTracked: Number,
    labels: [String],
    status: String,
}, {timestamps: true});

TaskSchema.plugin(autoIncrement.plugin, {model: 'Task', field: 'number'});

module.exports.Task = mongoose.model('Task', TaskSchema);
