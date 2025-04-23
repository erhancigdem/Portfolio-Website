// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typed.js for text animation
    initTyped();
    
    // Mobile navigation toggle
    initMobileNav();
    
    // Smooth scroll for navigation links
    initSmoothScroll();
    
    // Portfolio filter functionality
    initPortfolioFilter();
    
    // Section switching
    initSectionSwitch();
    
    // Form submission
    initContactForm();
});

// Typed.js initialization
function initTyped() {
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: ['Designer', 'UI/UX Expert', 'Illustrator', 'Photographer'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        });
    }
}

// Mobile navigation
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const sidenav = document.querySelector('.sidenav');
    
    if (navToggle && sidenav) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            sidenav.classList.toggle('active');
        });
    }
}

// Smooth scrolling
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a, .hero-buttons a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navToggle = document.querySelector('.nav-toggle');
            const sidenav = document.querySelector('.sidenav');
            
            if (navToggle && sidenav && sidenav.classList.contains('active')) {
                navToggle.classList.remove('active');
                sidenav.classList.remove('active');
            }
            
            // Get target section id from href
            const targetId = this.getAttribute('href');
            
            // Switch to the target section
            switchSection(targetId);
        });
    });
}

// Portfolio filter
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length && portfolioItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 200);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }
}

// Section switching
function initSectionSwitch() {
    // Handle hash change (when user clicks back/forward browser buttons)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash || '#home';
        switchSection(hash);
    });
    
    // Initial section based on URL hash
    const initialHash = window.location.hash || '#home';
    switchSection(initialHash);
}

// Switch between sections
function switchSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Update URL hash without scrolling
        history.replaceState(null, null, sectionId);
        
        // Scroll to top of section
        window.scrollTo(0, 0);
    }
}

// Contact form submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Here you would typically send the data to a server
            // For this example, we'll just log it to console
            console.log('Form submission:', formDataObj);
            
            // Reset form
            this.reset();
            
            // Show confirmation message
            alert('Thank you for your message. I will get back to you soon!');
        });
    }
}

// Preloader (optional)
window.addEventListener('load', function() {
    // Add any preloader animation/hiding logic here
    // For example:
    // document.querySelector('.preloader').style.display = 'none';
}); 