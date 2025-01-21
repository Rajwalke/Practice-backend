const validator=require('validator');
const validation=(data)=>{
    const {firstName,lastName,email,password}=data;
    if(!firstName || !lastName){
        throw new Error("Enter correct name")
    }
    if(firstName.lenght<2 || lastName.lenght<2 || firstName.lenght>30 || lastName.lenght>30){
        throw new Error("Enter correct name")
    }
    if(!validator.isEmail(email)){
        throw new Error("Email is not valide");
    }
    if(password.lenght<8){
        throw new Error("Password consist atleast 8 characters");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Create Password with Atleast 1 capital,small,number & unique symbol");
    }

}

module.exports={validation};