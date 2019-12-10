const calc = () => {
    const calcForm = document.querySelector('#card_order'),
        priceTotal = document.querySelector('#price-total'),
        priceMessage = document.querySelector('.price-message'),
        promotionalСode = 'ТЕЛО2019',
        schelkovo = {
            '1': 2999,
            '6': 14990,
            '9': 21990,
            '12': 24990
        },
        mozaika = {
            '1': 1999,
            '6': 9900,
            '9': 13900,
            '12': 19900
        };

    let cardLetoMzaika = calcForm.querySelector('#card_leto_mozaika');    
    if (cardLetoMzaika) {
        cardLetoMzaika = cardLetoMzaika.value;
    }    
    
    let promoDiv = calcForm.querySelector('.price-message'),
        cardTypeVal = '1',
        clubNameVal = cardLetoMzaika,
        targetValue = '',
        inputDiv;

        
    if (promoDiv) {
        inputDiv = promoDiv.querySelector('input');
    }   
    
    const cards = (target) => {
        if (priceMessage) {
            targetValue = priceMessage.querySelector('input').value;
        }
        
        if(target.checked && target.name === 'card-type') {
            cardTypeVal = target.value;
        } else if(target.checked && target.name === 'club-name') {
            clubNameVal = target.value;  
        }
    };

    
   
    [...calcForm].forEach(target => {
        cards(target);
        target.addEventListener('click', (event) => {
            let target = event.target;
            cards(target);
            if (target.name !== 'name' && target.name !== 'phone' && target.type !== 'checkbox') {
                promo(targetValue,cardTypeVal,clubNameVal);
            }
        });

    }); 

    const promo = (targetValue,cardTypeVal,clubNameVal) => {
        if (targetValue === undefined) {
            targetValue = '';
        }
        
        if (targetValue.toUpperCase() === promotionalСode && priceTotal) {
            if (clubNameVal === 'mozaika') { 
                priceTotal.textContent = Math.floor(mozaika[cardTypeVal] - (mozaika[cardTypeVal] * 0.30)); 
            } else if (clubNameVal === 'schelkovo') { 
                priceTotal.textContent = Math.floor(schelkovo[cardTypeVal] - (schelkovo[cardTypeVal] * 0.30));
            }
        } else if (targetValue.toUpperCase() !== promotionalСode && priceTotal){
            if (clubNameVal === 'mozaika') { 
                priceTotal.textContent = mozaika[cardTypeVal]; 
            } else if (clubNameVal === 'schelkovo') { 
                priceTotal.textContent = schelkovo[cardTypeVal]; 
            }
        }
    };

    if (promoDiv) {
        promoDiv.addEventListener('input', (event) => {
            targetValue = event.target.value; 
            promo(targetValue,cardTypeVal,clubNameVal); 
        });
    }

    promo(targetValue,cardTypeVal,clubNameVal);

    calcForm.addEventListener('click', () => {
        
            [...calcForm].forEach(target => {
                cards(target);
            });
            
            if (inputDiv) {
                targetValue = inputDiv.value;
            }
            
            promo(targetValue,cardTypeVal,clubNameVal);
         
    });

    
};

export default calc;