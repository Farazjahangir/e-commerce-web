var express = require("express");
var Router = express.Router();
const ad = require("../modal/adSchema"); //Ad Schema
const user = require("../modal/userSchema"); //User Schema


Router.post("/submit" , (req , res)=>{
    // Save UserUid From Session
    var userUid =  req.session.userId;
    user.find({_id : userUid} , (err,data)=>{
       var currentUserName = data[0].username
        console.log("done");
        var adData = req.body;
        console.log("ADDATA===" , adData);
        
        adData.user_id = userUid; //save userID In Ad Obj
        adData.userName = currentUserName; //Save UserName in AD obj
        adData.created_at = Date.now()
        res.json({data : currentUserName})
        
        
        newAd = new ad(adData)
        newAd.save((err , data)=>{  
            console.log("Ad Posted");                      
        })          
    })

})

module.exports = Router;
