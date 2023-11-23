const mydb = require('../routes/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req,res) =>{
    console.log(req.body);
    
    const { name,email,password,Confirm_Password } = req.body;
    db.query('Select email from students where email=?',[email],async(error,results) => {
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render('Register',{
                message:'That email is already in use'
            })  
        }else if(password !== Confirm_Password){
            return res.render('register',{
                message:'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);

        db.query('Insert into students set ?',{name:name,email:email,password:hashedPassword},(error,results)=>{
            if(error){
                console.log(error);
            }else{
                return res.render('register',{
                    message: 'User Registered'
                });
            }
        })
    });

}