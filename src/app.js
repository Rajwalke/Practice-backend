const express=require('express');

const app=express();
const {connectDB}=require("./config/databse");
const authRouter=require("./routes/authRoute");
const profileRouter = require('./routes/profileRouter');
const cookieparser=require('cookie-parser');
app.use(express.json());
app.use(cookieparser());
app.use("/",authRouter);
app.use("/",profileRouter)
connectDB().then(()=>{
    console.log("Database is connected")
    app.listen(7777,()=>{
        console.log("Server is created")
    })
}).catch((err)=>{
    console.log("data base is not created"+err.message);
})
