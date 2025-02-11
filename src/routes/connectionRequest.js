const express=require('express');
const connectinRequest=express.Router();
const userAuth = require('../middleware/authMiddleware');
const {ConnectionModel}=require("../model/connectionSchema");
const { isvalidateStatus, valideReviewStatus } = require('../utils/validation');
const { Userdetails } = require('../model/userSchema');


connectinRequest.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    const loggInUser=req.user;
    const status=req.params.status;
    const toUserId=req.params.toUserId;
    const fromUserId=loggInUser._id;
    try{

        isvalidateStatus(status);
        const toUserIDInfo=await Userdetails.findById(toUserId);
        if(!toUserIDInfo){
            throw new Error("Invalide User");
        }
        const isAlredaySendTheRequest=await ConnectionModel.findOne({
            $or:[
                {fromUserId:fromUserId, toUserId:toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
        })
        if(isAlredaySendTheRequest){
            throw new Error("Connection is Alreday exist,can't send the connection ");
        }

        const userRequest=new ConnectionModel({
            fromUserId,
            toUserId,
            status
        })

        const newConnection=await userRequest.save();
        res.json({message:"New Connection is Created",
                newConnection
        })

    }catch(err){
        res.status(404).json({message: "Error : "+err.message});
    }
})

connectinRequest.post("/request/review/:status/:reqId",userAuth,async(req,res)=>{
    const loggInUser=req.user;
    const status=req.params.status;
    const reqId=req.params.reqId;
    try{
        valideReviewStatus(status);
        const requestConnection=await ConnectionModel.findOne({
            $and:[
                {toUserId:loggInUser?._id,status:"interested"},
                {_id:reqId}
            ]
        }
        ).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName");
        if(!requestConnection){
            throw new Error("RequestId Is Invalide or Connection not exist");
        }
        requestConnection.status=status;
        requestConnection.save();
        res.json({message:"All connection request",
                requestConnection
        })

    }catch(err){
        res.status(404).json({message: "Error : "+err.message});
    }
})
module.exports=connectinRequest;