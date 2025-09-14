const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'First name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    userType:{
        type: String,
        enum: ['guest', 'host'],
        default: 'guest'
    },
    favourites: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Home', 
    }],
    host: [{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'Home'
    }]

});



module.exports = mongoose.model('User', userSchema);