document.addEventListener("DOMContentLoaded", () => {
    // 1. Custom Cursor
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    // 2. Navbar Scrolled State
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (hamburger) hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
    if (closeBtn) closeBtn.addEventListener('click', () => mobileMenu.classList.remove('active'));
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });

    // 4. Typewriter Effect
    const texts = [
        "AI Solutions Architect",
        "Software Engineer",
        "Workflow Automation Expert"
    ];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;
    const typeWriterElement = document.getElementById('typewriter');

    function type() {
        if (!typeWriterElement) return;

        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.substring(0, index - 1);
            index--;
        } else {
            letter = currentText.substring(0, index + 1);
            index++;
        }

        typeWriterElement.textContent = letter;

        let typeSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && letter === currentText) {
            typeSpeed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && letter === '') {
            isDeleting = false;
            count++;
            typeSpeed = 500; // pause before next word
        }
        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);

    // 5. Intersection Observer for Fade-In Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 6. Interactive Network Background
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 70;

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 189, 215, 0.4)';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 189, 215, ${0.15 - distance / 800})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            // Mouse interaction
            if (mouse.x != null) {
                const dx = mouse.x - particles[i].x;
                const dy = mouse.y - particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 189, 215, ${0.3 - distance / 500})`;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        // Optionally resize particle array size, but resetting canvas is generally enough
    });
});
