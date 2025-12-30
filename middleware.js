const Listing = require('./models/listing');
const Review = require('./models/review');

module.exports.LogedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectURL = req.originalUrl;
        req.flash('error', 'Login your account');
        return res.redirect('/login');
    }
    next();
};

module.exports.SaveRedirectUrl = (req, res, next) => {
    if (req.session.redirectURL) {
        res.locals.redirectUrl = req.session.redirectURL;
        delete req.session.redirectURL;
    }
    next();
};

module.exports.Owner = async (req, res, next) => {
    let { id } = req.params;
    let list = await Listing.findById(id);

    if (!list.owner.equals(req.user._id)) {
        req.flash('error', 'You are not the creator of this listing');
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let currReview = await Review.findById(reviewId);

    if (!currReview.author.equals(req.user._id)) {
        req.flash('error', 'You are not the author of this review');
        return res.redirect(`/listings/${id}`);
    }
    next();
};
