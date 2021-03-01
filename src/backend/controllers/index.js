const main = require('./main.controller');
//const user = require('./user.controller');
const parse = require('./parse.controller'); //rest api parse
const translate = require('./translate.controller'); //rest api translate
const lesson4 = require('./lesson4.controller'); //webservice parse, translate
const lesson5 = require('./lesson5.controller'); //webservice article
const article = require('./article.controller'); //rest api article
//const auth = require('./auth.controller');

module.exports = {
    main,
    parse,
    translate,
    lesson4,
    lesson5,
    article,
}