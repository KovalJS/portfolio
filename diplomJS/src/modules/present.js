const present = () => {
    const presentElement = document.querySelector('.fixed-gift'),
        gift = document.querySelector('#gift');

    if (presentElement) {
        presentElement.addEventListener('click', () => {
            gift.style.display = 'block';
            presentElement.style.display = 'none';
        });
    }
};

export default present;