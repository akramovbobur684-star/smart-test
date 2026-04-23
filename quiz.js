// Quiz Module - Test Engine
(function() {
    'use strict';

    // State
    let currentQuestions = [];
    let userAnswers = [];
    let currentIndex = 0;
    let timer = null;
    let timeRemaining = 0;
    let quizConfig = null;

    // DOM Elements
    let elements = {};

    /**
     * Initialize quiz
     */
    function init() {
        // Check questions exist
        if (!window.questions || !Array.isArray(window.questions)) {
            handleError("Savollar bazasi topilmadi!");
            return;
        }
        
        // Get quiz configuration
        const configJson = localStorage.getItem('quizConfig');
        if (!configJson) {
            handleError("Test konfiguratsiyasi topilmadi! Iltimos, qaytadan boshlang.");
            return;
        }
        
        try {
            quizConfig = JSON.parse(configJson);
        } catch (error) {
            handleError("Konfiguratsiyani o'qishda xatolik!");
            return;
        }
        
        // Cache DOM elements
        cacheElements();
        
        // Load questions
        loadQuestions();
        
        // Setup event listeners
        setupEventListeners();
        
        // Start timer
        startTimer();
        
        // Render first question
        renderCurrentQuestion();
        
        // Setup dark mode
        setupDarkMode();
    }

    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements = {
            timer: document.getElementById('timer'),
            questionIndicator: document.getElementById('questionIndicator'),
            progressFill: document.getElementById('progressFill'),
            questionText: document.getElementById('questionText'),
            optionsContainer: document.getElementById('optionsContainer'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            submitBtn: document.getElementById('submitBtn')
        };
    }

    /**
     * Load and shuffle questions
     */
    function loadQuestions() {
        // Filter questions by subject
        let filteredQuestions = window.questions.filter(q => q.subject === quizConfig.subject);
        
        if (filteredQuestions.length === 0) {
            handleError(`${quizConfig.subject} fani bo'yicha savollar topilmadi!`);
            return;
        }
        
        // Shuffle questions using Fisher-Yates algorithm
        filteredQuestions = shuffleArray([...filteredQuestions]);
        
        // Take only required number of questions
        currentQuestions = filteredQuestions.slice(0, quizConfig.questionCount);
        
        // Shuffle options for each question
        currentQuestions = currentQuestions.map(question => ({
            ...question,
            options: shuffleArray([...question.options])
        }));
        
        // Initialize user answers array
        userAnswers = new Array(currentQuestions.length).fill(null);
    }

    /**
     * Fisher-Yates shuffle algorithm
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Start timer
     */
    function startTimer() {
        timeRemaining = quizConfig.timeLimit;
        updateTimerDisplay();
        
        timer = setInterval(() => {
            if (timeRemaining <= 0) {
                // Time's up - auto submit
                clearInterval(timer);
                submitQuiz();
            } else {
                timeRemaining--;
                updateTimerDisplay();
                
                // Add warning class when less than 1 minute
                if (timeRemaining <= 60 && elements.timer) {
                    elements.timer.classList.add('warning');
                }
            }
        }, 1000);
    }

    /**
     * Update timer display
     */
    function updateTimerDisplay() {
        if (!elements.timer) return;
        
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    /**
     * Render current question
     */
    function renderCurrentQuestion() {
        if (!currentQuestions[currentIndex]) return;
        
        const question = currentQuestions[currentIndex];
        const currentAnswer = userAnswers[currentIndex];
        
        // Update question text
        if (elements.questionText) {
            elements.questionText.textContent = `${currentIndex + 1}. ${question.question}`;
        }
        
        // Update progress
        updateProgress();
        
        // Render options
        if (elements.optionsContainer) {
            elements.optionsContainer.innerHTML = '';
            
            question.options.forEach((option, idx) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                if (currentAnswer === option) {
                    optionDiv.classList.add('selected');
                }
                
                optionDiv.innerHTML = `
                    <span style="font-weight: bold; margin-right: 10px;">${String.fromCharCode(65 + idx)}.</span>
                    ${option}
                `;
                
                optionDiv.addEventListener('click', () => selectAnswer(option));
                elements.optionsContainer.appendChild(optionDiv);
            });
        }
        
        // Update navigation buttons
        updateNavigationButtons();
    }

    /**
     * Select answer for current question     */
    function selectAnswer(answer) {
        userAnswers[currentIndex] = answer;
        renderCurrentQuestion();
    }

    /**
     * Update progress bar and indicator
     */
    function updateProgress() {
        const progress = ((currentIndex + 1) / currentQuestions.length) * 100;
        
        if (elements.progressFill) {
            elements.progressFill.style.width = `${progress}%`;
        }
        
        if (elements.questionIndicator) {
            elements.questionIndicator.textContent = `Savol ${currentIndex + 1} / ${currentQuestions.length}`;
        }
    }

    /**
     * Update navigation buttons visibility
     */
    function updateNavigationButtons() {
        if (elements.prevBtn) {
            elements.prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        }
        
        if (elements.submitBtn) {
            if (currentIndex === currentQuestions.length - 1) {
                elements.nextBtn.style.display = 'none';
                elements.submitBtn.style.display = 'block';
            } else {
                elements.nextBtn.style.display = 'block';
                elements.submitBtn.style.display = 'none';
            }
        }
    }

    /**
     * Go to previous question
     */
    function previousQuestion() {
        if (currentIndex > 0) {
            currentIndex--;
            renderCurrentQuestion();
        }
    }

    /**
     * Go to next question
     */
    function nextQuestion() {
        if (currentIndex < currentQuestions.length - 1) {
            currentIndex++;
            renderCurrentQuestion();
        }
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        if (elements.prevBtn) {
            elements.prevBtn.addEventListener('click', previousQuestion);
        }
        
        if (elements.nextBtn) {
            elements.nextBtn.addEventListener('click', nextQuestion);
        }
        
        if (elements.submitBtn) {
            elements.submitBtn.addEventListener('click', submitQuiz);
        }
    }

    /**
     * Submit quiz and save results
     */
    function submitQuiz() {
        // Stop timer
        if (timer) {
            clearInterval(timer);
        }
        
        // Calculate results
        let correctCount = 0;
        const detailedResults = [];
        
        currentQuestions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.answer;
            
            if (isCorrect) {
                correctCount++;
            }
            
            detailedResults.push({
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: question.answer,
                isCorrect: isCorrect,
                options: question.options
            });
        });
        
        const totalQuestions = currentQuestions.length;
        const wrongCount = totalQuestions - correctCount;
        const percentage = (correctCount / totalQuestions) * 100;
        
        // Calculate time spent
        const timeSpent = quizConfig.timeLimit - timeRemaining;
        
        // Save results
        const results = {
            totalQuestions: totalQuestions,
            correctCount: correctCount,
            wrongCount: wrongCount,
            percentage: percentage,
            timeSpent: timeSpent,
            detailedResults: detailedResults,
            subject: quizConfig.subject,
            completedAt: new Date().toISOString()
        };
        
        localStorage.setItem('quizResults', JSON.stringify(results));
        
        // Redirect to results page
        window.location.href = 'result.html';
    }

    /**
     * Handle errors
     */
    function handleError(message) {
        console.error(message);
        alert(message);
        window.location.href = 'index.html';
    }

    /**
     * Setup dark mode
     */
    function setupDarkMode() {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark');
        }
    }

    // Initialize quiz when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
