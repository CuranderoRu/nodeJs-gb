const httpStatus = require('http-status');
const Article = require('../models/article.model');

/**
 * Load article and append to req.
 * @public
 */
exports.load = async(req, res, next, id) => {
    try {
        const article = await Article.getArticle(id);
        req.locals = { article };
        return next();
    } catch (error) {
        return next(error);
    }
};

/**
 * Get article
 * @public
 */
exports.get = (req, res) => res.json(req.locals.article);

/**
 * Create a new article
 * @public
 */
exports.create = async(req, res, next) => {
    try {
        const article = new Article(req.body);
        const savedArticle = await article.save();
        res.status(httpStatus.CREATED);
        res.json(savedArticle);
    } catch (error) {
        next(error);
    }
};

/**
 * Update existing article
 * @public
 */
exports.update = (req, res, next) => {
    const article = Object.assign(req.locals.article, req.body);

    article.save()
        .then(savedArticle => res.json(savedArticle))
        .catch(e => next(e));
};

/**
 * Get articles list
 * @public
 */
exports.list = async(req, res, next) => {
    try {
        const articles = await Article.list(req.query);
        res.json(articles);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete article
 * @public
 */
exports.remove = async(req, res, next) => {
    const { article } = req.locals;

    article.remove()
        .then(() => res.status(httpStatus.NO_CONTENT).end())
        .catch(e => next(e));
};