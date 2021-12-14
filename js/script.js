'use strict';

const h1Title = document.querySelector('h1');
const btnHandler = document.getElementById('start');
const btnReset = document.getElementById('reset');
const btnScreen = document.querySelector('.screen-btn');
const otherPercents = document.querySelectorAll('.other-items.percent');
const otherNumbers = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback > div > input');
const spanRangeValue = document.querySelector('.rollback > div > .range-value');
const inputHtml = document.getElementsByClassName('total-input')[0];
const inputScreens = document.getElementsByClassName('total-input')[1];
const inputService = document.getElementsByClassName('total-input')[2];
const inputFullPrice = document.getElementsByClassName('total-input')[3];
const inputRollback = document.getElementsByClassName('total-input')[4];
const cmsOpen = document.querySelector('#cms-open');
let screens = document.querySelectorAll('.screen');

const appData = {
    screens: [],
    screenPrice: 0,
    rollback: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    fullPrice: 0,
    servicePercentPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    screenCount: 0,
    isError(screnns) {
        let isError = [];
        this.screens = [];
        screens = document.querySelectorAll('.screen');
        screens.forEach((elem, index) => {
            const select = elem.querySelector('select');
            const input = elem.querySelector('input');
            const mainControlsSelect = elem.querySelector('.main-controls__select');
            const mainControlsInput = elem.querySelector('.main-controls__input');
            const pError = document.createElement('p');
            pError.style.color = 'red';
            pError.style.fontSize = 12 + 'px';
            if(!select.value) {
                pError.textContent = '*Неоходимо выбрать тип экранов!';
                if(!mainControlsSelect.querySelector('p')) {
                    mainControlsSelect.insertAdjacentElement('beforeend', pError);
                }
                select.style.backgroundColor = '#ffc7c7';
            } else if(!parseInt(input.value)) {
                if(mainControlsSelect.querySelector('p')) {
                    mainControlsSelect.removeChild(mainControlsSelect.querySelector('p'));
                }
                pError.textContent = '*Необходимо ввести количество экранов!';
                if(!mainControlsInput.querySelector('p')) {
                    mainControlsInput.insertAdjacentElement('beforeend', pError);
                }
                select.style.backgroundColor = '#fff';
                input.style.backgroundColor = '#ffc7c7';
            } else {
                if(mainControlsSelect.querySelector('p')) {
                    mainControlsSelect.removeChild(mainControlsSelect.querySelector('p'));
                }
                if(mainControlsInput.querySelector('p')) {
                    mainControlsInput.removeChild(mainControlsInput.querySelector('p'));
                }
                select.style.backgroundColor = '#fff';
                input.style.backgroundColor = '#fff';
                isError.push(false);
            }
        });
        if(isError.length < screens.length) {
            isError = true;
        } else {
            isError = false;
        }
        return isError;
    },
    clearValues() {
        inputHtml.value = '0';
        inputService.value = '0';
        inputFullPrice.value = '0';
        inputRollback.value = '0';
        inputScreens.value = '0';
    },
    addPrices() {
        this.servicePricesNumber = 0;
        this.servicePricesPercent = 0;
        this.screenPrice = this.screens.reduce((prices1, prices2) => {
            return prices1 + prices2.price;
        }, 0);
        for(let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        for(let key in this.servicesPercent) {
            console.log(typeof this.screenPrice);
            console.log(typeof this.servicesPercent[key]);
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key]/100);
        }
        this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback/100)));
        this.screenCount = this.screens.reduce( (count1, count2) => {
            return count1 + count2.screenCount;
        }, 0);
    },
    disabledNodes() {
        screens.forEach( elem => {
            const select = elem.querySelector('select');
            const input = elem.querySelector('input');
            select.setAttribute('disabled', 'disabled');
            input.setAttribute('disabled', 'disabled');
        });
        otherPercents.forEach( elem => {
            const input = elem.querySelector('input');
            input.setAttribute('disabled', 'disabled');
        });
        otherNumbers.forEach( elem => {
            const input = elem.querySelector('input');
            input.setAttribute('disabled', 'disabled');
        });
        cmsOpen.setAttribute('disabled', 'disabled');
    },
    anabledNodes() {
        screens.forEach( elem => {
            const select = elem.querySelector('select');
            const input = elem.querySelector('input');
            select.removeAttribute('disabled');
            input.removeAttribute('disabled');
        });
        otherPercents.forEach( elem => {
            const input = elem.querySelector('input');
            input.removeAttribute('disabled');
        });
        otherNumbers.forEach( elem => {
            const input = elem.querySelector('input');
            input.removeAttribute('disabled');
        });
        cmsOpen.removeAttribute('disabled');
    },
    reset() {
        this.screens = [];
        console.log(screens);
        this.showResult();
    },
    init() {
        this.addTitle();
        inputRange.addEventListener('input', () => {
            spanRangeValue.textContent = inputRange.value + '%';
            this.rollback = inputRange.value;
            if(inputHtml.value > '0') {
                spanRangeValue.textContent = inputRange.value + '%';
                this.rollback = inputRange.value;
                this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback/100)));
                inputRollback.value = this.servicePercentPrice;
            }
        });
        btnHandler.addEventListener('click', (event) => {
            event.preventDefault();
            this.clearValues();
            if(!this.isError()) {
                this.start();
                btnHandler.style.display = 'none';
                btnReset.style.display = 'block';
                btnScreen.style.display = 'none';
                this.disabledNodes();
            }
        });
        btnReset.addEventListener('click', event => {
            event.preventDefault();
            this.anabledNodes();
            btnHandler.style.display = 'block';
            btnReset.style.display = 'none';
            btnScreen.style.display = 'block';
            this.reset();
        });
        btnScreen.addEventListener('click', (event) => {
            event.preventDefault();
            this.addScreenBlock();
        });
    },
    addTitle() {
        document.title = h1Title.textContent;
    },
    start() {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
        this.logger();
    },
    showResult() {
        inputHtml.value = this.screenPrice;
        inputService.value = this.servicePricesNumber + this.servicePricesPercent;
        inputFullPrice.value = this.fullPrice;
        inputRollback.value = this.servicePercentPrice;
        inputScreens.value = this.screenCount;
    },
    addScreens() {
        this.screens = [];
        screens = document.querySelectorAll('.screen');
        screens.forEach( (elem, index) => {
            const select = elem.querySelector('select');
            const input = elem.querySelector('input');
            const selectedIndex = select.options[select.selectedIndex].textContent;
            this.screens.push({
                id: index, 
                name: selectedIndex, 
                price: +select.value * parseInt(input.value),
                screenCount: parseInt(input.value)
            });
        });
    },
    addServices() {
        this.servicesPercent = {};
        this.servicesNumber = {};
        otherPercents.forEach( elem => {
            const check = elem.querySelector('input[type=checkbox]');
            const label = elem.querySelector('label');
            const input = elem.querySelector('input[type=text]');
            if(check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherNumbers.forEach( elem => {
            const check = elem.querySelector('input[type=checkbox]');
            const label = elem.querySelector('label');
            const input = elem.querySelector('input[type=text]');
            if(check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock() {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    logger() {
        // for (let key in appData) {
        //     if(typeof appData[key] !== 'function') {
        //         console.log('Переменая appData: ', key);
        //     } else {
        //         console.log('Метод appData: ', key);
        //     }
        // }
        console.log(appData.screens);
        console.log('fullPrice ', this.fullPrice);
        console.log('this.servicePercentPrice ', this.servicePercentPrice);
        console.log(this);
        console.log('inputRange: ', inputRange);
        console.log('spanRangeValue: ', spanRangeValue);
        console.log(this.rollback);
    },

};


appData.init();