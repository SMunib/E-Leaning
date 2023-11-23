const express = require('express');
const router = express.Router();

//const db = require('./db');
   // console.log(mydb);
//console.log(mydb.query);
    
router
  .route("/city")
  .post(async (req,res) => {
    const {note} = req.body; 
    const query = "Insert into example (note) values (?)";
    try{
        mydb.query(query,[note],(err) => {
            if(err){
                console.log('Error: failed to insert into database' + err);
                res.status(400).json({message:err.message});
                return;
            }
            res.status(201).json({
                status:'ok',
                message:'Student Registered',
            });
        });
    }catch(err){
        console.log('Error:: '+err);
        res.status(500).send();
    }
  })
  .get(async (req,res) => {
    const query = "Select * from example";
    try{
        mydb.query(query,(err,results) => {
            if(err){
                console.log('Error: failed to read from database' + err);
                res.status(400).json({message:err.message});
                return;
            }
            res.status(201).json({
                status:'ok',
                message:'retrieved',
                data: results,
            });
        });
    }catch(err){
        console.log('Error:: '+err);
        res.status(500).send();
    }
  });

router
  .route("/city/:id")
  .patch(async(req,res) => {
    var note = req.body.note;
    var id = req.params.id;
    const query = 'update example set note=? where id=?';
    try{
        mydb.query(query,[note,id],(err,results) => {

            if(err){
                console.log('Error: Failed to execute query' +err);
                res.status(400).json({message:err.message});
                return;
            }
            if(results.affectedRows === 0){
                //console.log('Error: Failed to locate given id');
                res.status(404).json({message:'Error: Given Id does not exist in table'});
                return;
            }

            res.status(201).json({
                status : 'ok',
                message: 'Updated',
                data: results,
            });
        });
    }catch(err){
        console.log('Error:: '+err);
        res.status(500).send();
    }
  })
  .get(async(req,res) => {
   var id = req.params.id;
   const query = 'select * from example where id = ?'; 
   try{
    mydb.query(query,[id],(err,results) => {
        if(err){
            console.log('Failed to execute query' +err);
            res.status(400).json({message:err.message});
            return;
        }
        if(!results){
            res.status(404).json({message:'Error: Given Id does not exist in table'});
            return;
        }
        res.status(201).json({
            status:'ok',
            message:'Data Found',
            data:results,
        });
    });
   }catch(err){
    console.log('Error::' +err);
    res.status(500).send();
   }
  })
  .delete(async(req,res) =>{
   var id = req.params.id;
   
   const query = 'delete from example where id = ?';
   try{
    mydb.query(query,[id],(err,results) => {
        if(err){
            console.log('Failed to Delete From Database' +err);
            return res.status(400).json({message:err.message});
        }
        if(results.affectedRows === 0){
            return res.status(404).json({message:'Id not Found!',});
        }
        return res.status(201).json({
            status:'Ok',
            message:'Tuple Deleted',
        });
    });
   }catch(err){
    console.log('Error::' +err);
    res.status(500).send();
    }
    });

module.exports = router; 