/**
 * ============================================================
 * QuizMaster Pro — Intellectual Quiz Engine v3.1
 * Xatolarga chidamli, fallback tizimli, asinxron yuklovchi
 * ============================================================
 */

'use strict';

// -------------------------------------------------------
// 1. INTELLEKTUAL HOLAT (State Management)
// -------------------------------------------------------
const QuizState = {
    subjectIndex: 0,
    subjectName: "",
    questions: [],
    currentIndex: 0,
    answers: [],
    selectedOption: null,
    timeLeft: 0,
    totalTime: 0,
    timerInterval: null,
    isFinished: false,
    startTime: null,
    endTime: null,
    shuffledOptions: [],
    userFocus: true,
    skipsCount: 0,
    timeAnalysis: [],
    isLoading: true,      // Yangi: yuklanish holati
    loadError: null       // Yangi: xatolik ma'lumoti
};

const TIME_PER_QUESTION = 30; 
const CIRCUMFERENCE = 125.66;

// -------------------------------------------------------
// 2. ENGINE MONITORING (Kengaytirilgan)
// -------------------------------------------------------
const EngineMonitor = {
    log(msg, type = 'info') {
        const colors = {
            info: '#2ed573',
            error: '#ff4757',
            warning: '#ffa502',
            success: '#1e90ff'
        };
        console.log(`%c[QuizEngine] ${msg}`, `color: ${colors[type] || colors.info}; font-weight: bold;`);
    },
    
    validateData(idx) {
        if (!window.QUIZ_DATA) {
            return { valid: false, msg: "QUIZ_DATA topilmadi. Iltimos, questions.js fayli to'g'ri yuklanganligini tekshiring." };
        }
        if (!Array.isArray(window.QUIZ_DATA)) {
            return { valid: false, msg: "QUIZ_DATA massiv emas." };
        }
        if (window.QUIZ_DATA.length === 0) {
            return { valid: false, msg: "QUIZ_DATA bo'sh. Hech qanday fan mavjud emas." };
        }
        if (!window.QUIZ_DATA[idx]) {
            return { valid: false, msg: `${idx}-indeksli fan topilmadi. Mavjud fanlar soni: ${window.QUIZ_DATA.length}` };
        }
        if (!window.QUIZ_DATA[idx].questions || window.QUIZ_DATA[idx].questions.length === 0) {
            return { valid: false, msg: `${window.QUIZ_DATA[idx].subject} fanida savollar mavjud emas.` };
        }
        return { valid: true };
    },
    
    // Yuklanishni kuzatish
    waitForData(maxAttempts = 50, interval = 100) {
        return new Promise((resolve) => {
            let attempts = 0;
            const check = () => {
                if (window.QUIZ_DATA && window.QUIZ_DATA.length > 0) {
                    this.log(`Ma'lumotlar topildi (${window.QUIZ_DATA.length} ta fan)`, 'success');
                    resolve(true);
                } else if (attempts >= maxAttempts) {
                    this.log("Ma'lumotlar yuklanmadi, fallback ishga tushadi", 'warning');
                    resolve(false);
                } else {
                    attempts++;
                    setTimeout(check, interval);
                }
            };
            check();
        });
    }
};

// -------------------------------------------------------
// 3. YUKLASH INDIKATORI VA FALLBACK
// -------------------------------------------------------

