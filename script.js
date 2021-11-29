'use strict';
const title = AnwerService('Введите название проекта');
let screens = AnwerService('Введите тип экрана', 'Пример: Простые, Сложные, Интерактивные');
let screenPrice = parseInt(AnwerService('Сколько будет стоить данная работа?'));
let rollback = 5;
let adaptive = confirm('Нужен ли адптив на сайте? Нажмите ОK для сайта с адаптивом.');
let service1 = AnwerService('Какой дополнительный тип услуги нужен?');
let servicePrice1 = parseInt(AnwerService('Сколько это будет стоить?')) || 0;
let service2 = AnwerService('Какой дополнительный ещё тип услуги нужен?');
let servicePrice2 = parseInt(AnwerService('Сколько это будет стоить?')) || 0;
let fullPrice = screenPrice + servicePrice1 + servicePrice2 || 0;
let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback/100)));

function AnwerService(textAnswer, placeHold) {
    let answer = prompt(textAnswer, placeHold);
    if(answer.trim()) {
        return answer;
    } else {
        AnwerService(textAnswer, placeHold);
    }
}

console.log('servicePercentPrice:' , servicePercentPrice);

if (fullPrice > 0 && fullPrice < 15000) {

    console.log(`Стоимость сайта ${fullPrice} рублей - Скидка не предусмотрена`);

} else if (fullPrice >= 15000 && fullPrice < 30000) {

    console.log(`Стоимость сайта ${fullPrice} рублей - Даем скидку в 5%`);

} else if (fullPrice >= 30000) {

    console.log(`Стоимость сайта ${fullPrice} рублей - Даем скидку в 10%`);

} else {
    console.log(`Стоимость сайта ${fullPrice} Ошибка: Что то пошло не так!`);
}

console.log('title: ', typeof title);
console.log('fullPrice: ', typeof fullPrice);
console.log('adaptive: ', typeof adaptive);
console.log('screens: ', screens.length);
console.log('screenPrice: ', screenPrice + ' рублей');
console.log('fullPrice: ', `${fullPrice} рублей`);
console.log('Массив screens: ', screens.toLowerCase().split(','));
console.log(`Процент отката дизайнеру за клиента ${fullPrice * (rollback/100)} рублей`);
console.log('Изучаем JS');
//alert('Изучаем JS');