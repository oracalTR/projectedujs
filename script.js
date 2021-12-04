'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    rollback: 5,
    adaptive: true,
    service1: '',
    servicePrice1: 0,
    service2: '',
    servicePrice2: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    asking: function() {
        this.title = this.answerName('Введите название проекта');
        this.screens = this.answerName('Введите тип экрана', 'Пример: Простые, Сложные, Интерактивные');
        this.screenPrice = this.answerPrice('Сколько будет стоить данная работа?');
        this.adaptive = confirm('Нужен ли адптив на сайте? Нажмите ОK для сайта с адаптивом.');
    },
    answerName(textAnswer, placeHold) {
        let answer;
        do {
            answer = prompt(textAnswer, placeHold);
            if(answer === 'string') {
                answer = answer.trim();
            }
        } while (parseInt(answer) || answer == "" || isFinite(answer));
        return answer;
    },
    answerPrice(textAnswer) {
        let answer;
        do {
            answer = parseInt(prompt(textAnswer));
            if(answer === 'string') {
                answer = answer.trim();
            }
        } while (isNaN(answer) || answer == 0 || answer == "" || answer == null || answer == 'indefined');
        return answer;
    },
    getAllServicePrices() {
        let sum = 0;
        for(let i = 1; i < 3; i++) {
            if(i === 1) {
                this.service1 = this.answerName('Какой дополнительный тип услуги нужен?');
                this.servicePrice1 = this.answerPrice('Сколько это будет стоить?');
                sum += this.servicePrice1;
            } else if(i === 2) {
                this.service2 = this.answerName('Какой дополнительный ещё тип услуги нужен?');
                this.servicePrice2 = this.answerPrice('Сколько это будет стоить?');
                sum += this.servicePrice2;
            }
        }
        return sum;
    },
    getFullPrice(price, service) {
        this.fullPrice = price + service;
    },
    getTitle(text) {
        this.title = text.toUpperCase().trim().substr(0, 1) + text.toLowerCase().trim().substr(1);
    },
    getServicePercentPrices(price, donat) {
        this.servicePercentPrice = Math.ceil(price - (price * (donat/100)));
    },
    getRollbackMessage(price) {
        if (price > 0 && price < 15000) {
            return `Стоимость сайта ${price} рублей - Скидка не предусмотрена`;
        } else if (price >= 15000 && price < 30000) {
            return `Стоимость сайта ${price} рублей - Даем скидку в 5%`;
        } else if (price >= 30000) {
            return `Стоимость сайта ${price} рублей - Даем скидку в 10%`;
        } else {
            return `Стоимость сайта ${price} Ошибка: Что то пошло не так!`;
        }
    },
    getDonateDezing(price, donat) {
        return this.fullPrice * (this.rollback/100);
    },
    start() {
        this.asking();
        this.getTitle(this.title);
        this.allServicePrices = this.getAllServicePrices();
        this.getFullPrice(this.screenPrice, this.allServicePrices);
        this.getServicePercentPrices(this.fullPrice, this.rollback);
        this.logger();

        
    },
    logger() {
        for (let key in appData) {
            if(typeof appData[key] !== 'function') {
                console.log('Переменая appData: ', key);
            } else {
                console.log('Метод appData: ', key);
            }
        }
        console.log('title ', this.title);
        console.log('fullPrice ', this.fullPrice);
        console.log('allServicePrices ', this.allServicePrices);
    },

};


appData.start();