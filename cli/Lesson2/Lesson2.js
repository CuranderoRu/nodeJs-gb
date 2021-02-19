/**
 * Консольное приложение реализует функцию игры орел/решка и чтение статистики из всех файлов логов указанной папки
 *
 * @param {Number}    m             Режим запуска: 1 - игра, 2 - чтение логов
 * @param {String}    [l]           Опциональный. В режиме 1 - имя файла лога (по умолчанию 'log'), в режиме 2 - путь к папке с логами
 * 
 * Примеры консольной команды:
 * Режим 1, вариант 1: node cli/Lesson2/Lesson2.js -m 1 -l log
 * Режим 1, вариант 2: node cli/Lesson2/Lesson2.js -m 1
 * Режим 2, вариант 1: node cli/Lesson2/Lesson2.js -m 2 -l 'J:\SharedDocs\Projects\Study\react-gb-2020\cli\Lesson2\logs'
 * Режим 2, вариант 2: node cli/Lesson2/Lesson2.js -m 2
 */
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const readline = require('readline');
const util = require('util');

const args = require('minimist')(process.argv.slice(2), {
    alias: {
        mode: 'm',
        logfile: 'l'
    }
});


// 1) Написать консольную игру "Орел или решка", в которой надо будет
// угадывать выпадающее число(1 или 2).В качестве аргумента
// программа может принимать имя файла для логирования
// результатов каждой партии.В качестве более продвинутой версии
// задания можете реализовать простейшую версию игры Blackjack.

// 2) Сделать программу - анализатор игровых логов.В качестве
// аргумента программа получает путь к файлу.Выведите игровую
// статистику: общее количество партий, количество выигранных /
// проигранных партий и их соотношение, максимальное число побед /
// проигрышей подряд.


const { logfile, mode } = args;
const p = path.resolve(__dirname, '..', 'Lesson2', 'logs');
let logFileName = logfile ? logfile : 'log';

const readFilePromise = util.promisify(fs.readFile);

const parseLogs = async() => {
    let wins = 0,
        loses = 0,
        games = 0,
        repeatedWins = 0,
        repeatedLoses = 0;
    const files = [];
    const logDir = logfile ? logfile : p;
    try {
        fs.readdirSync(logDir).forEach((file) => {
            files.push(file);
        });
    } catch (e) {
        console.error(e);
        process.exit();
    }
    for (let i = 0; i < files.length; i++) {
        let log = '';
        try {
            log = await readFilePromise(`${logDir}\\${files[i]}`, 'utf8');
        } catch (e) {
            console.error(e);
            process.exit();
        }
        const stats = {
            wins: log.match(/:win/g),
            loses: log.match(/:lose/g),
            games: log.match(/guess/g),
            repeatedWins: log.match(/RepeatedWins:[0-9]*/g),
            repeatedLoses: log.match(/RepeatedLoses:[0-9]*/g),
        }
        wins = stats.wins ? wins + stats.wins.length : wins;
        loses = stats.loses ? loses + stats.loses.length : loses;
        games = stats.games ? games + stats.games.length : games;
        repeatedWins = stats.repeatedWins ?
            Math.max(repeatedWins,
                stats.repeatedWins.reduce((initValue, item) => {
                    return Math.max(initValue, parseInt(item.split(":")[1]));
                }, 0)) : repeatedWins;
        repeatedLoses = stats.repeatedLoses ?
            Math.max(repeatedLoses,
                stats.repeatedLoses.reduce((initValue, item) => {
                    return Math.max(initValue, parseInt(item.split(":")[1]));
                }, 0)) : repeatedLoses;
    }
    console.log('Всего игр:', games);
    console.log('Побед:', wins);
    console.log('Поражений:', loses);
    console.log('Соотношение побед/поражений:', wins && loses ?
        `${(wins/Math.max(wins,loses)).toFixed(wins>loses? 0 : 2)}:${(loses/Math.max(wins,loses)).toFixed(loses > wins ? 0 : 2)}` :
        wins ? '100% побед' : '100% поражений');
    console.log('Максимальное число побед подряд:', repeatedWins);
    console.log('Максимальное число поражений подряд:', repeatedLoses);
    process.exit();
}

const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const writeResult = (res) => {
    fs.appendFile(logFileName, `\n${res}`, 'utf8', (err) => {
        if (err) throw err;
    });
}

const askQuestion = (question) => {
    return new Promise((resolve, reject) => {
        r.question('Type 1 or 2 ("quit" to exit)', line => {
            resolve(line);
        })
    })
};

const saveAnalytics = ({ lose, win }) => {
    if (lose > 0) {
        writeResult(`RepeatedLoses:${lose}`);
    }
    if (win > 0) {
        writeResult(`RepeatedWins:${win}`);
    }
}

const runGame = async() => {
    const counters = {
        win: 0,
        lose: 0,
    };
    let intString = 0;
    while (true) {
        try {
            const line = await askQuestion('Type 1 or 2 ("quit" to exit):');
            intString = (Math.random() + 1).toFixed(0);
            if (!line) { continue; }
            saveAnalytics(counters);
            if (line === 'quit') {
                writeResult('log file end');
                r.close();
                return;
            }
            if (line === intString) {
                console.log('You are win!');
                writeResult(`guess ${intString} input ${line} result:win`);
                counters.win++;
                counters.lose = 0;
            } else {
                console.log(`You are lose. Right answer ${intString}.`);
                writeResult(`guess ${intString} input ${line} result:lose`);
                counters.lose++;
                counters.win = 0;
            }
        } catch (e) {
            console.log(e);
            break;
        }
    }
}

if (mode === 1) {
    logFileName = path.resolve(p, `${logFileName}_${moment().format('YYYY_MM_DD_h_mm_ss')}.txt`);
    try {
        console.log('log dir:', fs.statSync(p));
    } catch (e) {
        fs.mkdirSync(p);
    }
    fs.writeFile(logFileName, 'log file begin', 'utf8', (err) => {
        if (err) throw err;
    });
    runGame();
} else if (mode === 2) {
    parseLogs();
} else {
    console.log('Указан неподдерживаемый режим работы');
    process.exit();
}