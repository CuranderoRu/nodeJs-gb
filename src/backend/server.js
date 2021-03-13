const { port, env } = require('./config/constants');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// connect Express app
const http = require('http').createServer(app);

// connect socket.io
const io = require('socket.io')(http);


// listen to requests
app.listen(port, () => console.log(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;