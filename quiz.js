<!-- ============================================================ -->
<!-- quiz.js - Test sahifasi (Parametrni to'g'ri o'qish) -->
<!-- ============================================================ -->
<script>
// ============================================================
// quiz.js v6.0 - URL parametrni to'g'ri o'qish + Fallback
// ============================================================

(function() {
    'use strict';

    const TIME_PER_QUESTION = 15;
    const TOTAL_QUESTIONS = 25;

    let state = {
        subjectIndex: null,
        subjectName: "",
        allQuestions: [],
        selectedQuestions: [],
        currentIndex: 0,
        answers: [],
        score: 0,
        timeLeft: TIME_PER_QUESTION,
        timerInterval: null,
        isActive: true,
        isTimeOver: false,
        startTime: null
    };

    let elements = {};

    // ========== DARK MODE ==========
    function initDarkMode() {
        const savedTheme = localStorage.getItem('quiz_theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else if (savedTheme === 'light') {
            document.body.classList.remove('dark-mode');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        }
    }

    // ========== URL PARAMETRNI OLISH (MUSTAHKAM) ==========
    function getSubjectIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const subjectParam = urlParams.get('subject');
        
        console.log('[Quiz] URL parametr "subject":', subjectParam);
        console.log('[Quiz] To\'liq URL:', window.location.href);
        
        if (subjectParam === null) {
            return null;
        }
        
        // parseInt bilan raqamga aylantirish
        const parsed = parseInt(subjectParam, 10);
        
        // Agar NaN bo'lsa, null qaytar
        if (isNaN(parsed)) {
            console.warn('[Quiz] "subject" parametri son emas:', subjectParam);
            return null;
        }
        
        return parsed;
    }

    function showErrorPage(title, message, showRetry = true) {
        if (elements.skeletonLoading) elements.skeletonLoading.style.display = 'none';
        if (elements.quizContent) elements.quizContent.style.display = 'none';
        
        const wrapper = document.getElementById('quiz-wrapper');
        if (wrapper) {
            wrapper.innerHTML = `
                <div class="error-container">
                    <div class="error-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="error-title">${escapeHtml(title)}</div>
                    <div class="error-text">${escapeHtml(message)}</div>
                    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                        ${showRetry ? '<button onclick="location.reload()" class="error-btn" style="background: #4f46e5;"><i class="fas fa-sync-alt"></i> Qayta urinish</button>' : ''}
                        <a href="index.html" class="error-btn" style="background: #6b7280;"><i class="fas fa-home"></i> Bosh sahifa</a>
                    </div>
                </div>
            `;
        }
    }

    function showToast(message, type = 'info') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#4f46e5' };
        toast.style.backgroundColor = colors[type];
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    }

    function shuffleArray(arr) {
        const array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function selectRandomQuestions(allQuestions) {
        if (!allQuestions || allQuestions.length === 0) return [];
        const shuffled = shuffleArray(allQuestions);
        return shuffled.slice(0, Math.min(TOTAL_QUESTIONS, shuffled.length));
    }

    function clearTimer() {
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
    }

    function startTimer() {
        clearTimer();
        state.timeLeft = TIME_PER_QUESTION;
        updateTimerUI();
        
        state.timerInterval = setInterval(() => {
            if (!state.isActive || state.isTimeOver) {
                clearTimer();
                return;
            }
            state.timeLeft--;
            updateTimerUI();
            if (state.timeLeft <= 0) {
                clearTimer();
                document.getElementById('time-overlay').style.display = 'flex';
                state.isActive = false;
                state.isTimeOver = true;
            }
        }, 1000);
    }

    function updateTimerUI() {
        const percent = Math.max(0, (state.timeLeft / TIME_PER_QUESTION) * 100);
        if (elements.progressFill) {
            elements.progressFill.style.width = `${percent}%`;
            elements.progressFill.classList.toggle('danger', percent < 30);
        }
        if (elements.timerText) {
            elements.timerText.innerHTML = `${state.timeLeft} soniya qoldi`;
            elements.timerText.classList.toggle('warning', state.timeLeft <= 5);
        }
    }

    function renderQuestion() {
        if (!state.selectedQuestions.length || !state.isActive) return;
        
        const q = state.selectedQuestions[state.currentIndex];
        const current = state.currentIndex + 1;
        
        if (elements.subjectName) elements.subjectName.innerHTML = state.subjectName;
        if (elements.counter) elements.counter.innerHTML = `${current} / ${TOTAL_QUESTIONS}`;
        if (elements.questionText) elements.questionText.innerHTML = escapeHtml(q.question);
        
        if (elements.options) {
            elements.options.innerHTML = '';
            q.options.forEach((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = `<span class="option-letter">${letter}</span><span class="option-text">${escapeHtml(opt)}</span>`;
                btn.onclick = () => {
                    if (!state.isActive || state.isTimeOver) return;
                    state.answers[state.currentIndex] = opt;
                    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    if (elements.nextBtn) elements.nextBtn.disabled = false;
                };
                elements.options.appendChild(btn);
            });
        }
        
        if (elements.nextBtn) {
            elements.nextBtn.disabled = true;
            elements.nextBtn.innerHTML = state.currentIndex === TOTAL_QUESTIONS - 1 ? '✅ Natijani ko\'rish' : '▶ Keyingi savol';
        }
        
        startTimer();
    }

    function nextQuestion() {
        if (!state.isActive || state.isTimeOver) return;
        
        if (state.answers[state.currentIndex] === undefined) {
            showToast("⚠️ Iltimos, javob tanlang!", 'warning');
            return;
        }
        
        clearTimer();
        
        const currentQ = state.selectedQuestions[state.currentIndex];
        if (state.answers[state.currentIndex] === currentQ.answer) state.score++;
        
        if (state.currentIndex < TOTAL_QUESTIONS - 1) {
            state.currentIndex++;
            renderQuestion();
        } else {
            finishQuiz();
        }
    }

    function finishQuiz() {
        if (!state.isActive) return;
        clearTimer();
        state.isActive = false;
        
        const lastQ = state.selectedQuestions[state.currentIndex];
        if (state.answers[state.currentIndex] === lastQ.answer) state.score++;
        
        const percent = Math.round((state.score / TOTAL_QUESTIONS) * 100);
        const timeSpent = Math.round((Date.now() - state.startTime) / 1000);
        
        const details = [];
        for (let i = 0; i < state.selectedQuestions.length; i++) {
            details.push({
                question: state.selectedQuestions[i].question,
                userAnswer: state.answers[i] || "Javob berilmadi",
                correctAnswer: state.selectedQuestions[i].answer,
                isCorrect: state.answers[i] === state.selectedQuestions[i].answer
            });
        }
        
        const result = {
            subject: state.subjectName,
            subjectIndex: state.subjectIndex,
            correct: state.score,
            total: TOTAL_QUESTIONS,
            percent: percent,
            timeSpent: timeSpent,
            details: details,
            timestamp: Date.now()
        };
        
        try {
            const results = JSON.parse(localStorage.getItem('qm_results') || '[]');
            results.unshift(result);
            while (results.length > 50) results.pop();
            localStorage.setItem('qm_results', JSON.stringify(results));
        } catch(e) {}
        
        window.location.href = `result.html?subject=${encodeURIComponent(result.subject)}&score=${result.correct}&total=${result.total}&percent=${result.percent}&time=${result.timeSpent}`;
    }

    function restartQuiz() {
        clearTimer();
        state.currentIndex = 0;
        state.answers = [];
        state.score = 0;
        state.isActive = true;
        state.isTimeOver = false;
        state.selectedQuestions = selectRandomQuestions(state.allQuestions);
        state.answers = new Array(TOTAL_QUESTIONS).fill(undefined);
        state.startTime = Date.now();
        document.getElementById('time-overlay').style.display = 'none';
        renderQuestion();
        showToast("⚡ Test qayta boshlandi!", 'success');
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function waitForData(callback) {
        let attempts = 0;
        const maxAttempts = 30;
        const interval = setInterval(() => {
            attempts++;
            if (window.QUIZ_DATA && window.QUIZ_DATA.length > 0) {
                clearInterval(interval);
                callback(true);
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                callback(false);
            }
        }, 100);
    }

    function initQuiz() {
        elements = {
            subjectName: document.getElementById('quiz-subject-name'),
            counter: document.getElementById('quiz-question-counter'),
            questionText: document.getElementById('quiz-question-text'),
            options: document.getElementById('quiz-options'),
            nextBtn: document.getElementById('btn-next'),
            progressFill: document.getElementById('timer-progress-fill'),
            timerText: document.getElementById('timer-text'),
            skeletonLoading: document.getElementById('skeleton-loading'),
            quizContent: document.getElementById('quiz-content')
        };
        
        initDarkMode();
        
        const subjectId = getSubjectIdFromUrl();
        console.log('[Quiz] Aniqlangan subjectId:', subjectId);
        
        if (subjectId === null) {
            showErrorPage("URL xatosi", "URL da 'subject' parametri topilmadi yoki noto'g'ri!\n\nMisol: quiz.html?subject=0", true);
            return;
        }
        
        waitForData((isReady) => {
            if (!isReady) {
                showErrorPage("Ma'lumotlar bazasi topilmadi", "questions.js fayli yuklanmagan.\n\n• Internet aloqangizni tekshiring\n• Sahifani qayta yuklang", true);
                return;
            }
            
            if (subjectId >= window.QUIZ_DATA.length || subjectId < 0) {
                showErrorPage(`Fan topilmadi (${subjectId})`, `Mavjud fanlar: 0 dan ${window.QUIZ_DATA.length - 1} gacha\nTanlangan indeks: ${subjectId}`, true);
                return;
            }
            
            const subject = window.QUIZ_DATA[subjectId];
            if (!subject || !subject.questions || subject.questions.length === 0) {
                showErrorPage(`Savollar topilmadi`, `${subject ? subject.subject : 'Fan'} da savollar mavjud emas!`, true);
                return;
            }
            
            state.subjectIndex = subjectId;
            state.subjectName = subject.subject;
            state.allQuestions = subject.questions;
            state.selectedQuestions = selectRandomQuestions(state.allQuestions);
            state.currentIndex = 0;
            state.answers = new Array(TOTAL_QUESTIONS).fill(undefined);
            state.score = 0;
            state.isActive = true;
            state.isTimeOver = false;
            state.startTime = Date.now();
            
            document.title = `${subject.subject} — Blitz Test`;
            
            if (elements.skeletonLoading) elements.skeletonLoading.style.display = 'none';
            if (elements.quizContent) elements.quizContent.style.display = 'block';
            
            renderQuestion();
            showToast(`⚡ ${subject.subject} testi boshlandi!`, 'success');
        });
    }
    
    document.getElementById('btn-next')?.addEventListener('click', nextQuestion);
    document.getElementById('reset-test-btn')?.addEventListener('click', restartQuiz);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuiz);
    } else {
        initQuiz();
    }
})();
</script>
