const mongoose = require('mongoose')
const validator = require("validator")

const TeacherSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please provide name"],
        minLength : [3, "Name must be longer than 2 characters"],
        maxLength : [50, "Name must be shorter than 50 characters"]
    },
    email : {
        type : String,
        required : [true, "Please provide email"],
        validate : {
            validator : validator.isEmail,
            message : "Please provide valid email."
        },
        unique : [true, "Email is already used, Try different one."]
    },
    password : {
        type : String,
        required : [true,"Please provide password"],
        minLength : [8,"Password must be longer than 7 characters"]
    }
})

const TeacherModel = mongoose.model('Student',TeacherSchema)

module.exports = TeacherModel