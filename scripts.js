document.addEventListener("DOMContentLoaded", function () {


    const params = new URLSearchParams(window.location.search);
    const name = params.get("name"); // Lee ?name=...

    const textElement = document.getElementById("anniversaryText");
    if (name && textElement) {
        textElement.textContent = name.toUpperCase(); // Reemplaza el texto
    }
    // --- CONTADOR ---
    function updateCountdown() {
        const eventDate = new Date('November 21, 2025 14:30:00').getTime();
        const now = new Date().getTime();
        const timeLeft = eventDate - now;

        const countdown = document.getElementById('countdown');

        if (!countdown) return;

        if (timeLeft < 0) {
            countdown.innerHTML = '<div class="detail-card"><div class="detail-label">¡El evento ya ha comenzado!</div></div>';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdown.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">DÍAS</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">HORAS</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">MINUTOS</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">SEGUNDOS</span>
            </div>
        `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --- ANIMACIONES AL HACER SCROLL ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.detail-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });
});
