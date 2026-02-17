document.addEventListener('DOMContentLoaded', () => {
    // Advanced Loader Logic
    const loader = document.getElementById('loader');
    const percentageText = document.getElementById('loader-percentage');
    const circle = document.getElementById('loader-circle');
    let current = 0;
    const target = 100;
    const duration = 2000;
    const increment = target / (duration / 16);

    const updateLoader = () => {
        current += increment;
        if (current >= target) {
            current = target;
            percentageText.innerText = '100%';
            circle.style.strokeDashoffset = 0;
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 1000);
            }, 500);
            return;
        }
        
        percentageText.innerText = `${Math.floor(current)}%`;
        const offset = 377 - (377 * current) / 100;
        circle.style.strokeDashoffset = offset;
        requestAnimationFrame(updateLoader);
    };

    updateLoader();

    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('bg-dark/95', 'py-3', 'w-[95%]');
            nav.classList.remove('py-4', 'w-[90%]');
        } else {
            nav.classList.remove('bg-dark/95', 'py-3', 'w-[95%]');
            nav.classList.add('py-4', 'w-[90%]');
        }
    });

    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('menu-close');

    menuBtn?.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });

    closeBtn?.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        document.body.style.overflow = '';
    });

    // Magnetic effect for links (Simple version for stability)
    const magneticElements = document.querySelectorAll('.nav-link, .project-card');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) * 0.2;
            const y = (e.clientY - top - height / 2) * 0.2;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });

    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-on-scroll');
        observer.observe(section);
    });
});