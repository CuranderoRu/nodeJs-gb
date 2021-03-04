const User = require('../models').User;

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