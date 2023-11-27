const check = require('./auth');
const validateLogin = require('./loginValidation');
const teacher = require('./teacher');
const student = require('./student');

exports.loginValidation = async(req,res) => {
    const {Email , Password , userType} = req.body;
    // console.log("IN controller: ",Email); 
    const error = validateLogin(Email,Password);
    const hasErrors = Object.values(error).some((errorMsg) => errorMsg !== '');
    if(hasErrors){
        return res.json({success:false,error,message:"validation error"});
    }
    if(userType === "student"){
        try{
            await check.checkLoginStudent(req,res);
        }catch(error){
            console.log('Error: '+error);
            return res.status(500).json({message:'Internal Server Error',success:false});
        }
    }else if(userType === "teacher"){
        try{
            await check.checkLoginTeacher(req,res);
        }catch(error){
            console.log('Error: '+error);
            return res.status(500).json({message:'Internal Server Error',success:false});
        }
    }
}

exports.registerValidation = async(req,res) =>{
    const {Email , Password , userType} = req.body;
    // console.log("IN controller: ",Email); 
    const error = validateLogin(Email,Password);
    const hasErrors = Object.values(error).some((errorMsg) => errorMsg !== '');
    if(hasErrors){
        return res.json({success:false,error,message:"validation error"});
    }
    if(userType === "student"){
        try{
            await check.checkStudentRegistration(req,res);
        }catch(error){
            console.log('Error: '+error);
            return res.status(500).json({message:'Internal Server Error',success:false});           
        }
    }else if(userType === "teacher"){
        try{
            await check.checkTeacherRegisteration(req,res);
        }catch(error){
            console.log('Error: '+error);
            return res.status(500).json({message:'Internal Server Error',success:false});
        }
    }   
}

exports.registerDetailsValidation = async(req,res) =>{
    const {Email ,userType} = req.body;
    // console.log(Email);
    // console.log(userType);
    if(userType === "student"){
        try{
            await student.updateStudentInfo(req,res);
        }catch(error){
            console.log('Error: '+error);
            return res.status(500).json({message:'Internal Server Error',success:false});           
        }
    }else if(userType === "teacher"){
        try{
            await teacher.updateTeacherInfo(req,res);
        }catch(error){
            console.log('Error: '+error);
            return res.status(500).json({message:'Internal Server Error',success:false});
        }
    }
}   