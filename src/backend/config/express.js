const express = require('express');
const session = require('./session');
const path = require('path');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const templating = require('./templating');
const helmet = require('helmet');
const WSrouter = require('../routes/webservices');
const APIrouter = require('../routes/api/v1');
const middlewares = require('../middlewares');
const strategies = require('./passport');

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

// enable sessions
app.use(session);

// enable authentication
app.use(passport.initialize());
passport.use('google', strategies.google);
passport.use('jwt', strategies.jwt);
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Logging session
app.use(middlewares.Logger.logSession);

// templating
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '..', 'views'));

app.use(express.static('./dist'));

// mount routes
app.use('/web', WSrouter);
app.use('/api/v1', APIrouter);

module.exports = app;