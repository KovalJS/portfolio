const burgerMenu = () => {
    const hiddenLarge = document.querySelector('.hidden-large'),
        headerMain = document.querySelector('.header-main'),
        topMenu = document.querySelector('.top-menu'),
        imgBurger = topMenu.querySelector('img'),
        popupMenu = document.querySelector('.popup-menu'),
        imgPopupMenu = popupMenu.querySelector('img'),
        headSlider = headerMain.querySelector('.head-slider'),
        totop = document.querySelector('#totop');
    let head = document.querySelector('.head'),
        headHiight = head.clientHeight,
        topMenuHeight = topMenu.clientHeight,
        headSliderHeight = headSlider.clientHeight,
        sumHeightBlok1 = headHiight + topMenuHeight + headSliderHeight,
        burgerWidthWindow = document.documentElement.clientWidth,
        scrolled,
        time;
    
    totop.style.display = 'none'; 
       
    window.addEventListener('resize', () => {
        burgerWidthWindow = document.documentElement.clientWidth;
        headHiight = head.clientHeight;
        
        if (burgerWidthWindow < 768) {
            hiddenLarge.style.display = 'block';
        } else {
            hiddenLarge.style.display = 'none';
        }
    });  

    window.addEventListener('scroll', () => {
        let windowHeight = document.documentElement.scrollTop;
        
        if (windowHeight >= headHiight && burgerWidthWindow < 768) {
            topMenu.style.cssText = `
                position: fixed;
                top: 0;
            `;
        } else if (windowHeight < headHiight && burgerWidthWindow < 768) {
            topMenu.style.cssText = `
                position: none;
            `;
        } else if (windowHeight >= (sumHeightBlok1)) {
            totop.style.display = 'block';
        } else if (windowHeight < (sumHeightBlok1)) {
            totop.style.display = 'none';
        }
    });

    headerMain.addEventListener('click', (event) => {
        let target = event.target;
        if (target === imgBurger) {
            popupMenu.style.display = 'flex';
        } else if (target === imgPopupMenu) {
            popupMenu.style.display = 'none';
        } 

        target = target.parentNode;
        if (target.tagName === 'LI') {
            popupMenu.style.display = 'none';
        }
       
    });

    const scrollToTop = () => {
        if (scrolled > 0) {
            window.scrollTo(0, scrolled);
            scrolled = scrolled - 20;
            time = setTimeout(scrollToTop, 5);
        } else {
            clearTimeout(time);
            window.scrollTo(0,0);
        }
    }; 

    totop.addEventListener('click', (event) => {
        event.preventDefault();
        scrolled = window.pageYOffset;
        scrollToTop();
    });

    
};

export default burgerMenu;