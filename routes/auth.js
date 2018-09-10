var express = require("express");
var Router = express.Router();
const user = require("../modal/userSchema"); // user Schema

// Middleware
const preventAuth = require('../middlewares/preventAuth');

// All The GET request Handling
Router.get("/signin" , preventAuth , (req,res)=>{
    res.render("signin",{});
})
Router.get("/signup", preventAuth , (req,res)=>{
    res.render("signup");
})

Router.get('/logout',(request,response)=>{
    request.session.destroy(()=>{
        response.redirect('/auth/signin')
    })
})


// Post Request User Signup And Saving In DB
Router.post("/signup" , (req , res)=>{
    var userEmail = req.body.email
    var userPassword = req.body.pwd
    var userPassword2 = req.body.pwd2
    
    // If Password Are Not Same
    if(userPassword !== userPassword2){
        res.render('signup',{error:'Passwords Must Be same '})            
        return false
    }
    // If Passwords less than ^ Characters
    if(userPassword.length <= 5 || userPassword2 <= 5){
        res.render('signup',{error:'Passwords Must Be 6 Characters Long '})            
        return false
    }
    user.find({email : userEmail} , (err , data)=>{  
        // If The Email Already Exist In DB   
        if(data.length === 1){
            res.render('signup',{error:'The Email Address Is Already Use By Another User '})            
        }
        else{ 
            var users = req.body
            users.created_at = Date.now()
            
            newUser = new user(users)
            newUser.save((err , data)=>{
                req.session.userId = data._id;
                res.redirect("/")                              
            })
        }
    })
})

// POST request To Signin User
Router.post("/signin" , (req , res)=>{
    var userEmail = req.body.email
    var userPassword = req.body.password
    user.find({email : userEmail} , (err , data)=>{
        if(data.length === 0 || userPassword !== data[0].pwd){
            res.render('signin',{error:'There Is No User Record Found Check Your Email And Password'})            
            return false
        }
        if(userPassword === data[0].pwd){
            console.log("signin");
            
            req.session.userId = data[0]._id;
            // res.render("home")
            res.redirect('/')
        }
    })
})
module.exports = Router;