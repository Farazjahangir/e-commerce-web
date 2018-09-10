const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session'); // To Maintain Session
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo(session);
const port = 3000;
const user = require("./modal/userSchema"); // user Schema
const ad = require("./modal/adSchema"); //Ad Schema
const app = express();
let userUid;
var userName;
app.use(bodyParser.json({limit : '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

// MiddleWare
const protectRoutes = require('./middlewares/protectRoutes');




// MOngodb Connection
var url = "mongodb://faraz:newton123@ds135852.mlab.com:35852/practice-database";
mongoose.connect(url , ()=>{
    console.log("db connected");
})

// set Rooute Directory To Public
app.use(express.static(path.join(__dirname,'public')));
// Set Static FIles For Views Folder
app.set('views',path.join(__dirname,'views'));
// set Pug AS Tempelate Engine
app.set('view engine','pug');


// Create Session
app.use(session({
    secret: 'myName',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))



app.use("/auth" , require("./routes/auth"))
app.use("/submitAd" , require("./routes/submitAd"))


// All The GET REquest Handling
// Send Home Page with Username
app.get("/", protectRoutes , (req , res)=>{
    userUid = req.session.userId;
    user.find({_id : userUid} , (err,users)=>{
    userName = users[0].username;
    res.render('home',{username:userName});
    })
})
// Send Ads Obj From Mlab
app.get("/getAds", protectRoutes , (req,res)=>{
    ad.find({} , (err , ads)=>{
        if(err){
            res.json({isError : err})
            return false
        }
        res.json({adsData : ads})
    })
})
// Send USername on submitAd Page
app.get("/submitAd" ,protectRoutes,  (req,res)=>{
    res.render('submitAd',{username:userName});
})
// Send USername on inbox Page
app.get("/inbox"  , protectRoutes,  (req,res)=>{
    res.render('inbox',{username:userName});
})
app.get("/details" , (req,res)=>{
    res.render("details" , {username:userName})
})
// Send Search Result
app.post("/search", protectRoutes , (req , res)=>{
    console.log(req.body);
    
    ad.find({}).where("productName").equals(req.body.productName).where("cateogryName").equals(req.body.cateogryName).exec((err,data)=>{
        console.log("DATA***********" , data);
        res.json({data : data})
    })
    
    
})
app.post("/addetails" , (req , res)=>{
    const id = req.body.id
    ad.findById(id , (err,data)=>{
        res.json({data : data})
        
    })
    
})



app.listen(port , ()=>{
    console.log("Server Running On Port" , process.env.PORT || port);
    
})