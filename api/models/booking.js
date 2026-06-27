const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'PlaceInfo'},
    user:{type:mongoose.Schema.Types.ObjectId,require:true},
    checkIn:{type:String,required:true},
    checkOut:{type:String,required:true},
    numberGuest:{type:String,required:true},
    name:{type:String,required:true},
    phone:{type:String,required:true},
    price:Number,
});

const BookingModel = mongoose.model('Booking',BookingSchema);

module.exports = BookingModel;