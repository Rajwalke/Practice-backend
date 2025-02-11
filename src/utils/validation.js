const validationUserSignupData=(user)=>{
    const {firstName,lastName,email,password,gender,age,about,skills,photoURL}=user;
    if(skills.length >10){
        throw new Error("maximum skills only 10");
    }
    return true;
};

const validationEditInfo=(userEdit)=>{
    const NOT_ALLOWED=["email","password"];
    Object.keys(userEdit).forEach((field)=>{
        if(NOT_ALLOWED.includes(field)){
            throw new Error(`You can't Edit the ${field}`);
        }
    })
    
}

const isvalidateStatus=(status)=>{
    const ALLOWED_STAUS=["ignored","interested"];
    if(!ALLOWED_STAUS.includes(status)){
        throw new Error(`${status} is Invalide Status`);
    }
}

const valideReviewStatus=(status)=>{
    const ALLOWED_STAUS=["accepted","rejected"];
    if(!ALLOWED_STAUS.includes(status)){
        throw new Error(`${status} is Invalide Status`);
    }
}

module.exports={validationUserSignupData,validationEditInfo,isvalidateStatus,valideReviewStatus};