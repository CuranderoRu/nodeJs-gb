const express = require('express');
const translateRoutes = require('./translate.route');
const parseRoutes = require('./parse.route');
const articleRoutes = require('./article.route');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');

const router = express.Router();

/**
 * GET api/v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/translate', translateRoutes);
router.use('/parse', parseRoutes);
router.use('/articles', articleRoutes);
router.use('/users', userRoutes);

module.exports = router;