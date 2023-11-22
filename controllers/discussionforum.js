exports.addForum = async(req,res)=>{
    const {CourseID,Username,Comment,Timestamp,StudentID} = req.body;
    const query = "Insert into discussionforum (CourseID,Username,Comment,Timestamp,StudentID) values (?,?,?,?,?)";
    try{
      mydb.query(query,[CourseID,Username,Comment,Timestamp,StudentID],(err) => {
        if(err){
          console.log('Error: Failed to insert into database: '+err);
          return res.status(400).json({message:err.message});
        }
        res.status(201).json({
          status:'ok',
          message:'New Forum Created',
        });
      });
    }catch(err){
      console.log('Error::'+err);
      res.status(400).send();
    }
  }
exports.findForums = async(req,res) => {
    const query = 'Select * from discussionforum';
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
exports.findSpecificForum = async(req,res) => {
    var id = req.params.CourseID;
    const query = 'Select * from discussionforum where CourseID = ?';
    try{
      mydb.query(query,[id],(err,results) => {
        if(err){
          console.log('Failed to execute query: '+err);
          return res.status(400).json({message:err.message});
        }
        if(!results){
          console.log('Forum does not exist ');
          return res.status(404).json({message:'Error: Forum Does not Exist in the Table'});
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

exports.removeForum = async(req,res)=>{
    var id = req.params.CourseID;
    const query = 'Delete from discussionforum where CourseID = ?';
    try{
      mydb.query(query,[id,url],(err,results) => {
        if(err) return res.status(400).json({message:err.message});
        if(results.affectedRows === 0) return res.status(404).json({message:'Forum not Found'});
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
exports.modifyForum = async(req,res) => {
    const allowedAttributes = ['Comment','Timestamp'];
    const id = req.params.CourseID;
    const updateAttributes = Object.keys(req.body)
      .filter(attr => allowedAttributes.includes(attr))
      .map(attr => `${attr}=?`)//backticks
      .join(', ');

    if(!updateAttributes) return res.status(400).json({message: 'No Valid attributes provided for update'});
    const query = `update discussionforum set ${updateAttributes} where CourseID = ?`;//backticks
    const values = [...Object.values(req.body).filter((_,index) => allowedAttributes.includes(Object.keys(req.body)[index])),id];
    try{
        mydb.query(query,values,(err,results)=>{
        if (err) return res.status(400).json({message:err.message});
        if(results.affectedRows === 0) return res.status(404).json({message:'Forum not Found in Table'});
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