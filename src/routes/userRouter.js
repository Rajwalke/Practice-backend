const express=require('express');
const userAuth = require('../middleware/authMiddleware');
const { ConnectionModel } = require('../model/connectionSchema');
const userRouter=express.Router();

userRouter.get("/user/connection/accepted",userAuth,async(req,res)=>{
    const loggInUser=req.user;
    const {_id}=loggInUser;
    try{
        const allConnectionRequest=await ConnectionModel.find({
            $or:[
                {fromUserId:_id ,status:"accepted"},
                {toUserId:_id, status:"accepted"}
            ]
        }).populate("fromUserId","firstName lastName")
        .populate("toUserId","firstName lastName");

        const followers=allConnectionRequest.map((col)=>{
            console.log(col)
            if(col.fromUserId._id.toString()==loggInUser._id.toString()){
                return col.toUserId;
            }else{
                return col.fromUserId;
            }
        })
        res.json({message:"All conention request",
            allConnection:followers
            
        })
    }catch(err){
        res.status(404).json({message : "Error : "+err.message}) 
    }
})

userRouter.get("/user/pendingrequest",userAuth,async(req,res)=>{
    const loggInUser=req.user;
    const {_id}=loggInUser
    try{
        const allPendingRequest=await ConnectionModel.find(
                {toUserId:_id, status:"interested"},
        ).populate("fromUserId","firstName lastName ");
        res.json({allPending_Request: allPendingRequest});

    }catch(err){
        res.status(404).json({message : "Error : "+err.message});
    }
})

module.exports=userRouter;