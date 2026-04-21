// ============================================================
// quiz.js — Test mexanizmi (Quiz Engine)
// Savollarni yuklash, timer, progress, javoblarni saqlash
// ============================================================

'use strict';

// -------------------------------------------------------
// TEST HOLATI (State)
// -------------------------------------------------------
const QuizState = {
  subjectIndex: 0,       // Tanlangan fan indeksi (QUIZ_DATA ichida)
  questions: [],          // Aralashtirilgan savollar
  currentIndex: 0,        // Joriy savol indeksi
  answers: [],            // Foydalanuvchi javoblari massivi
  selectedOption: null,   // Joriy savol uchun tanlangan variant
  timeLeft: 0,            // Qolgan vaqt (sekund)
  totalTime: 0,           // Umumiy vaqt (sekund)
  timerInterval: null,    // setInterval ID
  isFinished: false,      // Test tugadimi?
  startTime: null,        // Test boshlagan vaqt
};

// Har bir savol uchun vaqt (sekund)
const TIME_PER_QUESTION = 30;

// -------------------------------------------------------
// 1. TEST BOSHLASH
// -------------------------------------------------------

/**
 * Tanlangan fan bo'yicha testni boshlaydi.
 * @param {number} idx - QUIZ_DATA massividagi fan indeksi
 */
function startQuiz(idx) {
  const data = window.QUIZ_DATA[idx];
  if (!data) {
    console.error('Fan topilmadi:', idx);
    return;
  }

  // Holatni boshlang'ich qiymatga qaytarish
  QuizState.subjectIndex = idx;
  QuizState.questions = QuizApp.shuffleArray(data.questions);
  QuizState.currentIndex = 0;
  QuizState.answers = [];
  QuizState.selectedOption = null;
  QuizState.isFinished = false;
  QuizState.startTime = Date.now();
  QuizState.totalTime = QuizState.questions.length * TIME_PER_QUESTION;

  // Sessiyani saqlash
  QuizApp.saveSession({
    subjectIndex: idx,
    subjectName: data.subject,
    totalQuestions: QuizState.questions.length,
    startedAt: QuizState.startTime
  });

  // Savolni ko'rsatish
  renderQuestion();
}

// -------------------------------------------------------
// 2. SAVOL KO'RSATISH
// -------------------------------------------------------

/**
 * Joriy savolni DOM'ga chizadi.
 */
