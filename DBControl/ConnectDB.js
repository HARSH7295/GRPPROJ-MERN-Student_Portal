const mongoose = require('mongoose')

const CoonectDB = async(url) =>{
    return mongoose.connect(url,{
        useNewUrlParser : true,
    })
}

module.exports = CoonectDB

// takes url and finds db and connect to it.