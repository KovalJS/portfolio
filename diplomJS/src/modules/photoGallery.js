const photoGallery = () => {
    const gallerySlider = document.querySelector('.gallery-slider'),
        slide = gallerySlider.querySelectorAll('.slide');    

    const buttonGallery = () => {
        const elemPrevGallery = document.createElement('a'),
            elemNextGallery = document.createElement('a');
            
        elemPrevGallery.id = 'btn-left';
        elemNextGallery.id = 'btn-right';
        elemPrevGallery.classList.add('gallery-btn', 'prev-btn');
        elemNextGallery.classList.add('gallery-btn', 'next-btn');

        gallerySlider.appendChild(elemPrevGallery); 
        gallerySlider.appendChild(elemNextGallery); 

    };
    buttonGallery();

    const setDotElement = () => {  
        let dotElement = document.createElement('li'),
            ulElement = document.createElement('ul'),
            widthWindow = document.documentElement.clientWidth;
            dotElement.classList.add('dot-rectangle');
            ulElement.classList.add('gallery-dot');
        
        for (let i = 0; i < slide.length; i++) {
            let cloneDotElement = dotElement.cloneNode(true);
            ulElement.appendChild(cloneDotElement);
        
            if (i === 0) {
            cloneDotElement.classList.add('dot-active'); 
            }
        }  
        gallerySlider.appendChild(ulElement);

        if (widthWindow < 768) {
            ulElement.style.display = 'none';
        }  
    };
    setDotElement();
    
    const addStyle = () => {
        const style = document.createElement('style');
        style.id = 'style-gallery';
        style.textContent = `
            .gallery-dot {
                position: absolute;
                bottom: 20px;
                width: 85%;
                margin: 20px auto 0;
                display: flex;
                justify-content: center;
                z-index: 5;
            }  
            
            .gallery-dot .dot-rectangle {
                cursor: pointer;
                height: 2px;
                width: 30px;
                margin: 0 5px;
                border: 2px solid #fff;
                display: inline-block;
            }

            .gallery-slider {
                position: relative;
            }

            .gallery-btn {
                position: absolute;
                top: 45%;
                width: 35px;
                height: 35px;
                background-color: #ffd11a;
                background-repeat: no-repeat;
                background-size: 8px;
                border-radius: 50%;
                cursor: pointer;
            }

            .gallery-btn.prev-btn {
                left: 0;
                z-index: 5;
                background-image: url('./images/arrow-left.png');
                background-position: 45% 50%;
            }  
            
            .gallery-btn.next-btn {
                right: 0;
                z-index: 5;
                background-image: url('./images/arrow-right.png');
                background-position: 50% 50%;
            }

            .dot-rectangle.dot-active {
                border-color: #ffd11a;    
            }
        `;
        document.head.appendChild(style);
    };
    addStyle();

    const dotКectangle = document.querySelectorAll('.dot-rectangle');
    
    let currentSlide = 0,
        intervalId;

    slide.forEach((item, i) => {
        if (i === 0) {
            item.style.display = 'block'; 
        } else {
            item.style.display = 'none';
        }
    });

    const prevSlide = (elem,i,item) => {
        elem[i].style.display = 'none';
        item[i].classList.remove('dot-active');

    };

    const nextSlide = (elem,i,item) => {
        elem[i].style.display = 'block';
        item[i].classList.add('dot-active');
    };
    
    const autoPlaySlide = () => {
        prevSlide(slide,currentSlide,dotКectangle);
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide,currentSlide,dotКectangle);
    };

    const startSlide = (time = 2000) => {
        intervalId = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(intervalId);
    };

    gallerySlider.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;

        if (!target.matches('.gallery-btn, .dot-rectangle')){
            return;
        }

        prevSlide(slide,currentSlide,dotКectangle);

        if (target.matches('#btn-right')) {
            currentSlide++;
        } else if (target.matches('#btn-left')) {
            currentSlide--;
        } else if (target.matches('.dot-rectangle')) {
            dotКectangle.forEach((item, i) => {
                if (item === target) {
                    currentSlide = i;
                }
            });
        }

        if (currentSlide >= slide.length) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = slide.length -1;
        }

        nextSlide(slide,currentSlide,dotКectangle);
    });

    gallerySlider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.gallery-btn') ||
        event.target.matches('.dot-rectangle')) {
            stopSlide();
        }
    });

    gallerySlider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.gallery-btn') ||
        event.target.matches('.dot-rectangle')) {
            startSlide();
        }
    });

    startSlide(1500);
};

export default photoGallery;