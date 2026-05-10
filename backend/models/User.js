const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Patient', 'Doctor', 'Receptionist', 'Admin'),
    allowNull: false,
    defaultValue: 'Patient',
  },
}, {
  tableName: 'Users',
  timestamps: true, // creates createdAt and updatedAt
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = User;
