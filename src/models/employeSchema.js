const mongoose=require("mongoose");
const validator=require("validator");
const employeSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30,
    },
    lastName:{
        type:String,
        require:true,
        minLength:2,
        maxLength:30,
    },
    email:{
        type:String,
        require:true,
        lowercase:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalide");
            }
        }
        
    },
    password:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Make Strong PAssword");
            }
        }
    },
    age:{
        type:Number,
        require:true,
        min:18
    },
    gender:{
         type:String,
         require:true,
         lowercase:true,
         validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is Invalide")
            }else{
               return true;
            }
         }
    },
    about:{
        type:String,
        default:"Hell Everyone"
    }
},
{
    timestamps:true
});


module.exports=mongoose.model("employeInfo",employeSchema);