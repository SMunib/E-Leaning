const express=require('express');
const testroute = require('./routes/testroute');
const db = require('./routes/db');
const app= express();
app.use(express.json());

app.use('/api',testroute);

// app.post('/student/create',(req, res) => {
//     const {Id,Username,Email,Password}=req.body;
//     const sql= 'Insert into example (Id,Username,Email,Password) VALUES(?)';

//     try{
//         db.query(sql,[note,Username,Email,Password],(err) => {
//             if(err){
//                 console.log('Error: failed to insert into database' + err);
//                 res.status(400).json({message:err.message});
//                 return;
//             }
//             res.status(201).json({
//                 status:'ok',
//                 message:'Student Registered',
//             });
//         });
//     }catch(err){
//         console.log('Error:: '+err);
//         res.status(500).send();
//     }
// });

// app.get('/students/display',(req,res) => ){
    
// }



// //Create Table Example
// db.query(
//     'Create table if not exists Example(id int AUTO_INCREMENT, note varchar(225), Primary key(id))',
//     (err) => {
//         if(err){
//             console.log('Error:Failed to create Table Example...' + err);
//         }
//         console.log(`table Example created!`);
//     }
// );

const Port = process.env.Port || 2000;

app.get('/ping', (_,res) => {
    res.json({status: "ok", message: "pong"})
});

app.listen(Port, () => console.log(`server running on ${Port}`));
