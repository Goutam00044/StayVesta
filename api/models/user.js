const mongoose = require('mongoose');

const UserSchema= mongoose.Schema(
    {
        fname: String,
        lname:String,
        email:{type:String, required: true, unique:true},
        password: String,
    }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;