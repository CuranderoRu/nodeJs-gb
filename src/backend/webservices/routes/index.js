const express = require('express');
const lesson4Routes = require('./lesson4.route');
const lesson5Routes = require('./lesson5.route');

const router = express.Router();


/**
 * GET lesson4
 */
router.use('/lesson4', lesson4Routes);

/**
 * GET lesson5
 */
router.use('/lesson5', lesson5Routes);


module.exports = router;