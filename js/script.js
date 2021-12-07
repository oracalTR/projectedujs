'use strict';

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 5,
    adaptive: true,
    services: {},
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    asking: function() {
        this.title = this.answerName('Введите название проекта');
        // this.screens = this.answerName('Введите тип экрана', 'Пример: Простые, Сложные, Интерактивные');
        for(let i = 1; i < 3; i++) {
            let name = this.answerName('Введите тип экрана', 'Пример: Простые, Сложные, Интерактивные');
            let price = this.answerPrice('Сколько будет стоить данная работа?');
            this.screens.push({id: i, name: name, price: price});
        }
        // this.screenPrice = this.answerPrice('Сколько будет стоить данная работа?');
        this.adaptive = confirm('Нужен ли адптив на сайте? Нажмите ОK для сайта с адаптивом.');
        for(let i = 1; i < 3; i++) {
            let name = this.answerName('Какой дополнительный тип услуги нужен?');
            let price = this.answerPrice('Сколько это будет стоить?');
            this.services[name + i] = price;
        }
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
    addPrices() {
        for(let key in appData.services) {
            this.allServicePrices += appData.services[key];
        }
        this.screenPrice = this.screens.reduce((prices1, prices2) => {
            return prices1.price + prices2.price;
        });
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
        this.addPrices();
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
        console.log(appData.services);
        console.log(appData.screens);
        console.log('title ', this.title);
        console.log('fullPrice ', this.fullPrice);
        console.log('this.allServicePrices', this.allServicePrices);
        console.log('this.servicePercentPrice ', this.servicePercentPrice);
    },

};


appData.start();