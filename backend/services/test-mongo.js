// test-mongo.js
require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Using MONGODB_URI (masked):', uri ? uri.replace(/:(.*?)@/, ':****@') : 'NOT SET');
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connection TEST succeeded');
    await mongoose.disconnect();
  } catch (err) {
    console.error('MongoDB connection TEST failed:', err.message);
    process.exitCode = 1;
  }
})();