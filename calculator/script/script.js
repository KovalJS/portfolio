//11.1урок 
'use strict';

const buttonCalculate = document.getElementById('start'),        //Кнопка Расчитать
      buttonCancel = document.getElementById('cancel'),          //Кнопка Сбросить
      battonPlus1 = document.getElementsByTagName('button')[0],  //Кнопка + Дополнительный доход
      battonPlus2 = document.getElementsByTagName('button')[1],  //Кнопка + Обязательные расходы
      depositCheck = document.querySelector('#deposit-check'),   //чекбокс
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'), //поля для ввода возможных доходов 
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],  //имеют класс название-value
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0], //Накопления за период
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],  //Срок достижения цели в месяцах
      budgetMonthValue = document.querySelector('.budget_month-value'), //Доход за месяц
      periodSelect = document.querySelector('.period-select'),          //range элемент
      periodAmount = document.querySelector('.period-amount'),           //range, значение
      salaryAmount = document.querySelector('.salary-amount'),   //Месячный доход
      incomeTitle = document.querySelectorAll('.income-title'),   //Дополнительный доход,Наименование
      expensesTitle = document.querySelectorAll('.expenses-title'), //Обязательные расходы,Наименование
      additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Возможные расходы
      targetAmount = document.querySelector('.target-amount'), // Цель, сумма
      dataElement = document.querySelector('.data'), //все поля с левой стороны
      inputElement = dataElement.querySelectorAll('input'), //поля input с левой стороны
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'), // Сумма депозита input
      depositPercent = document.querySelector('.deposit-percent'); // Процент депозита input
let expensesItems = document.querySelectorAll('.expenses-items'), //Обязательные расходы
    incomeItem = document.querySelectorAll('.income-items'),  //Дополнительный доход
    inputTypeText = dataElement.querySelectorAll('input[type=text]'); //поля input[type=text] с левой стороны

class AppData {
    constructor() {
        this.budget = 0;           //Месячный доход
        this.budgetDay = 0;        // дневной бюджет,учитывая бюджет на месяц
        this.budgetMonth = 0;      // бюджет на месяц   
        this.expensesMonth = 0;    //сумма всех обязательных расходов
        this.income = {};          //Дополнительный доход
        this.incomeMonth= 0;       //Сумма ,Дополнительный доход
        this.addIncome = [];       // Возможный доход
        this.expenses = {};        //дополнительные расходы //Обязательные расходы
        this.addExpenses = [];     //возможные расходы
        this.deposit = false;
        this.percentDeposit= 0;    //процент депозита
        this.moneyDeposit= 0;    
    }    

    start () {  
        this.budget = +salaryAmount.value;  //Месячный доход  
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAdd();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();
        this.blockButton();
    }

    showResult () { // Выводит результаты вычислени
        budgetMonthValue.value = this.budgetMonth;         //Доход за месяц = // бюджет на месяц  
        budgetDayValue.value = this.budgetDay;             //Дневной бюджет
        expensesMonthValue.value = this.expensesMonth;     //Расход за месяц = //сумма всех обязательных расходов 
        additionalExpensesValue.value = this.addExpenses.join(', ');  //возможные расходы
        additionalIncomeValue.value = this.addIncome.join(', ');   //Возможный доход
        targetMonthValue.value = Math.ceil(this.getTargetMonth()); //Срок достижения цели в месяцах
        incomePeriodValue.value = this.calcSavedMoney(); //Накопления за период
    }

    addBlock (Items, battonPlus, classItems) {
        const cloneItem = Items[0].cloneNode(true);
        Items[0].parentNode.insertBefore(cloneItem, battonPlus);
        Items = document.querySelectorAll(classItems);  //Обязательные расходы,input
                                                        //Дополнительный доход ,input
        if (Items.length === 3) {
            battonPlus.style.display = 'none';
        }  
        
        buttonCancel.addEventListener('click', () => {
            cloneItem.remove();
            battonPlus.style.display = 'block';
        });
    }

    getExpenses () {   //Все //Обязательные расходы
        expensesItems = document.querySelectorAll('.expenses-items');
        const itemExpenses = [];
        const cashExpenses = [];
        for (let i = 0; i < expensesItems.length; i++) {
            itemExpenses.push(expensesItems[i].querySelector('.expenses-title'));
            cashExpenses.push(expensesItems[i].querySelector('.expenses-amount'));
        }
        
        for (let i = 0; i < itemExpenses.length; i++) { 
            if (itemExpenses[i].value !== '' && cashExpenses[i].value !== '') {
                this.expenses[itemExpenses[i].value] = cashExpenses[i].value;
            }
        }
    }

