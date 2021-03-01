const router = require('express').Router();
const controllers = require('../../controllers');

/**
 * Load article when API with articleId route parameter is hit
 */
router.param('articleId', controllers.article.load);

router
    .route('/')
    .get(controllers.lesson5.get)
    .post(controllers.lesson5.post);

router
    .route('/:articleId')
    .post(controllers.lesson5.remove);


module.exports = router;