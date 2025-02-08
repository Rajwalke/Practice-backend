const validationUserSignupData=(user)=>{
    const {firstName,lastName,email,password,gender,age,about,skills,photoURL}=user;
    if(skills.length >10){
        throw new Error("maximum skills only 10");
    }
    return true;
};
module.exports={validationUserSignupData};