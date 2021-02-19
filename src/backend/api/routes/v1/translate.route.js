const express = require('express');
const controller = require('../../controllers/translate.controller');

const router = express.Router();

router
    .route('/')
    /**
     * @api {post} v1/translate     Returns translation using Yandex API
     * @apiDescription Translation request using Yandex API
     * @apiVersion 1.0.0
     * @apiName Translate
     * @apiGroup Translate
     * @apiPermission unauthorized user
     */
    .post(controller.getTranslation);

module.exports = router;