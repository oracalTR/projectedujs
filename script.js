'use strict';
let title;
let screens;
let screenPrice;
let rollback = 5;
let adaptive;
let service1;
let servicePrice1;
let service2;
let servicePrice2;
let fullPrice = 0;
let servicePercentPrice;
let allServicePrices;


const asking = function() {
    title = answerName('Введите название проекта');
    screens = answerName('Введите тип экрана', 'Пример: Простые, Сложные, Интерактивные');
    screenPrice = answerPrice('Сколько будет стоить данная работа?');
    adaptive = confirm('Нужен ли адптив на сайте? Нажмите ОK для сайта с адаптивом.');
};

function answerName(textAnswer, placeHold) {
    let answer;
    do {
        answer = prompt(textAnswer, placeHold);
        if(answer === 'string') {
            answer = answer.trim();
        }
    } while (parseInt(answer) || answer == "" || isFinite(answer));
    return answer;
}

function answerPrice(textAnswer) {
    let answer;
    do {
        answer = parseInt(prompt(textAnswer));
        if(answer === 'string') {
            answer = answer.trim();
        }
    } while (isNaN(answer) || answer == 0 || answer == "" || answer == null || answer == 'indefined');
    return answer;
}

const getAllServicePrices = function() {
    let sum = 0;
    for(let i = 1; i < 3; i++) {
        if(i === 1) {
            service1 = answerName('Какой дополнительный тип услуги нужен?');
            servicePrice1 = answerPrice('Сколько это будет стоить?');
            sum += servicePrice1;
        } else if(i === 2) {
            service2 = answerName('Какой дополнительный ещё тип услуги нужен?');
            servicePrice2 = answerPrice('Сколько это будет стоить?');
            sum += servicePrice2;
        }
    }
    return sum;
};

function getFullPrice(price, service) {
    fullPrice = price + service;
}

const getTitle = (text) => {
    title = text.toUpperCase().trim().substr(0, 1) + text.toLowerCase().trim().substr(1);
};

const getServicePercentPrices = (price, donat) => {
    servicePercentPrice = Math.ceil(price - (price * (donat/100)));
};

function getRollbackMessage(price) {
    if (price > 0 && price < 15000) {
        return `Стоимость сайта ${price} рублей - Скидка не предусмотрена`;
    } else if (price >= 15000 && price < 30000) {
        return `Стоимость сайта ${price} рублей - Даем скидку в 5%`;
    } else if (price >= 30000) {
        return `Стоимость сайта ${price} рублей - Даем скидку в 10%`;
    } else {
        return `Стоимость сайта ${price} Ошибка: Что то пошло не так!`;
    }
}

const getDonateDezing = (price, donat) => {
    return fullPrice * (rollback/100);
};

function showTypeOf(variable) {
    return `${typeof variable}`;
}

asking();
getTitle(title);
allServicePrices = getAllServicePrices();
getFullPrice(screenPrice, allServicePrices);
getServicePercentPrices(fullPrice, rollback);


console.log('allServicePrices: ', allServicePrices);
console.log('title: ', showTypeOf(title));
console.log('fullPrice: ', showTypeOf(fullPrice));
console.log('adaptive: ', showTypeOf(adaptive));
console.log('Массив screens: ', screens.toLowerCase().split(','));
console.log('сообщение о скидке пользователю: ', getRollbackMessage(fullPrice));
console.log(`стоимость за вычетом процента отката посреднику ${servicePercentPrice} рублей`);