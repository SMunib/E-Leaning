function registerValidation(City,Country,PostalCode,AccountNo,FirstName,LastName,UniversityName,Qualification,userType){
    let error={};
    const PostalCode_pattern = /^\d{5}$/;
    const AccountNo_pattern = /^\d{9}$/;

    if(City === ""){error.City = "Field should not be empty"}
    else{error.City = ""}

    if(Country === ""){error.Country = "Field should not be empty"}
    else{error.Country = ""}

    if(FirstName === ""){error.FirstName = "Field should not be empty"}
    else{error.FirstName = ""}

    if(LastName === ""){error.LastName = "Field should not be empty"}
    else{error.LastName = ""}

    if(userType === "student"){
    if(UniversityName === ""){error.UniversityName = "Field should not be empty"}
    else{error.UniversityName = ""}
    }
    if(userType === "teacher"){
    if(Qualification === ""){error.Qualification = "Field should not be empty"}
    else{error.Qualification = ""}

    if(AccountNo === ""){error.AccountNo = "Field should not be empty"}
    else if(!AccountNo_pattern.test(AccountNo)){error.AccountNo = "Account Number must have 9 digits"}
    else{error.AccountNo = ""}
    }

    if(PostalCode === ""){error.PostalCode = "Field should not be empty"}
    else if(!PostalCode_pattern.test(PostalCode)){error.PostalCode = "Postal Code must have 5 digits"}
    else{error.PostalCode = ""}

    return error;
}

module.exports = registerValidation;