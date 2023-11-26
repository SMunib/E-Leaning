const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginValidation');

router
  .route('/login')
  .post(LoginController.validation);

module.exports = router;
