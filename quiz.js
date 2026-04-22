/**
 * ============================================================
 * QuizMaster Pro — Intellectual Quiz Engine v3.2
 * Xatolarga chidamli, fallback tizimli
 * ============================================================
 */

(function() {
    'use strict';

    // -------------------------------------------------------
    // 1. QUIZ HOLATI
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
    // 2. DEBUG FUNKSIYASI
    // -------------------------------------------------------
    function log(msg, type = 'info') {
        const styles = {
            info: 'color: #2ed573;',
            error: 'color: #ff4757;',
            warning: 'color: #ffa502;',
            success: 'color: #1e90ff;'
        };
        console.log(`%c[QuizEngine] ${msg}`, styles[type] || styles.info);
    }

    // -------------------------------------------------------
    // 3. XATOLIKNI KO'RSATISH
    // -------------------------------------------------------
    function showErrorOnPage(message, details = null) {
        const questionTextEl = document.getElementById('quiz-question-text');
        const optionsContainer = document.getElementById('quiz-options');
        
        if (questionTextEl) {
            questionTextEl.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #ef4444;"></i>
                    <h2 style="color: #ef4444; margin: 20px 0;">Xatolik yuz berdi!</h2>
                    <p style="margin-bottom: 20px;">${message}</p>
                    ${details ? `<pre style="background: #f8f9fa; padding: 10px; border-radius: 8px; font-size: 12px; text-align: left;">${details}</pre>` : ''}
                    <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px;">
                        <button onclick="location.href='index.html'" style="padding: 12px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;">
                            🏠 Bosh sahifa
                        </button>
                        <button onclick="location.reload()" style="padding: 12px 24px; background: #6b7280; color: white; border: none; border-radius: 8px; cursor: pointer;">
                            🔄 Qayta yuklash
                        </button>
                    </div>
                </div>
            `;
        }
        
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
        }
        
        // Toast xabar
        if (window.QuizApp && window.QuizApp.showToast) {
            window.QuizApp.showToast(message, 'error');
        }
    }

    // -------------------------------------------------------
    // 4. URL PARAMETRNI OLISH
    // -------------------------------------------------------
    function getSubjectIndex() {
        if (window.QuizApp && window.QuizApp.getUrlParam) {
            return window.QuizApp.getUrlParam('subject');
        }
        
        // Fallback
        const params = new URLSearchParams(window.location.search);
        return params.get('subject');
    }

    // -------------------------------------------------------
    // 5. ASOSIY START FUNKSIYASI
    // -------------------------------------------------------
    function startQuiz() {
        log("=========================================");
        log("QuizEngine ishga tushmoqda...");
        log("=========================================");
        
        // 1. URL parametrni olish
        const subjectParam = getSubjectIndex();
        
        if (subjectParam === null) {
            const errorMsg = "URL da 'subject' parametri topilmadi!";
            log(errorMsg, 'error');
            showErrorOnPage(errorMsg, "Misol: quiz.html?subject=0");
            return;
        }
        
        const subjectIndex = parseInt(subjectParam);
        if (isNaN(subjectIndex)) {
            const errorMsg = `'subject' parametri son emas: ${subjectParam}`;
            log(errorMsg, 'error');
            showErrorOnPage(errorMsg);
            return;
        }
        
        QuizState.subjectIndex = subjectIndex;
        log(`Tanlangan fan indeksi: ${subjectIndex}`);
        
        // 2. QUIZ_DATA mavjudligini tekshirish
        if (!window.QUIZ_DATA) {
            const errorMsg = "Ma'lumotlar bazasi topilmadi!";
            log(errorMsg, 'error');
            log("Sabab: data/questions.js fayli yuklanmagan yoki path noto'g'ri", 'warning');
            showErrorOnPage(
                errorMsg,
                "1. data/questions.js fayli mavjudligini tekshiring\n" +
                "2. Fayl yo'li to'g'riligini tekshiring\n" +
                "3. Browser konsolini oching (F12)"
            );
            return;
        }
        
        if (!Array.isArray(window.QUIZ_DATA)) {
            const errorMsg = "window.QUIZ_DATA massiv emas!";
            log(errorMsg, 'error');
            showErrorOnPage(errorMsg);
            return;
        }
        
        if (window.QUIZ_DATA.length === 0) {
            const errorMsg = "Ma'lumotlar bazasi bo'sh!";
            log(errorMsg, 'error');
            showErrorOnPage(errorMsg);
            return;
        }
        
        log(`window.QUIZ_DATA mavjud: ${window.QUIZ_DATA.length} ta fan`);
        
        // 3. Tanlangan fan mavjudligini tekshirish
        if (subjectIndex >= window.QUIZ_DATA.length) {
            const errorMsg = `${subjectIndex}-indeksli fan topilmadi. Mavjud fanlar: ${window.QUIZ_DATA.length} ta.`;
            log(errorMsg, 'error');
            showErrorOnPage(errorMsg);
            return;
        }
        
        const subjectData = window.QUIZ_DATA[subjectIndex];
        log(`Tanlangan fan: ${subjectData.subject}`);
        
        if (!subjectData.questions || subjectData.questions.length === 0) {
            const errorMsg = `${subjectData.subject} fanida savollar yo'q!`;
            log(errorMsg, 'error');
            showErrorOnPage(errorMsg);
            return;
        }
        
        log(`${subjectData.questions.length} ta savol topildi`, 'success');
        
        // 4. Holatni sozlash
        QuizState.subjectName = subjectData.subject;
        QuizState.questions = [...subjectData.questions];
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
        
        // 7. Muvaffaqiyatli xabar
        if (window.QuizApp && window.QuizApp.showToast) {
            window.QuizApp.showToast(`✅ ${subjectData.subject} testi boshlandi!`, 'success');
        }
        
        log("Quiz muvaffaqiyatli boshlandi!", 'success');
    }

    // -------------------------------------------------------
    // 6. SAVOLNI RENDER QILISH
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
        const badgeEl = document.getElementById('question-badge');
        
        // Xavfsizlik tekshiruvi
        if (!questionTextEl || !optionsContainer) {
            log("Kerakli DOM elementlari topilmadi!", 'error');
            return;
        }
        
        const q = QuizState.questions[QuizState.currentIndex];
        const total = QuizState.questions.length;
        const currentNum = QuizState.currentIndex + 1;
        const subjectData = window.QUIZ_DATA[QuizState.subjectIndex];
        
        // Savol matni
        questionTextEl.innerHTML = q.question;
        log(`Savol ${currentNum}/${total}: ${q.question.substring(0, 50)}...`);
        
        // Sarlavha
        if (subjectNameEl && subjectData) {
            subjectNameEl.innerHTML = `${subjectData.icon || '📚'} ${subjectData.subject}`;
        }
        
        // Counter
        if (counterEl) {
            counterEl.innerHTML = `${currentNum} / ${total}`;
        }
        
        // Badge
        if (badgeEl) {
            badgeEl.textContent = `SAVOL: ${currentNum}`;
        }
        
        // Progress bar
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
        
        // Variantlar
        optionsContainer.innerHTML = '';
        
        let currentOptions;
        if (QuizState.shuffledOptions[QuizState.currentIndex]) {
            currentOptions = QuizState.shuffledOptions[QuizState.currentIndex];
        } else {
            currentOptions = [...q.options];
            if (window.QuizApp && window.QuizApp.shuffleArray) {
                currentOptions = window.QuizApp.shuffleArray(currentOptions);
            }
            QuizState.shuffledOptions[QuizState.currentIndex] = currentOptions;
        }
        
        currentOptions.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            const letter = String.fromCharCode(65 + i);
            
            let displayText = opt;
            if (window.QuizApp && window.QuizApp.escapeHtml) {
                displayText = window.QuizApp.escapeHtml(opt);
            }
            
            btn.innerHTML = `
                <span class="option-letter">${letter}</span>
                <span class="option-text">${displayText}</span>
            `;
            
            if (QuizState.answers[QuizState.currentIndex] === opt) {
                btn.classList.add('selected');
            }
            
            btn.onclick = () => selectOption(btn, opt, optionsContainer);
            optionsContainer.appendChild(btn);
        });
        
        // Next tugmasi
        updateNextButton();
        
        // Taymer
        resetTimer();
    }

    // -------------------------------------------------------
    // 7. VARIANT TANLASH
    // -------------------------------------------------------
    function selectOption(btn, value, container) {
        if (QuizState.isFinished) return;
        
        container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        QuizState.selectedOption = value;
        QuizState.answers[QuizState.currentIndex] = value;
        
        log(`Javob tanlandi: ${value.substring(0, 30)}...`);
        updateNextButton();
    }

    // -------------------------------------------------------
    // 8. NEXT TUGMASI
    // -------------------------------------------------------
    function updateNextButton() {
        const btn = document.getElementById('btn-next');
        if (!btn) return;
        
        const isLast = QuizState.currentIndex === QuizState.questions.length - 1;
        const hasAns = QuizState.answers[QuizState.currentIndex] !== undefined;
        
        btn.innerHTML = isLast ? '✅ Natijani ko\'rish' : '▶ Keyingi savol';
        btn.disabled = false;
        
        if (hasAns) {
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        } else {
            btn.style.opacity = '0.6';
        }
    }

    // -------------------------------------------------------
    // 9. KEYINGI SAVOL
    // -------------------------------------------------------
    function goNext() {
        if (QuizState.isFinished) return;
        
        if (QuizState.answers[QuizState.currentIndex] === undefined) {
            QuizState.answers[QuizState.currentIndex] = null;
            QuizState.skipsCount++;
            log(`Savol ${QuizState.currentIndex + 1} o'tkazib yuborildi`, 'warning');
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
    // 10. TAYMER
    // -------------------------------------------------------
    function resetTimer() {
        clearTimerInterval();
        QuizState.timeLeft = TIME_PER_QUESTION;
        updateTimerUI();
        
        QuizState.timerInterval = setInterval(() => {
            QuizState.timeLeft--;
            updateTimerUI();
            
