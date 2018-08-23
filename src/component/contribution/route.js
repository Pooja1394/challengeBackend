/**
 * Contribution routes
 */
const express = require('express');
const router = express.Router();
const contributeController = require('./controller');

router.post('/subtractContribute', contributeController.subtractContribute);

module.exports = router;