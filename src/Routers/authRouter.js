const express=require("express");
const authRouter=express.Router();
const {EmployeInfo}=require("../model/employeInfo");
const {validationSignUp}=require('../utils/validation');
const bcrypt=require('bcrypt');
const {validateLoginEmailAndPassword}=require("../utils/validation")

authRouter.use(express.json())
// signup API
authRouter.post("/signup",async(req,res)=>{
    const data=req.body;
    const {firstName,lastName,email,password,gender,age,skills,about}=data;
    console.log("data from postman",data);
    try{
        validationSignUp(data);
        const hashPassword=await bcrypt.hash(password,10);
        console.log("Hash PAssword is ",hashPassword);
        const employe=new EmployeInfo({
            firstName,
            lastName,
            email,
            password:hashPassword,
            gender,
            age,
            skills,
            about
        });
        await employe.save();
        res.json({message:`New User is added into databsse`,
            data:employe
        })
    }catch(err){
        res.status(404).send("Error: "+err.message);
    }
});
// Login API
authRouter.post("/login",async(req,res)=>{
    const data=req.body;
    const {email,password}=data;
    const userEmail=email;

    try{
        if(validateLoginEmailAndPassword(data)){
            console.log(userEmail,password)
            const user=await EmployeInfo.findOne({email:userEmail})
            if(!user){
                throw new Error("Email is not found");
            }
            const hashPassword=user.password;
            console.log(hashPassword);
            const isPasswordPresent=await bcrypt.compare(password,hashPassword);
            if(!isPasswordPresent){
                throw new Error("Passsword is incorrect");
            }
            res.json({message:`${user.firstName} logIn Succsefully`})
        }
       
    }catch(err){
        res.status(404).send("Error: "+ err.message);
    }
})
module.exports=authRouter;