/**
 * User routes
 */
const express = require('express');
const router = express.Router();
const userController = require('./controller');

router.post('/setUpAccount', userController.setUpAccount);

module.exports = router;