const express = require('express');
const controller = require('../../controllers/article.controller');

const router = express.Router();

/**
 * Load article when API with articleId route parameter is hit
 */
router.param('articleId', controller.load);


router
    .route('/')
    /**
     * @api {get} v1/articles                List Articles
     * @apiDescription Get a list of articles
     * @apiVersion 1.0.0
     * @apiName ListArticles
     * @apiGroup Articles
     * @apiPermission any
     *
     * @apiParam  {Number{1-}}         [page=1]       List page
     * @apiParam  {Number{1-100}}      [perPage=1]    Articles per page
     *
     * @apiSuccess {Object[]} articles List of articles.
     */
    .get(controller.list)
    /**
     * @api {post} v1/articles               Create Article
     * @apiDescription Create a new article
     * @apiVersion 1.0.0
     * @apiName CreateArticle
     * @apiGroup Article
     * @apiPermission any
     *
     * @apiParam  {String}     author        Article's author
     * @apiParam  {String}     title         Article's title
     * @apiParam  {String}     text          Article's text
     * @apiParam  {Number}     importance    Article's importance
     *
     * @apiSuccess (Created 201) {String}  id         Article's id
     * @apiSuccess (Created 201) {String}  author     Article's author
     * @apiSuccess (Created 201) {String}  text       Article's text
     * @apiSuccess (Created 201) {Number}  importance Article's importance
     * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
     *
     */
    .post(controller.create);


router
    .route('/:articleId')
    /**
     * @api {get} v1/articles/:articleId     Get Article
     * @apiDescription Get article information
     * @apiVersion 1.0.0
     * @apiName GetArticle
     * @apiGroup Article
     * @apiPermission any
     *
     * @apiSuccess {String}  id              Article's id
     * @apiSuccess {String}  author          Article's author
     * @apiSuccess {String}  title           Article's title
     * @apiSuccess {String}  text            Article's text
     * @apiSuccess {Number}  importance      Article's importance
     * 
     * @apiError (Not Found 404)    NotFound     Article does not exist
     *
     */
    .get(controller.get)
    /**
     * @api {patch} v1/articles/:articleId   Update Article
     * @apiDescription Update some fields of a article document
     * @apiVersion 1.0.0
     * @apiName UpdateArticle
     * @apiGroup Article
     * @apiPermission any
     *
     * @apiParam  {String}     author        Article's author
     * @apiParam  {String}     title         Article's title
     * @apiParam  {String}     text          Article's text
     * @apiParam  {Number}     importance    Article's importance
     *
     * @apiSuccess {String}    id            Article's id
     * @apiSuccess {String}    author        Article's author
     * @apiSuccess {String}    title         Article's title
     * @apiSuccess {String}    text          Article's text
     * @apiSuccess {Number}    importance    Article's importance
     *
     * @apiError (Not Found 404)    NotFound     Article does not exist
     */
    .patch(controller.update)
    /**
     * @api {delete} v1/articles/:articleId  Delete Article
     * @apiDescription Delete an article
     * @apiVersion 1.0.0
     * @apiName DeleteArticle
     * @apiGroup Article
     * @apiPermission any
     *
     * @apiSuccess (No Content 204)          Successfully deleted
     *
     * @apiError (Not Found 404)    NotFound      Article does not exist
     */
    .delete(controller.remove);


module.exports = router;