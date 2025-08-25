let contador = 1;

document.getElementById("radio-01").checked = true;

setInterval(function () {
    passaImagem();
}, 5000)

function passaImagem() {
    contador++;
    if (contador > 3) {
        contador = 1;
    }

    document.getElementById("radio-0" + contador).checked = true;

}

document.addEventListener('DOMContentLoaded', function () {
    const todosOsCarrosseis = document.querySelectorAll('.carrosel-container');

    todosOsCarrosseis.forEach(container => {
        const carousel = container.querySelector('.carrosel');
        if (!carousel) return;

        const items = container.querySelectorAll('.carrosel-item');
        const nextButton = container.querySelector('.carrosel-btn.next');
        const prevButton = container.querySelector('.carrosel-btn.prev');
        const navControls = container.querySelector('.carrosel-nav');
        const dotsContainer = container.querySelector('.indicadores');
        const verTodosLink = container.querySelector('.ver-todos');

        if (items.length === 0) return;

        const itemsPerPage = 4;
        const totalPages = Math.ceil(items.length / itemsPerPage);
        let currentPage = 0;
        let isShowingAll = false;

        carousel.style.width = `${totalPages * 100}%`;

        function setupNavigation() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';

            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentPage = i;
                    updateCarousel();
                });
                dotsContainer.appendChild(dot);
            }

            if (totalPages <= 1) {
                if (nextButton) nextButton.style.display = 'none';
                if (prevButton) prevButton.style.display = 'none';
            }
        }

        function updateCarousel() {
            if (!isShowingAll) {
                const offset = -(currentPage * (100 / totalPages));
                carousel.style.transform = `translateX(${offset}%)`;
                if (dotsContainer) {
                    const currentDots = dotsContainer.querySelectorAll('.dot');
                    currentDots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentPage);
                    });
                }
            }
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (totalPages > 1) {
                    currentPage = (currentPage + 1) % totalPages;
                    updateCarousel();
                }
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (totalPages > 1) {
                    currentPage = (currentPage - 1 + totalPages) % totalPages;
                    updateCarousel();
                }
            });
        }

        if (verTodosLink) {
            verTodosLink.addEventListener('click', function (event) {
                event.preventDefault();
                isShowingAll = !isShowingAll;
                container.classList.toggle('show-all', isShowingAll);
                if (isShowingAll) {
                    this.innerHTML = 'Ver menos';
                    if (navControls) navControls.style.display = 'none';
                    carousel.style.transform = 'translateX(0%)';
                } else {
                    this.innerHTML = 'Ver todos';
                    if (navControls) navControls.style.display = 'flex';
                    if (totalPages > 1) {
                        if (nextButton) nextButton.style.display = 'flex';
                        if (prevButton) prevButton.style.display = 'flex';
                    }
                    updateCarousel();
                }
            });
        }

        setupNavigation();
        updateCarousel();
    });
});