function showLoadingIndicator() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="loading-container animate-fadeIn" style="text-align: center; padding: 80px 20px;">
            <div class="quiz-spinner" style="width: 60px; height: 60px; border: 4px solid #f0f0f0; border-top-color: var(--subject-color, #2ed573); border-radius: 50%; margin: 0 auto 20px; animation: spin 1s linear infinite;"></div>
            <h3 style="margin-bottom: 10px;">Savollar yuklanmoqda...</h3>
            <p style="color: #747d8c;">Iltimos, kuting yoki sahifani qayta yuklang</p>
            <button onclick="location.reload()" class="btn btn-secondary" style="margin-top: 20px;">🔄 Qayta urinish</button>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.5s ease-out;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
    `;
}

function showErrorMessage(msg, details = null) {
    QuizState.isLoading = false;
    QuizState.loadError = msg;
    
    const container = document.getElementById('quiz-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="error-box animate-scaleIn" style="text-align: center; padding: 60px 20px; max-width: 600px; margin: 0 auto;">
            <div style="font-size: 5rem; margin-bottom: 20px;">⚠️</div>
            <h2 style="margin-bottom: 15px; color: #ff4757;">Tizimli xatolik!</h2>
            <p style="margin-bottom: 20px; color: #747d8c;">${msg}</p>
            ${details ? `<pre style="background: #f8f9fa; padding: 10px; border-radius: 8px; font-size: 12px; text-align: left; overflow: auto;">${JSON.stringify(details, null, 2)}</pre>` : ''}
            <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px;">
                <a href="index.html" class="btn btn-primary">🏠 Bosh sahifaga</a>
                <button onclick="location.reload()" class="btn btn-secondary">🔄 Qayta yuklash</button>
            </div>
        </div>
    `;
}

// -------------------------------------------------------
// 4. ASOSIY START FUNKSIYASI (Kengaytirilgan)
// -------------------------------------------------------

async function startQuiz(idx, resume = false) {
    EngineMonitor.log(`Test yuklanmoqda... Subject index: ${idx}`);
    
    // Yuklanish indikatorini ko'rsatish
    showLoadingIndicator();
    QuizState.isLoading = true;
    QuizState.loadError = null;
    
    // Ma'lumotlar yuklanishini kutish
    const dataLoaded = await EngineMonitor.waitForData();
    
    if (!dataLoaded || !window.QUIZ_DATA) {
        showErrorMessage(
            "Ma'lumotlar bazasi yuklanmadi!",
            { suggestion: "Iltimos, internet aloqangizni tekshiring va sahifani qayta yuklang." }
        );
        return;
    }
    
    const check = EngineMonitor.validateData(idx);
    if (!check.valid) {
        // Agar fan topilmasa, birinchi fanni yoki fallbackni taklif qilish
        if (window.QUIZ_DATA && window.QUIZ_DATA.length > 0) {
            EngineMonitor.log(`So'ralgan fan (${idx}) topilmadi, 0-indeksli fan ishlatilmoqda`, 'warning');
            idx = 0;
        } else {
            showErrorMessage(check.msg);
            return;
        }
    }
    
    const data = window.QUIZ_DATA[idx];
    
    // Sessiyani tiklash
    if (resume) {
        try {
            const saved = QuizApp.loadSession();
            if (saved && saved.subjectIndex === idx && saved.fullState && saved.fullState.questions && saved.fullState.questions.length > 0) {
                EngineMonitor.log("Eski sessiya tiklanmoqda...", 'info');
                Object.assign(QuizState, saved.fullState);
                QuizState.isLoading = false;
                renderQuestion();
                return;
            }
        } catch (e) {
            EngineMonitor.log("Sessiyani tiklashda xatolik: " + e.message, 'warning');
        }
    }
    
    // Holatni noldan sozlash (xavfsiz)
    try {
        QuizState.subjectIndex = idx;
        QuizState.subjectName = data.subject;
        QuizState.questions = QuizApp.shuffleArray([...data.questions]); // Kopiya aralashtirish
        QuizState.currentIndex = 0;
        QuizState.answers = new Array(QuizState.questions.length).fill(undefined);
        QuizState.startTime = Date.now();
        QuizState.isFinished = false;
        QuizState.isLoading = false;
        QuizState.shuffledOptions = [];
        QuizState.skipsCount = 0;
        
        saveCurrentState();
        renderQuestion();
        
        if (window.QuizApp && QuizApp.showToast) {
            QuizApp.showToast(`${data.subject} testi boshlandi! ${QuizState.questions.length} ta savol`, 'success');
        }
    } catch (e) {
        EngineMonitor.log("Testni boshlashda xatolik: " + e.message, 'error');
        showErrorMessage("Testni boshlashda xatolik yuz berdi: " + e.message);
    }
}

