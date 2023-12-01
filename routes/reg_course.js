const express = require('express');
const router = express.Router();
const reg_courseController = require('../controllers/reg_course');
const jwt = require('./verifyJwt');

// router
//   .route('/add')
//   .post(reg_courseController);

router
  .route('/findforteacher')
  .get(jwt.verifyToken,reg_courseController.checkEnrolledCoursesTeacher);

router
  .route('/findforstudent')
  .get(jwt.verifyToken,reg_courseController.checkEnrolledCoursesStudent);

module.exports = router;