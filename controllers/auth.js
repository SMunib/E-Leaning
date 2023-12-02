const db = require('../routes/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const  student = require('./student');
const teacher = require('./teacher');

exports.checkStudentRegistration = async (req,res) =>{
    const { Email,Password,confirmPassword } = req.body;
    db.query('Select Email from student where Email=?',[Email],async(error,results) => {
        if(error){
            console.log(error);
        }
        console.log(Password);
        console.log(confirmPassword);
        if(results.length > 0){
            return res.json({
                message:'That email is already in use',
                success:false
            })  
        }else if(Password !== confirmPassword){
            return res.json({
                message:'Passwords do not match',
                success:false,
            });
        }else{
            try{
                await student.registerStudent(req,res);
            }catch(error){
                console.log('Error',error);
                return res.status(500).json({
                    message:"Internal server error",
                    success:false
                });
            }
        }
    });
 
}

exports.checkTeacherRegisteration = async (req,res) =>{
    const { Email,Password,confirmPassword } = req.body;
    db.query('Select Email from teacher where Email=?',[Email],async(error,results) => {
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.json({
                message:'Email is already in use',
                success:false
            });  
        }else if(Password !== confirmPassword){
            return res.json({
                message:'Passwords do not match',
                success:false
            })
        }else{
            try{
                await teacher.addTeacher(req,res);
            }catch(error){
                console.log('Error' +error);
                return res.status(500).json({message:'Internal Server Error',success:false});
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
        const userid = results[0].StudentID;
        //console.log(userid);
        const token = jwt.sign({userid},'JWTSecretKey',{expiresIn : '1h'});
        return res.json({success : true,message:'Login Successful',token:token});
    });
}

exports.checkLoginTeacher = async(req,res) => {
    const {Email , Password} = req.body;
//Check if Email exists in database
    db.query('Select * from teacher where Email = ?',[Email],async(error,results)=>{
        if(error){
            console.log(error);
        }
        // console.log(results.length);
        if(results.length === 0 ){return res.json({
            success : false,
            message : 'Email or password is incorrect'
        });}
//Check if Passwords Match
        const storedhashedPassword = results[0].Password;
        // console.log(storedhashedPassword);
        const hashpass = await bcrypt.hash(Password,10);
        // console.log(passwordMatch);
        //For some strange effing reason bcrypt.compare does not work in this particular function. Smh
        if(!hashpass === storedhashedPassword) { return res.json({
            success:false,
            message : 'Email or password is incorrect'
        });}
//Generate Token if Matched
        const userid = results[0].TeacherID;
        const token = jwt.sign({userid},'JWTSecretKey',{expiresIn : '1h'});
        console.log(token);
        return res.json({success : true,message:'Login Successful',token:token});
    });
}

exports.checkLoginAdmin = async(req,res) =>{
    const {Email,Password} = req.body;
    if(Email === "Admin@gmail.com" && Password === "Admin123"){
        return res.json({success:true,message:'Admin'});
    };   
}