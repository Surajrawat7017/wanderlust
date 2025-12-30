const User = require('../models/user');

module.exports.RenderSignUp = (req, res) => {
    res.render('user/signup.ejs');
};

module.exports.UserSignUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({ email, username });
        const userData = await User.register(newUser, password);

        req.login(userData, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Wanderlust');
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.RenderLogInPage = (req, res) => {
    res.render('user/login.ejs');
};

module.exports.UserLogIn = async (req, res) => {
    req.flash('success', 'Welcome to Wanderlust!');
    const redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.UserLogOut = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Logged you out');
        res.redirect('/listings');
    });
};
