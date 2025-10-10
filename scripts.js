document.addEventListener("DOMContentLoaded", function () {

    const envelope = document.getElementById('envelope');
    const sealStamp = document.getElementById('sealStamp');
    const closeButton = document.getElementById('closeButton');
    const body = document.body;

    // Estado inicial - asegurar que la carta esté cerrada
    function estadoInicial() {
        envelope.classList.remove('abierta');
        body.classList.remove('con-scroll');
        
        // Forzar scroll al inicio
        window.scrollTo(0, 0);
        
        // Asegurar que el body esté visible
        body.style.visibility = 'visible';
    }

    // Función para abrir la carta
    function abrirCarta() {
        // Asegurar que el body tenga scroll habilitado
        body.classList.add('con-scroll');
        
        // Pequeño delay para asegurar que el scroll esté habilitado
        setTimeout(() => {
            envelope.classList.add('abierta');
            
            // Desplazar suavemente al inicio
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 50);
    }

    // Función para cerrar la carta
    function cerrarCarta() {
        envelope.classList.remove('abierta');
        
        // Pequeño delay antes de quitar el scroll
        setTimeout(() => {
            body.classList.remove('con-scroll');
            
            // Asegurar que volvamos al inicio
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 400);
    }

    // Event Listeners
    sealStamp.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        abrirCarta();
    });

    closeButton.addEventListener('click', function(e) {
        e.preventDefault();
        cerrarCarta();
    });

    // Cerrar la carta al hacer clic fuera del contenido
    document.addEventListener('click', function(e) {
        if (envelope.classList.contains('abierta') && 
            !e.target.closest('.invitation-card') && 
            !e.target.closest('.seal-stamp') &&
            !e.target.closest('.close-button')) {
            e.preventDefault();
            cerrarCarta();
        }
    });

    // Prevenir comportamientos no deseados
    document.addEventListener('touchmove', function(e) {
        if (!body.classList.contains('con-scroll')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Manejar el evento de beforeunload para limpiar estado
    window.addEventListener('beforeunload', function() {
        // Limpiar cualquier estado que pueda causar problemas al recargar
        sessionStorage.removeItem('cartaAbierta');
    });

    // Manejar carga de la página
    window.addEventListener('load', function() {
        estadoInicial();
        
        // Pequeño delay para asegurar que todo esté cargado
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });

    // Manejar cambios de visibilidad de la página
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // Cuando la página vuelve a ser visible, asegurar estado correcto
            estadoInicial();
        }
    });



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
