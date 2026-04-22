// ============================================================
// quiz.js - Test sahifasi (Parametrni to'g'ri o'qish + Debug)
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
        console.log('[Quiz] Dark Mode:', document.body.classList.contains('dark-mode') ? 'yoqilgan' : 'ochiq');
    }

    // ========== URL PARAMETRNI OLISH (BETON MANTIQ) ==========
    function getSubjectIdFromUrl() {
        console.log('[Quiz] 🔍 URL tahlili...');
        console.log('[Quiz] window.location.href:', window.location.href);
        console.log('[Quiz] window.location.search:', window.location.search);
        
        const params = new URLSearchParams(window.location.search);
        const subjectId = params.get('subject');
        
        console.log('[Quiz] params.get("subject"):', subjectId);
        
        if (subjectId === null) {
            console.error('[Quiz] ❌ "subject" parametri topilmadi!');
            return null;
        }
        
        const parsedId = parseInt(subjectId, 10);
        console.log('[Quiz] parseInt natijasi:', parsedId);
        
        if (isNaN(parsedId)) {
            console.error('[Quiz] ❌ "subject" parametri son emas:', subjectId);
            return null;
        }
        
        console.log(`[Quiz] ✅ Qabul qilingan ID: ${parsedId}`);
        return parsedId;
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
                    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
                        ${showRetry ? '<button onclick="location.reload()" class="error-btn" style="background: #4f46e5; padding: 12px 24px; border: none; border-radius: 40px; color: white; cursor: pointer;"><i class="fas fa-sync-alt"></i> Qayta urinish</button>' : ''}
                        <a href="index.html" class="error-btn" style="background: #6b7280; padding: 12px 24px; border-radius: 40px; color: white; text-decoration: none; display: inline-block;"><i class="fas fa-home"></i> Bosh sahifa</a>
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
        toast.style.cssText = `
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
            padding: 12px 24px; border-radius: 60px; color: white; z-index: 10000;
            font-weight: 600; font-size: 14px; white-space: nowrap; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideUp 0.3s ease-out; background-color: ${colors[type]};
        `;
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
                const overlay = document.getElementById('time-overlay');
                if (overlay) overlay.style.display = 'flex';
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
        const overlay = document.getElementById('time-overlay');
        if (overlay) overlay.style.display = 'none';
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
        console.log('[Quiz] Ma\'lumotlarni kutish boshlandi...');
        
        const interval = setInterval(() => {
            attempts++;
            if (window.QUIZ_DATA && window.QUIZ_DATA.length > 0) {
                clearInterval(interval);
                console.log(`[Quiz] ✅ Ma'lumotlar yuklandi: ${window.QUIZ_DATA.length} ta fan`);
                callback(true);
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                console.error('[Quiz] ❌ Ma\'lumotlar topilmadi!');
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
        
        if (subjectId === null) {
            console.error('[Quiz] ❌ ID olinmadi! Xato ekrani ko\'rsatiladi.');
            showErrorPage("URL xatosi", "URL da 'subject' parametri topilmadi!\n\nMisol: quiz.html?subject=0", true);
            return;
        }
        
        // 1 soniya kutish (questions.js yuklanishi uchun)
        console.log('[Quiz] ⏳ 1 soniya kutish... (questions.js yuklanishi uchun)');
        
        setTimeout(() => {
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
                
                console.log(`[Quiz] 🎯 Fan topildi: "${subject.subject}" (ID: ${subjectId})`);
                console.log(`[Quiz] 📚 Jami savollar: ${subject.questions.length} ta`);
                
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
                console.log('[Quiz] ✅ Test boshlandi!');
            });
        }, 1000);
    }
    
    // Event listenerlar
    const nextBtn = document.getElementById('btn-next');
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    
    const resetBtn = document.getElementById('reset-test-btn');
    if (resetBtn) resetBtn.addEventListener('click', restartQuiz);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuiz);
    } else {
        initQuiz();
    }
})();
</script>
