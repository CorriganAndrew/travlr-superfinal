const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');
const auth = require('../controllers/authentication');

// auth routes
router.post('/register', auth.register); // use once to create admin
router.post('/login', auth.login);

// public read
router.route('/trips')
  .get(ctrlTrips.tripsList);

// write requires token
router.route('/trips')
  .post(auth.verifyToken, ctrlTrips.tripsAddTrip);

router.route('/trips/bycode/:tripCode')
  .get(ctrlTrips.tripsFindByCode)
  .put(auth.verifyToken, ctrlTrips.tripsUpdateTrip)
  .delete(auth.verifyToken, ctrlTrips.tripsDeleteTrip);

router.route('/trips/:tripCode')
  .get(ctrlTrips.tripsFindByCode)
  .put(auth.verifyToken, ctrlTrips.tripsUpdateTrip)
  .delete(auth.verifyToken, ctrlTrips.tripsDeleteTrip);

module.exports = router;
