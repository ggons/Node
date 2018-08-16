const express = require('express');
const router = express.Router();
const courses = require('./courses');
const home = require('./home');

router.use('/api/courses', courses);
router.use('/', home);

module.exports = router;