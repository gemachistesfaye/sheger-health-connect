const express = require('express');
const router = express.Router();
const { getDoctors, onboardDoctor, getStats } = require('../controllers/adminController');
const { sendMessage, getMyMessages } = require('../controllers/messageController');
const { addPayment, getPayments } = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All admin routes are protected and require Admin role
router.use(protect);
router.use(authorize('Admin'));

router.get('/stats', getStats);
router.get('/doctors', getDoctors);
router.post('/doctors', onboardDoctor);

router.get('/messages', getMyMessages);
router.post('/messages', sendMessage);

router.get('/payments', getPayments);
router.post('/payments', addPayment);

module.exports = router;
