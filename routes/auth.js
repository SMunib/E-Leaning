const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router
  .route('/registerStudent')
  .post(authController.checkStudentRegistration);

router
  .route('/registerTeacher')
  .post(authController.checkTeacherRegisteration);
    
router
  .route('/loginStudent')  
  .post(authController.checkLoginStudent);

router
  .route('/loginTeacher')
  .post(authController.checkLoginTeacher);

module.exports = router;