// -------------------------------------------------------
// 5. SAVOLNI CHIZISH (Xatolarga chidamli)
// -------------------------------------------------------

function renderQuestion() {
    if (QuizState.isFinished) return;
    if (QuizState.isLoading) return;
    
    // Xavfsizlik tekshiruvi
    if (!QuizState.questions || QuizState.questions.length === 0) {
        showErrorMessage("Savollar massivi bo'sh yoki yo'q. Iltimos, sahifani qayta yuklang.");
        return;
    }
    
    const q = QuizState.questions[QuizState.currentIndex];
    if (!q) {
        showErrorMessage(`Savol topilmadi (index: ${QuizState.currentIndex}).`);
        return;
    }
    
    const total = QuizState.questions.length;
    const currentNum = QuizState.currentIndex + 1;
    const subject = window.QUIZ_DATA && window.QUIZ_DATA[QuizState.subjectIndex] 
        ? window.QUIZ_DATA[QuizState.subjectIndex] 
        : { subject: QuizState.subjectName, icon: "📚", color: "#2ed573" };
    
    EngineMonitor.log(`${currentNum}/${total} - savol render qilinmoqda...`, 'info');
    
    // DOM elementlarini tekshirish
    const elements = {
        subject: document.getElementById('quiz-subject-name'),
        counter: document.getElementById('quiz-question-counter'),
        questionText: document.getElementById('quiz-question-text'),
        badge: document.getElementById('question-badge'),
        progressBar: document.getElementById('quiz-progress-bar'),
        progressText: document.getElementById('quiz-progress-text'),
        options: document.getElementById('quiz-options')
    };
    
    if (!elements.options) {
        console.error("quiz-options elementi topilmadi!");
        return;
    }
    
    // 1. Matnlarni yangilash (xavfsiz)
    if (elements.subject) {
        elements.subject.innerHTML = `<span style="font-size: 1.2rem; margin-right: 8px;">${subject.icon || '📚'}</span> ${subject.subject || QuizState.subjectName}`;
    }
    if (elements.counter) elements.counter.innerHTML = `${currentNum} / ${total}`;
    if (elements.questionText) elements.questionText.innerHTML = q.question || "Savol matni topilmadi";
    if (elements.badge) elements.badge.textContent = `SAVOL: ${currentNum}`;
    
    // 2. Progress Bar
    const pct = Math.round(((currentNum - 1) / total) * 100);
    if (elements.progressBar) {
        elements.progressBar.style.width = `${pct}%`;
        elements.progressBar.style.backgroundColor = subject.color || "#2ed573";
    }
    if (elements.progressText) elements.progressText.innerHTML = `${pct}% yakunlandi`;
    
    // 3. Variantlar
    elements.options.innerHTML = '';
    
    // Variantlarni tayyorlash
    let currentOptions;
    if (QuizState.shuffledOptions[QuizState.currentIndex]) {
        currentOptions = QuizState.shuffledOptions[QuizState.currentIndex];
    } else {
        currentOptions = q.options ? [...q.options] : ["Variant A", "Variant B", "Variant C", "Variant D"];
        if (q.options && q.options.length > 0) {
            currentOptions = QuizApp.shuffleArray(currentOptions);
        }
        QuizState.shuffledOptions[QuizState.currentIndex] = currentOptions;
    }
    
    currentOptions.forEach((opt, i) => {
        if (!opt) return;
        
        const btn = document.createElement('button');
        btn.className = 'option-btn animate-fadeInUp';
        btn.style.animationDelay = `${i * 0.1}s`;
        
        const letter = String.fromCharCode(65 + i);
        btn.innerHTML = `
            <span class="option-letter">${letter}</span>
            <span class="option-text">${QuizApp.escapeHtml(opt)}</span>
        `;
        
        if (QuizState.answers[QuizState.currentIndex] === opt) {
            btn.classList.add('selected');
        }
        
        btn.onclick = () => selectOption(btn, opt, elements.options);
        elements.options.appendChild(btn);
    });
    
    // 4. Integratsiya
    updateNextButton();
    resetTimer();
    saveCurrentState();
    
    // UI rangini dinamik o'zgartirish
    if (subject.color) {
        document.documentElement.style.setProperty('--subject-color', subject.color);
    }
}

