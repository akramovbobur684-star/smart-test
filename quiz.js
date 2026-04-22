/**
 * ============================================================
 * QuizMaster Pro — Intellectual Quiz Engine v3.2
 * Quiz sahifasi — URL'dan indeks oladi va savollarni chiqaradi
 * ============================================================
 */

'use strict';

// -------------------------------------------------------
// 1. QUIZ HOLATI (STATE)
// -------------------------------------------------------
const QuizState = {
    subjectIndex: null,
    subjectName: "",
    questions: [],
    currentIndex: 0,
    answers: [],
    selectedOption: null,
    timeLeft: 30,
    timerInterval: null,
    isFinished: false,
    startTime: null,
    endTime: null,
    shuffledOptions: [],
    skipsCount: 0
};

const TIME_PER_QUESTION = 30;

// -------------------------------------------------------
// 2. DEBUG VA MONITORING
// -------------------------------------------------------
const QuizDebug = {
    log(msg, type = 'info') {
        const styles = {
            info: 'color: #2ed573; font-weight: bold;',
            error: 'color: #ff4757; font-weight: bold;',
            warning: 'color: #ffa502; font-weight: bold;',
            success: 'color: #1e90ff; font-weight: bold;'
        };
        console.log(`%c[QuizEngine] ${msg}`, styles[type] || styles.info);
    },
    
    error(msg) {
        this.log(msg, 'error');
        // Xatoni DOM da ham ko'rsatish
        const errorDiv = document.getElementById('quiz-error-message');
        if (errorDiv) {
            errorDiv.innerHTML = `<div style="background: #ff4757; color: white; padding: 15px; border-radius: 12px; margin: 20px;">❌ ${msg}</div>`;
            errorDiv.style.display = 'block';
        }
    }
};

// -------------------------------------------------------
// 3. URL PARAMETRLARNI OLISH
// -------------------------------------------------------
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(name);
    QuizDebug.log(`URL parametr "${name}" = ${value}`);
    return value;
}

