const validate = require('./Validation');
const check = require('./auth');

exports.validation = async(req,res) => {
    const {Email , Password , userType} = req.body;
    console.log("IN controller: ",Email); 
    const error = validate(Email,Password);
    const hasErrors = Object.values(error).some((errorMsg) => errorMsg !== '');
    if(hasErrors){
        return res.json({success:false,error});
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
