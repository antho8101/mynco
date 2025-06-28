// Status page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Back to top functionality
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Simulate real-time status updates
    function initStatusSimulation() {
        const statusDots = document.querySelectorAll('.status-dot');
        const uptimeValue = document.querySelector('.uptime-value');
        const metricValues = document.querySelectorAll('.metric-value');
        
        // Simulate occasional status changes (for demo purposes)
        setInterval(() => {
            // 99.9% chance of staying operational
            if (Math.random() > 0.999) {
                // Simulate a brief degradation
                statusDots.forEach(dot => {
                    dot.style.background = '#F59E0B';
                    dot.style.animation = 'none';
                });
                
                setTimeout(() => {
                    statusDots.forEach(dot => {
                        dot.style.background = '#10B981';
                        dot.style.animation = 'pulse 2s infinite';
                    });
                }, 5000); // Back to operational after 5 seconds
            }
        }, 30000); // Check every 30 seconds
        
        // Simulate uptime updates
        let currentUptime = 99.97;
        setInterval(() => {
            // Small random fluctuation
            const change = (Math.random() - 0.5) * 0.01;
            currentUptime = Math.max(99.9, Math.min(100, currentUptime + change));
            
            if (uptimeValue) {
                uptimeValue.textContent = currentUptime.toFixed(2) + '%';
            }
        }, 60000); // Update every minute
    }

    // Animate metric cards on scroll
    function initMetricAnimations() {
        const metricCards = document.querySelectorAll('.metric-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        metricCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Service card hover effects
    function initServiceCardEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Incident timeline animation
    function initIncidentAnimations() {
        const incidentItems = document.querySelectorAll('.incident-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200); // Stagger animation
                }
            });
        }, { threshold: 0.1 });
        
        incidentItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }

    // Update timestamps
    function updateTimestamps() {
        const timestamps = document.querySelectorAll('.incident-date');
        
        timestamps.forEach(timestamp => {
            const date = new Date(timestamp.textContent);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                timestamp.textContent = 'Yesterday';
            } else if (diffDays < 7) {
                timestamp.textContent = `${diffDays} days ago`;
            }
        });
    }

    // Initialize all functions
    initBackToTop();
    initStatusSimulation();
    initMetricAnimations();
    initServiceCardEffects();
    initIncidentAnimations();
    updateTimestamps();
    
    console.log('🚀 Status page initialized');
}); 