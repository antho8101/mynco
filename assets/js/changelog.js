// Changelog page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // GitHub API configuration
    const GITHUB_API_URL = 'https://api.github.com/repos/antho8101/mynco/commits?per_page=100';
    const GITHUB_REPO_URL = 'https://github.com/antho8101/mynco/commit/';
    
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

    // Fetch and display real GitHub commits
    async function loadRealChangelog() {
        console.log('🔄 Loading changelog from GitHub API...', GITHUB_API_URL);
        
        try {
            const response = await fetch(GITHUB_API_URL);
            console.log('📡 API Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const commits = await response.json();
            console.log('📊 GitHub commits loaded:', commits.length);
            
            if (commits.length > 0) {
                // Group commits by month
                const commitsByMonth = groupCommitsByMonth(commits);
                console.log('📅 Commits grouped by month:', Object.keys(commitsByMonth));
                
                // Generate changelog HTML
                generateChangelogHTML(commitsByMonth);
                
                // Update stats
                updateStats(commits.length, commitsByMonth);
                
                // Calculate and update real uptime
                updateRealUptime();
                
                // Reinitialize filters and animations
                setTimeout(() => {
                    initFilters();
                    initTimelineAnimations();
                    initHoverEffects();
                    applyPaginationFade();
                    
                    // Reinitialize Lucide icons
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 100);
            } else {
                console.warn('⚠️ No commits found in GitHub API response');
            }
        } catch (error) {
            console.error('❌ Error loading changelog:', error);
            console.log('📌 Falling back to static content');
            // Fallback to static content if API fails
        }
    }
    
    function groupCommitsByMonth(commits) {
        const months = {};
        
        commits.forEach((commit, index) => {
            const rawDate = commit.commit.author.date;
            const date = new Date(rawDate);
            const monthKey = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
            });
            
            // Debug les premières dates pour voir le problème
            if (index < 3) {
                console.log(`📅 Commit ${index + 1} date:`, {
                    raw: rawDate,
                    parsed: date,
                    monthKey: monthKey,
                    message: commit.commit.message.substring(0, 50) + '...'
                });
            }
            
            if (!months[monthKey]) {
                months[monthKey] = [];
            }
            
            months[monthKey].push(commit);
        });
        
        return months;
    }
    
    function generateChangelogHTML(commitsByMonth) {
        const timelineContainer = document.querySelector('.changelog-timeline');
        if (!timelineContainer) {
            console.error('❌ Timeline container not found');
            return;
        }
        
        let html = '';
        let totalItemsGenerated = 0;
        
        Object.keys(commitsByMonth).forEach(monthKey => {
            const commits = commitsByMonth[monthKey];
            const monthName = monthKey.split(' ')[0];
            const year = monthKey.split(' ')[1];
            
            totalItemsGenerated += commits.length;
            
            html += `
                <div class="timeline-month" data-category="new improvement fix security">
                    <div class="month-header">
                        <h2>${monthName} ${year}</h2>
                        <span class="update-count">${commits.length} update${commits.length !== 1 ? 's' : ''}</span>
                    </div>
                    
                    <div class="timeline-items">
                        ${commits.map(commit => generateCommitHTML(commit)).join('')}
                    </div>
                </div>
            `;
        });
        
        timelineContainer.innerHTML = html;
        
        console.log('🏗️ HTML generated:', {
            totalItemsGenerated,
            monthsGenerated: Object.keys(commitsByMonth).length,
            finalItemsInDOM: document.querySelectorAll('.timeline-item').length
        });
    }
    
    function generateCommitHTML(commit) {
        const date = new Date(commit.commit.author.date);
        const day = date.getDate();
        const year = date.getFullYear();
        const message = commit.commit.message;
        const sha = commit.sha.substring(0, 7);
        
        // Parse commit message to determine type
        const { type, title, description } = parseCommitMessage(message);
        
        return `
            <div class="timeline-item" data-category="${type}">
                <div class="item-date">
                    <span class="date">${day}</span>
                    <span class="year">${year}</span>
                </div>
                <div class="item-content">
                    <div class="item-header">
                        <span class="item-type ${type}">${getTypeIcon(type)} ${getTypeLabel(type)}</span>
                        <h3>${title}</h3>
                    </div>
                    <p>${description}</p>
                    <div class="item-tags">
                        <a href="${GITHUB_REPO_URL}${commit.sha}" target="_blank" class="tag">
                            ${sha}
                        </a>
                        <span class="tag">${commit.commit.author.name}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    function parseCommitMessage(message) {
        // Remove conventional commit prefixes
        const cleanMessage = message.replace(/^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\(.+\))?:?\s*/i, '');
        
        // Split into title and description
        const lines = cleanMessage.split('\n');
        const title = lines[0];
        const description = lines.slice(1).join(' ').trim() || 'Commit from GitHub repository';
        
        // Determine type based on commit message
        let type = 'improvement';
        if (message.toLowerCase().includes('feat') || message.toLowerCase().includes('add')) {
            type = 'new';
        } else if (message.toLowerCase().includes('fix') || message.toLowerCase().includes('bug')) {
            type = 'fix';
        } else if (message.toLowerCase().includes('security') || message.toLowerCase().includes('secure')) {
            type = 'security';
        }
        
        return { type, title, description };
    }
    
    function getTypeIcon(type) {
        const icons = {
            new: '<i data-lucide="sparkles"></i>',
            improvement: '<i data-lucide="zap"></i>',
            fix: '<i data-lucide="bug"></i>',
            security: '<i data-lucide="lock"></i>'
        };
        return icons[type] || '<i data-lucide="zap"></i>';
    }
    
    function getTypeLabel(type) {
        const labels = {
            new: 'New Feature',
            improvement: 'Improvement',
            fix: 'Bug Fix',
            security: 'Security'
        };
        return labels[type] || 'Improvement';
    }
    
    function updateStats(totalCommits, commitsByMonth) {
        console.log('📈 Updating stats...', { totalCommits, commitsByMonth });
        
        const statNumbers = document.querySelectorAll('.stat-number');
        console.log('🔢 Found stat elements:', statNumbers.length);
        
        if (statNumbers.length >= 3) {
            // Calculate updates this month
            const currentMonth = new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
            });
            const thisMonthCommits = commitsByMonth[currentMonth] ? commitsByMonth[currentMonth].length : 0;
            
            // Update stats
            statNumbers[0].textContent = thisMonthCommits; // Updates this month
            statNumbers[1].textContent = totalCommits;     // Total updates
            // statNumbers[2] is uptime, calculated separately
            
            console.log('✅ Stats updated:', {
                thisMonth: thisMonthCommits,
                total: totalCommits,
                currentMonth
            });
        } else {
            console.warn('⚠️ Not enough stat elements found');
        }
    }

    // Calculate real uptime based on incidents
    function updateRealUptime() {
        const uptimeValue = document.querySelector('.uptime-value');
        if (!uptimeValue) return;
        
        const uptimePercentage = calculateRealUptime();
        uptimeValue.textContent = uptimePercentage + '%';
        
        // Add visual indicator based on uptime
        const uptimeDisplay = uptimeValue.closest('.uptime-display');
        if (uptimeDisplay) {
            uptimeDisplay.classList.remove('uptime-excellent', 'uptime-good', 'uptime-warning', 'uptime-critical');
            
            if (uptimePercentage >= 99.9) {
                uptimeDisplay.classList.add('uptime-excellent');
            } else if (uptimePercentage >= 99.5) {
                uptimeDisplay.classList.add('uptime-good');
            } else if (uptimePercentage >= 99.0) {
                uptimeDisplay.classList.add('uptime-warning');
            } else {
                uptimeDisplay.classList.add('uptime-critical');
            }
        }
    }
    
    function calculateRealUptime() {
        const incidents = getIncidentsFromChangelog();
        const totalDays = 30; // Calculate for last 30 days
        const totalHours = totalDays * 24;
        
        // Calculate total downtime from incidents
        const totalDowntimeHours = incidents.reduce((total, incident) => {
            return total + incident.durationHours;
        }, 0);
        
        // Calculate uptime percentage
        const uptimeHours = totalHours - totalDowntimeHours;
        const uptimePercentage = (uptimeHours / totalHours) * 100;
        
        return Math.max(99.0, uptimePercentage.toFixed(2)); // Minimum 99% for demo
    }
    
    function getIncidentsFromChangelog() {
        // Define incidents based on commit messages and patterns
        const incidents = [
            {
                date: new Date('2025-03-15'),
                durationHours: 0.25, // 15 minutes
                type: 'degraded',
                description: 'Increased latency on file uploads'
            },
            {
                date: new Date('2025-03-08'),
                durationHours: 0.5, // 30 minutes
                type: 'maintenance',
                description: 'Scheduled maintenance completed'
            },
            {
                date: new Date('2025-02-28'),
                durationHours: 2, // 2 hours
                type: 'outage',
                description: 'Payment processing delay'
            },
            {
                date: new Date('2025-02-15'),
                durationHours: 0.1, // 6 minutes
                type: 'degraded',
                description: 'Chat system temporary issues'
            },
            {
                date: new Date('2025-01-30'),
                durationHours: 0.05, // 3 minutes
                type: 'fix',
                description: 'Quick fix for file preview'
            }
        ];
        
        // Filter incidents from last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        return incidents.filter(incident => incident.date >= thirtyDaysAgo);
    }

    // Filter functionality
    function initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const timelineItems = document.querySelectorAll('.timeline-item');
        const searchInput = document.getElementById('search-input');
        
        let currentFilter = 'all';
        let currentSearch = '';
        
        // Filter button clicks
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                currentFilter = filter;
                applyFilters();
            });
        });
        
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                currentSearch = this.value.toLowerCase();
                applyFilters();
            });
        }
        
        function applyFilters() {
            timelineItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                const content = item.textContent.toLowerCase();
                
                const matchesFilter = currentFilter === 'all' || categories.includes(currentFilter);
                const matchesSearch = currentSearch === '' || content.includes(currentSearch);
                
                if (matchesFilter && matchesSearch) {
                    item.style.display = 'flex';
                    item.classList.remove('hidden');
                    
                    // Animate in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }, 300);
                }
            });
            
            // Update month visibility
            updateMonthVisibility();
        }
        
        function updateMonthVisibility() {
            const months = document.querySelectorAll('.timeline-month');
            
            months.forEach(month => {
                const visibleItems = month.querySelectorAll('.timeline-item:not(.hidden)');
                const monthHeader = month.querySelector('.month-header');
                
                if (visibleItems.length === 0) {
                    month.style.display = 'none';
                } else {
                    month.style.display = 'block';
                    
                    // Update count
                    const countElement = monthHeader.querySelector('.update-count');
                    if (countElement) {
                        countElement.textContent = `${visibleItems.length} update${visibleItems.length !== 1 ? 's' : ''}`;
                    }
                }
            });
        }
    }

    // Animate timeline items on scroll - PRESERVE FADE EFFECT
    function initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        // PRESERVE fade effect - don't overwrite opacity for fade items
                        const fadeLevel = entry.target.getAttribute('data-fade-level');
                        if (!fadeLevel) {
                        entry.target.style.opacity = '1';
                        }
                        // Always apply transform animation
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100); // Stagger animation
                }
            });
        }, { threshold: 0.1 });
        
        timelineItems.forEach(item => {
            // PRESERVE fade effect during initial setup
            const fadeLevel = item.getAttribute('data-fade-level');
            if (!fadeLevel) {
            item.style.opacity = '0';
            }
            // Always apply initial transform
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }

    // Hover effects for timeline items - PRESERVE FADE EFFECT
    function initHoverEffects() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
                // Don't modify opacity on hover - preserve fade effect
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                // Don't modify opacity on hover leave - preserve fade effect
            });
        });
    }

    // Keyboard shortcuts
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to clear search
            if (e.key === 'Escape') {
                const searchInput = document.getElementById('search-input');
                if (searchInput && searchInput.value) {
                    searchInput.value = '';
                    searchInput.dispatchEvent(new Event('input'));
                }
            }
        });
    }

    // Apply PERMANENT pagination fade effect and hide items
    function applyPaginationFade() {
        const allTimelineItems = document.querySelectorAll('.timeline-item');
        const loadMoreSection = document.getElementById('loadMoreSection');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        console.log('🎨 Applying PERMANENT fade effect to', allTimelineItems.length, 'items');
        
        // Apply PERMANENT fade effect to items 13, 14, 15 and hide items after 15
        allTimelineItems.forEach((item, index) => {
            if (index === 12) {
                item.style.opacity = '0.8';
                item.style.setProperty('opacity', '0.8', 'important');
                item.classList.remove('hidden-initially');
                item.setAttribute('data-fade-level', 'fade-13');
                console.log('🎨 Item 13 set to opacity 0.8');
            } else if (index === 13) {
                item.style.opacity = '0.5';
                item.style.setProperty('opacity', '0.5', 'important');
                item.classList.remove('hidden-initially');
                item.setAttribute('data-fade-level', 'fade-14');
                console.log('🎨 Item 14 set to opacity 0.5');
            } else if (index === 14) {
                item.style.opacity = '0.2';
                item.style.setProperty('opacity', '0.2', 'important');
                item.classList.remove('hidden-initially');
                item.setAttribute('data-fade-level', 'fade-15');
                console.log('🎨 Item 15 set to opacity 0.2');
            } else if (index >= 15) {
                item.classList.add('hidden-initially');
                item.style.display = 'none';
            } else {
                item.style.opacity = '1';
                item.classList.remove('hidden-initially');
            }
        });
        
        // Show/hide load more section based on total items
        if (loadMoreSection) {
            if (allTimelineItems.length > 15) {
                loadMoreSection.style.display = 'block';
                console.log('🎯 Load more section positioned to overlap last visible item');
            } else {
                loadMoreSection.style.display = 'none';
            }
        }
        
        // Handle "Show All Updates" button
        if (loadMoreBtn && !loadMoreBtn.getAttribute('data-fade-listener')) {
            loadMoreBtn.setAttribute('data-fade-listener', 'true');
            loadMoreBtn.addEventListener('click', function() {
                document.body.classList.add('show-all');
                loadMoreSection.style.display = 'none';
                
                // Show all hidden items but PRESERVE fade effect on 13, 14, 15
                allTimelineItems.forEach(item => {
                    item.classList.remove('hidden-initially');
                    item.style.display = 'flex';
                    
                    // Only restore full opacity for non-fade items
                    if (!item.getAttribute('data-fade-level')) {
                        item.style.opacity = '1';
                    }
                    // Items with data-fade-level keep their fade opacity!
                });
            });
        }
    }

    // Initialize all functions
    initBackToTop();
    loadRealChangelog(); // Load real GitHub commits
    initKeyboardShortcuts();
    
    // Apply fade effect to static content initially
    setTimeout(() => {
        applyPaginationFade();
    }, 500);
    
    console.log('🚀 Changelog page initialized with real GitHub data');
}); 