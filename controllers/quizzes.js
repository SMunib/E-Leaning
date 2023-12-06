const mydb = require('../routes/db');
const util = require('util');
const queryAsync = util.promisify(mydb.query).bind(mydb);

exports.addQuiz = async(req,res) =>{
    const {CourseID,quiz} = req.body;
    const query = 'Insert into quizzes (CourseID,quiz) values (?,?)';
    try{
        const results = queryAsync(query,[CourseID,quiz]);
        if(results.affectedRows === 0){return res.status(400).json({success:false,message:"Failed to insert"})};
        res.status(200).json({success:true,message:"Quiz Added"});
        
    }catch(error){
        console.log("error"+ error);
        res.status(500).send();
    }
}

exports.FindQuiz = async(req,res) =>{
    const query = 'Select * from quizzes';
    try{
        const results = queryAsync(query);
        console.log(results);
        if(!results.length === 0){return res.status(400).json({success:false,message:"Retrieval failed"})};
        res.status(200).json({success:true,message:"data found",data:results});
    }catch(err){
        console.log("error" +err);
        res.status(500).send();
    }
}

exports.DeleteQuiz = async(req,res) =>{
    const id = req.params.quiz;
    const query = 'Delete from quizzes where quiz = ?';
    try{
      const results = await queryAsync(query,[id]);
        if(results.affectedRows === 0) return res.status(404).json({message:'Quiz not Found'});
        return res.status(201).json({
          success:true,
          message:"Quiz Deleted",
        });
    }catch(err){
      console.log('Error:: '+err);
      res.status(500).send();
    }
}