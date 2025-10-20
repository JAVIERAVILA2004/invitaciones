document.addEventListener('DOMContentLoaded', function() {
    const sealStamp = document.getElementById('sealStamp');
    const invitationCard = document.getElementById('invitationCard');
    const closeButton = document.getElementById('closeButton');
    const envelope = document.querySelector('.envelope');
    const countdownContainer = document.getElementById('countdown');
    
    // Abrir carta
    sealStamp.addEventListener('click', function() {
        envelope.style.display = 'none';
        invitationCard.classList.add('active');
        document.body.style.overflowY = 'auto';
    });
    
    // Cerrar carta
    closeButton.addEventListener('click', function() {
        invitationCard.classList.remove('active');
        envelope.style.display = 'block';
        document.body.style.overflowY = 'hidden';
        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Contador regresivo
    function updateCountdown() {
        const targetDate = new Date('November 21, 2025 14:30:00').getTime();
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            countdownContainer.innerHTML = '<div class="anniversary-text">¡El evento ha comenzado!</div>';
        }
    }
    
    // Actualizar contador cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial
    
    // Prevenir zoom en inputs en iOS
    document.addEventListener('touchstart', function() {}, {passive: true});

    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    const pname = document.getElementById('nombre_invitacion');
    if(name) {
        pname.textContent = name;
    }
    
});

