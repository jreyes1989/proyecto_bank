const userController = require('../controllers/user.controller');
const express = require('express');

const router = express.Router();

router

  .post('/signup', userController.register)
  .post('/login', userController.login)
  .get('/:id/history', userController.getHistory);

module.exports = router;
