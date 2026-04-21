/**
 * ============================================================
 * quiz.js — QuizMaster Pro Test Engine
 * Mantiq: Savollar, Timer, Progress, Sessiyani tiklash
 * ============================================================
 */

'use strict';

// -------------------------------------------------------
// TEST HOLATI (State Management)
// -------------------------------------------------------
const QuizState = {
    subjectIndex: 0,
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
    shuffledOptions: [] // Har bir savol uchun variantlar tartibini saqlaydi
};

const TIME_PER_QUESTION = 30; // Har bir savolga 30 sekund

// -------------------------------------------------------
// 1. TESTNI BOSHLASH VA TIKLASH
// -------------------------------------------------------

/**
 * Testni yangidan yoki saqlangan sessiyadan boshlaydi.
 */
function startQuiz(idx, resume = false) {
    const data = window.QUIZ_DATA[idx];
    if (!data) return showError('Fan ma\'lumotlari yuklanmadi.');

    if (resume) {
        const saved = QuizApp.loadSession();
        if (saved && saved.subjectIndex === idx) {
            Object.assign(QuizState, saved.fullState);
            renderQuestion();
            return;
        }
    }

    // Yangi test holati
    QuizState.subjectIndex = idx;
    QuizState.questions = QuizApp.shuffleArray(data.questions);
    QuizState.currentIndex = 0;
    QuizState.answers = new Array(QuizState.questions.length).fill(undefined);
    QuizState.selectedOption = null;
    QuizState.isFinished = false;
    QuizState.startTime = Date.now();
    QuizState.totalTime = QuizState.questions.length * TIME_PER_QUESTION;

    saveCurrentState();
    renderQuestion();
    QuizApp.showToast(`${data.subject} testi boshlandi!`, 'success');
}

// -------------------------------------------------------
// 2. SAVOLNI RENDER QILISH (Visual Logic)
// -------------------------------------------------------

function renderQuestion() {
    if (QuizState.isFinished) return;

    const q = QuizState.questions[QuizState.currentIndex];
    const total = QuizState.questions.length;
    const currentNum = QuizState.currentIndex + 1;
    const subject = window.QUIZ_DATA[QuizState.subjectIndex];

    // UI elementlarini yangilash
    setInner('quiz-subject-name', `<span style="margin-right:8px">${subject.icon}</span> ${subject.subject}`);
    setInner('quiz-question-counter', `${currentNum} / ${total}`);
    setInner('quiz-question-text', q.question);

    // Progress Bar
    const pct = Math.round(((currentNum - 1) / total) * 100);
    const progressBar = document.getElementById('quiz-progress-bar');
    if (progressBar) {
        progressBar.style.width = `${pct}%`;
        progressBar.style.background = subject.color;
    }
    setInner('quiz-progress-text', `${pct}% yakunlandi`);

    // Variantlarni tayyorlash
    const optionsEl = document.getElementById('quiz-options');
    if (!optionsEl) return;
    optionsEl.innerHTML = '';

    // Har bir savol uchun variantlarni faqat bir marta aralashtiramiz
    QuizState.shuffledOptions = QuizApp.shuffleArray(q.options);

    QuizState.shuffledOptions.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn animate-fadeInUp';
        btn.style.animationDelay = `${i * 0.1}s`;
        
        const letter = String.fromCharCode(65 + i);
        btn.innerHTML = `
            <span class="option-letter">${letter}</span>
            <span class="option-text">${opt}</span>
        `;

        if (QuizState.answers[QuizState.currentIndex] === opt) {
            btn.classList.add('selected');
        }

        btn.onclick = () => selectOption(btn, opt, optionsEl);
        optionsEl.appendChild(btn);
    });

    updateNextButton();
    resetTimer();
    saveCurrentState();

    // Fan rangini CSS Variable orqali o'rnatish
    document.documentElement.style.setProperty('--subject-color', subject.color);
    document.documentElement.style.setProperty('--accent', subject.color);
}

// -------------------------------------------------------
// 3. TANLASH VA BOSHQARISH
// -------------------------------------------------------

function selectOption(btn, value, container) {
    if (QuizState.isFinished) return;

    container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
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
    const hasAnswer = QuizState.answers[QuizState.currentIndex] !== undefined;

    btn.innerHTML = isLast ? 'Natijani ko\'rish' : 'Keyingi savol <span style="margin-left:8px">→</span>';
    btn.disabled = false;
    
    if (hasAnswer) {
        btn.classList.add('has-answer');
        btn.style.opacity = '1';
    } else {
        btn.classList.remove('has-answer');
        btn.style.opacity = '0.7';
    }
}

