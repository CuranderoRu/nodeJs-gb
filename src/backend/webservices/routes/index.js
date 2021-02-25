const express = require('express');
const lesson4Routes = require('./lesson4.route');

const router = express.Router();


/**
 * GET lesson4
 */
router.use('/lesson4', lesson4Routes);


module.exports = router;