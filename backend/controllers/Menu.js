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
        if(!name || !category || price==null)
        {
            return res.status(400).json({
                success: false,
                message: "Name, category, and price are required.",
            });
        }
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

const updateMenuItem=async(req,res)=>{
    try{
        const itemId=req.params.id
        const {name,category,price,availability}=req.body
        const updatedMenuItem=await Menu.findByIdAndUpdate(itemId,{name,category,price,availability},{new:true});

        if(!updatedMenuItem)
        {
            return res.status(404).json({
                success:false,
                message:"Menu item not found"
            })
        }

        return res.status(200).json({
            success:true,
            updatedMenuItem,
            message:"Menu item updated successfully!"
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:`Error updating menu item - ${err.message}`
        })
    }
}

const deleteMenuItem=async(req,res)=>{
    try{
        const itemId=req.params.id
        const deletedMenuItem=await Menu.findByIdAndDelete(itemId)
        if(!deletedMenuItem)
        {
            return res.status(404).json({
                success:false,
                message:"Menu Item not found"
            })
        }

        return res.status(200).json({
            success:true,
            deletedMenuItem,
            message:"Menu item deleted successfully!"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`Error deleting menu item - ${err.message}`
        })
    }
}
module.exports={getAllMenu,addMenuItem,updateMenuItem,deleteMenuItem}
