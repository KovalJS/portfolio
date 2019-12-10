const mouseHover = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach((item, i) => {
        let srcAttribute = item.src;

        item.addEventListener('mouseenter', (event) => {
            event.target.src = event.target.dataset.img;
        });

        item.addEventListener('mouseleave', (event) => {
            event.target.src = srcAttribute; 
        });
    });
};

export default mouseHover;