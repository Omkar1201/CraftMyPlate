const express=require('express')
const router=express.Router()

const {auth}=require('../middleware/auth')
const {register,login}=require('../controllers/Auth')

router.post('/register',register)
router.post('/login',login)

router.get('/',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        username:req.user.username,
        message:"You are verified"
    })
})

module.exports=router