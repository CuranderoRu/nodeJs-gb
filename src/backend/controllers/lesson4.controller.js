const httpStatus = require('http-status');
const axios = require('axios');
const cheerio = require('cheerio');

const getParsedRia = async() => {
    const res = await axios({
        method: 'get',
        url: 'https://ria.ru',
    });
    const $ = cheerio.load(res.data);
    const arr = [];
    $('.cell-list__item-title').each((i, element) => {
        arr.push($(element).text().trim());
    });

    return arr;
}

const getParsedYandex = async() => {
    const res = await axios({
        method: 'get',
        url: 'https://yandex.ru/news',
    });
    const $ = cheerio.load(res.data);
    const arr = [];
    $('.mg-card__title').each((i, element) => {
        arr.push($(element).text().trim());
    });

    return arr;
}

const getParsedFishki = async() => {
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

const getParsedData = async(siteName, selectedCount) => {
    let maxCount = 0;
    maxCount = parseInt(selectedCount);

    let preparedArray = [];
    switch (siteName) {
        case 'fishki':
            preparedArray = await getParsedFishki();
            break;
        case 'yandex':
            preparedArray = await getParsedYandex();
            break;
        case 'ria':
            preparedArray = await getParsedRia();
            break;
        default:
            preparedArray = ['not supported'];
    }
    preparedArray = preparedArray.reduce((prevValue, item, ind) => {
        if (maxCount !== maxCount || ind < maxCount) {
            prevValue.push(item);
        }
        return prevValue
    }, [])
    return preparedArray;
}

const getRequest = async(req, res, next) => {
    console.log('req.cookies:', req.cookies);
    let selected = 'choose';
    let selectedCount = 'All';
    if (!req.cookies) {
        res.cookie('newsSite', selected, {
            maxAge: 1000 * 600, //время жизни в секундах
            httpOnly: true, //только для бэкенда
        });
        res.cookie('newsCount', selectedCount, {
            maxAge: 1000 * 600, //время жизни в секундах
            httpOnly: true, //только для бэкенда
        });
    } else {
        selected = req.cookies.newsSite ? req.cookies.newsSite : selected;
        selectedCount = req.cookies.newsCount ? req.cookies.newsCount : selectedCount;
    }
    const textArray = [];
    res.render('parse', {
        textArray,
        selected,
        selectedCount,
    });
}

exports.get = getRequest;

exports.post = async(req, res, next) => {
    if (!req.cookies) { //request sent from dev tool
        getRequest(req, res, next);
        return;
    }
    console.log('req.cookies:', req.cookies);
    const selected = req.body.newsSite ? req.body.newsSite : 'choose';
    const selectedCount = req.body.newsCount ? req.body.newsCount : 'All';
    if (!req.cookies || !req.cookies.newsSite || selected !== req.cookies.newsSite || selectedCount !== req.cookies.newsCount) {
        res.cookie('newsSite', selected, {
            maxAge: 1000 * 600, //время жизни в секундах
            httpOnly: true, //только для бэкенда
        });
        res.cookie('newsCount', selectedCount, {
            maxAge: 1000 * 600, //время жизни в секундах
            httpOnly: true, //только для бэкенда
        });
    }
    try {
        const textArray = selected === 'choose' ? [] : await getParsedData(selected, selectedCount);
        res.render('parse', {
            textArray,
            selected,
            selectedCount,
        });
    } catch (error) {
        console.error(error);
        res.render('parse', {
            error,
            selected,
            selectedCount,
        });
    }
};