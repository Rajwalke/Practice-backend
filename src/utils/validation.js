const validator=require('validator');
const { EmployeInfo } = require('../model/employeInfo');
const validationSignUp=(data)=>{
    const {firstName,lastName,email,password,gender,age,skills,about}=data;
    if(firstName.lenth<3 && firstName.length>20){
        throw new Error("Lenght of name must in between 3-to-20");
    }
    if(lastName.lenth<3 && lastName.length>20){
        throw new Error("Length of LastName muist in between 3-to-20")
    }
    if(!validator.isEmail(email)){
        throw new Error("Please Enter valide EmailID");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password must be contain 1 Capital,lower,number and unqiue symbol");
    }
};

const validateLoginEmailAndPassword=async(data)=>{
    const {email,password}=data;
    if(!validator.isEmail(email)){
        throw new Error("Please check the Email");
    }
    return true;
}
module.exports={validationSignUp,validateLoginEmailAndPassword};