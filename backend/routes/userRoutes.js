const express=require('express')
const router=express.Router()

const {auth}=require('../middleware/auth')
const {register,login}=require('../controllers/Auth')
const {getAllMenu,addMenuItem,updateMenuItem}=require('../controllers/Menu')

router.post('/register',register)
router.post('/login',login)

router.get('/menu',auth,getAllMenu)
router.post('/menu',auth,addMenuItem)
router.put('/menu/:id',auth,updateMenuItem)

router.get('/',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        username:req.user.username,
        message:"You are verified"
    })
})

module.exports=router