const jwt = require('jsonwebtoken')

const SECRET_KEY = "harsh@savan@6519@7295@project"

const createUserToken = async(user)=>{
    const token = await jwt.sign({data : user},SECRET_KEY,{expiresIn : '5h'})
    return token
}

module.exports = {
    createUserToken
}