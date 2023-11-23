const express = require('express');
const router = express.Router();
const forumController = require('../controllers/discussionforum');

router
  .route('/add')
  .post(forumController.addForum);

router
  .route('/find')
  .get(forumController.findForums);

router
  .route('/find/:CourseID')
  .get(forumController.findSpecificForum)
  .delete(forumController.removeForum)
  .patch(forumController.modifyForum);
  
module.exports = router;