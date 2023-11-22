const express = require('express');
const student = require('./routes/student');
const course = require('./routes/course');
const teacher = require('./routes/teacher');
const discussionforum = require('./routes/discussionforum');
const videos = require('./routes/videos');
const app = express();

app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use('/student',student);
app.use('/course',course);
app.use('/teacher',teacher);
app.use('/discussionforum',discussionforum);
app.use('/videos',videos);
app.use('/auth',require('./routes/auth'));

const Port = process.env.Port || 2000;

app.get('/ping', (_,res) => {
    res.json({status: "ok", message: "pong"})
});

app.listen(Port, () => console.log(`server running on ${Port}`));
