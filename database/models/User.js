const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema  ({
    username: {
        type: String,
        required: [true,'Please provide your username']
    },
    email: {
        type:String,
        required: [true,'Please provide your valid email'],
        unique:true
    },
    password: {
        type:String,
        required: [true,'Please provide your password']
    }
    
});



module.exports = mongoose.model('User' ,UserSchema);