// -------------------------------------------------------
// 6. TANLASH VA BOSHQARISH
// -------------------------------------------------------

function selectOption(btn, value, container) {
    if (QuizState.isFinished) return;
    
    // Vizual feedback
    const btns = container.querySelectorAll('.option-btn');
    btns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    
    QuizState.selectedOption = value;
    QuizState.answers[QuizState.currentIndex] = value;
    
    updateNextButton();
    saveCurrentState();
}

function updateNextButton() {
    const btn = document.getElementById('btn-next');
    if (!btn) return;
    
    const isLast = QuizState.currentIndex === QuizState.questions.length - 1;
    const hasAns = QuizState.answers[QuizState.currentIndex] !== undefined;
    
    btn.innerHTML = isLast ? 'Natijani ko\'rish ✅' : 'Keyingi savol <span style="margin-left:10px">→</span>';
    btn.disabled = false;
    
    if (hasAns) {
        btn.style.opacity = '1';
        btn.classList.add('has-answer');
    } else {
        btn.style.opacity = '0.7';
        btn.classList.remove('has-answer');
    }
}

function goNext() {
    if (QuizState.isFinished) return;
    
    // Metrika
    if (QuizState.answers[QuizState.currentIndex] === undefined) {
        QuizState.answers[QuizState.currentIndex] = null;
        QuizState.skipsCount++;
    }
    
    if (QuizState.currentIndex < QuizState.questions.length - 1) {
        QuizState.currentIndex++;
        QuizState.selectedOption = null;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

// -------------------------------------------------------
// 7. TIMER VA VAQT ANALIZI
// -------------------------------------------------------

function resetTimer() {
    clearTimerInterval();
    QuizState.timeLeft = TIME_PER_QUESTION;
    updateTimerUI();
    
    QuizState.timerInterval = setInterval(() => {
        if (!QuizState.userFocus) return;
        if (QuizState.isFinished) {
            clearTimerInterval();
            return;
        }
        
        QuizState.timeLeft--;
        updateTimerUI();
        
        if (QuizState.timeLeft <= 0) {
            EngineMonitor.log("Vaqt tugadi, keyingi savolga o'tilmoqda...", "error");
            clearTimerInterval();
            goNext();
        }
    }, 1000);
}

function updateTimerUI() {
    const timerText = document.getElementById('quiz-timer');
    const ring = document.getElementById('timer-ring');
    if (!timerText) return;
    
    timerText.textContent = QuizApp.formatTime(QuizState.timeLeft);
    
    if (QuizState.timeLeft <= 5) {
        timerText.style.color = '#ff4757';
        const parent = timerText.parentElement;
        if (parent) parent.classList.add('pulse-warning');
    } else {
        timerText.style.color = 'inherit';
        const parent = timerText.parentElement;
        if (parent) parent.classList.remove('pulse-warning');
    }
    
    if (ring) {
        const pct = Math.max(0, Math.min(1, QuizState.timeLeft / TIME_PER_QUESTION));
        ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct);
    }
}

function clearTimerInterval() {
    if (QuizState.timerInterval) {
        clearInterval(QuizState.timerInterval);
        QuizState.timerInterval = null;
    }
}

// -------------------------------------------------------
// 8. TESTNI YAKUNLASH
// -------------------------------------------------------

function finishQuiz() {
    clearTimerInterval();
    QuizState.isFinished = true;
    QuizState.endTime = Date.now();
    
    const subject = window.QUIZ_DATA && window.QUIZ_DATA[QuizState.subjectIndex]
        ? window.QUIZ_DATA[QuizState.subjectIndex]
        : { subject: QuizState.subjectName };
    
    let correct = 0;
    const details = [];
    
    QuizState.questions.forEach((q, i) => {
        const userAns = QuizState.answers[i];
        const isCorrect = userAns === q.answer;
        if (isCorrect) correct++;
        
        details.push({
            q: q.question,
            user: userAns || "Javob berilmadi",
            correct: q.answer,
            status: isCorrect
        });
    });
    
    const result = {
        subject: subject.subject,
        subjectIndex: QuizState.subjectIndex,
        correct,
        total: QuizState.questions.length,
        percent: QuizApp.calcPercent(correct, QuizState.questions.length),
        timeSpent: Math.round((QuizState.endTime - QuizState.startTime) / 1000),
        details: details,
        skips: QuizState.skipsCount
    };
    
    QuizApp.saveResult(result);
    QuizApp.clearSession();
    
    // Natija sahifasiga yo'naltirish
    try {
        const params = new URLSearchParams({
            subject: result.subject,
            score: result.correct,
            total: result.total,
            time: result.timeSpent
        });
        window.location.href = `result.html?${params.toString()}`;
    } catch (e) {
        EngineMonitor.log("Natijaga o'tishda xatolik: " + e.message, 'error');
        alert(`Test yakunlandi! Natija: ${result.correct}/${result.total}`);
    }
}

// -------------------------------------------------------
// 9. YORDAMCHI FUNKSIYALAR
// -------------------------------------------------------

function saveCurrentState() {
    try {
        QuizApp.saveSession({
            subjectIndex: QuizState.subjectIndex,
            fullState: QuizState,
            lastUpdate: Date.now()
        });
    } catch (e) {
        EngineMonitor.log("Holatni saqlashda xatolik: " + e.message, 'warning');
    }
}

// -------------------------------------------------------
// 10. EVENTLAR VA INIT (Optimallashtirilgan)
// -------------------------------------------------------

// Klaviatura boshqaruvi
document.addEventListener('keydown', (e) => {
    if (QuizState.isFinished || QuizState.isLoading) return;
    if (e.key >= '1' && e.key <= '4') {
        const btns = document.querySelectorAll('.option-btn');
        const idx = parseInt(e.key) - 1;
        if (btns[idx]) btns[idx].click();
    }
    if (e.key === 'Enter') {
        const nextBtn = document.getElementById('btn-next');
        if (nextBtn && !nextBtn.disabled) goNext();
    }
});

// Fokus nazorati
window.onblur = () => { QuizState.userFocus = false; };
window.onfocus = () => { QuizState.userFocus = true; };

// DOMContentLoaded — barcha dependency-larni kutish
document.addEventListener('DOMContentLoaded', async () => {
    EngineMonitor.log("DOM yuklandi, QuizEngine ishga tushmoqda...", 'info');
    
    // Qo'shimcha: QuizApp mavjudligini tekshirish
    if (typeof QuizApp === 'undefined') {
        console.error("QuizApp topilmadi! Iltimos, app.js ni tekshiring.");
        showErrorMessage("Asosiy ilova (QuizApp) topilmadi. Iltimos, barcha fayllar to'g'ri yuklanganligini tekshiring.");
        return;
    }
    
    // URL parametrlarini olish
    const urlIdx = QuizApp.getUrlParam('subject');
    let startIndex = 0;
    
    if (urlIdx !== null) {
        startIndex = parseInt(urlIdx);
        if (isNaN(startIndex)) startIndex = 0;
    }
    
    // Kichik kechikish (DOM to'liq tayyor bo'lishi uchun)
    setTimeout(() => {
        startQuiz(startIndex, true);
    }, 50);
    
    // Next button event
    const nextBtn = document.getElementById('btn-next');
    if (nextBtn) nextBtn.onclick = goNext;
});

// Global eksport
window.QuizEngine = { 
    startQuiz, 
    goNext, 
    finishQuiz, 
    QuizState,
    renderQuestion 
};
// Global function for starting quiz from index.html
window.startSubject = function(subjectIndex) {
    window.location.href = `quiz.html?subject=${subjectIndex}`;
};
