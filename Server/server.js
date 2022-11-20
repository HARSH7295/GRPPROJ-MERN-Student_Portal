const express = require("express")
const connectDB = require('../DBControl/ConnectDB')
const cors = require('cors')
const StudentRouter = require('../Routes/StudentRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/student',StudentRouter)


const port = 8000 || process.env.PORT 
const start = async() => {
    try{
        await connectDB("mongodb://127.0.0.1/StudentPortalDB")
        app.listen(port,()=>{
            console.log("Server is running on port : "+port)
        })
    }
    catch(error){
        console.log("Error in running server : "+error)
    }
}

start()

// testing if server is on or not
app.get('/isServerOn',(req,res)=>{
    res.json({"Message":"Server is running fine."})
})