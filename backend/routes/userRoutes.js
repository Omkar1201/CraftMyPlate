const express=require('express')
const router=express.Router()

const {auth}=require('../middleware/auth')
const {register,login}=require('../controllers/Auth')
const {getAllMenu,addMenuItem,updateMenuItem,deleteMenuItem}=require('../controllers/Menu')
const {placeOrder}=require('../controllers/Order')

router.post('/register',register)
router.post('/login',login)

router.get('/menu',auth,getAllMenu)
router.post('/menu',auth,addMenuItem)
router.put('/menu/:id',auth,updateMenuItem)
router.delete('/menu/:id',auth,deleteMenuItem)

router.post('/order',auth,placeOrder)

router.get('/',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        username:req.user.username,
        message:"You are verified"
    })
})

module.exports=router