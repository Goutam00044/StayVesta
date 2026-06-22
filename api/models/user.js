const mongoose = require('mongoose');

const UserSchema= mongoose.Schema(
    {
        name: String,
        email:{type:String,required: true, unique:true},
        password: String,
    }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;