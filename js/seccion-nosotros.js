document.addEventListener('DOMContentLoaded',(event)=> {
    let losslides = document.querySelectorAll('.losslides img');
    let currentSlide= 0;

    function showNetxSlide() {
        losslides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        losslides[currentSlide].classList.add('active');
    }

    losslides[currentSlide].classList.add('active');
    setInterval(shoowNextSlide, 3000); 
});