const express = require('express');
const controller = require('../../controllers/user.controller');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

module.exports = router;