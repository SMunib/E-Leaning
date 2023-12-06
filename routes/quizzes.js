const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizzes');

router
  .route('/add')
  .post(quizController.addQuiz);

router
  .route('/findspecificquiz')
  .get(quizController.FindQuiz)
  .delete(quizController.DeleteQuiz);
  
module.exports = router;