function renderQuestion() {
  const q = QuizState.questions[QuizState.currentIndex];
  const total = QuizState.questions.length;
  const current = QuizState.currentIndex + 1;
  const subject = window.QUIZ_DATA[QuizState.subjectIndex];

  // --- Sarlavha qismi ---
  setInner('quiz-subject-name', subject.subject);
  setInner('quiz-question-counter', `${current} / ${total}`);
  setInner('quiz-question-text', q.question);

  // --- Progress bar ---
  const pct = Math.round(((current - 1) / total) * 100);
  setStyle('quiz-progress-bar', 'width', `${pct}%`);
  setInner('quiz-progress-text', `${pct}% bajarildi`);

  // --- Variantlar ---
  const optionsEl = document.getElementById('quiz-options');
  if (!optionsEl) return;

  optionsEl.innerHTML = '';
  const shuffledOptions = QuizApp.shuffleArray(q.options);

  shuffledOptions.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn animate-fadeInUp stagger-' + (i + 1);
    btn.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + i)}</span>
      <span class="option-text">${opt}</span>
    `;

    // Avvalgi javob saqlanganmi? (back tugmasi uchun)
    if (QuizState.answers[QuizState.currentIndex] === opt) {
      btn.classList.add('selected');
      QuizState.selectedOption = opt;
    }

    btn.addEventListener('click', () => selectOption(btn, opt, optionsEl));
    optionsEl.appendChild(btn);
  });

  // --- Keyingi tugmani yangilash ---
  updateNextButton();

  // --- Timerni yangilash ---
  resetTimer();

  // --- Fan rangini qo'llash ---
  document.documentElement.style.setProperty('--subject-color', subject.color);
}

// -------------------------------------------------------
// 3. VARIANT TANLASH
// -------------------------------------------------------

/**
 * Foydalanuvchi variantni tanlaganida ishlaydi.
 * @param {HTMLElement} btn - Bosilgan tugma
 * @param {string} value - Tanlangan javob
 * @param {HTMLElement} container - Variantlar konteyneri
 */
function selectOption(btn, value, container) {
  // Avvalgi tanlovni o'chirish
  container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));

  // Yangi tanlov
  btn.classList.add('selected');
  QuizState.selectedOption = value;

  // Joriy savolga javobni yozish
  QuizState.answers[QuizState.currentIndex] = value;

  // Keyingi tugmani faollashtirish
  updateNextButton();
}

// -------------------------------------------------------
// 4. KEYINGI TUGMA
// -------------------------------------------------------

/**
 * Keyingi tugma holatini yangilaydi.
 */
function updateNextButton() {
  const btn = document.getElementById('btn-next');
  if (!btn) return;

  const isLast = QuizState.currentIndex === QuizState.questions.length - 1;
  const hasAnswer = QuizState.selectedOption !== null ||
                    QuizState.answers[QuizState.currentIndex] !== undefined;

  btn.textContent = isLast ? '✅ Testni yakunlash' : 'Keyingisi →';
  btn.disabled = false; // Har doim bosish mumkin (javobsiz ham o'tish mumkin)

  if (hasAnswer) {
    btn.classList.add('has-answer');
  } else {
    btn.classList.remove('has-answer');
  }
}

/**
 * Keyingi savolga o'tish yoki testni yakunlash.
 */
function goNext() {
  // Javob saqlanmagan bo'lsa null saqlash
  if (QuizState.answers[QuizState.currentIndex] === undefined) {
    QuizState.answers[QuizState.currentIndex] = null;
  }

  const isLast = QuizState.currentIndex === QuizState.questions.length - 1;

  if (isLast) {
    finishQuiz();
  } else {
    QuizState.currentIndex++;
    QuizState.selectedOption = QuizState.answers[QuizState.currentIndex] || null;
    renderQuestion();

    // Savol o'tish animatsiyasi
    const card = document.getElementById('question-card');
    if (card) {
      card.style.animation = 'none';
      requestAnimationFrame(() => {
        card.style.animation = 'fadeInUp 0.35s ease forwards';
      });
    }
  }
}

// -------------------------------------------------------
// 5. TIMER
// -------------------------------------------------------

/**
 * Har bir savol uchun timerni qayta boshlaydi.
 */
function resetTimer() {
  clearTimerInterval();

  QuizState.timeLeft = TIME_PER_QUESTION;
  updateTimerUI();

  QuizState.timerInterval = setInterval(() => {
    QuizState.timeLeft--;
    updateTimerUI();

    if (QuizState.timeLeft <= 0) {
      clearTimerInterval();
      // Vaqt tugadi — javob saqlanmasa null saqla va keyingiga o't
      if (QuizState.answers[QuizState.currentIndex] === undefined) {
        QuizState.answers[QuizState.currentIndex] = null;
      }

      // Oxirgi savol bo'lsa testni yakunla
      if (QuizState.currentIndex >= QuizState.questions.length - 1) {
        finishQuiz();
      } else {
        QuizState.currentIndex++;
        QuizState.selectedOption = QuizState.answers[QuizState.currentIndex] || null;
        renderQuestion();
      }
    }
  }, 1000);
}

/**
 * Timerni DOM'da yangilaydi.
 */
function updateTimerUI() {
  const el = document.getElementById('quiz-timer');
  if (!el) return;

  el.textContent = QuizApp.formatTime(QuizState.timeLeft);

  // Vaqt 10 sekunddan kam qolsa ogohlantirish
  if (QuizState.timeLeft <= 10) {
    el.classList.add('timer-warning');
  } else {
    el.classList.remove('timer-warning');
  }

  // Timer halqa animatsiyasi
  const ring = document.getElementById('timer-ring');
  if (ring) {
    const pct = QuizState.timeLeft / TIME_PER_QUESTION;
    const circumference = 2 * Math.PI * 20; // r=20
    ring.style.strokeDashoffset = circumference * (1 - pct);
  }
}

/**
 * setInterval ni tozalaydi.
 */
function clearTimerInterval() {
  if (QuizState.timerInterval) {
    clearInterval(QuizState.timerInterval);
    QuizState.timerInterval = null;
  }
}

// -------------------------------------------------------
// 6. TESTNI YAKUNLASH
// -------------------------------------------------------

/**
 * Testni yakunlaydi, natijani hisoblaydi va natija sahifasiga o'tadi.
 */
function finishQuiz() {
  clearTimerInterval();
  QuizState.isFinished = true;

  const subject = window.QUIZ_DATA[QuizState.subjectIndex];
  let correct = 0;
  const details = [];

  QuizState.questions.forEach((q, i) => {
    const userAnswer = QuizState.answers[i];
    const isCorrect = userAnswer === q.answer;
    if (isCorrect) correct++;

    details.push({
      question: q.question,
      options: q.options,
      userAnswer: userAnswer,
      correctAnswer: q.answer,
      isCorrect: isCorrect
    });
  });

  const total = QuizState.questions.length;
  const percent = QuizApp.calcPercent(correct, total);
  const timeSpent = Math.round((Date.now() - QuizState.startTime) / 1000);

  // Natijani saqlash
  const result = {
    subject: subject.subject,
    subjectIndex: QuizState.subjectIndex,
    correct,
    total,
    percent,
    timeSpent,
    details
  };

  QuizApp.saveResult(result);

  // Sessiya orqali natija sahifasiga uzatish
  QuizApp.saveSession({ lastResult: result });

  // Natija sahifasiga o'tish
  window.location.href = `result.html?subject=${encodeURIComponent(subject.subject)}&score=${correct}&total=${total}&time=${timeSpent}`;
}

// -------------------------------------------------------
// 7. DOM YORDAMCHI FUNKSIYALAR
// -------------------------------------------------------

function setInner(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function setStyle(id, prop, value) {
  const el = document.getElementById(id);
  if (el) el.style[prop] = value;
}

// -------------------------------------------------------
// 8. SAHIFA YUKLANGANDA ISHLASH
// -------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // quiz.html sahifasidami?
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;

  // URL'dan fan indeksini o'qish
  const rawIdx = QuizApp.getUrlParam('subject');
  const idx = parseInt(rawIdx, 10);

  if (isNaN(idx) || !window.QUIZ_DATA || !window.QUIZ_DATA[idx]) {
    quizContainer.innerHTML = `
      <div class="error-state text-center">
        <div style="font-size: 3rem;">😕</div>
        <h2>Fan topilmadi</h2>
        <p>Iltimos, bosh sahifaga qayting va fanlardan birini tanlang.</p>
        <a href="index.html" class="btn btn-primary mt-lg">Bosh sahifaga</a>
      </div>`;
    return;
  }

  // Testni boshlash
  startQuiz(idx);

  // Keyingi tugmaga event
  const nextBtn = document.getElementById('btn-next');
  if (nextBtn) nextBtn.addEventListener('click', goNext);

  // Testni to'xtatish tugmasi
  const quitBtn = document.getElementById('btn-quit');
  if (quitBtn) {
    quitBtn.addEventListener('click', () => {
      if (confirm('Testni to\'xtatmoqchimisiz? Natija saqlanmaydi.')) {
        clearTimerInterval();
        QuizApp.clearSession();
        window.location.href = 'index.html';
      }
    });
  }
});

// Global o'zgaruvchi sifatida eksport
window.QuizEngine = {
  startQuiz,
  goNext,
  finishQuiz,
  QuizState
};
