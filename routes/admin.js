const express = require('express');
const router = express.Router();

router
  .route('/checkRequests')
  .get()

module.exports = router;