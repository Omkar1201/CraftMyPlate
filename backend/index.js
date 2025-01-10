const express=require('express')
const app=express();

const connnectDB=require('./config/database')
require('dotenv').config()

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.listen(process.env.PORT || 3000,() =>{
    console.log(`Listening at Port ${process.env.PORT}`)
})

connnectDB()