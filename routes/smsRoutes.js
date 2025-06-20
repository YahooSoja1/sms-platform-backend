// routes/smsRoutes.js
const express = require('express');
const router = express.Router();
const smsController = require('../controllers/smsController');

// Test route
router.get('/test', (req, res) => {
  res.send('✅ SMS Platform API is working');
});

// Buy number from 5sim or SMS-Activate
router.post('/buy-number', smsController.buyNumber);

// Get SMS status or code
router.get('/status/:platform/:id', smsController.getSmsStatus);

module.exports = router;
