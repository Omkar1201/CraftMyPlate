const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const register=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const isUserPresent=await User.findOne({username})
        if(isUserPresent)
        {
            return res.status(409).json({
                success:false,
                message:"User is already present"
            })
        }

        // create hash        
        let hashdpassword;
        try{
            hashdpassword=await bcrypt.hash(password,10);
        }
        catch(err)
        {
            return res.status(500).json({
                success:false,
                message:`Unable to create hash of password - ${err.message}`
            })
        }
        
        await User.create({username,password:hashdpassword})
        return res.status(200).json({
            success:true,
            message:"Registration successful!"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const login=async(req,res)=>{
    try{
        const {username,password}=req.body
        const userData=await User.findOne({username})

        if(!userData)
        {
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        
        const isPasswordMatch=await bcrypt.compare(password,userData.password)
        console.log(userData);
        if(isPasswordMatch)
        {
            const payload={
                userId:userData._id,
                username:userData.username
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'5h'})

            return res.status(200).json({
                success:true,
                token,
                message:`Login successfull (Hi ${userData.username})`
            })
        }
        else{
            res.status(401).json({
                success:false,
                message:"Password not match"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
            
        })
    }
}

module.exports={register,login}