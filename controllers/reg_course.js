const mydb = require('../routes/db');
const util = require('util');
const queryAsync = util.promisify(mydb.query).bind(mydb);

//have to use a join statement
exports.checkEnrolledCoursesTeacher =  async(req,res)=>{
    const id = req.userid;
    const query = "select * from reg_course join course on reg_course.CourseID=course.CourseID where reg_course.TeacherID =?";
    try{
        const results = await queryAsync(query,[id]);
        if(!results.length){return res.status(401).json({message:"ID does not exist"});}
        // console.log(results);
        return res.status(201).json({
            success:true,
            message:"data found",
            data:results,
        })
    }catch(err){
        console.log("Error" +err);
        res.status(500).send();
    }
};
exports.checkEnrolledCoursesStudent =  async(req,res)=>{
    const id = req.userid;
    const query = "select * from reg_course join course on reg_course.CourseID=course.CourseID where reg_course.StudentID =?";
    try{
        const results = await queryAsync(query,[id]);
        if(!results.length){return res.status(401).json({message:"ID does not exist"});}
        return res.status(201).json({
            success:true,
            message:"data found",
            data:results,
        })
    }catch(err){
        console.log("Error" +err);
        res.status(500).send();
    }
};

exports.EnrollTeacher = async(req,res) =>{
    const Userid = req.userid;
    const{id,userType} = req.body;
    const query = `Update reg_course set ${userType}ID = ? where CourseID = ?`;
    console.log(query);
    try{
        const results = await queryAsync(query, [Userid ,id ]);
        if(results.affectedRows === 0){
            return res.status(400).json({success:false,message:"Course not found"});
        }
        return res.status(200).json({success:true,message:"Teacher Enrolled Successfully"});
    }catch(error){
        console.log("error" + error);
        res.status(500).send();
    }
}

exports.EnrollStudent = async(req,res) =>{
    const Userid = req.userid;
    const{id,userType} = req.body;
    const query = `Update reg_course set ${userType}ID = ? where CourseID = ? AND TeacherID  is not null`;
    console.log(query);
    try{
        const results = await queryAsync(query, [Userid ,id ]);
        if(results.affectedRows === 0){
            return res.status(400).json({success:false,message:"Course not found or Teacher ID is null"});
        }
        return res.status(200).json({success:true,message:"Student Enrolled Successfully"});
    }catch(error){
        console.log("error" + error);
        res.status(500).send();
    }
}