function goNext() {
    if (QuizState.isFinished) return;

    // Agar javob berilmagan bo'lsa, null deb belgilaymiz
    if (QuizState.answers[QuizState.currentIndex] === undefined) {
        QuizState.answers[QuizState.currentIndex] = null;
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
// 4. TIMER MANTIQI
// -------------------------------------------------------

function resetTimer() {
    clearTimerInterval();
    QuizState.timeLeft = TIME_PER_QUESTION;
    updateTimerUI();

    QuizState.timerInterval = setInterval(() => {
        QuizState.timeLeft--;
        updateTimerUI();

        if (QuizState.timeLeft <= 0) {
            QuizApp.showToast('Vaqt tugadi!', 'warning');
            goNext();
        }
    }, 1000);
}

function updateTimerUI() {
    const timerText = document.getElementById('quiz-timer');
    const ring = document.getElementById('timer-ring');
    if (!timerText) return;

    timerText.textContent = QuizApp.formatTime(QuizState.timeLeft);

    // Vizual effektlar
    if (QuizState.timeLeft <= 5) {
        timerText.style.color = '#ef4444';
        timerText.classList.add('animate-pulse');
    } else {
        timerText.style.color = 'inherit';
        timerText.classList.remove('animate-pulse');
    }

    if (ring) {
        const pct = QuizState.timeLeft / TIME_PER_QUESTION;
        const circumference = 125.66; // 2 * PI * 20
        ring.style.strokeDashoffset = circumference * (1 - pct);
    }
}

function clearTimerInterval() {
    if (QuizState.timerInterval) {
        clearInterval(QuizState.timerInterval);
        QuizState.timerInterval = null;
    }
}

// -------------------------------------------------------
// 5. NATIJALARNI HISOBLASH
// -------------------------------------------------------

function finishQuiz() {
    clearTimerInterval();
    QuizState.isFinished = true;
    QuizState.endTime = Date.now();

    const subject = window.QUIZ_DATA[QuizState.subjectIndex];
    let correct = 0;
    const details = [];

    QuizState.questions.forEach((q, i) => {
        const userAns = QuizState.answers[i];
        const isCorrect = userAns === q.answer;
        if (isCorrect) correct++;

        details.push({
            q: q.question,
            user: userAns || "Javob berilmagan",
            correct: q.answer,
            status: isCorrect
        });
    });

    const result = {
        subject: subject.subject,
        subjectIndex: QuizState.subjectIndex,
        score: correct,
        total: QuizState.questions.length,
        percent: QuizApp.calcPercent(correct, QuizState.questions.length),
        timeSpent: Math.round((QuizState.endTime - QuizState.startTime) / 1000),
        details: details
    };

    QuizApp.saveResult(result);
    QuizApp.clearSession(); // Test tugadi, sessiyani tozalash

    // Natija sahifasiga yo'naltirish
    const params = new URLSearchParams({
        subject: result.subject,
        score: result.score,
        total: result.total,
        time: result.timeSpent
    });
    window.location.href = `result.html?${params.toString()}`;
}

// -------------------------------------------------------
// 6. YORDAMCHI VA EVENTLAR
// -------------------------------------------------------

function saveCurrentState() {
    QuizApp.saveSession({
        subjectIndex: QuizState.subjectIndex,
        fullState: QuizState,
        lastUpdate: Date.now()
    });
}

function setInner(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function showError(msg) {
    const container = document.getElementById('quiz-container');
    if (container) {
        container.innerHTML = `<div class="error-box"><h2>Xatolik</h2><p>${msg}</p><a href="index.html">Orqaga</a></div>`;
    }
}

// Klaviatura bilan boshqarish
document.addEventListener('keydown', (e) => {
    if (QuizState.isFinished) return;
    
    // 1, 2, 3, 4 tugmalari orqali variant tanlash
    if (e.key >= '1' && e.key <= '4') {
        const btns = document.querySelectorAll('.option-btn');
        const idx = parseInt(e.key) - 1;
        if (btns[idx]) btns[idx].click();
    }
    
    // Enter orqali keyingisiga o'tish
    if (e.key === 'Enter') {
        const nextBtn = document.getElementById('btn-next');
        if (nextBtn && !nextBtn.disabled) goNext();
    }
});

// Sahifa yuklanganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    const urlIdx = QuizApp.getUrlParam('subject');
    if (urlIdx !== null) {
        startQuiz(parseInt(urlIdx), true);
    }
    
    const nextBtn = document.getElementById('btn-next');
    if (nextBtn) nextBtn.onclick = goNext;
});

// Global export
window.QuizEngine = { startQuiz, goNext, finishQuiz, QuizState };
