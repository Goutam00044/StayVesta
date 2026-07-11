const mongoose = require('mongoose');

const UserSchema= mongoose.Schema(
    {
        fname: String,
        lname:String,
        email:{
            type:String, 
            required: true, 
            unique:true
        },
        password: String,
        isHost:{
            type:Boolean,
            default:false,
        }
    },
    //added this to know user from when he is hosting (Useful for analytics) 
    {
    timestamps:true
    }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;