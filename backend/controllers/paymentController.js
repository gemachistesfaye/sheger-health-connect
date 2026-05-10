const Payment = require('../models/Payment');

// @desc    Add payment record
// @route   POST /api/admin/payments
const addPayment = async (req, res) => {
  try {
    const { patient_name, amount, status } = req.body;
    const payment = await Payment.create({ patient_name, amount, status });
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all payments
// @route   GET /api/admin/payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({ order: [['created_at', 'DESC']] });
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addPayment, getPayments };
