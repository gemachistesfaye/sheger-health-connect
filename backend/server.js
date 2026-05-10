const app = require('./app');
const http = require('http');
const { connectDB, sequelize } = require('./config/db');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Connect to Database and sync models
connectDB().then(() => {
  // Sync database models (Use { alter: true } for dev to update schema safely)
  sequelize.sync({ alter: true }).then(() => {
    console.log('✅ MySQL Models synced.');
    server.listen(PORT, () => {
      console.log(`🚀 Sheger Health Connect Backend Server running on port ${PORT}`);
    });
  });
});
