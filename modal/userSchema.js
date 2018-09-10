const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username : String,
    email : String,
    pwd: String,
    created_at : Number
})

module.exports = mongoose.model('user' , userSchema);


