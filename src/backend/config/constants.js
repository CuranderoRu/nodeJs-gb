const path = require('path');

// import .env variables
require('dotenv-safe').config({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example'),
    allowEmptyValues: true,
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
    mongo: {
        uri: process.env.MONGO_URI,
    },
    yandexTranslate: {
        path: 'https://translate.api.cloud.yandex.net/translate/v2/translate/',
        YANDEX_OAUTH_TOKEN: process.env.YANDEX_OAUTH_TOKEN,
        TOKEN_EXCHANGE_PATH: 'https://iam.api.cloud.yandex.net/iam/v1/tokens',
        YANDEX_TENANT_FOLDER: process.env.YANDEX_TENANT_FOLDER,
    },
    googleAPI: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    }
};