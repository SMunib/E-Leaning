const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');
const jwt = require('./verifyJwt');

router
  .route('/add')
  .post(teacherController.addTeacher);

router
.route('/find')
.get(teacherController.findAllTeachers);

router
  .route('/findspecific')
  .get(jwt.verifyToken,teacherController.findspecificTeacher)
  .delete(jwt.verifyToken,teacherController.removeTeacher)
  .patch(jwt.verifyToken,teacherController.updateTeacherInfo);
  
module.exports = router;