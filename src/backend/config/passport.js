const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models').User;
const { googleAPI } = require('../config/constants');
const authProviders = require('../services/authProviders');

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