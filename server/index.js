const express = require("express"); 
const cors = require("cors");
require('dotenv').config()

const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

const PORT = process.env.PORT || 8080       //in this situation port env is not their so 8080 port run 

app.get('/',(request,response)=>{
    response.json({
        message : "server is running at" + PORT
    })
})

app.listen(PORT,()=>{
    console.log("server running at " + PORT)
})