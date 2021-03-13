const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const { jwtSecret, mongo } = require('./constants');

module.exports = session({
    store: MongoStore.create({ mongoUrl: mongo.uri }),
    secret: jwtSecret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 600000 }
})