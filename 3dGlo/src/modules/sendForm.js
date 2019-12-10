const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
        patternPhone = /^\+380\d{9}$/;
    
    document.querySelectorAll('form').forEach((item) => {
        for (let elem of item.elements) {
            elem.required = '';
            let elemId = elem.id.slice(6);
            elem.addEventListener('input', () => {
                if (elemId === 'name' || elemId === 'message') {
                    elem.value = elem.value.replace(/[^а-яё\s]/ig, '');
                }
            });  
        } 
    });

    const showError = (elem) => { 
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
            
        elem.insertAdjacentElement('afterend', errorDiv);
    };
    
    const showSuccess = (elem) => { 
        elem.classList.remove('error');
            
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    };
    
    const applyStyle = () => {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.textContent = `
            body input.error ,
            .connect .footer-form input.error{
                border: 2px solid red;
            }
    
            .validator-error {
                font-size: 16px;
                font-family: sans-serif;
                color: red;  
            }
    
            #form1 .validator-error{
                 transform: translateY(-3rem);
             }
        `;
    };
    applyStyle();    
     
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white';

    const sendingForm = () => {
        document.querySelectorAll('form').forEach((forma) => {
            forma.addEventListener('submit', (event) => {
                
                for (let elem of event.target.elements) {
                    let elemId = elem.id.slice(6);
                    console.log();
                    if (elemId === 'phone' && !patternPhone.test(elem.value)) {
                        event.preventDefault();
                        showError(elem);
                        return;   
                    } else if (elemId === 'phone' && patternPhone.test(elem.value)) {
                        showSuccess(elem);
                    } if (elemId === 'name' && elem.value.trim() === '') {
                        event.preventDefault();
                        return;
                    } else if (elemId === 'email' && elem.value.trim() === '') {
                        event.preventDefault();
                        return;
                    } else if (elemId === 'message' && elem.value.trim() === '') {
                        event.preventDefault();
                        return;
                    } 
                }
            
                event.preventDefault();
                forma.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(forma);
                let body = {};
                
                formData.forEach((val, key) => {
                    body[key] = val;
                });
               
                postData(body)
                    .then ((response) => {
                        if (response.status !== 200) {
                            throw new Error('status network not 200');
                        }
                        statusMessage.textContent = successMessage;
                        
                        [...forma.elements].forEach((item) => {
                            item.value = '';
                        });
                    })
                    .catch((error) => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    }); 
            });
        });
        
    };
    sendingForm();

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
    };
};

export default sendForm;