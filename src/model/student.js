const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    }

});

module.exports=mongoose.model("StudentInfo",studentSchema);