// Fuji Electric Distributor Website - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileToggle = document.createElement('div');
    mobileToggle.classList.add('mobile-toggle');
    mobileToggle.innerHTML = '☰';
    mobileToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.classList.toggle('show');
    });
    if (window.innerWidth < 769) {
        const headerContainer = document.querySelector('header .container');
        if (headerContainer) {
            headerContainer.insertBefore(mobileToggle, headerContainer.firstChild);
        }
    }
    window.addEventListener('resize', function() {
        if (window.innerWidth < 769) {
            const headerContainer = document.querySelector('header .container');
            if (headerContainer && !document.querySelector('.mobile-toggle')) {
                const toggle = document.createElement('div');
                toggle.classList.add('mobile-toggle');
                toggle.innerHTML = '☰';
                toggle.addEventListener('click', function() {
                    document.querySelector('nav ul').classList.toggle('show');
                });
                headerContainer.insertBefore(toggle, headerContainer.firstChild);
            }
        }
    });
    // Active navigation link
    const currentLocation = location.href;
    document.querySelectorAll('nav a').forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });
    console.log('Fuji website JavaScript initialized');
});