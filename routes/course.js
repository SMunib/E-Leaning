const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

router
  .route('/add')
  .post(courseController.addCourse);

router
  .route('/find')
  .get(courseController.findCourse);

router
  .route('/findforstudent')
  .get(courseController.findCourseStudent);
  
router
  .route('/findspecific')
  .get(courseController.findspecificCourse)
  .delete(courseController.deleteCourse)
  .patch(courseController.updateCourse);

module.exports = router;