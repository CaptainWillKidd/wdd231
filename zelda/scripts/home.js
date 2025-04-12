let currentSlide = 0;
const slides = document.querySelectorAll('.carrossel-slide');
const indicadoresContainer = document.querySelector('.indicadores');

slides.forEach((_, index) => {
    const indicador = document.createElement('div');
    indicador.classList.add('indicador');
    indicador.addEventListener('click', () => showSlide(index));
    indicadoresContainer.appendChild(indicador);
});

const indicadores = document.querySelectorAll('.indicador');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicadores.forEach(ind => ind.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    indicadores[currentSlide].classList.add('active');
}

document.querySelector('.prev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

document.querySelector('.next').addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

showSlide(0);