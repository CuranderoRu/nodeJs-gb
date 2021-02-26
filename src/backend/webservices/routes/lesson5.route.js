const router = require('express').Router();
const controller = require('../controllers/lesson5.controller');
const apiController = require('../../api/controllers/article.controller');

/**
 * Load article when API with articleId route parameter is hit
 */
router.param('articleId', apiController.load);

router
    .route('/')
    .get(controller.get)
    .post(controller.post);

router
    .route('/:articleId')
    .post(controller.remove);


module.exports = router;