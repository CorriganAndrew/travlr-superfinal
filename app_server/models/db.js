const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

mongoose.connect(dbURI, {
  // Mongoose v7+ uses sane defaults; options kept minimal
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown helper
const shutdown = (msg, cb) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    cb();
  });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
  shutdown('nodemon restart', () => process.kill(process.pid, 'SIGUSR2'));
});
// For app termination
process.on('SIGINT', () => shutdown('app termination (SIGINT)', () => process.exit(0)));
process.on('SIGTERM', () => shutdown('Heroku app shutdown (SIGTERM)', () => process.exit(0)));

// Load models
require('./travlr');
