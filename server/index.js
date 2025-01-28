const express = require("express"); 
const cors = require("cors");
require('dotenv').config()
const connectDB = require("./config/connectDB");
const router = require("./routes/index");

const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.use(express.json());

const PORT = process.env.PORT || 8080       //in this situation port env is not their so 8080 port run 

app.get('/',(request,response)=>{
    response.json({
        message : "server is running at" + PORT
    })
})

app.use('/api',router)              //in top http://localhost:8080/api/register uder api we can use multiple routes

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server running at " + PORT)
    })
})
