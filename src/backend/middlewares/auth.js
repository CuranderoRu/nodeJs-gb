const passport = require('passport');

const ADMIN = 'admin';
const LOGGED_USER = '_loggedUser';

exports.ADMIN = ADMIN;
exports.LOGGED_USER = LOGGED_USER;

exports.oAuthWeb = service =>
    passport.authenticate(service, { scope: ['https://www.googleapis.com/auth/plus.login', ['https://www.googleapis.com/auth/userinfo.email']] });

exports.oAuthComplete = service =>
    passport.authenticate(service, { failureRedirect: '/web/auth/login' });