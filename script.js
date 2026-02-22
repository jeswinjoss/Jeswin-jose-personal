document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursor) cursor.style.transform = 'scale(6)';
            if(cursor) cursor.style.background = 'rgba(99, 102, 241, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            if(cursor) cursor.style.transform = 'scale(1)';
            if(cursor) cursor.style.background = '#6366f1';
        });
    });

    // Optimized Loader
    const loader = document.getElementById('loader');
    const percentageText = document.getElementById('loader-percentage');
    const loaderBar = document.getElementById('loader-bar');
    
    let count = 0;
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 2;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Trigger initial reveal animations
                    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
                }, 700);
            }, 300);
        }
        if (percentageText) percentageText.innerText = count.toString().padStart(2, '0');
        if (loaderBar) loaderBar.style.transform = `translateX(${count - 100}%)`;
    }, 40);

    // Professional Sticky Header
    const header = document.getElementById('island-header');
    const nav = document.getElementById('island-nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (!header) return;
        
        if (window.scrollY > lastScrollY && window.scrollY > 150) {
            header.classList.add('nav-hidden');
            header.classList.remove('nav-visible');
        } else {
            header.classList.add('nav-visible');
            header.classList.remove('nav-hidden');
        }

        if (window.scrollY > 50) {
            nav.classList.add('shadow-xl', 'py-2', 'bg-white/90');
            nav.classList.remove('py-3', 'bg-white/80');
        } else {
            nav.classList.remove('shadow-xl', 'py-2', 'bg-white/90');
            nav.classList.add('py-3', 'bg-white/80');
        }
        lastScrollY = window.scrollY;
    }, { passive: true });

    // Mobile Menu System
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('menu-close');

    const toggleMenu = (open) => {
        mobileMenu.style.transform = open ? 'translateX(0)' : 'translateX(100%)';
        document.body.style.overflow = open ? 'hidden' : '';
    };

    menuBtn?.addEventListener('click', () => toggleMenu(true));
    closeBtn?.addEventListener('click', () => toggleMenu(false));
    
    // Close menu on link clicks
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Intersection Observer for Reveal Effects
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});