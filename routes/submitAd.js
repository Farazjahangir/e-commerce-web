var express = require("express");
var Router = express.Router();

// const preventAuth = require('../middlewares/preventAuth');

const ad = require("../modal/adSchema");
const user = require("../modal/userSchema");


Router.post("/submit" , (req , res)=>{
    var userUid =  req.session.userId;
    user.find({_id : userUid} , (err,data)=>{
       var currentUserName = data[0].username
        console.log("done");
        var adData = req.body;
        console.log("ADDATA===" , adData);
        
        adData.user_id = userUid;
        adData.userName = currentUserName;
        adData.created_at = Date.now()
        res.json({data : currentUserName})
        
        
        newAd = new ad(adData)
        newAd.save((err , data)=>{  
            console.log("Ad Posted");                      
        })          
    })

})

module.exports = Router;
