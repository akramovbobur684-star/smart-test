// ============================================================
// quiz.js v9.0 - BEAUTIFIED & FULLY FUNCTIONAL
// Blitz Test - 15 seconds per question
// ============================================================

// ========== 1. GLOBAL VARIABLES ==========
let currentSubject = null;
let allQuestionsArray = [];
let questions = [];
let currentIndex = 0;
let answers = [];
let score = 0;
let timer = null;
let timeLeft = 15;
let totalQuestions = 25;
let isAnswered = false;
let isActive = true;
let startTime = null;
let subjectId = null;

// DOM Elements
let subjectNameEl = null;
let counterEl = null;
let questionTextEl = null;
let optionsEl = null;
let nextBtn = null;
let progressFill = null;
let timerText = null;
let skeletonEl = null;
let quizContentEl = null;
let timeOverlay = null;
let resetBtn = null;

// ========== 2. URL PARAMETER (ENG TEPADA) ==========
const urlParams = new URLSearchParams(window.location.search);
const urlSubjectId = urlParams.get('subject');

console.log('[Quiz] URL parametr "subject":', urlSubjectId);
console.log('[Quiz] To\'liq URL:', window.location.href);

// ========== 3. DARK MODE (DASHBOARD BILAN SINXRON) ==========
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

// ========== 4. YORDAMCHI FUNKSIYALAR ==========
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
    return shuffled.slice(0, Math.min(totalQuestions, shuffled.length));
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

function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#4f46e5'
    };
    
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 60px;
        background: ${colors[type]};
        color: white;
        z-index: 10000;
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideUp 0.3s ease-out;
    `;
    
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2500);
}

// ========== 5. TIMER FUNKSIYALARI ==========
function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function updateTimerUI() {
    const percent = (timeLeft / 15) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${percent}%`;
        if (percent < 30) {
            progressFill.classList.add('danger');
        } else {
            progressFill.classList.remove('danger');
        }
    }
    
    if (timerText) {
        timerText.innerHTML = `${timeLeft} soniya qoldi`;
        if (timeLeft <= 5) {
            timerText.classList.add('warning');
        } else {
            timerText.classList.remove('warning');
        }
    }
}

function startTimer() {
    stopTimer();
    timeLeft = 15;
    updateTimerUI();
    
    timer = setInterval(() => {
        if (!isActive || isAnswered) return;
        
        timeLeft--;
        updateTimerUI();
        
        if (timeLeft <= 0) {
            stopTimer();
            showTimeOverModal();
        }
    }, 1000);
}

// ========== 6. TIME OVER MODAL ==========
function showTimeOverModal() {
    isActive = false;
    if (timeOverlay) {
        timeOverlay.style.display = 'flex';
    }
}

function hideTimeOverModal() {
    if (timeOverlay) {
        timeOverlay.style.display = 'none';
    }
}

// ========== 7. SAVOLNI RENDER QILISH ==========
function renderQuestion() {
    if (!questions.length || !isActive) return;
    
    const q = questions[currentIndex];
    const current = currentIndex + 1;
    
    // Update UI elements
    if (subjectNameEl) {
        subjectNameEl.innerHTML = currentSubject;
    }
    
    if (counterEl) {
        counterEl.innerHTML = `${current} / ${totalQuestions}`;
    }
    
    if (questionTextEl) {
        questionTextEl.innerHTML = escapeHtml(q.question);
    }
    
    // Render options
    if (optionsEl) {
        optionsEl.innerHTML = '';
        isAnswered = false;
        
        q.options.forEach((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `
                <span class="option-letter">${letter}</span>
                <span class="option-text">${escapeHtml(opt)}</span>
            `;
            
            btn.onclick = () => {
                if (!isActive || isAnswered) return;
                
                answers[currentIndex] = opt;
                isAnswered = true;
                
                // Remove selected class from all options
                document.querySelectorAll('.option-btn').forEach(b => {
                    b.classList.remove('selected');
                });
                
                // Add selected class to clicked button
                btn.classList.add('selected');
                
                // Enable next button
                if (nextBtn) {
                    nextBtn.disabled = false;
                }
            };
            
            optionsEl.appendChild(btn);
        });
    }
    
    // Update next button text
    if (nextBtn) {
        nextBtn.disabled = true;
        const isLast = currentIndex === totalQuestions - 1;
        nextBtn.innerHTML = isLast ? '✅ Natijani ko\'rish' : '▶ Keyingi savol';
    }
    
    // Start timer for this question
    startTimer();
}

