const express=require('express');
const { userAuth } = require('../middlewere/valideauthentication');

const profileRouter=express.Router();

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    const user=req.user;
    try{
        res.json({message : "Profile is created",
            userData:user
        })
    }catch(err){
        res.status(404).send("Error: "+ err.message);
    }
})

module.exports={profileRouter};