// ============================================================
// quiz.js - BLITZ TEST v1.0 (15 SONIYA, RANDOM SAVOLLAR)
// ============================================================

(function() {
    'use strict';

    // ========== KONFIGURATSIYA ==========
    const TIME_PER_QUESTION = 15; // 15 soniya
    const TOTAL_QUESTIONS = 25;   // Har testda 25 ta savol

    // ========== STATE ==========
    let state = {
        subjectIndex: null,
        subjectName: "",
        allQuestions: [],
        selectedQuestions: [],
        currentIndex: 0,
        answers: [],
        timeLeft: TIME_PER_QUESTION,
        timerInterval: null,
        isFinished: false,
        startTime: null,
        isAnswered: false
    };

    // DOM elementlari
    const elements = {
        subjectName: document.getElementById('quiz-subject-name'),
        counter: document.getElementById('quiz-question-counter'),
        questionText: document.getElementById('quiz-question-text'),
        options: document.getElementById('quiz-options'),
        nextBtn: document.getElementById('btn-next'),
        progressFill: document.getElementById('timer-progress-fill'),
        timerText: document.getElementById('timer-text')
    };

    // ========== YORDAMCHI FUNKSIYALAR ==========
    function shuffleArray(arr) {
        const array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getUrlParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
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
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function finishTestWithTimeout() {
        if (state.isFinished) return;
        
        clearTimer();
        state.isFinished = true;
        
        showToast("⏰ Vaqt tugadi! Test yakunlandi.", 'error');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }

    function clearTimer() {
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
    }

    // ========== TAYMER (15 SONIYA) ==========
    function startTimer() {
        clearTimer();
        state.timeLeft = TIME_PER_QUESTION;
        updateTimerUI();
        
        state.timerInterval = setInterval(() => {
            if (state.isFinished) {
                clearTimer();
                return;
            }
            
            if (!state.isAnswered) {
                state.timeLeft--;
                updateTimerUI();
                
                if (state.timeLeft <= 0) {
                    clearTimer();
                    showToast("⏰ Vaqt tugadi! Test to'xtatildi.", 'error');
                    finishTestWithTimeout();
                }
            }
        }, 1000);
    }

    function updateTimerUI() {
        const percent = (state.timeLeft / TIME_PER_QUESTION) * 100;
        
        if (elements.progressFill) {
            elements.progressFill.style.width = `${percent}%`;
            
            if (percent < 30) {
                elements.progressFill.style.background = '#ef4444';
            } else if (percent < 60) {
                elements.progressFill.style.background = '#f59e0b';
            } else {
                elements.progressFill.style.background = 'linear-gradient(90deg, var(--primary), var(--accent))';
            }
        }
        
        if (elements.timerText) {
            elements.timerText.innerHTML = `${state.timeLeft} soniya qoldi`;
            if (state.timeLeft <= 5) {
                elements.timerText.classList.add('warning');
            } else {
                elements.timerText.classList.remove('warning');
            }
        }
    }

    // ========== SAVOLLARNI TANLASH (RANDOM 25) ==========
    function selectRandomQuestions(allQuestions) {
        const shuffled = shuffleArray(allQuestions);
        return shuffled.slice(0, TOTAL_QUESTIONS);
    }

    // ========== SAVOLNI RENDER QILISH ==========
    function renderQuestion() {
        if (!state.selectedQuestions.length) return;
        
        const q = state.selectedQuestions[state.currentIndex];
        const current = state.currentIndex + 1;
        
        if (elements.subjectName && state.subjectName) {
            elements.subjectName.innerHTML = state.subjectName;
        }
        
        if (elements.counter) {
            elements.counter.innerHTML = `${current} / ${TOTAL_QUESTIONS}`;
        }
        
        if (elements.questionText) {
            elements.questionText.innerHTML = q.question;
        }
        
        if (elements.options) {
            elements.options.innerHTML = '';
            state.isAnswered = false;
            
            q.options.forEach((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = `<span class="option-letter">${letter}</span><span class="option-text">${escapeHtml(opt)}</span>`;
                
                btn.onclick = () => {
                    if (state.isFinished || state.isAnswered) return;
                    
                    state.answers[state.currentIndex] = opt;
                    state.isAnswered = true;
                    
                    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    
                    if (elements.nextBtn) {
                        elements.nextBtn.disabled = false;
                    }
                    
                    showToast("Javob qabul qilindi!", 'success');
                };
                
                elements.options.appendChild(btn);
            });
        }
        
        if (elements.nextBtn) {
            elements.nextBtn.disabled = true;
            const isLast = state.currentIndex === TOTAL_QUESTIONS - 1;
            elements.nextBtn.innerHTML = isLast ? '✅ Natijani ko\'rish' : '▶ Keyingi savol';
        }
        
        startTimer();
    }

    // ========== KEYINGI SAVOL ==========
    function nextQuestion() {
        if (!state.isAnswered) {
            showToast("Iltimos, javob tanlang!", 'warning');
            return;
        }
        
        clearTimer();
        
        if (state.currentIndex < TOTAL_QUESTIONS - 1) {
            state.currentIndex++;
            renderQuestion();
        } else {
            finishQuiz();
        }
    }

    // ========== TESTNI YAKUNLASH ==========
    function finishQuiz() {
        if (state.isFinished) return;
        
        clearTimer();
        state.isFinished = true;
        
        let correct = 0;
        const details = [];
        
        for (let i = 0; i < state.selectedQuestions.length; i++) {
            const q = state.selectedQuestions[i];
            const userAnswer = state.answers[i];
            const isCorrect = userAnswer === q.answer;
            if (isCorrect) correct++;
            
            details.push({
                question: q.question,
                userAnswer: userAnswer || "Javob berilmadi",
                correctAnswer: q.answer,
                isCorrect: isCorrect
            });
        }
        
        const percent = Math.round((correct / TOTAL_QUESTIONS) * 100);
        const timeSpent = Math.round((Date.now() - state.startTime) / 1000);
        
        const result = {
            subject: state.subjectName,
            subjectIndex: state.subjectIndex,
            correct: correct,
            total: TOTAL_QUESTIONS,
            percent: percent,
            timeSpent: timeSpent,
            details: details,
            timestamp: Date.now()
        };
        
        // Natijani saqlash
        try {
            const results = JSON.parse(localStorage.getItem('qm_results') || '[]');
            results.unshift(result);
            while (results.length > 50) results.pop();
            localStorage.setItem('qm_results', JSON.stringify(results));
        } catch(e) {}
        
        // Natija sahifasiga o'tish
        const params = new URLSearchParams({
            subject: result.subject,
            score: result.correct,
            total: result.total,
            percent: result.percent,
            time: result.timeSpent
        });
        
        window.location.href = `result.html?${params.toString()}`;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    // ========== DARK MODE (app.js bilan sinxron) ==========
    function initDarkMode() {
        const savedTheme = localStorage.getItem('quiz_theme');
        const isDark = savedTheme === 'dark';
        
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            themeBtn.innerHTML = isDark ? '☀️ Light' : '🌙 Dark';
            themeBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const nowDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('quiz_theme', nowDark ? 'dark' : 'light');
                themeBtn.innerHTML = nowDark ? '☀️ Light' : '🌙 Dark';
            });
        }
    }

    // ========== ASOSIY START ==========
    function startQuiz() {
        const idx = parseInt(getUrlParam('subject'));
        
        if (isNaN(idx)) {
            if (elements.questionText) elements.questionText.innerHTML = '❌ URL xato!';
            return;
        }
        
        if (!window.QUIZ_DATA || !window.QUIZ_DATA[idx]) {
            if (elements.questionText) {
                elements.questionText.innerHTML = `❌ ${idx}-fan topilmadi!`;
            }
            return;
        }
        
        const subject = window.QUIZ_DATA[idx];
        state.subjectIndex = idx;
        state.subjectName = subject.subject;
        state.allQuestions = subject.questions;
        
        // RANDOM 25 savol tanlash
        state.selectedQuestions = selectRandomQuestions(state.allQuestions);
        state.currentIndex = 0;
        state.answers = new Array(TOTAL_QUESTIONS).fill(undefined);
        state.isFinished = false;
        state.isAnswered = false;
        state.startTime = Date.now();
        
        document.title = `${subject.subject} — Blitz Test`;
        
        renderQuestion();
        
        showToast(`⚡ ${subject.subject} testi boshlandi! Har bir savolga 15 soniya`, 'success');
    }

    // Event listenerlar
    if (elements.nextBtn) {
        elements.nextBtn.addEventListener('click', nextQuestion);
    }
    
    // Boshlash
    initDarkMode();
    startQuiz();
})();
