const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true

    },
    phonenumber:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    role:{
        type: Number,
        default: 0
    },

},{timestamps: true})

module.exports = mongoose.model('users', UserSchema)