/* ==========================================================================
   STUDIFY Overseas - Interactivity & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                // Scroll to target with offset for navbar
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Form Submission Handling (WhatsApp Redirect)
    const evaluationForm = document.getElementById('evaluationForm');
    
    if (evaluationForm) {
        evaluationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Redirecting...';
            submitBtn.disabled = true;
            
            // Collect form data
            const inputs = this.querySelectorAll('input, select');
            let message = "Hi STUDIFY, I would like a free profile evaluation.\\n\\n*My Details:*\\n";
            
            inputs.forEach(input => {
                // Skip the file input for whatsapp message
                if(input.type === 'file') return;
                
                const label = input.previousElementSibling ? input.previousElementSibling.innerText.replace(' *', '') : input.placeholder;
                if(input.value && label) {
                    message += `*${label}:* ${input.value}\\n`;
                }
            });
            
            // Encode message and create WhatsApp URL
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/8328441994?text=${encodedMessage}`;
            
            // Simulate brief delay then open WhatsApp
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                window.open(whatsappUrl, '_blank');
            }, 800);
        });
    }
});
