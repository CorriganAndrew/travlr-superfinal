const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    length: { type: Number, required: true, min: 1 },
    start: { type: Date, required: true },
    resort: { type: String, required: true, trim: true },
    perPerson: { type: Number, required: true, min: 0 },
    image: { type: String, required: true, trim: true },
    description: { type: [String], default: [] }
  },
  { collection: 'trips' }
);

module.exports = mongoose.model('trips', tripSchema);

