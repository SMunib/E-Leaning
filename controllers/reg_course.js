const mydb = require('../routes/db');
const util = require('util');
const queryAsync = util.promisify(mydb.query).bind(mydb);

exports.checkEnrolledCoursesTeacher =  async(req,res)=>{
    const id = req.userid;
    const query = "select * from reg_course where TeacherID =?";
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
    const query = "select * from reg_course where StudentID =?";
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
