const express = require('express');
const router = express.Router();
const { register, login, getMe, forgotPassword, resetPassword, seedDatabaseTemp } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

// Temporary seed route
router.get('/seed-db', seedDatabaseTemp);

module.exports = router;
