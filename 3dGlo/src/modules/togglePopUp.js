const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content'),
        widthWindow = document.documentElement.clientWidth;
    let counts = 0;

    const animatePopUp = () => {
        const idAnimate = setTimeout(animatePopUp);
        
        if (counts < 100) {
            popupContent.style.top = counts + 'px';
        } else {
            clearInterval(idAnimate);
        }
        counts++; 
    };   

    popupBtn.forEach((item) => {
        item.addEventListener('click', () => {
            const idAnimate = setTimeout(animatePopUp);

            if (widthWindow < 768) {
            clearInterval(idAnimate);
            }
            popup.style.display = 'block';
        });
    });   

    popup.addEventListener('click', (event) => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
            counts = 0;
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popup.style.display = 'none';
                counts = 0;
            }
        }
    });
}; 

export default togglePopUp;