// app_server/controllers/travel.js
const axios = require('axios');

const apiBase = (req) => `${req.protocol}://${req.get('host')}/api`;

// Renders /travel using data from the REST API (no file reads)
exports.list = async (req, res, next) => {
  try {
    const { data: trips } = await axios.get(`${apiBase(req)}/trips`);
    res.render('travel', { title: 'Travel', trips });
  } catch (err) {
    // If API fails, show a friendly error page
    next(err);
  }
};

// exports.details = async (req, res, next) => {
//   try {
//     const { tripCode } = req.params;
//     const { data: trip } = await axios.get(`${apiBase(req)}/trips/${tripCode}`);
//     res.render('trip', { title: trip.name, trip });
//   } catch (err) {
//     if (err.response && err.response.status === 404) {
//       return res.status(404).render('error', { title: 'Not found', message: 'Trip not found' });
//     }
//     next(err);
//   }
// };
