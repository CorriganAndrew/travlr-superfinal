const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Connect DB
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
mongoose.connect(dbURI);
require('./travlr'); // register model

const Trip = mongoose.model('Trip');

const jsonPath = path.join(__dirname, '..', '..', 'data', 'trips.json');

function readTripsJSON() {
  const raw = fs.readFileSync(jsonPath, 'utf8');
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed.trips)) return parsed.trips;
  throw new Error('trips.json must be an array or { "trips": [...] }');
}

async function seed() {
  try {
    const trips = readTripsJSON();
    console.log(`Read ${trips.length} trips from JSON. Clearing collection...`);
    await Trip.deleteMany({});
    const result = await Trip.insertMany(trips, { ordered: true });
    console.log(`Inserted ${result.length} trips.`);
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
