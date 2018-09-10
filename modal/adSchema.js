const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adSchema = new Schema({
    user_id : String,
    userName : String,
    productName : String,
    cateogryName : String,
    address : String,
    contactNumber : Number,
    adPrice : Number,
    adDescription : String,
    created_at : Number,
    imageUrl : String
})


module.exports = mongoose.model('ad' , adSchema);
