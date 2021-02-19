//Run command:
//node cli/Lesson1.js -c colors
//node cli/Lesson1.js -c sound
const fs = require('fs');
const path = require('path')
const colors = require('colors');
const beeper = require('beeper');


const args = require('minimist')(process.argv.slice(2), { alias: { command: 'c' } });

const { command } = args;

//создать с помощью Node.js API консольную
//программу, которая будет выводить что - либо в консоль разными
//цветами и издавать звук(и) с помощью модуля или модулей,
//отличных от рассмотренного на уроке.
switch (command) {
    case 'colors':
        console.log('Просто зеленый текст'.green);
        console.log(colors.red.underline('Красный (подчеркивание не работает)'));
        console.log('Чоренький'.black);
        console.log('Инвертированный с красным фоном'.bgBrightRed.inverse);
        console.log('Джа растафари'.rainbow);
        console.log('Никто не знает как выйдет'.random);
        break;
    case 'sound':
        process.stdout.write('\x07');
        beeper('****-*-*');
        break;

}