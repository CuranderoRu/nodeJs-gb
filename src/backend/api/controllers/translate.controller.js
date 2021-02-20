const httpStatus = require('http-status');
const axios = require('axios');
const moment = require('moment');
const { yandexTranslate } = require('../../config/constants');

const getTranslation = async(stringToTranslate, targetLanguageCode) => {
    if (typeof process.YANDEX_IAM_TOKEN === 'undefined' || moment(process.YANDEX_IAM_TOKEN_EXP).isBefore(moment().add(-3, 'h'))) {
        await getIAMToken();
    }
    const data = {
        folder_id: yandexTranslate.YANDEX_TENANT_FOLDER,
        texts: stringToTranslate.split(' '),
        targetLanguageCode
    }
    const res = await axios({
        method: 'post',
        url: yandexTranslate.path,
        data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.YANDEX_IAM_TOKEN}`,
        }
    });
    return res.data;
}

const getIAMToken = () => {
    return axios({
            method: 'post',
            url: yandexTranslate.TOKEN_EXCHANGE_PATH,
            data: { yandexPassportOauthToken: yandexTranslate.YANDEX_OAUTH_TOKEN }
        })
        .then(function(response) {
            process.YANDEX_IAM_TOKEN = response.data.iamToken;
            process.YANDEX_IAM_TOKEN_EXP = response.data.expiresAt;
        })
        .catch(function(error) {
            console.error(`[getIAMToken] error ${error}`);
        });
}

exports.getTranslation = async(req, res, next) => {
    const { stringToTranslate, targetLanguageCode } = req.body;
    if (!stringToTranslate || !targetLanguageCode) {
        res.status(httpStatus.BAD_REQUEST);
        res.json({
            error: 'Validation error',
            message: 'Incorrect payload'
        });
    }
    try {
        const translation = await getTranslation(stringToTranslate, targetLanguageCode);
        res.status(httpStatus.OK);
        res.json(translation);
    } catch (e) {
        console.error(e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR);
        res.json(e.message);
    }
};