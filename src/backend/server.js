const { port, env } = require('./config/constants');
const app = require('./config/express');

// listen to requests
app.listen(port, () => console.log(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;