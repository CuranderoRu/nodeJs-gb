//common
const auth = require('./auth.controller');
const user = require('./user.controller');

//webservices
const main = require('./webservices/main.controller');
const lesson4 = require('./webservices/lesson4.controller');
const lesson5 = require('./webservices/lesson5.controller');

//rest api
const parse = require('./api/parse.controller');
const translate = require('./api/translate.controller');
const article = require('./api/article.controller');


module.exports = {
    main,
    user,
    lesson4,
    lesson5,
    auth,
    parse,
    article,
    translate,
}