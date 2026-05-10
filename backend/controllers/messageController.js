const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Send a message
// @route   POST /api/admin/messages
const sendMessage = async (req, res) => {
  try {
    const { receiver_id, message } = req.body;
    const newMessage = await Message.create({
      sender_id: req.user.id,
      receiver_id,
      message
    });
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get messages for logged in user
// @route   GET /api/admin/messages
const getMyMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { receiver_id: req.user.id },
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendMessage, getMyMessages };
