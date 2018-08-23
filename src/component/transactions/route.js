/**
 * wonLost routes
 */
const express = require('express');
const router = express.Router();
const wonLostController = require('./controller');

router.post('/getAllTransactions', wonLostController.getAllTransactions);


module.exports = router;