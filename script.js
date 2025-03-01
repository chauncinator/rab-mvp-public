// Initialize the landing page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate menu bars
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
    }
    
    // App showcase tabs
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const screens = document.querySelectorAll('.screen');
    
    showcaseItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all items
            showcaseItems.forEach(i => i.classList.remove('active'));
            screens.forEach(s => s.classList.remove('active'));
            
            // Add active class to selected items
            this.classList.add('active');
            document.querySelector(`.screen[data-screen="${tabId}"]`).classList.add('active');
        });
    });
    
    // Initialize GSAP animations
    if (typeof gsap !== 'undefined') {
        // Hero animations
        gsap.from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-actions', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-stats', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.7,
            ease: 'power3.out'
        });
        
        gsap.from('.overlay-text', {
            opacity: 0,
            x: 100,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        // Initialize ScrollTrigger if available
        if (typeof ScrollTrigger !== 'undefined') {
            // Feature cards animation
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: '.features',
                    start: 'top 80%'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
            
            // Benefit cards animation
            gsap.from('.benefit-card', {
                scrollTrigger: {
                    trigger: '.benefits',
                    start: 'top 80%'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
            
            // Testimonial cards animation
            gsap.from('.testimonial-card', {
                scrollTrigger: {
                    trigger: '.testimonials',
                    start: 'top 80%'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }
    }
    
    // Add a link to the app demo in the hero section
    const heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
        const heroButtons = heroActions.querySelectorAll('button');
        
        // Replace the "See It In Action" button with a link to the app
        if (heroButtons.length > 0) {
            const firstButton = heroButtons[0];
            
            // Create a new link button
            const appLink = document.createElement('a');
            appLink.href = 'app.html';
            appLink.className = firstButton.className;
            appLink.textContent = firstButton.textContent;
            
            // Replace the button with the link
            firstButton.parentNode.replaceChild(appLink, firstButton);
        }
    }
    
    // Add links to app in nav and CTA
    const demoButton = document.querySelector('.btn-demo');
    if (demoButton) {
        demoButton.addEventListener('click', function() {
            window.location.href = 'app.html';
        });
    }
});
