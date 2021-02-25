const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const templating = require('consolidate');
const handlebars = require('handlebars')
const helmet = require('helmet');
const routesV1 = require('../api/routes/v1');
const routesWeb = require('../webservices/routes');

/**
 * Express instance
 * @public
 */
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// process cookies
app.use(cookieParser());

// templating
handlebars.registerHelper('select', function(selected, options) {
    return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
});
templating.requires.handlebars = handlebars;
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '..', 'webservices', 'views'));

app.use(express.static('./dist'));

// mount api v1 routes
app.use('/api/v1', routesV1);

// mount webservices
app.use('/web', routesWeb);

module.exports = app;