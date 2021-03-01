const mongoose = require('mongoose');
const httpStatus = require('http-status');

/**
 * Article Schema
 * @private
 */
const articleSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    importance: {
        type: Number,
    },
}, {
    timestamps: true,
});


/**
 * Statics
 */
articleSchema.statics = {

    /**
     * Get article
     *
     * @param {ObjectId} id - The objectId of article.
     * @returns {Promise<User, Error>}
     */
    async getArticle(id) {
        try {
            let article;

            if (mongoose.Types.ObjectId.isValid(id)) {
                article = await this.findById(id).exec();
            }
            if (article) {
                return article;
            }
            throw new Error('Article does not exist');
        } catch (error) {
            throw error;
        }
    },

    /**
     * List articles in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of articles to be skipped.
     * @param {number} limit - Limit number of articles to be returned.
     * @returns {Promise<User[]>}
     */
    list({
        page = 1,
        perPage = 30,
    }) {

        return this.find()
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec();
    },


};

/**
 * @typedef Article
 */
module.exports = mongoose.model('Article', articleSchema);