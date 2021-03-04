const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid').v4;
const { jwtSecret, jwtExpirationInterval } = require('../config/constants');

/**
 * User Roles
 */
const roles = ['user', 'admin'];

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128,
    },
    name: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
    },
    services: {
        google: String,
    },
}, {
    timestamps: true,
});

userSchema.pre('save', async function save(next) {
    try {
        if (!this.isModified('password')) return next();

        const rounds = 10;

        const hash = await bcrypt.hash(this.password, rounds);
        this.password = hash;

        return next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Methods
 */
userSchema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'name', 'email', 'createdAt'];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    },

    token() {
        const playload = {
            exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
            iat: moment().unix(),
            sub: this._id,
        };
        return jwt.encode(playload, jwtSecret);
    },

    async passwordMatches(password) {
        return bcrypt.compare(password, this.password);
    },
});

/**
 * Statics
 */
userSchema.statics = {

    roles,

    /**
     * Get user
     *
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, Error>}
     */
    async getById(id) {
        try {
            let user;

            if (mongoose.Types.ObjectId.isValid(id)) {
                user = await this.findById(id).exec();
            }
            if (user) {
                return user;
            }

            throw new Error('User does not exist');
        } catch (error) {
            throw error;
        }
    },

    /**
     * Find user by email and tries to generate a JWT token
     *
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, Error>}
     */
    async findAndGenerateToken(options) {
        const { email, password, refreshObject } = options;
        if (!email) throw new Error('An email is required to generate a token');

        const user = await this.findOne({ email }).exec();
        const err = {
            status: httpStatus.UNAUTHORIZED,
            isPublic: true,
        };
        if (password) {
            if (user && await user.passwordMatches(password)) {
                return { user, accessToken: user.token() };
            }
            err.message = 'Incorrect email or password';
        } else if (refreshObject && refreshObject.userEmail === email) {
            if (moment(refreshObject.expires).isBefore()) {
                err.message = 'Invalid refresh token.';
            } else {
                return { user, accessToken: user.token() };
            }
        } else {
            err.message = 'Incorrect email or refreshToken';
        }
        throw new Error(err);
    },

    /**
     * Return new validation error
     * if error is a mongoose duplicate key error
     *
     * @param {Error} error
     * @returns {Error}
     */
    checkDuplicateEmail(error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            return new Error('"email" already exists');
        }
        return error;
    },

    async oAuthLogin({
        service,
        id,
        email,
        name,
    }) {
        const user = await this.findOne({
            $or: [{
                [`services.${service}`]: id
            }, { email }]
        });
        if (user) {
            user.services[service] = id;
            if (!user.name) user.name = name;
            return user.save();
        }
        const password = uuidv4();
        return this.create({
            services: {
                [service]: id
            },
            email,
            password,
            name,
        });
    },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema);