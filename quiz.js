/**
 * QuizMaster Pro — Quiz Engine (root papkada)
 */

(function() {
    'use strict';

    // Holat
    let state = {
        subjectIndex: null,
        subjectName: "",
        questions: [],
        currentIndex: 0,
        answers: [],
        timeLeft: 30,
        timerInterval: null,
        isFinished: false,
        startTime: null
    };

    // DOM elementlari
    const elements = {
        subjectName: document.getElementById('quiz-subject-name'),
        counter: document.getElementById('quiz-question-counter'),
        badge: document.getElementById('question-badge'),
        questionText: document.getElementById('quiz-question-text'),
        options: document.getElementById('quiz-options'),
        progressBar: document.getElementById('quiz-progress-bar'),
        progressText: document.getElementById('quiz-progress-text'),
        nextBtn: document.getElementById('btn-next'),
        timer: document.getElementById('quiz-timer')
    };

    // URL parametrni olish
    function getSubjectIndex() {
        const params = new URLSearchParams(window.location.search);
        return params.get('subject');
    }

    // Savolni render qilish
    function renderQuestion() {
        if (!state.questions.length) return;
        
        const q = state.questions[state.currentIndex];
        const total = state.questions.length;
        const current = state.currentIndex + 1;
        const percent = Math.round(((current - 1) / total) * 100);
        
        if (elements.questionText) elements.questionText.innerHTML = q.question;
        if (elements.counter) elements.counter.innerHTML = `${current} / ${total}`;
        if (elements.badge) elements.badge.innerHTML = `SAVOL: ${current}`;
        if (elements.progressBar) elements.progressBar.style.width = `${percent}%`;
        if (elements.progressText) elements.progressText.innerHTML = `${percent}%`;
        
        // Variantlar
        if (elements.options) {
            elements.options.innerHTML = '';
            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                const letter = String.fromCharCode(65 + i);
                btn.innerHTML = `<span class="option-letter">${letter}</span><span class="option-text">${opt}</span>`;
                btn.onclick = () => {
                    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    state.answers[state.currentIndex] = opt;
                    if (elements.nextBtn) elements.nextBtn.disabled = false;
                };
                if (state.answers[state.currentIndex] === opt) btn.classList.add('selected');
                elements.options.appendChild(btn);
            });
        }
        
        // Next tugmasi
        if (elements.nextBtn) {
            const isLast = state.currentIndex === total - 1;
            elements.nextBtn.innerHTML = isLast ? '✅ Natijani ko\'rish' : '▶ Keyingi savol';
            elements.nextBtn.disabled = state.answers[state.currentIndex] === undefined;
        }
        
        resetTimer();
    }

    // Keyingi savol
    function nextQuestion() {
        if (state.answers[state.currentIndex] === undefined) {
            if (elements.nextBtn) elements.nextBtn.disabled = true;
            return;
        }
        
        if (state.currentIndex < state.questions.length - 1) {
            state.currentIndex++;
            renderQuestion();
        } else {
            finishQuiz();
        }
    }

    // Taymer
    function resetTimer() {
        if (state.timerInterval) clearInterval(state.timerInterval);
        state.timeLeft = 30;
        updateTimerDisplay();
        
        state.timerInterval = setInterval(() => {
            state.timeLeft--;
            updateTimerDisplay();
            if (state.timeLeft <= 0) {
                clearInterval(state.timerInterval);
                if (!state.answers[state.currentIndex]) {
                    state.answers[state.currentIndex] = null;
                    nextQuestion();
                }
            }
        }, 1000);
    }
    
    function updateTimerDisplay() {
        if (elements.timer) {
            const mins = Math.floor(state.timeLeft / 60);
            const secs = state.timeLeft % 60;
            elements.timer.innerHTML = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            elements.timer.style.color = state.timeLeft <= 5 ? '#ef4444' : 'inherit';
        }
    }

    // Testni yakunlash — TO'G'RILANGAN YO'L!
    function finishQuiz() {
        if (state.timerInterval) clearInterval(state.timerInterval);
        state.isFinished = true;
        
        let correct = 0;
        state.questions.forEach((q, i) => {
            if (state.answers[i] === q.answer) correct++;
        });
        
        const percent = Math.round((correct / state.questions.length) * 100);
        const timeSpent = Math.round((Date.now() - state.startTime) / 1000);
        
        // Natijalarni saqlash
        try {
            const results = JSON.parse(localStorage.getItem('qm_results') || '[]');
            results.unshift({
                subject: state.subjectName,
                subjectIndex: state.subjectIndex,
                correct: correct,
                total: state.questions.length,
                percent: percent,
                timeSpent: timeSpent,
                timestamp: Date.now()
            });
            localStorage.setItem('qm_results', JSON.stringify(results.slice(0, 50)));
        } catch(e) {}
        
        // ✅ TO'G'RILANGAN: result.html ga o'tish (papkasiz, root papkada)
        window.location.href = `result.html?subject=${state.subjectName}&score=${correct}&total=${state.questions.length}&percent=${percent}&time=${timeSpent}`;
    }

    // Boshlash
    function startQuiz() {
        const idx = parseInt(getSubjectIndex());
        
        if (isNaN(idx)) {
            if (elements.questionText) elements.questionText.innerHTML = '❌ URL da subject parametri topilmadi!';
            return;
        }
        
        if (!window.QUIZ_DATA || !window.QUIZ_DATA[idx]) {
            if (elements.questionText) {
                elements.questionText.innerHTML = `❌ ${idx}-indeksli fan topilmadi! Mavjud fanlar: ${window.QUIZ_DATA ? window.QUIZ_DATA.length : 0}`;
            }
            return;
        }
        
        const subject = window.QUIZ_DATA[idx];
        state.subjectIndex = idx;
        state.subjectName = subject.subject;
        state.questions = [...subject.questions];
        state.currentIndex = 0;
        state.answers = new Array(state.questions.length).fill(undefined);
        state.startTime = Date.now();
        
        if (elements.subjectName) elements.subjectName.innerHTML = `${subject.icon || '📚'} ${subject.subject}`;
        document.title = `${subject.subject} — QuizMaster Pro`;
        
        renderQuestion();
    }

    // Event listenerlar
    if (elements.nextBtn) elements.nextBtn.onclick = nextQuestion;
    
    // Dark Mode
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        const savedTheme = localStorage.getItem('quiz_theme');
        if (savedTheme === 'dark') document.body.classList.add('dark-mode');
        themeBtn.onclick = () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('quiz_theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
            themeBtn.innerHTML = document.body.classList.contains('dark-mode') ? '☀️ Light' : '🌙 Dark';
        };
    }
    
    startQuiz();
})();
