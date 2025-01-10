const mongoose=require('mongoose')
const User=require('./User')
const Menu=require('./Menu')
const Orderschema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        items:[{
            menuitemId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Menu'
            },
            quantity:{
                type:Number,
                required:true
            }
        }],
        totalAmount:{
            type:Number,
            required:true
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed'],
            default: 'Pending'
        },
        
    },{timestamps:true}
)
module.exports=mongoose.model('Order',Orderschema)