const express = require('express');
const router = express.Router();
const mydb = require('./db');
const studentController = require('../controllers/student');

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