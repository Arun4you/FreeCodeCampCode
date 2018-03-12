var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var User = require("../models/usersModel")
var mongoose = require('mongoose')
var config = require('../config/secret')
const passport = require("passport")
const jwt = require('jsonwebtoken')

router.post('/signup',(req,res)=>{
    let newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    User.addUser(newUser,(err,callback)=>{
        if(err) {
            res.json({success:false, message:'failed to register'})
        }else{
            res.json({success:true, message:'successfully register'})
        }
    })
})

router.post('/authenticate',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,(err,user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success:false, msg:"User not found"})
        }
        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            console.log("is match in userRouter", isMatch)
            if(isMatch){
                const token = jwt.sign(user,config.secret,{
                    expiresIn:604800 //1 week seconds
                    })
                      console.log("token in userRouter", token)
                    res.json({
                        success:true,
                        token:'JWT '+ token,
                        user:{
                        id:user._id,
                        username: user.username, 
                        email:user.email
                        }
                         })
            } else {
                return res.json({success:false, msg:"Wrong Password"})
            }
        })       
    })
})

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});


module.exports = router;