// -------------------------------------------------------
// 4. ASOSIY START FUNKSIYASI
// -------------------------------------------------------
function startQuiz() {
    QuizDebug.log("=========================================");
    QuizDebug.log("QuizEngine ishga tushmoqda...");
    QuizDebug.log("=========================================");
    
    // 1. URL dan subject indeksini olish
    const subjectParam = getUrlParameter('subject');
    
    if (subjectParam === null) {
        QuizDebug.error("URL da 'subject' parametri topilmadi! Misol: quiz.html?subject=0");
        showErrorOnPage("URL da 'subject' parametri topilmadi. Iltimos, asosiy sahifadan fan tanlang.");
        return;
    }
    
    const subjectIndex = parseInt(subjectParam);
    if (isNaN(subjectIndex)) {
        QuizDebug.error(`'subject' parametri son emas: ${subjectParam}`);
        showErrorOnPage(`'subject' parametri noto'g'ri: ${subjectParam}`);
        return;
    }
    
    QuizState.subjectIndex = subjectIndex;
    QuizDebug.log(`Tanlangan fan indeksi: ${subjectIndex}`);
    
    // 2. window.QUIZ_DATA mavjudligini tekshirish
    QuizDebug.log("window.QUIZ_DATA mavjudligini tekshirish...");
    QuizDebug.log(`typeof window.QUIZ_DATA: ${typeof window.QUIZ_DATA}`);
    
    if (!window.QUIZ_DATA) {
        QuizDebug.error("window.QUIZ_DATA topilmadi! data/questions.js fayli yuklanganligini tekshiring.");
        showErrorOnPage(
            "Ma'lumotlar bazasi topilmadi!<br><br>" +
            "Sabablari:<br>" +
            "1. data/questions.js fayli yuklanmagan<br>" +
            "2. Fayl yo'li noto'g'ri<br>" +
            "3. questions.js da sintaksis xatosi<br><br>" +
            "<button onclick='location.reload()' style='padding:10px 20px; margin-top:10px; cursor:pointer;'>🔄 Qayta yuklash</button>"
        );
        return;
    }
    
    if (!Array.isArray(window.QUIZ_DATA)) {
        QuizDebug.error("window.QUIZ_DATA massiv emas!");
        showErrorOnPage("window.QUIZ_DATA massiv emas. questions.js faylini tekshiring.");
        return;
    }
    
    if (window.QUIZ_DATA.length === 0) {
        QuizDebug.error("window.QUIZ_DATA bo'sh massiv!");
        showErrorOnPage("Ma'lumotlar bazasi bo'sh. questions.js faylini tekshiring.");
        return;
    }
    
    QuizDebug.log(`window.QUIZ_DATA uzunligi: ${window.QUIZ_DATA.length}`);
    QuizDebug.log("Mavjud fanlar:");
    window.QUIZ_DATA.forEach((item, idx) => {
        QuizDebug.log(`  [${idx}] ${item.subject} — ${item.questions?.length || 0} ta savol`);
    });
    
    // 3. Tanlangan fan mavjudligini tekshirish
    if (subjectIndex >= window.QUIZ_DATA.length) {
        QuizDebug.error(`${subjectIndex}-indeksli fan topilmadi. Maksimal indeks: ${window.QUIZ_DATA.length - 1}`);
        showErrorOnPage(`${subjectIndex}-indeksli fan topilmadi. Mavjud fanlar: ${window.QUIZ_DATA.length} ta.`);
        return;
    }
    
    const subjectData = window.QUIZ_DATA[subjectIndex];
    QuizDebug.log(`Tanlangan fan: ${subjectData.subject}`);
    
    if (!subjectData.questions || subjectData.questions.length === 0) {
        QuizDebug.error(`${subjectData.subject} fanida savollar yo'q!`);
        showErrorOnPage(`${subjectData.subject} fanida savollar mavjud emas.`);
        return;
    }
    
    QuizDebug.log(`Savollar soni: ${subjectData.questions.length}`, 'success');
    
    // 4. Holatni sozlash
    QuizState.subjectName = subjectData.subject;
    QuizState.questions = [...subjectData.questions]; // Kopiya
    QuizState.currentIndex = 0;
    QuizState.answers = new Array(QuizState.questions.length).fill(undefined);
    QuizState.startTime = Date.now();
    QuizState.isFinished = false;
    QuizState.shuffledOptions = [];
    QuizState.skipsCount = 0;
    
    // 5. Sahifa sarlavhasini yangilash
    document.title = `${subjectData.subject} — QuizMaster Pro`;
    
    // 6. Savolni render qilish
    renderQuestion();
    
    QuizDebug.log("Quiz muvaffaqiyatli boshlandi!", 'success');
}

