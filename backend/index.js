const express=require('express')
const app=express();
const cookieParser = require('cookie-parser');
const cors=require('cors')
require('dotenv').config()

const connnectDB=require('./config/database')

const corsOptions={
    origin:[`${process.env.BASE_URL}`],
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

const userRoutes=require('./routes/userRoutes')
app.use('/api/v1/',userRoutes)


app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.listen(process.env.PORT || 3000,() =>{
    console.log(`Listening at Port ${process.env.PORT}`)
})

connnectDB()