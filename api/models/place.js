const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
    {
        owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
        title:String,
        address:String,
        photos:[String],
        description:String,
        perks:[String],
        extraInfo: String,
        checkIn: String,
        checkOut: String,
        maxGuests: String,
        price:Number,
    }
)

const placeModel= new mongoose.model('PlaceInfo',placeSchema);
module.exports = placeModel;