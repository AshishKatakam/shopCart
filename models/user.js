const mongoose=require('mongoose');
const Product=require('./product');
// const passport=require('passport');
const passportLocalMongoose=require('passport-local-mongoose');
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    contactnumber:{
        type:String,
        required:true
    },
    amount:{
        type:Number
    },
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
});
userSchema.plugin(passportLocalMongoose);
const User=new mongoose.model('User',userSchema);
module.exports=User;