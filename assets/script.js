// multipackmaschinen.de — Remake v2
// Bewusst minimal: Burger-Menü + Header-Schatten.
// FAQ läuft über native <details>, das Formular sendet nativ an Web3Forms
// (redirect auf danke.html via Hidden-Field) — beides ohne JS.

// Header-Schatten beim Scrollen
const header = document.getElementById('siteHeader');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
}

// Mobile Burger-Menü
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        navToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });

    // Menü schließen, wenn ein Link geklickt wird
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Menü öffnen');
        });
    });
}
