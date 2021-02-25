const router = require('express').Router();
const controller = require('../controllers/lesson4.controller');

router
    .route('/')
    .get(controller.get)
    .post(controller.post);

module.exports = router;