const express = require('express');

const translateRoutes = require('./api/v1/translate.route');
const parseRoutes = require('./api/v1/parse.route');
const articleRoutes = require('./api/v1/article.route');

const mainRoutes = require('./webservices/main.route');
const lesson4Routes = require('./webservices/lesson4.route');
const lesson5Routes = require('./webservices/lesson5.route');

const router = express.Router();

/**
 * GET /
 */
router.use(mainRoutes);

/**
 * GET v1/status
 */
router.get('/api/v1/status', (req, res) => res.send('OK'));

/**
 * GET v1/translate
 */
router.use('/api/v1/translate', translateRoutes);

/**
 * GET v1/parse
 */
router.use('/api/v1/parse', parseRoutes);

/**
 * GET v1/articles
 */
router.use('/api/v1/articles', articleRoutes);

/**
 * GET web/lesson4
 */
router.use('/web/lesson4', lesson4Routes);

/**
 * GET web/lesson5
 */
router.use('/web/lesson5', lesson5Routes);


module.exports = router;