const Student = require('../Models/Student')
const {StatusCodes} = require('http-status-codes')
const { createUserToken } = require('../Utils/CreateUserToken')

const Signup = async(req,res)=>{
    const {name, email, password} = req.body
    try{
        if(!name || !email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({
                "message":"Please provide all name, email and password fields."
            })
        }
        else{
            const alreadyExistedStudent = await Student.findOne({
                email : email
            })
            if(alreadyExistedStudent){
                return res.status(StatusCodes.BAD_REQUEST).json({
                    "message":"Email is already used, Please try different one."
                })
            }
            else{
                const student = await Student.create({
                    name : name,
                    email : email,
                    password : password
                })
                const token = await createUserToken(student)
                return res.status(StatusCodes.OK).json({
                    user : {
                        id : student._id,
                        name : student.name,
                        email : student.email,
                        token : token
                    }
                })
            }
        }
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            'message':"Some error occured during registering student"
        })
    }
}

const Login = async(req,res) =>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(StatusCodes.BAD_REQUEST).json({
            "message":"Please provide both email and password fields."
        })
    }
    else{
        const student = await Student.findOne({
            email : email
        })
        if(!student){
            res.status(StatusCodes.BAD_REQUEST).json({
                "message":"No student with this email"
            })
        }
        else{
            const isPasswordCorrect = await student.ComparePassword(password)
            if(!isPasswordCorrect){
                res.status(StatusCodes.UNAUTHORIZED).json({
                    "message":"Incorrect credentials..!!"
                })
            }
            else{
                const token = await createUserToken(student)
                res.status(StatusCodes.OK).json({
                    user : {
                        id : student._id,
                        name : student.name,
                        email : student.email,
                        token : token
                    }
                })
            }
        }
    }
}

module.exports = {
    Signup,
    Login
}