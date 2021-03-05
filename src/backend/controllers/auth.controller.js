const httpStatus = require('http-status');
const User = require('../models').User;
const RefreshToken = require('../models/refreshToken.model');
const moment = require('moment');
const { jwtExpirationInterval } = require('../config/constants');
const { omit } = require('lodash');

// REST API Methods

/**
 * Returns a formated object with tokens
 * @private
 */
function generateTokenResponse(user, accessToken) {
    const tokenType = 'Bearer';
    const refreshToken = RefreshToken.generate(user).token;
    const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
    return {
        tokenType,
        accessToken,
        refreshToken,
        expiresIn,
    };
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async(req, res, next) => {
    try {
        const userData = omit(req.body, 'role');
        const user = await new User(userData).save();
        const userTransformed = user.transform();
        const token = generateTokenResponse(user, user.token());
        res.status(httpStatus.CREATED);
        return res.json({ token, user: userTransformed });
    } catch (error) {
        return next(User.checkDuplicateEmail(error));
    }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async(req, res, next) => {
    try {
        const { user, accessToken } = await User.findAndGenerateToken(req.body);
        const token = generateTokenResponse(user, accessToken);
        req.session.email = user.email;
        const userTransformed = user.transform();
        return res.json({ token, user: userTransformed });
    } catch (error) {
        return next(error);
    }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async(req, res, next) => {
    try {
        const { email, refreshToken } = req.body;
        const refreshObject = await RefreshToken.findOneAndRemove({
            userEmail: email,
            token: refreshToken,
        });
        const { user, accessToken } = await User.findAndGenerateToken({ email, refreshObject });
        const response = generateTokenResponse(user, accessToken);
        return res.json(response);
    } catch (error) {
        return next(error);
    }
};

// Webservices Methods

exports.getLoginForm = (req, res, next) => {
    let email = '',
        rememberMe = false;
    if (req.cookies.signinParams) {
        email = req.cookies.signinParams.email;
        rememberMe = req.cookies.signinParams.rememberMe === 'on' ? true : false;
    }
    res.render('login', { email, rememberMe });
}

exports.processLogin = async(req, res, next) => {
    const { email, password, rememberMe } = req.body;
    if (!email) {
        res.render('error', { error: 'Необходимо указать email' });
        return;
    }
    res.cookie('signinParams', { email, rememberMe });
    console.log('rememberMe', rememberMe);
    const user = await User.findOne({ email }).exec();
    if (user && await user.passwordMatches(password)) {
        req.session.email = email;
        res.redirect('/web');
    } else {
        res.redirect('/web/auth/login/');
    }
}

exports.postSignout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/web');
    });
}

exports.getSignup = (req, res, next) => {
    res.render('signup', {});
}

exports.postSignup = async(req, res, next) => {
    try {
        const user = new User(req.body);
        user.role = 'user';
        const savedUser = await user.save();
        res.redirect('/web/auth/login/');
    } catch (error) {
        res.render('error', { error: User.checkDuplicateEmail(error) });
    }
}

exports.oAuthWeb = async(req, res, next) => {
    try {
        req.session.email = req.user.email;
        res.redirect('/web');
    } catch (error) {
        res.render('error', { error });
    }
};