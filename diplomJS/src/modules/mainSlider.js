const mainSlider = () => {
   const slider = document.querySelector('.main-slider'),
        slide = slider.querySelectorAll('.slide');

    let currentSlide = 0;
    
    const autoPlaySlide = () => {
        slide[currentSlide].style.display = 'none';
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        slide[currentSlide].style.display = 'flex';
    };

    const startSlide = () => {
        setInterval(autoPlaySlide, 2000);
    };

    startSlide();
};

export default mainSlider;