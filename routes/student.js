const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');

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
  .route('/find/:StudentID')
  .get(studentController.findallStudents)
  .delete(studentController.removeStudent)
  .patch(studentController.updateStudentInfo);
  
module.exports = router;