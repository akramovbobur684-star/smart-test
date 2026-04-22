/**
 * ============================================================
 * QuizMaster Pro — Intellectual Quiz Engine v3.0
 * Real-vaqtda validatsiya, Dark Mode, vizual feedback
 * ============================================================
 */

(function() {
    'use strict';

    // -------------------------------------------------------
    // 1. QUIZ HOLATI
    // -------------------------------------------------------
    let state = {
        subjectIndex: null,
        subjectName: "",
        questions: [],
        currentIndex: 0,
        answers: [],
        answerStatus: [], // to'g'ri/xato ma'lumoti
        timeLeft: 30,
        timerInterval: null,
        isFinished: false,
        startTime: null,
        isAnswered: false, // Javob berilganmi?
        totalCorrect: 0
    };

    const TIME_PER_QUESTION = 30;

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

    // -------------------------------------------------------
    // 2. YORDAMCHI FUNKSIYALAR
    // -------------------------------------------------------
    function log(msg, type = 'info') {
        const styles = { info: '#2ed573', error: '#ff4757', warning: '#ffa502' };
        console.log(`%c[Quiz] ${msg}`, `color: ${styles[type] || styles.info}`);
    }

    function getSubjectIndex() {
        const params = new URLSearchParams(window.location.search);
        return params.get('subject');
    }

    // -------------------------------------------------------
    // 3. JAVOBNI TEKSHIRISH VA VIZUAL FEEDBACK
    // -------------------------------------------------------
    function checkAndShowResult(selectedBtn, selectedValue, correctAnswer) {
        const isCorrect = selectedValue === correctAnswer;
        
        // Holatni yangilash
        state.answers[state.currentIndex] = selectedValue;
        state.answerStatus[state.currentIndex] = isCorrect;
        state.isAnswered = true;
        
        if (isCorrect) {
            state.totalCorrect++;
        }
        
        // Barcha variantlarni blokirovka qilish
        const allOptions = document.querySelectorAll('.option-btn');
        allOptions.forEach(btn => {
            btn.style.pointerEvents = 'none';
        });
        
        // Har bir variantni tekshirish va rang berish
        allOptions.forEach(btn => {
            const btnValue = btn.querySelector('.option-text')?.innerText || btn.innerText.replace(/^[A-Z]\.\s*/, '');
            const letterSpan = btn.querySelector('.option-letter');
            
            if (btnValue === correctAnswer) {
                // To'g'ri javob — yashil
                btn.style.borderColor = '#10b981';
                btn.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
                if (letterSpan) letterSpan.style.backgroundColor = '#10b981';
            }
            
            if (btn === selectedBtn && !isCorrect) {
                // Tanlangan xato javob — qizil
                btn.style.borderColor = '#ef4444';
                btn.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                if (letterSpan) letterSpan.style.backgroundColor = '#ef4444';
            }
        });
        
        // Toast orqali xabar
        if (window.QuizApp) {
            if (isCorrect) {
                window.QuizApp.showToast('✅ To\'g\'ri javob!', 'success');
            } else {
                window.QuizApp.showToast(`❌ Xato! To'g'ri javob: ${correctAnswer}`, 'error');
            }
        }
        
        // Next tugmasini faollashtirish
        if (elements.nextBtn) {
            elements.nextBtn.disabled = false;
            elements.nextBtn.style.opacity = '1';
        }
        
        // Taymerni to'xtatish
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
        
        log(`Javob: ${selectedValue} — ${isCorrect ? 'To\'g\'ri' : 'Xato'}`, isCorrect ? 'info' : 'warning');
    }

    // -------------------------------------------------------
    // 4. VARIANT TANLASH
    // -------------------------------------------------------
    function selectOption(btn, value) {
        if (state.isFinished) return;
        if (state.isAnswered) return; // Bir marta javob berilgan
        
        const currentQuestion = state.questions[state.currentIndex];
        checkAndShowResult(btn, value, currentQuestion.answer);
    }

    // -------------------------------------------------------
    // 5. SAVOLNI RENDER QILISH
    // -------------------------------------------------------
    function renderQuestion() {
        if (!state.questions.length) return;
        
        const q = state.questions[state.currentIndex];
        const total = state.questions.length;
        const current = state.currentIndex + 1;
        const percent = Math.round(((current - 1) / total) * 100);
        
        // Matnlarni yangilash
        if (elements.questionText) elements.questionText.innerHTML = q.question;
        if (elements.counter) elements.counter.innerHTML = `${current} / ${total}`;
        if (elements.badge) elements.badge.innerHTML = `SAVOL: ${current}`;
        if (elements.progressBar) elements.progressBar.style.width = `${percent}%`;
        if (elements.progressText) elements.progressText.innerHTML = `${percent}% yakunlandi`;
        
        // Variantlar
        if (elements.options) {
            elements.options.innerHTML = '';
            state.isAnswered = false;
            
            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                const letter = String.fromCharCode(65 + i);
                btn.innerHTML = `<span class="option-letter">${letter}</span><span class="option-text">${opt}</span>`;
                
                btn.onclick = () => selectOption(btn, opt);
                elements.options.appendChild(btn);
            });
        }
        
        // Next tugmasi
        if (elements.nextBtn) {
            elements.nextBtn.disabled = true;
            elements.nextBtn.style.opacity = '0.6';
            const isLast = state.currentIndex === total - 1;
            elements.nextBtn.innerHTML = isLast ? '✅ Natijani ko\'rish' : '▶ Keyingi savol';
        }
        
        // Taymer
        resetTimer();
    }

    // -------------------------------------------------------
    // 6. KEYINGI SAVOL
    // -------------------------------------------------------
    function nextQuestion() {
        if (!state.isAnswered) {
            if (window.QuizApp) {
                window.QuizApp.showToast('⚠i Iltimos, javob tanlang!', 'warning');
            }
            return;
        }
        
        if (state.currentIndex < state.questions.length - 1) {
            state.currentIndex++;
            renderQuestion();
        } else {
            finishQuiz();
        }
    }

    // -------------------------------------------------------
    // 7. TAYMER
    // -------------------------------------------------------
    function resetTimer() {
        if (state.timerInterval) clearInterval(state.timerInterval);
        state.timeLeft = TIME_PER_QUESTION;
        updateTimerDisplay();
        
        state.timerInterval = setInterval(() => {
            if (state.isFinished) {
                clearInterval(state.timerInterval);
                return;
            }
            
            if (!state.isAnswered) {
                state.timeLeft--;
                updateTimerDisplay();
                
                if (state.timeLeft <= 0) {
                    clearInterval(state.timerInterval);
                    // Vaqt tugadi — avtomatik xato deb hisoblash
                    const currentQuestion = state.questions[state.currentIndex];
                    state.answers[state.currentIndex] = null;
                    state.answerStatus[state.currentIndex] = false;
                    state.isAnswered = true;
                    
                    // To'g'ri javobni ko'rsatish
                    const allOptions = document.querySelectorAll('.option-btn');
                    allOptions.forEach(btn => {
                        btn.style.pointerEvents = 'none';
                        const btnValue = btn.querySelector('.option-text')?.innerText || btn.innerText.replace(/^[A-Z]\.\s*/, '');
                        if (btnValue === currentQuestion.answer) {
                            btn.style.borderColor = '#10b981';
                            btn.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
                        }
                    });
                    
                    if (window.QuizApp) {
                        window.QuizApp.showToast(`⏰ Vaqt tugadi! To'g'ri javob: ${currentQuestion.answer}`, 'error');
                    }
                    
                    if (elements.nextBtn) {
                        elements.nextBtn.disabled = false;
                        elements.nextBtn.style.opacity = '1';
                    }
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

    // -------------------------------------------------------
    // 8. TESTNI YAKUNLASH
    // -------------------------------------------------------
    function finishQuiz() {
        if (state.timerInterval) clearInterval(state.timerInterval);
        state.isFinished = true;
        
        const timeSpent = Math.round((Date.now() - state.startTime) / 1000);
        const percent = Math.round((state.totalCorrect / state.questions.length) * 100);
        
        // Savollar tahlili
        const details = state.questions.map((q, i) => ({
            question: q.question,
            userAnswer: state.answers[i] || "Javob berilmadi",
            correctAnswer: q.answer,
            isCorrect: state.answerStatus[i] || false
        }));
        
        const result = {
            subject: state.subjectName,
            subjectIndex: state.subjectIndex,
            correct: state.totalCorrect,
            total: state.questions.length,
            percent: percent,
            timeSpent: timeSpent,
            details: details,
            timestamp: Date.now()
        };
        
        // Natijani saqlash
        if (window.QuizApp) {
            window.QuizApp.saveResult(result);
        } else {
            try {
                const results = JSON.parse(localStorage.getItem('qm_results') || '[]');
                results.unshift(result);
                localStorage.setItem('qm_results', JSON.stringify(results.slice(0, 50)));
            } catch(e) {}
        }
        
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

    // -------------------------------------------------------
    // 9. DARK MODE (app.js bilan sinxron)
    // -------------------------------------------------------
    function syncDarkMode() {
        if (window.QuizApp && window.QuizApp.applyDarkMode) {
            const isDark = localStorage.getItem('quiz_theme') === 'dark';
            window.QuizApp.applyDarkMode(isDark);
        }
    }

    // -------------------------------------------------------
    // 10. BOSHLASH
    // -------------------------------------------------------
    function startQuiz() {
        log("QuizEngine ishga tushmoqda...");
        
        // Dark Mode sinxronizatsiyasi
        syncDarkMode();
        
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
        state.answerStatus = new Array(state.questions.length).fill(false);
        state.totalCorrect = 0;
        state.isFinished = false;
        state.isAnswered = false;
        state.startTime = Date.now();
        
        if (elements.subjectName) elements.subjectName.innerHTML = `${subject.icon || '📚'} ${subject.subject}`;
        document.title = `${subject.subject} — QuizMaster Pro`;
        
        renderQuestion();
        
        if (window.QuizApp) {
            window.QuizApp.showToast(`✅ ${subject.subject} testi boshlandi!`, 'success');
        }
        
        log(`${state.questions.length} ta savol yuklandi`, 'success');
    }

    // Event listenerlar
    if (elements.nextBtn) elements.nextBtn.onclick = nextQuestion;
    
    // Ishga tushirish
    startQuiz();
})();
