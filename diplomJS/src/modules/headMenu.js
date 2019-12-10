const headMenu = () => {
    const headMain = document.querySelector('.head-main'),
        clubsList = document.querySelector('.clubs-list'),
        clubsListUl = clubsList.querySelector('ul');
      
    const handlerMenu = () => { 
        if (clubsListUl.style.display !== 'block') {
            clubsListUl.style.display = 'block';
        } else {
            clubsListUl.style.display = 'none';
        }  
    };

    headMain.addEventListener('click', (event) => {
        let target = event.target;
        if (target.parentNode === clubsList) {
            handlerMenu();
        }
    });

};

export default headMenu;