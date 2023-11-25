const express = require('express');
const cors = require('cors');
const student = require('./routes/student');
const course = require('./routes/course');
const teacher = require('./routes/teacher');
const discussionforum = require('./routes/discussionforum');
const authorize = require('./routes/auth');
const videos = require('./routes/videos');
const app = express();
const path = require('path');
 const publicDirectory = path.join(__dirname,'./Frontend/src/components');

app.use(cors());
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use('/student',student);
app.use('/course',course);
app.use('/teacher',teacher);
app.use('/discussionforum',discussionforum);
app.use('/videos',videos);
app.use('/',authorize);

const Port = process.env.Port || 2000;

// app.get('/',(req,res) => {
//     res.sendFile(__dirname,'./Frontend/src/components/Login.jsx');
// });
// console.log(__dirname);

app.get('/',(req,res) => {
    res.json("hello from backend")
});


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
//   });
  
app.get('/ping', (_,res) => {
    res.json({status: "ok", message: "pong"})
});

app.listen(Port, () => console.log(`server running on ${Port}`));
