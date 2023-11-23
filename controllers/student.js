const mydb = require('../routes/db');

exports.registerStudent = async(req,res)=>{
    const {StudentID,FirstName,LastName,Email,Password,UniversityName,Country,City,PostalCode} = req.body;
    const query = "Insert into student (StudentID,FirstName,LastName,Email,Password,UniversityName,Country,City,PostalCode) values (?,?,?,?,?,?,?,?,?)";

    try{
      mydb.query(query,[StudentID,FirstName,LastName,Email,Password,UniversityName,Country,City,PostalCode],(err) => {
        if(err){
          console.log('Error: Failed to insert into database: '+err);
          return res.status(400).json({message:err.message});
        }
        res.status(201).json({
          status:'ok',
          message:'Student Registered',
        });
      });
    }catch(err){
      console.log('Error::'+err);
      res.status(400).send();
    }
  }
exports.findallStudents = async(req,res) => {
    const query = 'Select * from student';
    try{
      mydb.query(query,(err,results) => {
        if(err){
          console.log('Error Reading from Database' +err);
          return res.status(400).json({message:err.message});
        }
        //  res.status(201).json({
        //   status:'ok',
        //   message:'retrieved',
        //   data:data,
        // });
        return res.json(results);
      });
    }catch(err){
      console.log('Error:: '+err);
      res.status(500).send();
    }
  }
  exports.findspecificStudent = async(req,res) => {
    var id = req.params.StudentID;
    const query = 'Select * from student where StudentID = ?';
    try{
      mydb.query(query,[id],(err,results) => {
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
exports.removeStudent = async(req,res)=>{
    var id = req.params.StudentID;
    const query = 'Delete from student where StudentId = ?';
    try{
      mydb.query(query,[id],(err,results) => {
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
exports.updateStudentInfo = async(req,res) => {
    const allowedAttributes = ['FirstName','LastName','Password','UniversityName','Country','City','PostalCode'];
    const id = req.params.StudentID;
    const updateAttributes = Object.keys(req.body)
      .filter(attr => allowedAttributes.includes(attr))
      .map(attr => `${attr}=?`)//backticks
      .join(', ');

    if(!updateAttributes) return res.status(400).json({message: 'No Valid attributes provided for update'});
    const query = `update student set ${updateAttributes} where StudentID = ?`;//backticks
    const values = [...Object.values(req.body).filter((_,index) => allowedAttributes.includes(Object.keys(req.body)[index])),id];
    try{
        mydb.query(query,values,(err,results)=>{
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