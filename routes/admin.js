const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router
  .route('/Request')
  .get(adminController.CheckRequests)
  .post(adminController.SendRequest);

router
  .route('/Response')
  .get(adminController.CheckResponse)
  .post(adminController.giveResponse); 
  
module.exports = router;