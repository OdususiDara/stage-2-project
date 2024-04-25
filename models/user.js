const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[ true, 'Please provide a username'],
        unique:true
    },
    email: {
    type: String,
    required: [ true, 'Please provide an email']
    },
    password:{
        type: String,
        required: [ true, 'Please provide a password']
    }
})
module.exports = mongoose.model("User", userSchema)