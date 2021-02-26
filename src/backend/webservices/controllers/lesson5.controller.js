const httpStatus = require('http-status');
const apiController = require('../../api/controllers/article.controller');
const Article = require('../../api/models/article.model');

const renderForm = async(req, res, author, extError = null) => {
    let list = [];
    let error = extError;
    try {
        list = await Article.list(req.query);
    } catch (e) {
        error = e;
    }
    list = list.map(item => {
        return ({
            id: item._id,
            title: item.title,
            author: item.author,
            text: item.text,
            createdAt: item.createdAt,
        });
    });
    res.render('articles', {
        author,
        list,
        error
    });
}

const getRequest = async(req, res, next) => {
    console.log('req.cookies:', req.cookies);
    let author = '';
    if (!req.cookies) {
        res.cookie('author', author, {
            maxAge: 1000 * 600, //время жизни в секундах
            httpOnly: true, //только для бэкенда
        });
    } else {
        author = req.cookies.author ? req.cookies.author : author;
    }
    renderForm(req, res, author);
}

exports.get = getRequest;

exports.post = async(req, res, next) => {
    console.log('post:', req.cookies, req.body);
    if (!req.cookies) { //request sent from dev tool
        getRequest(req, res, next);
        return;
    }
    const author = req.body.author ? req.body.author : '';
    if (!req.cookies.author || req.cookies.author !== author) {
        res.cookie('author', author, {
            maxAge: 1000 * 600, //время жизни в секундах
            httpOnly: true, //только для бэкенда
        });
    }
    let error = null;
    try {
        const article = new Article(req.body);
        const savedArticle = await article.save();
    } catch (e) {
        error = e;
    }
    renderForm(req, res, author, error);
};

exports.remove = async(req, res, next) => {
    let error = null;
    const { article } = req.locals;
    try {
        await article.remove();
    } catch (e) {
        console.error(e);
        error = e;
    }
    renderForm(req, res, req.cookies.author, error);
};