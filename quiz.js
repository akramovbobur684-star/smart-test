(function() {
    const TIME_PER_QUESTION = 15
    const TOTAL_QUESTIONS = 25
    
    let currentQuestions = []
    let currentIndex = 0
    let score = 0
    let timer = null
    let timeLeft = TIME_PER_QUESTION
    let quizInitialized = false
    
    const elements = {
        questionText: null,
        optionsContainer: null,
        nextBtn: null,
        restartBtn: null,
        timerDisplay: null,
        progressText: null,
        scoreDisplay: null
    }
    
    function getSubjectFromURL() {
        const params = new URLSearchParams(window.location.search)
        return parseInt(params.get('subject')) || 0
    }
    
    function loadDarkMode() {
        const isDark = localStorage.getItem('darkMode') === 'true'
        if (isDark) {
            document.body.classList.add('dark-mode')
        }
        return isDark
    }
    
    function showModal(message, showRestart = true) {
        const existingModal = document.querySelector('.quiz-modal')
        if (existingModal) existingModal.remove()
        
        const modal = document.createElement('div')
        modal.className = 'quiz-modal'
        
        const content = document.createElement('div')
        content.className = 'quiz-modal-content'
        
        const messageEl = document.createElement('p')
        messageEl.className = 'quiz-modal-message'
        messageEl.textContent = message
        
        content.appendChild(messageEl)
        
        if (showRestart) {
            const restartIcon = document.createElement('button')
            restartIcon.className = 'quiz-modal-restart'
            restartIcon.innerHTML = '🔄'
            restartIcon.onclick = () => {
                modal.remove()
                fullRestart()
            }
            content.appendChild(restartIcon)
        } else {
            const closeBtn = document.createElement('button')
            closeBtn.className = 'quiz-modal-close'
            closeBtn.textContent = 'OK'
            closeBtn.onclick = () => modal.remove()
            content.appendChild(closeBtn)
        }
        
        modal.appendChild(content)
        document.body.appendChild(modal)
    }
    
    function stopTimer() {
        if (timer) {
            clearInterval(timer)
            timer = null
        }
    }
    
    function startTimer() {
        stopTimer()
        timeLeft = TIME_PER_QUESTION
        updateTimerDisplay()
        
        timer = setInterval(() => {
            if (!quizInitialized) return
            
            timeLeft--
            updateTimerDisplay()
            
            if (timeLeft <= 0) {
                stopTimer()
                handleTimeOut()
            }
        }, 1000)
    }
    
    function updateTimerDisplay() {
        if (elements.timerDisplay) {
            elements.timerDisplay.textContent = `${timeLeft}s`
            if (timeLeft <= 5) {
                elements.timerDisplay.style.color = '#ef4444'
            } else {
                elements.timerDisplay.style.color = '#94a3b8'
            }
        }
    }
    
    function handleTimeOut() {
        quizInitialized = false
        disableOptions(true)
        showModal('Vaqt tugadi!', true)
    }
    
    function disableOptions(disabled) {
        const allOptions = document.querySelectorAll('.quiz-option')
        allOptions.forEach(option => {
            if (disabled) {
                option.style.pointerEvents = 'none'
                option.style.opacity = '0.6'
            } else {
                option.style.pointerEvents = 'auto'
                option.style.opacity = '1'
            }
        })
    }
    
    function updateProgress() {
        if (elements.progressText) {
            elements.progressText.textContent = `${currentIndex + 1} / ${currentQuestions.length}`
        }
    }
    
    function updateScore() {
        if (elements.scoreDisplay) {
            elements.scoreDisplay.textContent = `Ball: ${score}`
        }
    }
    
    function renderQuestion() {
        if (!quizInitialized) return
        if (currentIndex >= currentQuestions.length) {
            finishQuiz()
            return
        }
        
        const question = currentQuestions[currentIndex]
        if (!question) return
        
        if (elements.questionText) {
            elements.questionText.textContent = question.question
        }
        
        if (elements.optionsContainer) {
            elements.optionsContainer.innerHTML = ''
            
            question.options.forEach((option, idx) => {
                const optionDiv = document.createElement('div')
                optionDiv.className = 'quiz-option'
                optionDiv.textContent = `${String.fromCharCode(65 + idx)}. ${option}`
                optionDiv.onclick = () => handleAnswer(option, optionDiv)
                elements.optionsContainer.appendChild(optionDiv)
            })
        }
        
        updateProgress()
        startTimer()
        disableOptions(false)
    }
    
    function handleAnswer(selectedOption, element) {
        if (!quizInitialized) return
        
        const question = currentQuestions[currentIndex]
        const isCorrect = selectedOption === question.correct
        
        if (isCorrect) {
            score++
            updateScore()
            element.classList.add('correct')
        } else {
            element.classList.add('wrong')
            const allOptions = document.querySelectorAll('.quiz-option')
            allOptions.forEach(opt => {
                if (opt.textContent.includes(question.correct)) {
                    opt.classList.add('correct-highlight')
                }
            })
        }
        
        quizInitialized = false
        stopTimer()
        disableOptions(true)
        
        setTimeout(() => {
            if (currentIndex + 1 < currentQuestions.length) {
                currentIndex++
                quizInitialized = true
                renderQuestion()
            } else {
                currentIndex++
                if (currentIndex >= currentQuestions.length) {
                    finishQuiz()
                }
            }
        }, 1500)
    }
    
    function finishQuiz() {
        stopTimer()
        quizInitialized = false
        
        const percentage = (score / currentQuestions.length) * 100
        let message = `Test yakunlandi!\nBall: ${score}/${currentQuestions.length} (${percentage}%)\n`
        
        if (percentage >= 80) message += 'Ajoyib natija! 🎉'
        else if (percentage >= 60) message += 'Yaxshi natija! 👍'
        else if (percentage >= 40) message += 'O\'rtacha natija 📚'
        else message += 'Ko\'proq mashq qiling 💪'
        
        showModal(message, true)
    }
    
    function getRandomQuestions() {
        if (!window.QUIZ_DATA || !window.QUIZ_DATA.questions) {
            return []
        }
        
        const allQuestions = window.QUIZ_DATA.questions
        const shuffled = [...allQuestions]
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        
        return shuffled.slice(0, TOTAL_QUESTIONS)
    }
    
    function fullRestart() {
        stopTimer()
        currentIndex = 0
        score = 0
        updateScore()
        initializeQuiz()
    }
    
    function nextQuestion() {
        if (!quizInitialized) return
        
        if (currentIndex + 1 < currentQuestions.length) {
            currentIndex++
            quizInitialized = true
            renderQuestion()
        } else if (currentIndex + 1 === currentQuestions.length) {
            currentIndex++
            finishQuiz()
        }
    }
    
    function initializeQuiz() {
        const subjectId = getSubjectFromURL()
        
        if (!window.QUIZ_DATA) {
            setTimeout(() => {
                initializeQuiz()
            }, 100)
            return
        }
        
        let questionsForSubject = []
        
        if (subjectId === 0) {
            questionsForSubject = window.QUIZ_DATA.questions
        } else {
            const subject = window.QUIZ_DATA.subjects?.find(s => s.id === subjectId)
            if (subject && subject.questions) {
                questionsForSubject = subject.questions
            } else {
                questionsForSubject = window.QUIZ_DATA.questions
            }
        }
        
        const tempStore = window.QUIZ_DATA.questions
        window.QUIZ_DATA.questions = questionsForSubject
        currentQuestions = getRandomQuestions()
        window.QUIZ_DATA.questions = tempStore
        
        if (currentQuestions.length === 0) {
            showModal('Savollar topilmadi!', false)
            return
        }
        
        currentIndex = 0
        score = 0
        quizInitialized = true
        updateScore()
        renderQuestion()
    }
    
    function bindElements() {
        elements.questionText = document.getElementById('questionText')
        elements.optionsContainer = document.getElementById('optionsContainer')
        elements.nextBtn = document.getElementById('nextBtn')
        elements.restartBtn = document.getElementById('restartBtn')
        elements.timerDisplay = document.getElementById('timerDisplay')
        elements.progressText = document.getElementById('progressText')
        elements.scoreDisplay = document.getElementById('scoreDisplay')
        
        if (elements.nextBtn) {
            elements.nextBtn.addEventListener('click', nextQuestion)
        }
        
        if (elements.restartBtn) {
            elements.restartBtn.addEventListener('click', fullRestart)
        }
    }
    
    function initQuiz() {
        loadDarkMode()
        bindElements()
        initializeQuiz()
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuiz)
    } else {
        initQuiz()
    }
})()
