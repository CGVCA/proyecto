let currentIndex = 0; // Índice del slide actual

// Función para mover el slide
function moveSlide(step) {
    const slides = document.querySelectorAll('.reporte-item');
    const totalSlides = slides.length;

    // Actualiza el índice
    currentIndex = (currentIndex + step + totalSlides) % totalSlides;

    // Calcula el desplazamiento del slider
    const offset = -currentIndex * 100;

    // Mueve el slider
    document.querySelector('.galeria-reportes').style.transform = `translateX(${offset}%)`;
}

// Configuración de intervalo automático (opcional)
setInterval(() => {
    moveSlide(1); // Mueve el slider hacia adelante automáticamente
}, 5000); // Intervalo de 5 segundos