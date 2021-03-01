const httpStatus = require('http-status');
const axios = require('axios');
const cheerio = require('cheerio');


const getParsedData = async() => {
    const res = await axios({
        method: 'get',
        url: 'https://fishki.net/',
    });
    const $ = cheerio.load(res.data);
    const arr = [];
    $('.top-links-top-eq2 a').each((i, element) => {
        arr.push($(element).text().trim());
    });

    return arr;
}

exports.get = async(req, res, next) => {
    try {
        const parsedData = await getParsedData();
        res.status(httpStatus.OK);
        res.json(parsedData);
    } catch (e) {
        console.error(e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR);
        res.json(e.message);
    }
};