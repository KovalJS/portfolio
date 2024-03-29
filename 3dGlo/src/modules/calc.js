const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

    const enterNumbers = () => {
        let numberInput = document.querySelectorAll('input[type="number"]');
    
        numberInput.forEach((item) => {
            item.setAttribute('type', 'text');
            item.removeAttribute('min');
            item.removeAttribute('step');
    
            item.addEventListener('input', (event) => {
                event.target.value = event.target.value.replace(/\D/g, '');
            });
        });
                
    };
    
    enterNumbers();
        

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
        } else {
            total = 0;
        }

        totalValue.textContent = total;
    };   

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;
            
        if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });
};

export default calc;