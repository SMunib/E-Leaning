const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');

router
  .route('/add')
  .post(teacherController.addTeacher);

router
.route('/find')
.get(teacherController.findAllTeachers);

router
  .route('/find/:Email')
  .get(teacherController.findspecificTeacher)
  .delete(teacherController.removeTeacher)
  .patch(teacherController.updateTeacherInfo);
  
module.exports = router;