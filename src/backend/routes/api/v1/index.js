const express = require('express');
const translateRoutes = require('./translate.route');
const parseRoutes = require('./parse.route');
const articleRoutes = require('./article.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/translate
 */
router.use('/translate', translateRoutes);

/**
 * GET v1/translate
 */
router.use('/parse', parseRoutes);

/**
 * GET v1/articles
 */
router.use('/articles', articleRoutes);

module.exports = router;