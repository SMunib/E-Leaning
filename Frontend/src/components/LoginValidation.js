function validation (email,password){
    let error = {}
    const email_Pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const Password_Pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/ ;

    if(email === ""){error.email = "email should not be empty"}
    else if(!email_Pattern.test(email)){error.email = "email did not match "}
    else{error.email = ""}

    if(password === ""){error.password = "password should not be empty"}
    else if(!Password_Pattern.test(password)){error.password = "password did not match"}
    else{error.password = ""}

    return error;
}

export default validation;