    getIncome () { //Дополнительный доход
        incomeItem = document.querySelectorAll('.income-items');
        const itemIncome = [];
        const cashIncome = [];
        for (let i = 0; i < incomeItem.length; i++) {
            itemIncome.push(incomeItem[i].querySelector('.income-title'));
            cashIncome.push(incomeItem[i].querySelector('.income-amount'));
        }
        
        for (let i = 0; i < itemIncome.length; i++) { 
            if (itemIncome[i].value !== '' && cashIncome[i].value !== '') {
                this.income[itemIncome[i].value] = cashIncome[i].value;
            }
        }
            
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }     
    }

    getAdd () { //Возможные расходы
        let addExpenses = additionalExpensesItem.value.split(',');
        
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });

        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        }); 
    }

    getExpensesMonth () {   
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key]; //cумма всех расходов за месяц
        } 
    }

    getBudget () {               
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12; //Накопления за месяц,бюджет на месяц
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth () {                   
        return targetAmount.value / this.budgetMonth;     //за какой период будет достигнута цель
    }

    getStatusIncome () {                                 //уровень дохода
        if (this.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (this.budgetDay >= 300 && this.budgetDay <= 800) {
            return ('Средний уровень дохода');
        }
        else if (this.budgetDay >= 0 && this.budgetDay < 300) {
            return ('Низкий уровень дохода');
        }
        else if (this.budgetDay < 0 ) {
            return ('Что то пошло не так');
        }
    }

    getInfoDeposit () {  
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;    
        }
    }

    calcSavedMoney () {
        return this.budgetMonth * periodSelect.value;  //сколько заработаем за переиод
    }

    blockButton () {
        inputTypeText = dataElement.querySelectorAll('input[type=text]');
        inputTypeText.forEach((item) => {  // Блокирует input  и скрывает кнопку Расчитать
            item.disabled = true;
        }); 

                
        buttonCalculate.style.display = 'none';
        buttonCancel.style.display = 'block';
    }

    reset () { 
        inputTypeText.forEach((item) => {
            item.disabled = false;
        });

        buttonCalculate.style.display = 'block';
        buttonCancel.style.display = 'none';

        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositCheck.checked = false;
        this.deposit = false;
        

        let allInput = document.querySelectorAll('input');
        allInput.forEach((item) => {
            item.value = item.defaultValue;
        });

        periodAmount.textContent = periodSelect.value;

        for (let member in this) {
            
            if (typeof this[member] !== 'function' && typeof this[member] !== 'object' && typeof this[member] !== 'boolean') {
                this[member] = 0;      
            }
            
            if (member === 'income' || member === 'expenses') {
                this[member] = {};
            }

            if (member === 'addIncome' || member === 'addExpenses') {
                this[member] = [];
            }

        }
    }

    eventListenets  () {
        const _this = this;
        buttonCalculate.addEventListener('click', () => {
            if (document.querySelector('.salary-amount').value !== '') {
                this.start();
            } else {
                alert('Вы не заполнили поле "Месячный доход"!')
            }
        });
        
        buttonCancel.addEventListener('click',() => {
            this.reset();
        });
        
        battonPlus2.addEventListener('click', () => this.addBlock(expensesItems, battonPlus2, '.expenses-items'));  //Обязательные расходы,batton
        battonPlus1.addEventListener('click', () => this.addBlock(incomeItem, battonPlus1, '.income-items')); //Дополнительный доход ,batton
        
        periodSelect.addEventListener('input', (event) => {
            periodAmount.textContent = periodSelect.value;
        });
        
        periodSelect.addEventListener('input',(event) => {
            incomePeriodValue.value =  this.budgetMonth * periodSelect.value;
        });

        depositCheck.addEventListener('change', () => {
            if (depositCheck.checked) {
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                this.deposit = true;
                depositBank.addEventListener('change', function() {
                    let selectIndex = this.options[this.selectedIndex].value;
                    if (selectIndex === 'other') {
                        depositPercent.style.display = 'inline-block';
                        depositPercent.disabled = '';
                        depositPercent.value = '';
                    } else {
                        depositPercent.style.display = 'none'; 
                        depositPercent.value = selectIndex;
                    }
                });
            } else {
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositAmount.value = '';
                this.deposit = false;
            }
        });
    }

}

const appData = new AppData();
appData.eventListenets();

   
   
