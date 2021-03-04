const express = require('express');

const mainRoutes = require('./main.route');
const lesson4Routes = require('./lesson4.route');
const lesson5Routes = require('./lesson5.route');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');

const router = express.Router();

router.use('/lesson4', lesson4Routes);
router.use('/lesson5', lesson5Routes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/', mainRoutes);

module.exports = router;