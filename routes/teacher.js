const express = require('express');
const router = express.Router();
const mydb = require('./db');
const teacherController = require('../controllers/teacher');

router
  .route('/add')
  .post(teacherController.addTeacher);

router
.route('/find')
.get(teacherController.findAllTeachers);

router
  .route('/find/:TeacherID')
  .get(teacherController.findspecificTeacher)
  .delete(teacherController.removeTeacher)
  .patch(teacherController.updateTeacherInfo);
  
module.exports = router;