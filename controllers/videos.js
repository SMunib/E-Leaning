exports.addVideo = async(req,res)=>{
    const {CourseID,URL,Completed} = req.body;
    const query = "Insert into videos (CourseID,URL,Completed) values (?,?,?)";
    try{
      mydb.query(query,[CourseID,URL,Completed],(err) => {
        if(err){
          console.log('Error: Failed to insert into database: '+err);
          return res.status(400).json({message:err.message});
        }
        res.status(201).json({
          status:'ok',
          message:'New Video Added',
        });
      });
    }catch(err){
      console.log('Error::'+err);
      res.status(400).send();
    }
  }

exports.findVideos =async(req,res) => {
    const query = 'Select * from videos';
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
exports.findSpecificVideo = async(req,res) => {
    var id = req.params.CourseID;
    const query = 'Select * from videos where CourseID = ?';
    try{
      mydb.query(query,[id],(err,results) => {
        if(err){
          console.log('Failed to execute query: '+err);
          return res.status(400).json({message:err.message});
        }
        if(!results){
          console.log('Video does not exist ');
          return res.status(404).json({message:'Error: Video Does not Exist in the Table'});
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
exports.removeVideo =async(req,res)=>{
    var id = req.params.CourseID;
    var url = req.params.URL;
    const query = 'Delete from videos where CourseID = ?';
    try{
      mydb.query(query,[id,url],(err,results) => {
        if(err) return res.status(400).json({message:err.message});
        if(results.affectedRows === 0) return res.status(404).json({message:'Video not Found'});
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
exports.modifyVideo =async(req,res) => {
    const allowedAttributes = ['Completed','URL'];
    const id = req.params.CourseID;
    const url = req.params.URL;
    const updateAttributes = Object.keys(req.body)
      .filter(attr => allowedAttributes.includes(attr))
      .map(attr => `${attr}=?`)//backticks
      .join(', ');

    if(!updateAttributes) return res.status(400).json({message: 'No Valid attributes provided for update'});
    const query = `update videos set ${updateAttributes} where CourseID = ?`;//backticks
    const values = [...Object.values(req.body).filter((_,index) => allowedAttributes.includes(Object.keys(req.body)[index])),id,url];
    try{
        mydb.query(query,values,(err,results)=>{
        if (err) return res.status(400).json({message:err.message});
        if(results.affectedRows === 0) return res.status(404).json({message:'Video not Found in Table'});
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