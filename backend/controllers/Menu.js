const { default: mongoose } = require('mongoose');
const Menu=require('../models/Menu');

const getAllMenu=async(req,res)=>{
    try{
        const allMenuItems=await Menu.find({});
        res.status(200).json({
            success:true,
            allMenuItems,
            message:"Menu retrived successfully!"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const addMenuItem=async(req,res)=>{
    try{
        const {name,category,price,availability}=req.body
        const newMenuItem=await Menu.create({name,category,price,availability})
        return res.status(200).json({
            success:true,
            newMenuItem,
            message:"Menu Item added successfully!"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports={getAllMenu,addMenuItem}
