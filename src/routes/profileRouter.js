const express=require('express');
const userAuth = require('../middleware/authMiddleware');

const profileRouter=express();

profileRouter.get("/profile/view",userAuth,(req,res)=>{
    const user=req.user;
   try{
    res.json({message:"Profile of user",
        user
    })
   }catch(err){
    res.status(404).json({message: "Error : "+err.message});
   }
})

module.exports=profileRouter;