const User = require('../models/User');
const bcrypt = require('bcrypt');

// @desc    Get all doctors
// @route   GET /api/admin/doctors
// @access  Private/Admin
const getDoctors = async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: { role: 'Doctor' },
      attributes: { exclude: ['password_hash'] }
    });
    res.json({ success: true, data: doctors });
  } catch (error) {
    console.error('Get Doctors Error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching doctors' });
  }
};

// @desc    Create a new doctor
// @route   POST /api/admin/doctors
// @access  Private/Admin
const onboardDoctor = async (req, res) => {
  try {
    const { full_name, username, password, specialization } = req.body;

    // Validate
    if (!full_name || !username || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const doctor = await User.create({
      full_name,
      username,
      password_hash,
      role: 'Doctor',
      specialization: specialization || 'General'
    });

    res.status(201).json({ 
      success: true, 
      message: 'Doctor account created successfully',
      data: { id: doctor.id, full_name: doctor.full_name, username: doctor.username }
    });
  } catch (error) {
    console.error('Onboard Doctor Error:', error);
    res.status(500).json({ success: false, message: 'Server error onboarding doctor' });
  }
};

// @desc    Get system statistics
// @route   GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const doctorCount = await User.count({ where: { role: 'Doctor' } });
    const patientCount = await User.count({ where: { role: 'Patient' } });
    
    res.json({
      success: true,
      data: {
        doctors: doctorCount,
        patients: patientCount,
        revenue: '45,200 ETB', 
        appointments: 856 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDoctors,
  onboardDoctor,
  getStats
};
