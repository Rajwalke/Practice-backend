const express=require("express");

const app=express();

const {connectDB}=require("./config/databse");
const StudentInfo=require("./model/student");

app.use(express.json());

app.post("/studetsignup",async (req,res)=>{
    const datainfo=req.body;
    console.log(datainfo);
    const info=new StudentInfo(datainfo);

    try{
        await info.save();
        res.send("Data is added into databse");
    }
    catch(err){
        console.log("data is not added");
    }

})

app.get("/alldata",async(req,res)=>{
    // const studentfirstName=req.body.firstName;
    const studentId=req.body._id;
    // console.log(`studentId is ${studentId} and name is ${studentfirstName}`)
    try{
        // const studentData= await StudentInfo.find({firstName:studentfirstName});
       const studentData=await StudentInfo.find({_id:studentId});
        res.send(studentData);
    }catch(err){
        res.status(404).send("Someting went Wrong");
    }

})

// app.patch("/student",async(req,res)=>{
//     const userId=req.body._id;
//     const data=req.body;
//     try{
//         const updatedata= await StudentInfo.findByIdAndUpdate({_id:userId},data);
//         res.send(updatedata);
//     }catch(err){
//         res.status(404).send("Something went wrong",err);
//     }
// })
app.patch("/student",async(req,res)=>{
    const userFirstName=req.body.firstName;
    const data=req.body;
    try{
        // const dataUser=await StudentInfo.updateMany({firstName:userFirstName},data);
        const dataUser=await StudentInfo.updateOne({firstName:userFirstName},data);
        res.send(dataUser);
    }catch(err){
        res.status(404).send("somhting went wrong");
    }
})

connectDB().then(()=>{
    console.log("connected to DB");
    app.listen(5555,(req,res)=>{
        console.log("Server is created");
    })
}).catch((Error)=>{
    console.log("not connect",Error);
})