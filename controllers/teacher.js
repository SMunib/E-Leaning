const mydb = require('../routes/db');

exports.addTeacher = async(req,res)=>{
    const {TeacherID,FirstName,LastName,Email,Password,Qualification,City,Country,PostalCode,AccountNo} = req.body;
    const query = "Insert into teacher (TeacherID,FirstName,LastName,Email,Password,Qualification,City,Country,PostalCode,AccountNo) values (?,?,?,?,?,?,?,?,?,?)";
    try{
      mydb.query(query,[TeacherID,FirstName,LastName,Email,Password,Qualification,City,Country,PostalCode,AccountNo],(err) => {
        if(err){
          console.log('Error: Failed to insert into database: '+err);
          return res.status(400).json({message:err.message});
        }
        res.status(201).json({
          status:'ok',
          message:'New Teacher Hired',
        });
      });
    }catch(err){
      console.log('Error::'+err);
      res.status(400).send();
    }
  }
exports.findAllTeachers = async(req,res) => {
    const query = 'Select * from teacher';
    try{
      mydb.query(query,(err,results) => {
        if(err){
          console.log('Error Reading from Database' +err);
          return res.status(400).json({message:err.message});
        }
        res.status(201).json({
          status:'ok',
          message:'retrieved',
          data:results,
        });
      });
    }catch(err){
      console.log('Error:: '+err);
      res.status(500).send();
    }
  }
exports.findspecificTeacher = async(req,res) => {
    var id = req.params.TeacherID;
    const query = 'Select * from teacher where TeacherID = ?';
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
  exports.removeTeacher = async(req,res)=>{
    var id = req.params.TeacherID;
    const query = 'Delete from teacher where TeacherID = ?';
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
exports.updateTeacherInfo = async(req,res) => {
    const allowedAttributes = ['FirstName','LastName','Password','UniversityName','Country','City','PostalCode','AccountNo','Email'];
    const id = req.params.TeacherID;
    const updateAttributes = Object.keys(req.body)
      .filter(attr => allowedAttributes.includes(attr))
      .map(attr => `${attr}=?`)//backticks
      .join(', ');

    if(!updateAttributes) return res.status(400).json({message: 'No Valid attributes provided for update'});
    const query = `update teacher set ${updateAttributes} where TeacherID = ?`;//backticks
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