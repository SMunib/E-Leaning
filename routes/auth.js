const express = require('express');
const router = express.Router();
const mydb = require('./db');
const authController = require('../controllers/auth');

router
  .route('/register')
  .post(authController.register);

module.exports = router;