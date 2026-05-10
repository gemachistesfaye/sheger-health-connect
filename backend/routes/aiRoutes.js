const express = require('express');
const router = express.Router();
const { chatWithAssistant } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/chat', protect, chatWithAssistant);

module.exports = router;
