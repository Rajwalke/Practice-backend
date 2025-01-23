const express=require("express");
const bcrypt=require("bcrypt");
const app=express();
const {connectDB}=require("./config/database");
const employeInfo=require("./models/employeSchema");
const {validation}=require("./utils/validation")
// app.get("/",(req,res)=>{
//     res.send("Server is started");
// })
connectDB().then(()=>{
    console.log("DB is connected")
    app.listen(7777,()=>{
        console.log("Server is started");
    })

}).catch((err)=>{
    console.log("DB is not connected"+err.message);
})

app.get("/",(req,res)=>{
    res.send("Sever is started from localHost 7777");
})
app.use(express.json());

app.post("/signup",async(req,res)=>{
    const data=req.body;
    const {firstName, lastName, email,password,age,gender,about}=data;
    // console.log(data);
    
    try{
        validation(data);
        const hashPassword=await bcrypt.hash(password,10);
        console.log(hashPassword);
        const employe=new employeInfo({
            firstName,
            lastName,
            email,
            password:hashPassword,
            age,
            gender,
            about
        });

        await employe.save();
        res.send("Data is store");
    }catch(err){
        res.status(404).send("Error: "+err.message)
    }
    

})

app.post("/login",async(req,res)=>{
    const userEmail=req.body.email;
    const userPassword=req.body.password;

    try{
       const isEmail=await employeInfo.findOne({email:userEmail});
       if(isEmail){
        console.log(isEmail);
        const {password}=isEmail;
        const isvalide=await bcrypt.compare(userPassword,password);
        if(isvalide){
            res.send("Login Sucsssefully!!");
        }else{
            throw new Error("Password is Wrong");   
        }
        
       }else{
        throw new Error("EEmail is Wrong")
       }

    }catch(err){
        res.status(404).send("Error: "+ err.message);
    }

})

app.get("/feed",async(req,res)=>{

    try{
        const allEmplyeData=await employeInfo.find({});
        res.send(allEmplyeData);
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
})

app.get("/user/:userID",async(req,res)=>{
    const userID = req.params.userID;
    try{
    // const userData=await employeInfo.findOne({firstName:userfirstName})    
    const userData=await employeInfo.findById(userID); 
    res.send(userData);
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
})

app.patch("/user/:userID",async(req,res)=>{
    const userID=req.params.userID;
    const data=req.body;
    const {age,gender,about}=data;
    try{
        Object.keys(data).every((key)=>{
            if(!["age","gender","about"].includes(key)){
                throw new Error(`You can't upadte ${key}`)
            }
        })
        const user=await employeInfo.findByIdAndUpdate(userID,data,{returnDocument:"after",runValidators:true});
        res.send(user);
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
})