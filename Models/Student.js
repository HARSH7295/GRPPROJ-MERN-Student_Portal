const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require('bcryptjs')

const StudentSchema = mongoose.Schema({
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

// setting hased password
StudentSchema.pre('save',async function(next){
    if(this.isModified('password')){
        // generating salt
        const salt =await bcrypt.genSalt(10)
        
        //setting hashed password
        this.password = await bcrypt.hash(this.password,salt)
    }
    next()
})


// instance method -- compare password
StudentSchema.methods.ComparePassword = async function(enteredPassword){
    const isMatched = await bcrypt.compare(enteredPassword,this.password)
    return isMatched
}

const StudentModel = mongoose.model('Student',StudentSchema)

module.exports = StudentModel