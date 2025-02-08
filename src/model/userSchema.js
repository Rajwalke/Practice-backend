const mongoose=require('mongoose');
const validator=require('validator');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        minLength:2,
        maxLength:20,
        lowercase:true,
        require:true,
    },
    lastName:{
        type:String,
        minLength:2,
        maxLength:20,
        lowercase:true,
        require:true,
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`${value} is Invalide EmailID`);
            }
        }
    },
    password:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error(`Please Make Strong Password`);
            }
        }
    },
    gender:{
        type:String,
        require:true,
        lowercase:true,
        enum:{
            values:["male","female","others"],
            message:`{VALUE} is not a Gender`
        }
    },
    age:{
        type:Number,
        min:18,
        require:true,
    },
    about:{
        type:String,
        default:"Hello my name is user "
    },
    skills:{
        type:[String],
    },
    photoURL:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("This link is not Working")
            }
        }
    }
},
{
    timestamps:true
})

const Userdetails=mongoose.model("Userdetails",userSchema);
module.exports={Userdetails};