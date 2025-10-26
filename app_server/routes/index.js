// app_server/routes/index.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/main');
const travel = require('../controllers/travel');

router.get('/',        ctrl.index);
router.get('/about',   ctrl.about);
router.get('/contact', ctrl.contact);
router.get('/meals',   ctrl.meals);
router.get('/news',    ctrl.news);
router.get('/rooms',   ctrl.rooms);
router.get('/travel',  travel.list);

// router.get('/travel/:tripCode', travel.details);

module.exports = router;
