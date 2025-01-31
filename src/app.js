const express=require('express');

const app=express();
const {connectDB}=require("./config/databse");
const {EmployeInfo}=require("./model/employeInfo");
// const {validationSignUp}=require('./utils/validation');
// const bcrypt=require('bcrypt');
const authRouter=require('./Routers/authRouter')
app.use(express.json());
// app.use(validator.)
app.use("/",authRouter);


connectDB().then(()=>{
    console.log("Data base is connected");
    app.listen(7777,()=>{
        console.log("server is created");
    })
}).catch((err)=>{
    console.log("Databse is not connected");
})

app.use("/",(req,res)=>{
    res.send("Hello my name is server")
})