// ========== 8. KEYINGI SAVOL ==========
function nextQuestion() {
    if (!isActive) return;
    
    if (!isAnswered) {
        showToast("⚠️ Iltimos, javob tanlang!", 'warning');
        return;
    }
    
    stopTimer();
    
    // Check current answer
    const currentQ = questions[currentIndex];
    if (answers[currentIndex] === currentQ.answer) {
        score++;
    }
    
    // Move to next question or finish
    if (currentIndex < totalQuestions - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

// ========== 9. QAYTA BOSHLASH ==========
function restartQuiz() {
    stopTimer();
    
    // Reset all state variables
    currentIndex = 0;
    answers = [];
    score = 0;
    isActive = true;
    isAnswered = false;
    
    // Reselect random questions
    questions = selectRandomQuestions(allQuestionsArray);
    answers = new Array(totalQuestions).fill(undefined);
    startTime = Date.now();
    
    // Hide time overlay if visible
    hideTimeOverModal();
    
    // Render first question
    renderQuestion();
    
    showToast("⚡ Test qayta boshlandi!", 'success');
}

// ========== 10. TESTNI YAKUNLASH ==========
function finishQuiz() {
    stopTimer();
    isActive = false;
    
    // Check last answer
    const lastQ = questions[currentIndex];
    if (answers[currentIndex] === lastQ.answer) {
        score++;
    }
    
    const percent = Math.round((score / totalQuestions) * 100);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    // Prepare details array
    const details = [];
    for (let i = 0; i < questions.length; i++) {
        details.push({
            question: questions[i].question,
            userAnswer: answers[i] || "Javob berilmadi",
            correctAnswer: questions[i].answer,
            isCorrect: answers[i] === questions[i].answer
        });
    }
    
    // Create result object
    const result = {
        subject: currentSubject,
        subjectIndex: subjectId,
        correct: score,
        total: totalQuestions,
        percent: percent,
        timeSpent: timeSpent,
        details: details,
        timestamp: Date.now()
    };
    
    // Save to localStorage
    try {
        const results = JSON.parse(localStorage.getItem('qm_results') || '[]');
        results.unshift(result);
        while (results.length > 50) results.pop();
        localStorage.setItem('qm_results', JSON.stringify(results));
        console.log('[Quiz] Natija saqlandi');
    } catch(e) {
        console.error('[Quiz] Natijani saqlashda xatolik:', e);
    }
    
    // Redirect to result page
    window.location.href = `result.html?subject=${encodeURIComponent(result.subject)}&score=${result.correct}&total=${result.total}&percent=${result.percent}&time=${result.timeSpent}`;
}

// ========== 11. XATO EKRANI ==========
function showErrorPage(title, message) {
    if (skeletonEl) skeletonEl.style.display = 'none';
    if (quizContentEl) quizContentEl.style.display = 'none';
    
    const wrapper = document.getElementById('quiz-wrapper');
    if (wrapper) {
        wrapper.innerHTML = `
            <div class="error-container">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="error-title">${escapeHtml(title)}</div>
                <div class="error-text">${escapeHtml(message)}</div>
                <div style="display: flex; gap: 12px; justify-content: center; margin-top: 20px;">
                    <button onclick="location.reload()" class="error-btn" style="background: #4f46e5; padding: 12px 24px; border: none; border-radius: 40px; color: white; cursor: pointer;">
                        🔄 Qayta urinish
                    </button>
                    <a href="index.html" class="error-btn" style="background: #6b7280; padding: 12px 24px; border-radius: 40px; color: white; text-decoration: none;">
                        🏠 Bosh sahifa
                    </a>
                </div>
            </div>
        `;
    }
}

// ========== 12. MA'LUMOTLARNI KUTISH ==========
function waitForData(callback) {
    let attempts = 0;
    const maxAttempts = 50;
    
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

// ========== 13. ASOSIY INIT QUIZ FUNKSIYASI ==========
function initQuiz() {
    console.log('[Quiz] 🚀 Sahifa ishga tushmoqda...');
    
    // Get DOM elements
    subjectNameEl = document.getElementById('quiz-subject-name');
    counterEl = document.getElementById('quiz-question-counter');
    questionTextEl = document.getElementById('quiz-question-text');
    optionsEl = document.getElementById('quiz-options');
    nextBtn = document.getElementById('btn-next');
    progressFill = document.getElementById('timer-progress-fill');
    timerText = document.getElementById('timer-text');
    skeletonEl = document.getElementById('skeleton-loading');
    quizContentEl = document.getElementById('quiz-content');
    timeOverlay = document.getElementById('time-overlay');
    resetBtn = document.getElementById('reset-test-btn');
    
    // Initialize Dark Mode
    initDarkMode();
    
    // Check URL parameter
    if (urlSubjectId === null) {
        console.error('[Quiz] ❌ "subject" parametri topilmadi!');
        showErrorPage(
            "URL xatosi",
            "URL da 'subject' parametri topilmadi!\n\nMisol: quiz.html?subject=0"
        );
        return;
    }
    
    subjectId = parseInt(urlSubjectId, 10);
    
    if (isNaN(subjectId)) {
        console.error('[Quiz] ❌ "subject" parametri son emas:', urlSubjectId);
        showErrorPage(
            "Parametr xatosi",
            `'subject' parametri son emas: ${urlSubjectId}\n\nMisol: quiz.html?subject=0`
        );
        return;
    }
    
    console.log('[Quiz] ✅ Qabul qilingan ID:', subjectId);
    console.log('[Quiz] ⏳ Ma\'lumotlar yuklanishi kutilmoqda...');
    
    // Wait for data to load
    waitForData((isReady) => {
        if (!isReady) {
            showErrorPage(
                "Ma'lumotlar bazasi topilmadi",
                "questions.js fayli yuklanmagan.\n\n• Internet aloqangizni tekshiring\n• Sahifani qayta yuklang"
            );
            return;
        }
        
        if (subjectId >= window.QUIZ_DATA.length) {
            showErrorPage(
                `Fan topilmadi (${subjectId})`,
                `Mavjud fanlar: 0 dan ${window.QUIZ_DATA.length - 1} gacha\nTanlangan indeks: ${subjectId}`
            );
            return;
        }
        
        const subject = window.QUIZ_DATA[subjectId];
        
        if (!subject || !subject.questions || subject.questions.length === 0) {
            showErrorPage(
                `Savollar topilmadi`,
                `${subject ? subject.subject : 'Fan'} da savollar mavjud emas!`
            );
            return;
        }
        
        console.log(`[Quiz] 🎯 Fan topildi: "${subject.subject}"`);
        console.log(`[Quiz] 📚 Jami savollar: ${subject.questions.length} ta`);
        
        // Set global variables
        currentSubject = subject.subject;
        allQuestionsArray = subject.questions;
        questions = selectRandomQuestions(allQuestionsArray);
        currentIndex = 0;
        answers = new Array(totalQuestions).fill(undefined);
        score = 0;
        isActive = true;
        isAnswered = false;
        startTime = Date.now();
        
        // Update document title
        document.title = `${currentSubject} — Blitz Test`;
        
        // Show quiz content
        if (skeletonEl) skeletonEl.style.display = 'none';
        if (quizContentEl) quizContentEl.style.display = 'block';
        
        // Setup event listeners
        if (nextBtn) {
            nextBtn.onclick = nextQuestion;
        }
        
        if (resetBtn) {
            resetBtn.onclick = restartQuiz;
        }
        
        // Render first question
        renderQuestion();
        
        showToast(`⚡ ${currentSubject} testi boshlandi! Har bir savolga 15 soniya`, 'success');
        console.log('[Quiz] ✅ Test boshlandi!');
    });
}

// ========== 14. ENTRY POINT ==========
document.addEventListener('DOMContentLoaded', initQuiz);
