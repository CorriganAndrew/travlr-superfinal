// app_api/controllers/trips.js
const mongoose = require('mongoose');

// IMPORTANT: use the exact model name registered in travlr.js.
// You told me travlr.js currently does: mongoose.model('trips', tripSchema)
const Trip = mongoose.model('trips');

// helper: case-insensitive matcher for the "code" field
const ci = raw => new RegExp(`^${(raw || '').trim()}$`, 'i');

// ---------- READ ----------
const tripsList = async (req, res) => {
  try {
    // keep list simple and predictable
    const trips = await Trip.find().exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trips', error: err.message });
  }
};

// explicit lookup endpoint to avoid any ambiguity with query parsing
const tripsFindByCode = async (req, res) => {
  try {
    const raw = (req.params.tripCode || '').trim();
    let trip = await Trip.findOne({ code: ci(raw) }).exec();
    if (!trip && mongoose.isValidObjectId(raw)) trip = await Trip.findById(raw).exec();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trip', error: err.message });
  }
};

// ---------- CREATE ----------
const tripsAddTrip = async (req, res) => {
  try {
    const payload = {
      code: (req.body.code || '').trim(),
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: Array.isArray(req.body.description)
        ? req.body.description
        : [(req.body.description || '').toString()]
    };
    if (!payload.code || !payload.name) {
      return res.status(400).json({ message: 'code and name are required' });
    }
    const exists = await Trip.findOne({ code: ci(payload.code) }).exec();
    if (exists) return res.status(409).json({ message: 'Trip code already exists' });

    const created = await Trip.create(payload);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: 'Error creating trip', error: err.message });
  }
};

// ---------- UPDATE ----------
const tripsUpdateTrip = async (req, res) => {
  try {
    const raw = (req.params.tripCode || '').trim();
    const updates = {
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: Array.isArray(req.body.description)
        ? req.body.description
        : [(req.body.description || '').toString()]
    };

    let updated = await Trip.findOneAndUpdate(
      { code: ci(raw) },
      { $set: updates },
      { new: true, runValidators: true }
    ).exec();

    if (!updated && mongoose.isValidObjectId(raw)) {
      updated = await Trip.findByIdAndUpdate(raw, { $set: updates }, { new: true, runValidators: true }).exec();
    }

    if (!updated) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating trip', error: err.message });
  }
};

// ---------- DELETE ----------
const tripsDeleteTrip = async (req, res) => {
  try {
    const raw = (req.params.tripCode || '').trim();

    let result = await Trip.deleteOne({ code: ci(raw) }).exec();
    if (result.deletedCount === 0 && mongoose.isValidObjectId(raw)) {
      const byId = await Trip.findByIdAndDelete(raw).exec();
      if (!byId) return res.status(404).json({ message: 'Trip not found' });
      return res.status(204).send();
    }
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Trip not found' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Error deleting trip', error: err.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
