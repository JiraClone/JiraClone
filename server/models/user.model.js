const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password:{
        type: String,
        required:[true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    }
}, {timestamps: true});

module.exports.User = mongoose.model('User', UserSchema);