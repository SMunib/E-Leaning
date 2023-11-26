const db = require('../routes/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const  student = require('./student');
const teacher = require('./teacher');

exports.checkStudentRegistration = async (req,res) =>{
    const { Email,Password,Confirm_Password } = req.body;
    db.query('Select Email from student where Email=?',[Email],async(error,results) => {
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.json({
                message:'That email is already in use'
            })  
        }else if(Password !== Confirm_Password){
            return res.json({
                message:'Passwords do not match'
            });
        }else{
            try{
                await student.registerStudent(req,res);
            }catch(error){
                console.log('Error',error);
                return res.status(500).json({
                    message:"Internal server error"
                });
            }
        }
    });
 
}

exports.checkTeacherRegisteration = async (req,res) =>{
    
    const { Email,Password,Confirm_Password } = req.body;
    db.query('Select Email from teacher where Email=?',[Email],async(error,results) => {
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.json({
                message:'That email is already in use'
            });  
        }else if(Password !== Confirm_Password){
            return res.json({
                message:'Passwords do not match'
            })
        }else{
            try{
                await teacher.addTeacher(req,res);
            }catch(error){
                console.log('Error' +error);
                return res.status(500).json({message:'Internal Server Error'});
            }
        }
    });
}

exports.checkLoginStudent = async(req,res) => {
    const {Email,Password} = req.body;
//Check if Email exists in database
    db.query('Select * from student where Email = ?',[Email],async(error,results)=>{
        if(error){
            console.log(error);
        }
        
        if(results.length === 0 ){return res.json({
            success : false,
            message : 'Email or password is incorrect',
        });}
//Check if Passwords Match
        const storedhashedPassword = results[0].Password;
        const passwordMatch = await bcrypt.compare(Password,storedhashedPassword);
        console.log(passwordMatch);
        if(!passwordMatch) { return res.json({
            success:false,
            message : 'Password is incorrect',
            error:"Email or Password is wrong",
        });}
//Generate Token if Matched
        const token = jwt.sign({Email:Email},'JWTSecretKey',{expiresIn : '1h'});
        return res.json({success : true,message:'Login Successful',token:token,results});
    });
}

exports.checkLoginTeacher = async(req,res) => {
    const {Email , Password} = req.body;
//Check if Email exists in database
    db.query('Select * from teacher where Email = ?',[Email],async(error,results)=>{
        if(error){
            console.log(error);
        }
        console.log(results.length);
        if(results.length === 0 ){return res.json({
            success : false,
            message : 'Email or password is incorrect'
        });}
//Check if Passwords Match
        const storedhashedPassword = results[0].Password;
        console.log(storedhashedPassword);
        const passwordMatch = await bcrypt.compare(Password,storedhashedPassword);
        console.log(passwordMatch);
        if(!passwordMatch) { return res.json({
            success:false,
            message : 'Email or password is incorrect'
        });}
//Generate Token if Matched
        const token = jwt.sign({Email:Email},'JWTSecretKey',{expiresIn : '1h'});
        return res.json({success : true,message:'Login Successful',token:token});
    });
}