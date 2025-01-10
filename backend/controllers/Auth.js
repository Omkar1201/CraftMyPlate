const User=require('../models/User')
const bcrypt=require('bcrypt')

const register=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const isUserPresent=User.findOne({username})
        if(isUserPresent)
        {
            res.satus(409).json({
                success:false,
                message:"User is already present"
            })
        }
        
        // create hash        
        let hashdpassword;
        try{
            hashdpassword=bcrypt.hash(password,10);
        }
        catch(err)
        {
            res.status(500).json({
                success:false,
                message:`Unable to create hash of password - ${err.message}`
            })
        }
        
        await User.create({username,password:hashdpassword})
        res.status(200).json({
            success:true,
            message:"Registration successfull"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}