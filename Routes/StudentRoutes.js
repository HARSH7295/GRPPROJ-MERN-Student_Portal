
const express = require('express')

const Router = express.Router()

const {Signup,Login} = require('../Controllers/StudentController')

Router.route('/signup').post(Signup)
Router.route('/login').post(Login)

module.exports = Router