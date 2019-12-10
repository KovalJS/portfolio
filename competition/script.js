window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //ajax запрос
    const getData = () => {
        return new Promise ((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open('GET', './dbHeroes.json');
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) return;
                
                if(request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.statusText);
                }
            });
            request.send();
        });
    };
    
   getData()
   .then(practice)
   .catch(error => {console.error(error)});

    function practice(response) {
        
        const cards = response.map(({photo, name, actors, movies, status}) => ({photo,name, actors, movies, status})),
            movies = cards.reduce((accum, item) => accum.concat(item.movies),[]),
            filterMovies = movies.filter((item, i) => movies.indexOf(item) === i && item),
            dropdownElem =  document.querySelector('.dropdown'),
            col4 = document.createElement('div'),
            cardDeck = document.createElement('div'),
            card = document.createElement('div'),
            elements = document.querySelector('.elements'),
            scrollToTop = document.querySelector('.scrollToTop');

        let dropdownMenu = document.querySelector('.dropdown-menu');

        col4.classList.add('col-4','mb-4');  
        cardDeck.classList.add('card-deck');
        card.classList.add('card','text-left');
        const cloneCard = card.cloneNode(true);
            cardDeck.append(cloneCard);
        const cloneCardDeck = cardDeck.cloneNode(true);
            col4.append(cloneCardDeck);
        
        //Вывод всех карточек
        const allСards = () => {
            cards.map(({photo, name, actors, movies, status},i) => {
                const cloneCol4 = col4.cloneNode(true);
                elements.append(cloneCol4);
                cloneCol4.querySelector('.card').innerHTML = `
                <img src="${photo}" class="card-img-top" alt="photo">
                <div class="card-body">
                    <p>${name}</p>
                    <p>${actors}</p>
                    <p>${movies}</p>
                    <p>${status}</p>
                </div>    
                `;
            });
        };
    
        allСards();

        //Выбранные карточки
        const newCards = (newArr) => {
            newArr.map(({photo, name, actors, movies, status},i) => {
                const cloneCol4 = col4.cloneNode(true);
                elements.append(cloneCol4);
                cloneCol4.querySelector('.card').innerHTML = `
                <img src="${photo}" class="card-img-top" alt="photo">
                <div class="card-body">
                    <p>${name}</p>
                    <p>${actors}</p>
                    <p>${movies}</p>
                    <p>${status}</p>
                </div>    
                `;
            });
        };    

        //dropdown
        const dropdownMovies = () => {
            const dropdownItem = document.createElement('a');

            dropdownItem.classList.add('dropdown-item');
            
            filterMovies.forEach((item, i) => {
                let cloneItem = dropdownItem.cloneNode(true);
                cloneItem.textContent = item;
                dropdownMenu.append(cloneItem);
            });
        };

        dropdownMovies(); 
        
        //фильтрация карточек
        const sortMovie = (content) => {
            const newArr = cards.filter(item => {
                if (item.movies) {
                    return item.movies.includes(content); 
                }
            });
            newCards(newArr);   
        };  
        
        //clear
        const clearCards = () => {
            document.querySelectorAll('.col-4').forEach(item => {
                item.remove();
            });
        };

        //scroll display
        window.addEventListener('scroll', function() {
            if (document.documentElement.scrollTop > 350) {
                scrollToTop.style.display = 'block';
            } else {
                scrollToTop.style.display = 'none';
            }
        });

        //scroll up
        scrollToTop.addEventListener('click', () => {
            document.documentElement.scrollTop = 0;
        });

        document.querySelector('.btn-all').addEventListener('click', () => {
            clearCards();
            allСards();
        });
         
        //Выбор фильма
        dropdownElem.addEventListener('click', (event) => {
            if (event.target.className === 'dropdown-item') {
                document.querySelector('.dropdown-toggle').textContent = event.target.textContent;
                clearCards();
                sortMovie(event.target.textContent);
            }
        });    
    }
    
});