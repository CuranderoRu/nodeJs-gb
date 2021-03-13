const express = require('express');
const controllers = require('../../controllers');
const oAuthLogin = require('../../middlewares/auth').oAuthWeb;
const oAuthComplete = require('../../middlewares/auth').oAuthComplete;

const router = express.Router();

router.get('/login/', controllers.auth.getLoginForm);
router.post('/login/', controllers.auth.processLogin);
router.post('/signout/', controllers.auth.postSignout);
router.get('/signup/', controllers.auth.getSignup);
router.post('/signup/', controllers.auth.postSignup);

router.get('/google', oAuthLogin('google'));
router.get('/google/callback', oAuthComplete('google'), controllers.auth.oAuthWeb);


module.exports = router;