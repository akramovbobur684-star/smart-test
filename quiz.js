(function() {
    let currentQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let timerInterval = null;
    let timeLeft = 15;

    const elements = {
        questionText: document.getElementById('quiz-question-text'),
        optionsContainer: document.getElementById('quiz-options'),
        timerDisplay: document.getElementById('timer-text'),
        progressFill: document.getElementById('timer-progress-fill'),
        counter: document.getElementById('quiz-question-counter'),
        subjectTitle: document.getElementById('quiz-subject-name'),
        modal: document.getElementById('time-overlay'),
        nextBtn: document.getElementById('btn-next')
    };

    function initQuiz() {
        const params = new URLSearchParams(window.location.search);
        const subjectId = params.get('subject');

        if (subjectId === null || !window.QUIZ_DATA || !window.QUIZ_DATA[subjectId]) {
            let attempts = 0;
            const checkData = setInterval(() => {
                attempts++;
                if (window.QUIZ_DATA && window.QUIZ_DATA[subjectId]) {
                    clearInterval(checkData);
                    setupQuiz(subjectId);
                } else if (attempts > 10) {
                    clearInterval(checkData);
                    alert("Ma'lumotlar yuklanmadi!");
                }
            }, 500);
        } else {
            setupQuiz(subjectId);
        }
    }

    function setupQuiz(id) {
        const data = window.QUIZ_DATA[id];
        elements.subjectTitle.innerText = data.subject;
        currentQuestions = [...data.questions].sort(() => Math.random() - 0.5).slice(0, 25);
        currentIndex = 0;
        score = 0;
        renderQuestion();
    }

    function renderQuestion() {
        if (currentIndex >= currentQuestions.length) {
            alert("Test yakunlandi! Balingiz: " + score);
            window.location.href = 'index.html';
            return;
        }

        const q = currentQuestions[currentIndex];
        elements.questionText.innerText = q.question;
        elements.optionsContainer.innerHTML = '';
        elements.counter.innerText = (currentIndex + 1) + ' / ' + currentQuestions.length;
        elements.nextBtn.disabled = true;

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = String.fromCharCode(65 + idx) + ') ' + opt;
            btn.onclick = () => selectAnswer(btn, opt, q.answer);
            elements.optionsContainer.appendChild(btn);
        });

        startTimer();
    }

    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 15;
        updateTimerUI();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerUI();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showTimeOver();
            }
        }, 1000);
    }

    function updateTimerUI() {
        elements.timerDisplay.innerText = timeLeft + ' soniya qoldi';
        const percent = (timeLeft / 15) * 100;
        elements.progressFill.style.width = percent + '%';
    }

    function selectAnswer(btn, selected, correct) {
        const allBtns = document.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        elements.nextBtn.disabled = false;
        
        elements.nextBtn.onclick = () => {
            if (selected === correct) score++;
            currentIndex++;
            renderQuestion();
        };
    }

    function showTimeOver() {
        elements.modal.style.display = 'flex';
        const resetBtn = document.getElementById('reset-test-btn');
        resetBtn.onclick = () => {
            elements.modal.style.display = 'none';
            currentIndex = 0;
            score = 0;
            renderQuestion();
        };
    }

    document.addEventListener('DOMContentLoaded', initQuiz);
})();
