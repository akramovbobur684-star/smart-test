// Dashboard Module - QuizArena
(function() {
    'use strict';

    // DOM Elements
    let elements = {};

    // State
    let subjects = [];
    let selectedSubject = null;

    /**
     * Initialize dashboard
     */
    function init() {
        // Check if questions exist
        if (!window.questions || !Array.isArray(window.questions)) {
            showError("Savollar bazasi topilmadi! Iltimos, sahifani qayta yuklang.");
            console.error("Questions database not found!");
            return;
        }

        // Initialize DOM elements
        cacheElements();
        
        // Extract subjects from questions
        extractSubjects();
        
        // Update statistics
        updateStatistics();
        
        // Render subjects grid
        renderSubjects();
        
        // Load saved settings
        loadSavedSettings();
        
        // Setup event listeners
        setupEventListeners();
        
        // Setup dark mode
        setupDarkMode();
        
        // Check for dark mode preference
        checkDarkModePreference();
    }

    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements = {
            subjectsGrid: document.getElementById('subjectsGrid'),
            totalQuestions: document.getElementById('totalQuestions'),
            totalSubjects: document.getElementById('totalSubjects'),
            questionCount: document.getElementById('questionCount'),
            timeLimit: document.getElementById('timeLimit'),
            startBtn: document.getElementById('startQuiz'),
            errorMessage: document.getElementById('errorMessage'),
            themeToggle: document.getElementById('themeToggle')
        };
    }

    /**
     * Extract unique subjects from questions
     */
    function extractSubjects() {
        const subjectMap = new Map();
        
        window.questions.forEach(question => {
            if (question.subject && !subjectMap.has(question.subject)) {
                subjectMap.set(question.subject, {
                    name: question.subject,
                    count: 0
                });
            }
            
            if (question.subject) {
                subjectMap.get(question.subject).count++;
            }
        });
        
        subjects = Array.from(subjectMap.values());
        
        // If no subjects found, create default
        if (subjects.length === 0) {
            subjects = [{ name: 'General', count: window.questions.length }];
        }
    }

    /**
     * Update statistics display
     */
    function updateStatistics() {
        if (elements.totalQuestions) {
            elements.totalQuestions.textContent = window.questions.length;
        }
        if (elements.totalSubjects) {
            elements.totalSubjects.textContent = subjects.length;
        }
    }

    /**
     * Render subjects grid
     */
    function renderSubjects() {
        if (!elements.subjectsGrid) return;
        
        elements.subjectsGrid.innerHTML = '';
        
        subjects.forEach(subject => {
            const card = document.createElement('div');
            card.className = 'subject-card';
            if (selectedSubject === subject.name) {
                card.classList.add('selected');
            }
            
            card.innerHTML = `
                <div class="subject-name">📖 ${subject.name}</div>
                <div class="subject-info">${subject.count} ta savol</div>
            `;
            
            card.addEventListener('click', () => selectSubject(subject.name));
            elements.subjectsGrid.appendChild(card);
        });
    }

    /**
     * Select a subject
     */
    function selectSubject(subjectName) {
        selectedSubject = subjectName;
        
        // Update UI
        document.querySelectorAll('.subject-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        const cards = document.querySelectorAll('.subject-card');
        const index = subjects.findIndex(s => s.name === subjectName);
        if (cards[index]) {
            cards[index].classList.add('selected');
        }
        
        // Update max question count
        const subjectQuestions = window.questions.filter(q => q.subject === subjectName);
        const maxQuestions = subjectQuestions.length;
        
        if (elements.questionCount) {
            elements.questionCount.max = maxQuestions;
            const currentValue = parseInt(elements.questionCount.value);
            if (currentValue > maxQuestions) {
                elements.questionCount.value = maxQuestions;
            }
        }
    }

    /**
     * Load saved settings from localStorage
     */
    function loadSavedSettings() {
        const savedSettings = localStorage.getItem('quizSettings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                if (elements.questionCount && settings.questionCount) {
                    elements.questionCount.value = settings.questionCount;
                }
                if (elements.timeLimit && settings.timeLimit) {
                    elements.timeLimit.value = settings.timeLimit;
                }
                if (settings.selectedSubject) {
                    selectSubject(settings.selectedSubject);
                }
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        }
        
        // If no subject selected, select first one
        if (!selectedSubject && subjects.length > 0) {
            selectSubject(subjects[0].name);
        }
    }

    /**
     * Save settings to localStorage
     */
    function saveSettings() {
        const settings = {
            selectedSubject: selectedSubject,
            questionCount: parseInt(elements.questionCount?.value) || 20,
            timeLimit: parseInt(elements.timeLimit?.value) || 30
        };
        
        localStorage.setItem('quizSettings', JSON.stringify(settings));
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        if (elements.startBtn) {
            elements.startBtn.addEventListener('click', startQuiz);
        }
        
        if (elements.questionCount) {
            elements.questionCount.addEventListener('change', saveSettings);
        }
        
        if (elements.timeLimit) {
            elements.timeLimit.addEventListener('change', saveSettings);
        }
    }

    /**
     * Start quiz
     */
    function startQuiz() {
        // Validation
        if (!selectedSubject) {
            showError("Iltimos, fan tanlang!");
            return;
        }
        
        let questionCount = parseInt(elements.questionCount?.value);
        let timeLimit = parseInt(elements.timeLimit?.value);
        
        // Validate question count
        const subjectQuestions = window.questions.filter(q => q.subject === selectedSubject);
        if (questionCount > subjectQuestions.length) {
            questionCount = subjectQuestions.length;
            showError(`${selectedSubject} fani bo'yicha ${subjectQuestions.length} ta savol mavjud. Maksimal savol soni ${subjectQuestions.length} ga o'rnatildi.`);
        }
        
        if (questionCount < 1) {
            showError("Kamida 1 ta savol tanlang!");
            return;
        }
        
        // Save settings
        saveSettings();
        
        // Store quiz configuration
        const quizConfig = {
            subject: selectedSubject,
            questionCount: questionCount,
            timeLimit: timeLimit * 60, // Convert to seconds
            startTime: Date.now()
        };
        
        localStorage.setItem('quizConfig', JSON.stringify(quizConfig));
        
        // Redirect to quiz page
        window.location.href = 'quiz.html';
    }

    /**
     * Show error message
     */
    function showError(message) {
        if (elements.errorMessage) {
            elements.errorMessage.textContent = message;
            elements.errorMessage.style.display = 'block';
            
            setTimeout(() => {
                elements.errorMessage.style.display = 'none';
            }, 3000);
        } else {
            alert(message);
        }
    }

    /**
     * Setup dark mode toggle
     */
    function setupDarkMode() {
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
        
        // Update button text if needed
        if (elements.themeToggle) {
            elements.themeToggle.setAttribute('aria-label', isDark ? 'Light mode' : 'Dark mode');
        }
    }

    /**
     * Check dark mode preference
     */
    function checkDarkModePreference() {
        const savedDarkMode = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDark)) {
            document.body.classList.add('dark');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
