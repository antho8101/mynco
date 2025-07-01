// Overview Page Module - Mynco Onboarding Dashboard
class OverviewPage {
    static render() {
        return `
            <!-- Hero Welcome Section (full width) -->
            <div class="welcome-hero">
                <div class="welcome-content">
                    <h1>Welcome back, Anthony! 👋</h1>
                    <p class="welcome-subtitle">You have <strong>3 clients waiting</strong> for your attention. Let's keep the momentum going!</p>
                </div>
            </div>

            <!-- Priority Title Section - Separate from cards -->
            <div class="priority-title-section">
                <div class="priority-container">
                    <div class="section-header">
                        <h2>Requires Your Attention</h2>
                        <p>Critical actions that need your immediate response</p>
                    </div>
                </div>
            </div>
            
            <!-- Priority Cards Carousel Section - ONLY the viewport -->
            <div class="priority-grid-viewport">
                <div class="priority-grid" id="priorityGrid">
                    <div class="priority-card-wrapper"><div class="priority-card urgent">
                        <span class="priority-time">2h ago</span>
                        <div class="priority-icon urgent">
                            <i data-lucide="message-circle"></i>
                        </div>
                        <div class="priority-content">
                            <h3>2 Client Messages</h3>
                            <p>Martin and Sarah are waiting for your response</p>
                        </div>
                        <div class="priority-action">
                            <button class="btn btn-urgent">Respond Now</button>
                            <span class="priority-value">€3,300 projects</span>
                        </div>
                    </div></div>
                    <div class="priority-card-wrapper"><div class="priority-card ready">
                        <span class="priority-time">Just finished</span>
                        <div class="priority-icon ready">
                            <i data-lucide="package"></i>
                        </div>
                        <div class="priority-content">
                            <h3>1 Ready to Deliver</h3>
                            <p>Bakery redesign completed, waiting for client approval</p>
                        </div>
                        <div class="priority-action">
                            <button class="btn btn-ready">Send to Client</button>
                            <span class="priority-value">€2,500</span>
                        </div>
                    </div></div>
                    <div class="priority-card-wrapper"><div class="priority-card payment">
                        <span class="priority-time">3 days ago</span>
                        <div class="priority-icon payment">
                            <i data-lucide="clock"></i>
                        </div>
                        <div class="priority-content">
                            <h3>€1,200 Pending</h3>
                            <p>Logo design approved, waiting for payment</p>
                        </div>
                        <div class="priority-action">
                            <button class="btn btn-payment">Send Reminder</button>
                            <span class="priority-value">TechStart Inc.</span>
                        </div>
                    </div></div>
                    <div class="priority-card-wrapper"><div class="priority-card feedback">
                        <span class="priority-time">1 day ago</span>
                        <div class="priority-icon urgent">
                            <i data-lucide="star"></i>
                        </div>
                        <div class="priority-content">
                            <h3>Client Feedback</h3>
                            <p>Feedback received from Bakery project. Check comments and update design.</p>
                        </div>
                        <div class="priority-action">
                            <button class="btn btn-urgent">View Feedback</button>
                            <span class="priority-value">Bakery Website</span>
                        </div>
                    </div></div>
                    <div class="priority-card-wrapper"><div class="priority-card contract">
                        <span class="priority-time">2 days ago</span>
                        <div class="priority-icon ready">
                            <i data-lucide="file-text"></i>
                        </div>
                        <div class="priority-content">
                            <h3>Contract to Sign</h3>
                            <p>New contract for TechStart Inc. is ready for your signature.</p>
                        </div>
                        <div class="priority-action">
                            <button class="btn btn-ready">Sign Now</button>
                            <span class="priority-value">TechStart Inc.</span>
                        </div>
                    </div></div>
                </div>
            </div>

            <!-- Priority Navigation Arrows Section - SEPARATE -->
            <div class="priority-nav-section">
                <div class="priority-nav-arrows">
                    <button class="priority-nav-arrow" id="priorityNavLeft" disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00D084" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button class="priority-nav-arrow" id="priorityNavRight">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00D084" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Main Content Section - SEPARATE -->
            <div class="overview-container">
                <!-- Live Activity Feed -->
                <div class="activity-section">
                    <div class="section-split">
                        <!-- Left: Performance Stats -->
                        <div class="stats-dashboard">
                            <div class="stats-header">
                                <h2>Quick Overview</h2>
                                <div class="period-selector">
                                    <button class="period-btn active">This Month</button>
                                    <button class="period-btn">Last Month</button>
                                </div>
                            </div>
                            
                            <div class="performance-grid">
                                <div class="perf-card revenue">
                                    <div class="perf-icon">
                                        <i data-lucide="euro"></i>
                                    </div>
                                    <div class="perf-stats">
                                        <div class="perf-value">€24,500</div>
                                        <div class="perf-label">Revenue</div>
                                        <div class="perf-trend up">+18% from last month</div>
                                    </div>
                                </div>

                                <div class="perf-card conversion">
                                    <div class="perf-icon">
                                        <i data-lucide="target"></i>
                                    </div>
                                    <div class="perf-stats">
                                        <div class="perf-value">94%</div>
                                        <div class="perf-label">Quote Acceptance</div>
                                        <div class="perf-trend up">+6% improvement</div>
                                    </div>
                                </div>

                                <div class="perf-card speed">
                                    <div class="perf-icon">
                                        <i data-lucide="zap"></i>
                                    </div>
                                    <div class="perf-stats">
                                        <div class="perf-value">2.3 days</div>
                                        <div class="perf-label">Avg. Payment Time</div>
                                        <div class="perf-trend up">-0.8 days faster</div>
                                    </div>
                                </div>

                                <div class="perf-card satisfaction">
                                    <div class="perf-icon">
                                        <i data-lucide="heart"></i>
                                    </div>
                                    <div class="perf-stats">
                                        <div class="perf-value">4.9/5</div>
                                        <div class="perf-label">Client Satisfaction</div>
                                        <div class="perf-trend neutral">8 reviews this month</div>
                                    </div>
                                    <div class="perf-chart">
                                        <div class="star-rating">
                                            <i data-lucide="star" class="star filled"></i>
                                            <i data-lucide="star" class="star filled"></i>
                                            <i data-lucide="star" class="star filled"></i>
                                            <i data-lucide="star" class="star filled"></i>
                                            <i data-lucide="star" class="star filled"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right: Live Activity -->
                        <div class="activity-feed">
                            <div class="activity-header">
                                <h2>Live Activity</h2>
                                <div class="activity-status">
                                    <div class="live-indicator"></div>
                                    <span>Real-time updates</span>
                                </div>
                            </div>
                            
                            <div class="activity-stream">
                                <div class="activity-item new">
                                    <div class="activity-avatar">
                                        <div class="avatar client"><i data-lucide="user"></i></div>
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-text">
                                            <strong>Martin (Bakery)</strong> sent you files for review
                                        </div>
                                        <div class="activity-meta">
                                            <span class="time">2 minutes ago</span>
                                            <span class="project">Bakery Website</span>
                                        </div>
                                    </div>
                                    <div class="activity-action">
                                        <button class="mini-btn">View</button>
                                    </div>
                                </div>

                                <div class="activity-item">
                                    <div class="activity-avatar">
                                        <div class="avatar payment">€</div>
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-text">
                                            Payment received from <strong>FitnessTracker</strong>
                                        </div>
                                        <div class="activity-meta">
                                            <span class="time">1 hour ago</span>
                                            <span class="amount">€1,200</span>
                                        </div>
                                    </div>
                                    <div class="activity-action">
                                        <div class="status-badge success">Paid</div>
                                    </div>
                                </div>

                                <div class="activity-item">
                                    <div class="activity-avatar">
                                        <div class="avatar client"><i data-lucide="user"></i></div>
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-text">
                                            <strong>Sarah (TechStart)</strong> approved the final logo
                                        </div>
                                        <div class="activity-meta">
                                            <span class="time">3 hours ago</span>
                                            <span class="project">Logo Package</span>
                                        </div>
                                    </div>
                                    <div class="activity-action">
                                        <div class="status-badge approved">Approved</div>
                                    </div>
                                </div>

                                <div class="activity-item">
                                    <div class="activity-avatar">
                                        <div class="avatar system">
                                            <i data-lucide="bell"></i>
                                        </div>
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-text">
                                            Reminder: Follow up with TechStart on payment
                                        </div>
                                        <div class="activity-meta">
                                            <span class="time">5 hours ago</span>
                                            <span class="amount">€800 pending</span>
                                        </div>
                                    </div>
                                    <div class="activity-action">
                                        <button class="mini-btn">Send</button>
                                    </div>
                                </div>
                            </div>
                            <div class="see-more-container" style="display: flex; justify-content: center; margin-top: 16px;">
                                <button class="mini-btn see-more">See more</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Active Projects Overview -->
                <div class="projects-overview">
                    <div class="section-header">
                        <h2>Active Projects</h2>
                        <div class="section-actions">
                            <div class="view-toggle">
                                <button class="toggle-btn active" data-view="cards">
                                    <i data-lucide="grid-3x3"></i>
                                </button>
                                <button class="toggle-btn" data-view="list">
                                    <i data-lucide="list"></i>
                                </button>
                            </div>
                            <button class="btn btn-primary">
                                <i data-lucide="plus"></i>
                                New Project
                            </button>
                        </div>
                    </div>
                    
                    <div class="projects-showcase">
                        <!-- Featured Project Card -->
                        <div class="project-showcase featured">
                            <div class="project-browser">
                                <div class="browser-dots">
                                    <div class="dot red"></div>
                                    <div class="dot yellow"></div>
                                    <div class="dot green"></div>
                                </div>
                                <div class="browser-url">mynco.app/p/martin-bakery</div>
                            </div>
                            
                            <div class="project-screen">
                                <div class="project-header-mini">
                                    <div class="client-avatar-mini">M</div>
                                    <div class="project-info-mini">
                                        <div class="project-name">Bakery Website</div>
                                        <div class="project-client">Martin's Bakery</div>
                                    </div>
                                    <div class="project-status-mini active">
                                        <i data-lucide="circle"></i>
                                        Active
                                    </div>
                                </div>
                                
                                <div class="project-content-mini">
                                    <div class="progress-section">
                                        <div class="progress-label">
                                            <span>Design Phase</span>
                                            <span class="percentage">75%</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: 75%"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="chat-preview">
                                        <div class="message you">Files sent for review 📎</div>
                                        <div class="message client">Perfect! Love the new header</div>
                                        <div class="message-input">
                                            <span class="typing">Martin is typing...</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="project-actions-mini">
                                    <div class="action-item">
                                        <span class="action-value">€2,500</span>
                                        <span class="action-label">Project Value</span>
                                    </div>
                                    <div class="action-item">
                                        <span class="action-value">3 days</span>
                                        <span class="action-label">Deadline</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="project-hover-actions">
                                <button class="action-btn primary">Open Portal</button>
                                <button class="action-btn secondary">Send Update</button>
                            </div>
                        </div>

                        <!-- Quick Project Cards -->
                        <div class="quick-projects">
                            <div class="quick-project waiting-payment">
                                <div class="quick-header">
                                    <div class="client-avatar-quick">S</div>
                                    <div class="notification-badge">💰</div>
                                </div>
                                <div class="quick-content">
                                    <h4>Logo Package</h4>
                                    <p class="client-name">TechStart Inc.</p>
                                    <div class="quick-status payment-pending">
                                        <i data-lucide="clock"></i>
                                        Payment pending
                                    </div>
                                </div>
                                <div class="quick-value">€800</div>
                            </div>

                            <div class="quick-project completed">
                                <div class="quick-header">
                                    <div class="client-avatar-quick">F</div>
                                    <div class="notification-badge">✅</div>
                                </div>
                                <div class="quick-content">
                                    <h4>App Mockups</h4>
                                    <p class="client-name">FitnessTracker</p>
                                    <div class="quick-status completed">
                                        <i data-lucide="check-circle"></i>
                                        Completed & Paid
                                    </div>
                                </div>
                                <div class="quick-value">€1,200</div>
                            </div>

                            <div class="quick-project in-progress">
                                <div class="quick-header">
                                    <div class="client-avatar-quick">D</div>
                                    <div class="notification-badge">🔄</div>
                                </div>
                                <div class="quick-content">
                                    <h4>E-commerce Store</h4>
                                    <p class="client-name">Designs & Co</p>
                                    <div class="quick-status in-progress">
                                        <i data-lucide="play-circle"></i>
                                        In progress
                                    </div>
                                </div>
                                <div class="quick-value">€4,500</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    static init() {
        // Initialize overview-specific functionality
        this.initActivityStream();
        this.initProjectShowcase();
        this.initPeriodToggle();
        this.startRealTimeUpdates();

        // Gestion dynamique du scroll/flèches sur la priority-grid
        const gridViewport = document.querySelector('.priority-grid-viewport');
        const grid = document.getElementById('priorityGrid');
        const navLeft = document.getElementById('priorityNavLeft');
        const navRight = document.getElementById('priorityNavRight');
        
        if (!gridViewport || !grid || !navLeft || !navRight) {
            console.warn('⚠️ Carousel elements not found, skipping carousel initialization');
            return;
        }
        
        const card = grid.querySelector('.priority-card-wrapper');
        const cardWidth = 400; // largeur carte
        const gap = 16; // gap entre les cartes
        const scrollAmount = cardWidth + gap; // 416px

        function updateNavArrows() {
          const cards = grid.querySelectorAll('.priority-card-wrapper');
          
          // Toujours montrer les flèches si on a plus de 3 cartes
          if (cards.length > 3) {
            navLeft.style.display = 'flex';
            navRight.style.display = 'flex';
            
            // Gérer l'état disabled selon la position
            const showLeft = gridViewport.scrollLeft > 0;
            const showRight = (gridViewport.scrollLeft + gridViewport.clientWidth < gridViewport.scrollWidth - 1);
            
            navLeft.disabled = !showLeft;
            navRight.disabled = !showRight;
          } else {
            // Masquer seulement si on a 3 cartes ou moins
            navLeft.style.display = 'none';
            navRight.style.display = 'none';
          }
        }
        
        gridViewport.addEventListener('scroll', updateNavArrows);
        window.addEventListener('resize', updateNavArrows);
        updateNavArrows();
        
        function scrollToCard(direction) {
          const current = gridViewport.scrollLeft;
          const target = direction === 'left'
            ? current - scrollAmount
            : current + scrollAmount;
          
          // Animation fluide avec requestAnimationFrame
          const startTime = performance.now();
          const duration = 300; // 300ms
          const startScroll = current;
          const scrollDistance = target - current;
          
          function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Fonction d'easing pour un mouvement plus naturel
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            gridViewport.scrollLeft = startScroll + (scrollDistance * easeOut);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }
          
          requestAnimationFrame(animate);
        }

        navLeft.addEventListener('click', () => {
          scrollToCard('left');
        });
        
        navRight.addEventListener('click', () => {
          scrollToCard('right');
        });

        // Drag & Drop functionality
        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        gridViewport.addEventListener('mousedown', (e) => {
          isDragging = true;
          gridViewport.style.cursor = 'grabbing';
          startX = e.pageX - gridViewport.offsetLeft;
          scrollLeft = gridViewport.scrollLeft;
        });

        gridViewport.addEventListener('mouseleave', () => {
          isDragging = false;
          gridViewport.style.cursor = 'grab';
        });

        gridViewport.addEventListener('mouseup', () => {
          isDragging = false;
          gridViewport.style.cursor = 'grab';
        });

        gridViewport.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          e.preventDefault();
          const x = e.pageX - gridViewport.offsetLeft;
          const walk = (x - startX) * 2; // Multiplier pour un scroll plus rapide
          gridViewport.scrollLeft = scrollLeft - walk;
        });

        console.log('🎯 Overview page initialized - Mynco Onboarding Dashboard');
    }

    
    static initActivityStream() {
        // Auto-scroll and real-time updates for activity stream
        const activityStream = document.querySelector('.activity-stream');
        
        // Mark new items as read after viewing
        const newItems = document.querySelectorAll('.activity-item.new');
        newItems.forEach(item => {
            setTimeout(() => {
                item.classList.remove('new');
            }, 3000);
        });
    }
    
    static initProjectShowcase() {
        // Initialize project view toggle
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const view = btn.dataset.view;
                console.log(`📋 Switching to ${view} view`);
            });
        });
        
        // Hover effects for project showcase
        const projectShowcase = document.querySelector('.project-showcase');
        if (projectShowcase) {
            projectShowcase.addEventListener('mouseenter', () => {
                projectShowcase.classList.add('hovered');
            });
            
            projectShowcase.addEventListener('mouseleave', () => {
                projectShowcase.classList.remove('hovered');
            });
        }
    }
    
    static initPeriodToggle() {
        // Performance data for different periods
        const performanceData = {
            'this-month': {
                revenue: { value: '€24,500', trend: '+18% from last month', class: 'up' },
                conversion: { value: '94%', trend: '+6% improvement', class: 'up' },
                paymentTime: { value: '2.3 days', trend: '-0.8 days faster', class: 'up' },
                satisfaction: { value: '4.9/5', trend: '8 reviews this month', class: 'neutral' }
            },
            'last-month': {
                revenue: { value: '€20,750', trend: '+12% from previous', class: 'up' },
                conversion: { value: '88%', trend: '+2% improvement', class: 'up' },
                paymentTime: { value: '3.1 days', trend: '+0.3 days slower', class: 'warning' },
                satisfaction: { value: '4.7/5', trend: '6 reviews last month', class: 'neutral' }
            }
        };

        const toggleButtons = document.querySelectorAll('.period-btn');
        const perfCards = document.querySelectorAll('.perf-card');

        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                toggleButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Determine which period to show
                const period = btn.textContent.toLowerCase().includes('this') ? 'this-month' : 'last-month';
                const data = performanceData[period];

                // Update performance cards with animation
                perfCards.forEach((card, index) => {
                    const valueEl = card.querySelector('.perf-value');
                    const trendEl = card.querySelector('.perf-trend');
                    
                    if (valueEl && trendEl) {
                        // Add fade out effect
                        card.style.opacity = '0.6';
                        card.style.transform = 'scale(0.98)';
                        
                        setTimeout(() => {
                            // Update content based on card type
                            const cardType = this.getCardType(card);
                            if (data[cardType]) {
                                valueEl.textContent = data[cardType].value;
                                trendEl.textContent = data[cardType].trend;
                                
                                // Update trend class
                                trendEl.className = `perf-trend ${data[cardType].class}`;
                            }
                            
                            // Add fade in effect
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 150);
                    }
                });

                console.log(`📊 Switched to ${period} data`);
            });
        });
    }

    static getCardType(card) {
        // Determine card type based on content or class
        const value = card.querySelector('.perf-value')?.textContent || '';
        const label = card.querySelector('.perf-label')?.textContent || '';
        
        if (value.includes('€') || label.toLowerCase().includes('revenue')) return 'revenue';
        if (value.includes('%') && label.toLowerCase().includes('quote')) return 'conversion';
        if (label.toLowerCase().includes('payment') || label.toLowerCase().includes('time')) return 'paymentTime';
        if (label.toLowerCase().includes('satisfaction') || value.includes('/5')) return 'satisfaction';
        
        return 'revenue'; // fallback
    }

    static startRealTimeUpdates() {
        // Simulate real-time updates
        const liveIndicator = document.querySelector('.live-indicator');
        if (liveIndicator) {
            setInterval(() => {
                liveIndicator.classList.toggle('pulse');
            }, 2000);
        }
        
        // Update time stamps periodically
        setInterval(() => {
            const timeElements = document.querySelectorAll('.time');
            timeElements.forEach(el => {
                // Update relative time (simplified)
                console.log('⏰ Updating timestamps...');
            });
        }, 60000); // Update every minute
    }
}

// Export for use in router
if (typeof window !== 'undefined') {
    window.OverviewPage = OverviewPage;
} 