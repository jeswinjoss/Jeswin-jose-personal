document.addEventListener('DOMContentLoaded', () => {
    // Performance Optimized Loader
    const loader = document.getElementById('loader');
    const percentageText = document.getElementById('loader-percentage');
    const circle = document.getElementById('loader-circle');
    
    const hideLoader = () => {
        if (!loader) return;
        loader.classList.add('opacity-0');
        setTimeout(() => {
            loader.style.display = 'none';
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        }, 700);
    };

    if (percentageText && circle) {
        let current = 0;
        const interval = setInterval(() => {
            current += Math.floor(Math.random() * 15) + 5;
            if (current >= 100) {
                current = 100;
                clearInterval(interval);
                percentageText.innerText = '100%';
                circle.style.strokeDashoffset = 0;
                setTimeout(hideLoader, 200);
            }
            percentageText.innerText = `${current}%`;
            circle.style.strokeDashoffset = 283 - (283 * current) / 100;
        }, 80);
    } else {
        window.addEventListener('load', hideLoader);
    }

    // Optimized Island Header Scroll Logic
    const nav = document.getElementById('island-nav');
    window.addEventListener('scroll', () => {
        if (!nav) return;
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            nav.classList.add('bg-black/80', 'py-2', 'px-4');
            nav.classList.remove('bg-black/40', 'py-3', 'px-6');
        } else {
            nav.classList.remove('bg-black/80', 'py-2', 'px-4');
            nav.classList.add('bg-black/40', 'py-3', 'px-6');
        }
    }, { passive: true });

    // Mobile Menu Slider Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('menu-close');
    const overlay = document.getElementById('menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = (open) => {
        if (open) {
            mobileMenu.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('opacity-100'), 10);
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('translate-x-full');
            overlay.classList.remove('opacity-100');
            setTimeout(() => overlay.classList.add('hidden'), 500);
            document.body.style.overflow = '';
        }
    };

    menuBtn?.addEventListener('click', () => toggleMenu(true));
    closeBtn?.addEventListener('click', () => toggleMenu(false));
    overlay?.addEventListener('click', () => toggleMenu(false));
    mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

    // Passive Scroll Observer for smooth reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});