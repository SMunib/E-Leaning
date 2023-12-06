const mydb = require('../routes/db');
const util = require('util');
const queryAsync = util.promisify(mydb.query).bind(mydb);

exports.addCourse = async(req,res)=>{
    const {CourseID,CourseName,duration,modules,AvailableSeats} = req.body;
    const query = "Insert into course (CourseID,CourseName,duration,modules,AvailableSeats) values (?,?,?,?,?)";
    try{
        const results = await queryAsync(query,[CourseID,CourseName,duration,modules,AvailableSeats]);
        if(results.affectedRows === 0){
          console.log('Error: Failed to insert into database: '+err);
          return res.status(400).json({message:err.message,success:false});
        }
        res.status(201).json({
          success:true,
          message:'New Course Added',
          data:results,
        });
    }catch(err){
      console.log('Error::'+err);
      res.status(400).send();
    }
  }

exports.findCourse = async(req,res) => {
    const query = "Select distinct * from course";
    try{
      await mydb.query(query,(err,results) => {
        if(err){
          console.log('Error Reading from Database' +err);
          return res.status(400).json({message:err.message});
        }
        res.status(201).json({
          success:true,
          message:'retrieved',
          data:results,
        });
      });
    }catch(err){
      console.log('Error:: '+err);
      res.status(500).send();
    }
  }

exports.findCourseStudent = async(req,res) =>{
  const query = 'Select * from reg_course join course on reg_course.CourseID=course.CourseID';
  try{
    const results = await queryAsync(query);
    if(!results.length){return res.status(400).json({success:false,message:'No Applicable Courses'})};
    res.status(200).json({success:true,message:"Found",data:results});
  }catch(error){
    console.log("error"+error);
    res.status(500).send();
  }
}
  
exports.findspecificCourse = async(req,res) => {
    var id = req.params.CourseID;
    const query = 'Select * from course where CourseID = ?';
    try{
      await mydb.query(query,[id],(err,results) => {
        if(err){
          console.log('Failed to execute query: '+err);
          return res.status(400).json({message:err.message});
        }
        if(!results){
          console.log('Id does not exist ');
          return res.status(404).json({message:'Error: Id Does not Exist in the Table'});
        }
        res.status(201).json({
          status:'ok',
          message:'data found',
          data:results,
        });
      });
    }catch(err){
      console.log('Error::'+err);
      res.status(500).send();
    }
  }
exports.deleteCourse = async(req,res)=>{
    var id = req.params.CourseID;
    const query = 'Delete from course where CourseID = ?';
    try{
      await mydb.query(query,[id],(err,results) => {
        if(err) return res.status(400).json({message:err.message});
        if(results.affectedRows === 0) return res.status(404).json({message:'Id not Found'});
        return res.status(201).json({
          status:"ok",
          message:"Tuple Deleted",
        });
      });
    }catch(err){
      console.log('Error:: '+err);
      res.status(500).send();
    }
  }
exports.updateCourse = async(req,res) => {
    const allowedAttributes = ['TeacherID','Modules','TotalStudents','TotalVids','Grade','Duration'];
    const id = req.params.CourseID;
    const updateAttributes = Object.keys(req.body)
      .filter(attr => allowedAttributes.includes(attr))
      .map(attr => `${attr}=?`)//backticks
      .join(', ');

    if(!updateAttributes) return res.status(400).json({message: 'No Valid attributes provided for update'});
    const query = `update course set ${updateAttributes} where CourseID = ?`;//backticks
    const values = [...Object.values(req.body).filter((_,index) => allowedAttributes.includes(Object.keys(req.body)[index])),id];
    try{
        await mydb.query(query,values,(err,results)=>{
        if (err) return res.status(400).json({message:err.message});
        if(results.affectedRows === 0) return res.status(404).json({message:'Id not Found in Table'});
        res.status(201).json({
          status:"ok",
          message:"Updated",
          data:results,
        });
      });
    }catch(err){
      console.log('Error::' +err);res.status(500).send();
    }
  }