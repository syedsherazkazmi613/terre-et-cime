// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable);

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Navbar animations
    initNavbarAnimations();
    
    // Page-specific animations
    const currentPage = window.location.pathname;
    switch(currentPage) {
        case '/':
            initHomeAnimations();
            break;
        case '/projects':
            initProjectsAnimations();
            break;
        case '/about':
            initAboutAnimations();
            break;
        case '/services':
            initServicesAnimations();
            break;
        case '/contact':
            initContactAnimations();
            break;
    }
});

// Navbar Animations
function initNavbarAnimations() {
    // Initial navbar animation
    gsap.from("nav", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Scroll-triggered navbar changes
    ScrollTrigger.create({
        start: "top -100",
        end: 99999,
        toggleClass: {
            className: 'navbar-scrolled',
            targets: 'nav'
        },
        onUpdate: (self) => {
            const scrolled = self.progress > 0;
            if (scrolled) {
                gsap.to('nav', {
                    top: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.to('nav', {
                    top: window.innerWidth >= 768 ? '5rem' : 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        }
    });
}

// Home Page Animations
function initHomeAnimations() {
    // Hero section animation
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
    });

    // About section animation
    ScrollTrigger.batch(".about-section *", {
        onEnter: (elements) => {
            gsap.from(elements, {
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 1
            });
        }
    });
}

// Projects Page Animations
function initProjectsAnimations() {
    const projectImages = gsap.utils.toArray('.project-img');
    const projectDetails = gsap.utils.toArray('.project-detail');

    // Initial state
    gsap.set(projectImages.slice(1), { autoAlpha: 0 });
    gsap.set(projectDetails.slice(1), { autoAlpha: 0 });

    // Create scroll-triggered animations
    projectDetails.forEach((detail, index) => {
        ScrollTrigger.create({
            trigger: detail,
            start: "top center",
            end: "bottom center",
            onEnter: () => transitionToProject(index, projectImages, projectDetails),
            onEnterBack: () => transitionToProject(index, projectImages, projectDetails),
        });
    });
}

// About Page Animations
function initAboutAnimations() {
    // Timeline for staggered content reveal
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-content",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    tl.from(".about-content > *", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2
    });
}

// Services Page Animations
function initServicesAnimations() {
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            end: "bottom 20%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2
    });
}

// Contact Page Animations
function initContactAnimations() {
    const tl = gsap.timeline();
    
    tl.from(".contact-info", {
        x: -50,
        opacity: 0,
        duration: 0.8
    })
    .from(".contact-form", {
        x: 50,
        opacity: 0,
        duration: 0.8
    }, "-=0.4");
}

// Helper function for project transitions
function transitionToProject(index, images, details) {
    gsap.to(images.concat(details), {
        autoAlpha: 0,
        duration: 0.5
    });

    gsap.to([images[index], details[index]], {
        autoAlpha: 1,
        duration: 0.5
    });
} 