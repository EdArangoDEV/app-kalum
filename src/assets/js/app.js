
$(document).ready(() => {
    var kalumCarousel = document.querySelector('#carouselExampleCaptions');
    var carousel = new bootstrap.Carousel(kalumCarousel, { interval: 5000 });
});


$(function () {
    $('[data-bs-toggle="tooltip"]').tooltip()
});

$(function () {
    $('[data-bs-toggle="popover"]').popover()
});


// $('.btn-tool').tooltip();

var contador = 0;
setInterval(() => {
    if (contador < 100) {
        contador = contador + 1;
    }
    var barra = document.querySelector('#barra-progreso');
    barra.style.width = contador + '%';
    barra.innerHTML = contador + '%';
}, 200);