// -------------------------------------------------------
// 5. SAVOLNI RENDER QILISH
// -------------------------------------------------------
function renderQuestion() {
    if (QuizState.isFinished) return;
    
    // DOM elementlarini olish
    const questionTextEl = document.getElementById('quiz-question-text');
    const optionsContainer = document.getElementById('quiz-options');
    const counterEl = document.getElementById('quiz-question-counter');
    const subjectNameEl = document.getElementById('quiz-subject-name');
    const progressBar = document.getElementById('quiz-progress-bar');
    const progressText = document.getElementById('quiz-progress-text');
    const timerEl = document.getElementById('quiz-timer');
    const badgeEl = document.getElementById('question-badge');
    
    // DOM elementlarini tekshirish
    if (!questionTextEl) QuizDebug.warning("quiz-question-text elementi topilmadi!");
    if (!optionsContainer) QuizDebug.warning("quiz-options elementi topilmadi!");
    
    const q = QuizState.questions[QuizState.currentIndex];
    const total = QuizState.questions.length;
    const currentNum = QuizState.currentIndex + 1;
    const subjectData = window.QUIZ_DATA[QuizState.subjectIndex];
    
    // 1. Savol matnini chiqarish
    if (questionTextEl) {
        questionTextEl.innerHTML = q.question;
        QuizDebug.log(`Savol ${currentNum}: ${q.question.substring(0, 50)}...`);
    }
    
    // 2. Sarlavha va badgelar
    if (subjectNameEl && subjectData) {
        subjectNameEl.innerHTML = `<span style="font-size: 1.2rem; margin-right: 8px;">${subjectData.icon || '📚'}</span> ${subjectData.subject}`;
    }
    
    if (counterEl) {
        counterEl.innerHTML = `${currentNum} / ${total}`;
    }
    
    if (badgeEl) {
        badgeEl.textContent = `SAVOL: ${currentNum}`;
    }
    
    // 3. Progress bar
    const pct = Math.round(((currentNum - 1) / total) * 100);
    if (progressBar) {
        progressBar.style.width = `${pct}%`;
        if (subjectData && subjectData.color) {
            progressBar.style.backgroundColor = subjectData.color;
        }
    }
    if (progressText) {
        progressText.innerHTML = `${pct}% yakunlandi`;
    }
    
    // 4. Variantlarni generatsiya qilish
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        // Variantlarni aralashtirish (agar kerak bo'lsa)
        let currentOptions;
        if (QuizState.shuffledOptions[QuizState.currentIndex]) {
            currentOptions = QuizState.shuffledOptions[QuizState.currentIndex];
        } else {
            currentOptions = [...q.options];
            currentOptions = shuffleArray(currentOptions);
            QuizState.shuffledOptions[QuizState.currentIndex] = currentOptions;
        }
        
        // Har bir variant uchun tugma yaratish
        currentOptions.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            const letter = String.fromCharCode(65 + i);
            btn.innerHTML = `
                <span class="option-letter">${letter}</span>
                <span class="option-text">${escapeHtml(opt)}</span>
            `;
            
            // Avvalgi javobni tekshirish
            if (QuizState.answers[QuizState.currentIndex] === opt) {
                btn.classList.add('selected');
            }
            
            btn.onclick = () => selectOption(btn, opt, optionsContainer);
            optionsContainer.appendChild(btn);
        });
    }
    
    // 5. Next tugmasini yangilash
    updateNextButton();
    
    // 6. Taymerni ishga tushirish
    resetTimer();
    
    // 7. UI rangini yangilash
    if (subjectData && subjectData.color) {
        document.documentElement.style.setProperty('--subject-color', subjectData.color);
    }
}

// -------------------------------------------------------
// 6. VARIANT TANLASH
// -------------------------------------------------------
function selectOption(btn, value, container) {
    if (QuizState.isFinished) return;
    
    // Boshqa tugmalardan selected klassini olib tashlash
    container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    
    QuizState.selectedOption = value;
    QuizState.answers[QuizState.currentIndex] = value;
    
    QuizDebug.log(`Javob tanlandi: ${value}`);
    updateNextButton();
}

// -------------------------------------------------------
// 7. NEXT TUGMASINI YANGILASH
// -------------------------------------------------------
function updateNextButton() {
    const btn = document.getElementById('btn-next');
    if (!btn) return;
    
    const isLast = QuizState.currentIndex === QuizState.questions.length - 1;
    const hasAns = QuizState.answers[QuizState.currentIndex] !== undefined;
    
    btn.innerHTML = isLast ? '✅ Natijani ko\'rish' : '➡ Keyingi savol';
    btn.disabled = false;
    
    if (hasAns) {
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    } else {
        btn.style.opacity = '0.6';
    }
}

