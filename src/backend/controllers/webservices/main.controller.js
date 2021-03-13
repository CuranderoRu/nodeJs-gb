exports.indexPage = (req, res, next) => {
    const loggedIn = req.session.email ? true : false;
    res.render('index', { title: 'Articles App', message: 'Главная', loggedIn })
}