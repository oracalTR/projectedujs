'use strict';
const title = 'Projectedujs';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 1500;
let rollback = 5;
let fullPrice = 10000;
let adaptive = true;

console.log('title: ', typeof title);
console.log('fullPrice: ', typeof fullPrice);
console.log('adaptive: ', typeof adaptive);
console.log('screens: ', screens.length);
console.log('screenPrice: ', screenPrice + ' рублей');
console.log('fullPrice: ', `${fullPrice} рублей`);
console.log('Массив screens: ', screens.toLowerCase().split(','));
console.log(`Процент отката дизайнеру за клиента ${fullPrice * (rollback/100)} рублей`);
console.log('Изучаем JS');
alert('Изучаем JS');