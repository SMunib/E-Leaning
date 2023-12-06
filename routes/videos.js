const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videos');

router
  .route('/add')
  .post(videoController.addVideo);
  
router
  .route('/find')
  .get(videoController.findVideos);

router
  .route('/find/:VideoUrl')
  .get(videoController.findSpecificVideo)
  .delete(videoController.removeVideo)
  .patch(videoController.modifyVideo);
  
module.exports = router;