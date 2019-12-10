const toggleMenu = () => {
    const btmMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        widthWindow = document.documentElement.clientWidth,
        tagBody = document.querySelector('body');

    const handlerMenu = () => {
        if (widthWindow <= 768) {
            if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
                menu.style.transform = `translate(0)`;
            } else {
                menu.style.transform = `translate(-100%)`;
            }
        } else {
            menu.classList.toggle('active-menu');
        } 
    };

   
    btmMenu.addEventListener('click', () => {
        handlerMenu();
    });

    menu.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('close-btn')) {
            handlerMenu(); 
        }

        target = target.parentNode;
        if (target.tagName === 'LI') {
            handlerMenu();
        }
                            
    });  
};

export default toggleMenu;