// -------------------------------------------------------
// 8. KEYINGI SAVOLGA O'TISH
// -------------------------------------------------------
function goNext() {
    if (QuizState.isFinished) return;
    
    // Javob berilmagan bo'lsa, skip qilish
    if (QuizState.answers[QuizState.currentIndex] === undefined) {
        QuizState.answers[QuizState.currentIndex] = null;
        QuizState.skipsCount++;
        QuizDebug.log(`Savol ${QuizState.currentIndex + 1} o'tkazib yuborildi`);
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
// 9. TAYMER
// -------------------------------------------------------
function resetTimer() {
    clearTimerInterval();
    QuizState.timeLeft = TIME_PER_QUESTION;
    updateTimerUI();
    
    QuizState.timerInterval = setInterval(() => {
        QuizState.timeLeft--;
        updateTimerUI();
        
        if (QuizState.timeLeft <= 0) {
            QuizDebug.log("Vaqt tugadi! Keyingi savolga o'tilmoqda...");
            clearTimerInterval();
            goNext();
        }
    }, 1000);
}

function updateTimerUI() {
    const timerText = document.getElementById('quiz-timer');
    const ring = document.getElementById('timer-ring');
    if (!timerText) return;
    
    const mins = Math.floor(QuizState.timeLeft / 60);
    const secs = QuizState.timeLeft % 60;
    timerText.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    if (QuizState.timeLeft <= 5) {
        timerText.style.color = '#ff4757';
    } else {
        timerText.style.color = 'inherit';
    }
    
    if (ring) {
        const circumference = 2 * Math.PI * 20;
        const pct = QuizState.timeLeft / TIME_PER_QUESTION;
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
// 10. TESTNI YAKUNLASH
// -------------------------------------------------------
function finishQuiz() {
    clearTimerInterval();
    QuizState.isFinished = true;
    QuizState.endTime = Date.now();
    
    const subjectData = window.QUIZ_DATA[QuizState.subjectIndex];
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
    
    const timeSpent = Math.round((QuizState.endTime - QuizState.startTime) / 1000);
    const percent = Math.round((correct / QuizState.questions.length) * 100);
    
    const result = {
        subject: subjectData.subject,
        subjectIndex: QuizState.subjectIndex,
        correct: correct,
        total: QuizState.questions.length,
        percent: percent,
        timeSpent: timeSpent,
        details: details,
        skips: QuizState.skipsCount,
        timestamp: Date.now()
    };
    
    // Natijani localStorage ga saqlash
    saveResult(result);
    
    // Natija sahifasiga o'tish
    const params = new URLSearchParams({
        subject: result.subject,
        score: result.correct,
        total: result.total,
        time: result.timeSpent,
        percent: result.percent
    });
    
    window.location.href = `result.html?${params.toString()}`;
}

// -------------------------------------------------------
// 11. NATIJALARNI SAQLASH
// -------------------------------------------------------
function saveResult(result) {
    try {
        const existing = localStorage.getItem('qm_results');
        const results = existing ? JSON.parse(existing) : [];
        results.unshift(result);
        while (results.length > 50) results.pop();
        localStorage.setItem('qm_results', JSON.stringify(results));
        QuizDebug.log(`Natija saqlandi: ${result.correct}/${result.total} (${result.percent}%)`);
    } catch (e) {
        QuizDebug.error(`Natijani saqlashda xatolik: ${e.message}`);
    }
}

// -------------------------------------------------------
// 12. YORDAMCHI FUNKSIYALAR
// -------------------------------------------------------
function shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function showErrorOnPage(message) {
    const container = document.getElementById('quiz-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 64px; margin-bottom: 20px;">⚠️</div>
                <h2 style="color: #ff4757; margin-bottom: 15px;">Xatolik yuz berdi!</h2>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 20px auto; max-width: 500px; text-align: left;">
                    <strong>Xato:</strong><br>
                    ${message}
                </div>
                <button onclick="location.href='index.html'" style="padding: 12px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 20px;">
                    🏠 Bosh sahifaga qaytish
                </button>
                <button onclick="location.reload()" style="padding: 12px 24px; background: #6b7280; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 20px; margin-left: 10px;">
                    🔄 Qayta yuklash
                </button>
            </div>
        `;
    }
}

// -------------------------------------------------------
// 13. KEYBOARD EVENTLARI
// -------------------------------------------------------
document.addEventListener('keydown', (e) => {
    if (QuizState.isFinished) return;
    
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

// -------------------------------------------------------
// 14. SAHIFA YUKLANGANDA
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    QuizDebug.log("DOMContentLoaded — sahifa yuklandi");
    
    // Xato xabari uchun div yaratish
    const container = document.getElementById('quiz-container');
    if (container && !document.getElementById('quiz-error-message')) {
        const errorDiv = document.createElement('div');
        errorDiv.id = 'quiz-error-message';
        errorDiv.style.display = 'none';
        container.insertBefore(errorDiv, container.firstChild);
    }
    
    // Next tugmasini ulash
    const nextBtn = document.getElementById('btn-next');
    if (nextBtn) {
        nextBtn.onclick = goNext;
        QuizDebug.log("Next tugmasi ulandi");
    }
    
    // Testni boshlash
    startQuiz();
});

// Global eksport
window.QuizEngine = { startQuiz, goNext, finishQuiz, QuizState };
