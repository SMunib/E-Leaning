const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const jwt = require('./verifyJwt');

router
  .route('/')
  .get((req,res)=>{
    res.json('Inside Student (LOL)')
  });

router
  .route("/add")
  .post(studentController.registerStudent);

router
  .route('/find')
  .get(studentController.findallStudents);

router
  .route('/findspecific')
  .get(jwt.verifyToken,studentController.findspecificStudent)
  .delete(jwt.verifyToken,studentController.removeStudent)
  .patch(jwt.verifyToken,studentController.updateStudentInfo);
  
module.exports = router;