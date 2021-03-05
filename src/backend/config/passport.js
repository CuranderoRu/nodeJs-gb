const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models').User;
const { googleAPI, jwtSecret } = require('../config/constants');
const authProviders = require('../services/authProviders');

const jwtOptions = {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async(payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (user) return done(null, user);
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
};

const oAuth = service => async(token, refreshToken, profile, done) => {
    try {
        const userData = await authProviders[service](token, profile);
        const user = await User.oAuthLogin(userData);
        return done(null, user);
    } catch (err) {
        console.error('oAuth', err);
        return done(err);
    }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);

exports.google = new GoogleStrategy({
        clientID: googleAPI.GOOGLE_CLIENT_ID,
        clientSecret: googleAPI.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3003/web/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('passport.google.accessToken', accessToken);
        console.log('passport.google.profile', profile);
        oAuth('google')(accessToken, refreshToken, profile, done);
    }
);