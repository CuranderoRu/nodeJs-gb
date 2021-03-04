const User = require('../models/user.model');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async(req, res, next, id) => {
    try {
        const user = await User.get(id);
        req.locals = { user };
        return next();
    } catch (error) {
        return next(error);
    }
};