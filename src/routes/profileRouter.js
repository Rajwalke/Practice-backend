const express=require('express');
const userAuth = require('../middleware/authMiddleware');
const { validationEditInfo } = require('../utils/validation');
const { Userdetails } = require('../model/userSchema');

const profileRouter=express();

// Profile View
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

// Profile Edit
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    // email & Password is not valide
    const userEdit=req.body;
    const user=req.user
    try{
        validationEditInfo(userEdit);
        const userInfoEdit=await Userdetails.findByIdAndUpdate(user?._id,userEdit,{runValidators:true,returnDocument:'after'});
        await userInfoEdit.save();
        res.json({message:`${userInfoEdit.firstName} your profile is Edit`,
            userInfoEdit
        })

    }catch(err){
        res.status(404).json({message: "Error : "+err.message});
    }
})


module.exports=profileRouter;