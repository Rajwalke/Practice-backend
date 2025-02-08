const { use } = require("react");
const { Userdetails } = require("../model/userSchema");
const jwt=require('jsonwebtoken')

const userAuth = async(req,res,next)=>{
    try{
        const cookie=req.cookies;
        const {Token}=cookie;
        const userInfoFromToken=await jwt.verify(Token,"MergDevDB");
        const {_id}=userInfoFromToken;
        const user=await Userdetails.findById(_id);
        if(!user){
            throw new Error("Invalide User");
        }
        req.user=user;
        console.log(user);
        next();
    }catch(err){
        res.status(404).json({message: "Error : "+err.message});
    }
} 

module.exports=userAuth;
