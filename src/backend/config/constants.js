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
    yandexTranslate: {
        path: 'https://translate.api.cloud.yandex.net/translate/v2/translate/',
        YANDEX_OAUTH_TOKEN: process.env.YANDEX_OAUTH_TOKEN,
        TOKEN_EXCHANGE_PATH: 'https://iam.api.cloud.yandex.net/iam/v1/tokens',
        YANDEX_TENANT_FOLDER: process.env.YANDEX_TENANT_FOLDER,
    }
};