const sliderСarousel = () => {
    const services = document.querySelector('#services'),
        wrapper = services.querySelector('.wrapper'),
        servicesSlider = document.querySelector('.services-slider'),
        slide = servicesSlider.querySelectorAll('.slide');
    let position = 3,
        slidesToShow = 5,
        widthSlide = Math.floor(100 / slidesToShow),
        infinity = true;
    
    const addClass = () => {
        wrapper.classList.add('slide_wrapper');
        servicesSlider.classList.add('slide_services'); 

        for(const item of slide) {
            item.classList.add('slide_item');
        }
    };
    addClass();

    const buttonCarusel = () => {
        const elemPrev = document.createElement('a'),
            elemNext = document.createElement('a'),
            btnDiv = document.createElement('div');

        elemPrev.id = 'arrow-left';
        elemNext.id = 'arrow-right';
        elemPrev.classList.add('carusel-btn', 'prev');
        elemNext.classList.add('carusel-btn', 'next');
        btnDiv.classList.add('btn-container');

        btnDiv.appendChild(elemPrev);
        btnDiv.appendChild(elemNext); 
        wrapper.appendChild(btnDiv); 

    };
    buttonCarusel();

    const response = () => {
        const responsive = [{
                    breckpoint: 1175,
                    slideToShow: 3
                },
                {
                    breckpoint: 900,
                    slideToShow: 2
                },
                    {
                    breckpoint: 600,
                    slideToShow: 1
                }
            ],
            allResponse = responsive.map(item => item.breckpoint),
            maxResponse = Math.max(...allResponse);
    
        const widthWindow = document.documentElement.clientWidth;
           
        if (widthWindow < maxResponse) {
            for (let i = 0; i < allResponse.length; i++) {
                if (widthWindow < allResponse[i]) {
                    slidesToShow = responsive[i].slideToShow;
                    widthSlide = Math.floor(100 / slidesToShow);  
                }
            }
        }
            
    };
    response();

    servicesSlider.style.transform = `translateX(-${position * widthSlide}%)`;
    
    const addStyle = () => {
        const style = document.createElement('style');
        style.id = 'style-carusel';
        style.textContent = `
            .btn-container {
                display: flex;
                justify-content: space-between;
                height: 30px;
                width: 100%;
                position: absolute;
                top: 130px;
            }

            .carusel-btn {
                width: 35px;
                height: 35px;
                background-color: #ffd11a;
                background-repeat: no-repeat;
                background-size: 8px;
                border-radius: 50%;
                cursor: pointer;
            }

            .slide_wrapper {
                overflow: hidden !important;
                padding: 0;
                position: relative;
                padding-right: 19px;
            }

            .slide_services {
                transform = translateX(-60%);
                transition: transform 0.5s;
                will-change: transform !important;
                padding: 0;  
            }

            .slide_item {
                flex: 0 0 ${widthSlide}% !important; 
                margin: 0 0 0 2px !important;
            }

            .carusel-btn.prev {
                z-index: 5;
                background-image: url('./images/arrow-left.png');
                background-position: 45% 50%;
            }  
            
            .carusel-btn.next {
                z-index: 5;
                background-image: url('./images/arrow-right.png');
                background-position: 50% 50%;
            }
        `;
        document.head.appendChild(style);
    };

    addStyle();

    const prev = document.querySelector('#arrow-left'),
        next = document.querySelector('#arrow-right');    

    const timePrev = () => {
        servicesSlider.style.transition = 'transform 0.5s';
        --position;
        servicesSlider.style.transform = `translateX(-${position * widthSlide}%)`;
    };    
        
    const prevSlider = () => {
        if (infinity || position > 0) {
            --position;
            if (position < 0) {
                servicesSlider.style.transition = 'none';
                position = slide.length - slidesToShow;
            } else {
                servicesSlider.style.transition = 'transform 0.5s';
            }
            servicesSlider.style.transform = `translateX(-${position * widthSlide}%)`;
            if (position === slide.length - slidesToShow) {
                setTimeout(timePrev);
            }
        }
    };

    const timeNext = () => {
        servicesSlider.style.transition = 'transform 0.5s';
        ++position;
        servicesSlider.style.transform = `translateX(-${position * widthSlide}%)`;
    };

    const nextSlider = () => {
        if (infinity || position < slide.length - slidesToShow) {
            ++position;
            if (position > slide.length - slidesToShow) {
                servicesSlider.style.transition = 'none';
                position = 0;
            } else {
                servicesSlider.style.transition = 'transform 0.5s';
            }
            servicesSlider.style.transform = `translateX(-${position * widthSlide}%)`;
            if (position === 0) {
                setTimeout(timeNext);
            }
        }
    };

    prev.addEventListener('click', prevSlider);
    next.addEventListener('click', nextSlider);
    
};

export default sliderСarousel;