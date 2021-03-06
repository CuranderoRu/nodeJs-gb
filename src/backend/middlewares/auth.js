const httpStatus = require('http-status');
const passport = require('passport');
const User = require('../models/user.model');
const util = require('util');

const ADMIN = 'admin';
const LOGGED_USER = '_loggedUser';

exports.ADMIN = ADMIN;
exports.LOGGED_USER = LOGGED_USER;

const handleJWT = (req, res, next, roles) => async(err, user, info) => {
    const error = err || info;
    const logIn = util.promisify(req.logIn);
    const apiError = new Error('Unauthorized');

    try {
        if (error || !user) throw error;
        await logIn(user, { session: false });
    } catch (e) {
        return next(apiError);
    }

    if (roles === LOGGED_USER) {
        if (user.role !== 'admin' && req.params.userId !== user._id.toString()) {
            return next(apiError);
        }
    } else if (!roles.includes(user.role)) {
        return next(apiError);
    } else if (err || !user) {
        return next(apiError);
    }

    req.user = user;

    return next();
};

exports.authorize = (roles = User.roles) => (req, res, next) =>
    passport.authenticate(
        'jwt', { session: false },
        handleJWT(req, res, next, roles),
    )(req, res, next);

exports.oAuth = service =>
    passport.authenticate(service, { session: false });

exports.oAuthWeb = service =>
    passport.authenticate(service, { scope: ['https://www.googleapis.com/auth/plus.login', ['https://www.googleapis.com/auth/userinfo.email']] });

exports.oAuthComplete = service =>
    passport.authenticate(service, { failureRedirect: '/web/auth/login' });