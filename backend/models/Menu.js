const mongoose=require('mongoose')

const Menuschema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        availability:{
            type:Boolean,
            default:true,
        },
        
    }
)

module.exports=mongoose.model('Menu',Menuschema)