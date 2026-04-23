// Result Module - Display Quiz Results
(function() {
    'use strict';

    let results = null;
    let elements = {};

    /**
     * Initialize results page
     */
    function init() {
        // Cache DOM elements
        cacheElements();
        
        // Load results from localStorage
        loadResults();
        
        // Display results
        if (results) {
            displayResults();
            animateProgressCircle();
        } else {
            showNoResultsMessage();
        }
        
        // Setup dark mode
        setupDarkMode();
        
        // Setup event listeners
        setupEventListeners();
    }

    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements = {
            percentage: document.getElementById('percentage'),
            totalQuestions: document.getElementById('totalQuestions'),
            correctAnswers: document.getElementById('correctAnswers'),
            wrongAnswers: document.getElementById('wrongAnswers'),
            timeSpent: document.getElementById('timeSpent'),
            messageContainer: document.getElementById('messageContainer'),
            progressCircle: document.getElementById('progressCircle'),
            themeToggle: document.getElementById('themeToggle')
        };
    }

    /**
     * Load results from localStorage
     */
    function loadResults() {
        const resultsJson = localStorage.getItem('quizResults');
        
        if (resultsJson) {
            try {
                results = JSON.parse(resultsJson);
            } catch (error) {
                console.error('Error parsing results:', error);
                results = null;
            }
        }
    }

    /**
     * Display results on page
     */
    function displayResults() {
        if (!results) return;
        
        // Update basic stats
        if (elements.percentage) {
            elements.percentage.textContent = `${Math.round(results.percentage)}%`;
        }
        
        if (elements.totalQuestions) {
            elements.totalQuestions.textContent = results.totalQuestions;
        }
        
        if (elements.correctAnswers) {
            elements.correctAnswers.textContent = results.correctCount;
        }
        
        if (elements.wrongAnswers) {
            elements.wrongAnswers.textContent = results.wrongCount;
        }
        
        // Format and display time spent
        if (elements.timeSpent) {
            const minutes = Math.floor(results.timeSpent / 60);
            const seconds = results.timeSpent % 60;
            elements.timeSpent.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Display motivational message
        displayMotivationalMessage();
        
        // Save to history
        saveToHistory();
    }

    /**
     * Display motivational message based on performance
     */
    function displayMotivationalMessage() {
        if (!elements.messageContainer || !results) return;
        
        let message = '';
        let emoji = '';
        
        if (results.percentage >= 90) {
            message = "Ajoyib! Siz haqiqiy mutaxassissiz! 🌟";
            emoji = "🏆";
        } else if (results.percentage >= 70) {
            message = "Juda yaxshi! Muvaffaqiyatingiz bilan faxrlaning! 👍";
            emoji = "🎯";
        } else if (results.percentage >= 50) {
            message = "Yaxshi natija! Biroz ko'proq mashq qiling va mukammal bo'ling! 💪";
            emoji = "📚";
        } else if (results.percentage >= 30) {
            message = "Yaxshi urinish! Ko'proq mashq qilish kerak. Taslim bo'lmang! 🌱";
            emoji = "⭐";
        } else {
            message = "Bu sizning eng yaxshi natijangiz emas. Ammo har bir xato o'rganish imkoniyati! 🎓";
            emoji = "🚀";
        }
        
        elements.messageContainer.innerHTML = `
            <div class="message">
                ${emoji} ${message}
            </div>
        `;
        
        // Add detailed results button if available
        if (results.detailedResults && results.detailedResults.length > 0) {
            const viewDetailsBtn = document.createElement('button');
            viewDetailsBtn.textContent = '📊 Batafsil natijalar';
            viewDetailsBtn.className = 'btn btn-secondary';
            viewDetailsBtn.style.marginTop = '15px';
            viewDetailsBtn.addEventListener('click', showDetailedResults);
            elements.messageContainer.appendChild(viewDetailsBtn);
        }
    }

    /**
     * Show detailed results modal
     */
    function showDetailedResults() {
        if (!results.detailedResults) return;
        
        const modalHtml = `
            <div id="detailsModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div style="background: var(--surface-light); border-radius: 16px; max-width: 600px; width: 100%; max-height: 80vh; overflow: auto; padding: 20px;">
                    <h2 style="margin-bottom: 20px;">📝 Batafsil natijalar</h2>
                    <div id="detailsContent"></div>
                    <button id="closeModal" class="btn btn-primary" style="margin-top: 20px; width: 100%;">Yopish</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        const detailsContent = document.getElementById('detailsContent');
        if (detailsContent) {
            results.detailedResults.forEach((result, index) => {
                const statusIcon = result.isCorrect ? '✅' : '❌';
                detailsContent.innerHTML += `
                    <div style="padding: 12px; border-bottom: 1px solid var(--border-light); margin-bottom: 10px;">
                        <div style="font-weight: bold; margin-bottom: 8px;">${statusIcon} ${index + 1}. ${result.question}</div>
                        <div style="font-size: 0.9rem; color: ${result.isCorrect ? 'var(--success)' : 'var(--danger)'}">
                            Sizning javob: ${result.userAnswer || 'Javob berilmagan'}
                        </div>
                        ${!result.isCorrect ? `<div style="font-size: 0.9rem; color: var(--primary)">To'g'ri javob: ${result.correctAnswer}</div>` : ''}
                    </div>
                `;
            });
        }
        
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                document.getElementById('detailsModal').remove();
            });
        }
    }

    /**
     * Animate progress circle
     */
    function animateProgressCircle() {
        if (!elements.progressCircle || !results) return;
        
        const circumference = 2 * Math.PI * 90;
        const percentage = results.percentage / 100;
        const offset = circumference * (1 - percentage);
        
        elements.progressCircle.style.strokeDasharray = circumference;
        elements.progressCircle.style.strokeDashoffset = circumference;
        
        // Animate
        setTimeout(() => {
            elements.progressCircle.style.transition = 'stroke-dashoffset 1.5s ease-out';
            elements.progressCircle.style.strokeDashoffset = offset;
        }, 100);
    }

    /**
     * Save results to history
     */
    function saveToHistory() {
        if (!results) return;
        
        const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        
        history.push({
            ...results,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 20 results
        while (history.length > 20) {
            history.shift();
        }
        
        localStorage.setItem('quizHistory', JSON.stringify(history));
    }

    /**
     * Show no results message
     */
    function showNoResultsMessage() {
        const container = document.querySelector('.result-container');
        if (container) {
            container.innerHTML = `
                <div class="result-card">
                    <h1>⚠️ Natijalar topilmadi</h1>
                    <p style="margin: 20px 0;">Siz hali test topshirmagansiz yoki natijalar o'chirilgan.</p>
                    <a href="index.html" class="btn btn-primary">🏠 Asosiy sahifaga qaytish</a>
                </div>
            `;
        }
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', toggleDarkMode);
        }
    }

    /**
     * Toggle dark mode
     */
    function toggleDarkMode() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
        
        if (elements.themeToggle) {
            elements.themeToggle.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
        }
    }

    /**
     * Setup dark mode
     */
    function setupDarkMode() {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark');
            if (elements.themeToggle) {
                elements.themeToggle.textContent = '☀️ Light mode';
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
