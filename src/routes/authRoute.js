const express=require('express');
const {Userdetails}=require("../model/userSchema");
const { validationUserSignupData } = require('../utils/validation');
const bcrypt=require('bcrypt');
const authRouter=express.Router();
const jwt=require('jsonwebtoken');
const userAuth = require('../middleware/authMiddleware');
// signup api
authRouter.post("/signup",async(req,res)=>{
    const user=req.body;
    // console.log(user);
    const {firstName,lastName,email,password,gender,age,about,skills,photoURL}=user;
    try{
        validationUserSignupData(user);
        const hashPassword=await bcrypt.hash(password,10);
        console.log(hashPassword)
        const userInfo=new Userdetails({
            firstName,
            lastName,
            email,
            password:hashPassword,
            gender,
            age,
            about,
            skills,
            photoURL
        });

        const data=await userInfo.save();
        res.json({message:"User details added into db",
            data:data
        })

    }catch(err){
        console.log(err)
        res.status(404).json({message:"Error : "+err.message});
    }
})

// login api
authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const userInfo=await Userdetails.findOne({email:email})
        if(!userInfo){
            throw new Error("Email is not found");
        }
        const hashPassword=userInfo.password;
        const decryptPassword=await bcrypt.compare(password,hashPassword);
        if(!decryptPassword){
            throw new Error("Password is Wrong");
        }
        const token=await jwt.sign({_id:userInfo?._id},"MergDevDB");
        console.log(token)
        res.cookie("Token",token);
        res.json({message:"User Login Succesfully"});

    }catch(err){
        console.log(err)
        res.status(404).json({message:"Error : "+err.message});
    }
})

// Logout api
authRouter.post("/logout",userAuth,(req,res)=>{
    try{
        res.cookie("Token",null,{expires:new Date(Date.now())});
        res.json({message:"User Logout"});
    }catch(err){
        console.log(err)
        res.status(404).json({message:"Error : "+err.message});
    }
})
module.exports=authRouter;