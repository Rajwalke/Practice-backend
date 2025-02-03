const jwtToken=require('jsonwebtoken');
const { EmployeInfo } = require('../model/employeInfo');

const userAuth=async(req,res,next)=>{
    try{    
        const cookie=req.cookies;
        const {Token}=cookie;
        if(!Token){
            throw new Error("Please Login First");
        }
        const decryptToken=await jwtToken.verify(Token,"Tinder@2004");

        const {_id}=decryptToken;
        const user=await EmployeInfo.findById(_id);
        console.log(user);
        if(user){
            req.user=user;
        }
        next();

    }catch(err){
        res.status(404).send("Error: "+err.message);
    }
}

module.exports={userAuth};