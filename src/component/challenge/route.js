/**
 * Challenge routes
 */
const express = require('express');
const router = express.Router();
const challengeController = require('./controller');

router.get('/getCurrentDateAndTime', challengeController.getCurrentDateAndTime);
router.post('/getMyAssingedChallenges', challengeController.getMyAssingedChallenges);
router.post('/getMyCreatedChallenges', challengeController.getMyCreatedChallenges);


module.exports = router;