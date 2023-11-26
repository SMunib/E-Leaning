function validate (Email,Password){
    let error = {}
    const email_Pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_Pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/ ;

    // console.log(Email);
    if(Email === ""){error.Email = "email should not be empty"}
    else if(!email_Pattern.test(Email)){error.email = "Email pattern is incorrect"}
    else{error.Email = ""}

    if(Password === ""){error.Password = "password should not be empty"}
    else if(!password_Pattern.test(Password)){error.Password = "Password Pattern is Incorrect"}
    else{error.Password = ""}

    return error;
}

module.exports = validate;