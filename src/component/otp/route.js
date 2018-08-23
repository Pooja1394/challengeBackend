/**
 * Otp routes
 */
const express = require('express');
const router = express.Router();
const otpController = require('./controller');

router.post('/generate', otpController.generate);
router.post('/verify', otpController.verify);

module.exports = router;