const Order=require('../models/Order')
const Menu=require('../models/Menu')
const placeOrder=async(req,res)=>{
    try{
        const userId=req.user.user_id
        const {items}=req.body
        
        const menuItems = await Menu.find({ '_id': { $in: items.map(item => item.menuItemId) } });

        if (menuItems.length !== items.length) {
            return res.status(400).json({ 
                success:false,
                message: 'One or more menu items not found' 
            });
        }

        let totalAmount = 0;
        items.forEach(item => {
            const menuItem = menuItems.find(menu => menu._id.toString() === item.menuItemId);
            totalAmount += menuItem.price * item.quantity;
        });

        await Order.create({userId,items,totalAmount})

        return res.status(200).json({
            success:true,
            menuItems,
            totalAmount,
            message:"Order placed succesully!"
        })
                
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`Error Placing order - ${err.message}`
        })
    }
}

module.exports={placeOrder}
