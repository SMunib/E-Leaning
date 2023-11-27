const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/Validation');

router
  .route('/login')
  .post(LoginController.loginValidation);

router
  .route('/register')
  .post(LoginController.registerValidation);

router
  .route('/registerDetails')
  .patch(LoginController.registerDetailsValidation);

module.exports = router;
