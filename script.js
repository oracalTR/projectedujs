'use strict';
let title = anwerService('Введите название проекта');
let screens = anwerService('Введите тип экрана', 'Пример: Простые, Сложные, Интерактивные');
let screenPrice = parseInt(anwerService('Сколько будет стоить данная работа?'));
let rollback = 5;
let adaptive = confirm('Нужен ли адптив на сайте? Нажмите ОK для сайта с адаптивом.');
let service1 = anwerService('Какой дополнительный тип услуги нужен?');
let servicePrice1 = parseInt(anwerService('Сколько это будет стоить?')) || 0;
let service2 = anwerService('Какой дополнительный ещё тип услуги нужен?');
let servicePrice2 = parseInt(anwerService('Сколько это будет стоить?')) || 0;
let fullPrice = 0;
let servicePercentPrice;
let allServicePrices;

function anwerService(textAnswer, placeHold) {
    let answer = prompt(textAnswer, placeHold);
    if(answer.trim()) {
        return answer;
    } else {
        anwerService(textAnswer, placeHold);
    }
}

const getAllServicePrices = function(service1, service2) {
    allServicePrices = service1 + service2;
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

getTitle(title);
getAllServicePrices(servicePrice1, servicePrice2);
getFullPrice(screenPrice, allServicePrices);
getServicePercentPrices(fullPrice, rollback);


console.log('title: ', showTypeOf(title));
console.log('fullPrice: ', showTypeOf(fullPrice));
console.log('adaptive: ', showTypeOf(adaptive));
console.log('Массив screens: ', screens.toLowerCase().split(','));
console.log('сообщение о скидке пользователю: ', getRollbackMessage(fullPrice));
console.log(`стоимость за вычетом процента отката посреднику ${servicePercentPrice} рублей`);