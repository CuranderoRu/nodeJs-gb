const express = require('express');
const controller = require('../../../controllers/parse.controller');

const router = express.Router();

router
    .route('/')
    /**
     * @api {post} v1/parse     Returns parsing results for fishki.net
     * @apiDescription Parsing request
     * @apiVersion 1.0.0
     * @apiName ParseSite
     * @apiGroup Parse
     * @apiPermission unauthorized user
     */
    .get(controller.get);

module.exports = router;