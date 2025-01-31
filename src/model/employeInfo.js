const mongoose=require('mongoose');
const validator=require('validator');
const employeSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please Enter valide EmailID");
            }
        }

    },
    password:{
        type:String,
        required:true,
        minLength:8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be contain 1 Capital,lower,number and unqiue symbol");

            }
        }
    },
    gender:{
        type:String,
        required:true,
        lowercase:true,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Please enter valide gender");
            }
        }
    },
    age:{
        type:Number,
        required:true,
        min:18,
    },
    skills:{
        type:[]
    },
    about:{
        type:String,
        default:`Hello my name is user`
    }
})

const EmployeInfo=mongoose.model("EmployeInfo",employeSchema);
module.exports={EmployeInfo};