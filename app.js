// ======================== USER STORAGE ========================
let currentUser = null;
let userStats = {};

// ======================== FISHER-YATES SHUFFLE ========================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ======================== QUIZ STATE ========================
let currentQuestions = [];
let currentIndex = 0;
let userAnswers = [];
let selectedSubjectId = null;
let selectedSubjectName = '';
let quizStartTime = null;

// ======================== DOM ELEMENTS ========================
const nameOverlay = document.getElementById('nameOverlay');
const nameInput = document.getElementById('nameInput');
const nameSubmit = document.getElementById('nameSubmit');
const greetingBadge = document.getElementById('greetingBadge');
const greetingText = document.getElementById('greetingText');
const avatarInitial = document.getElementById('avatarInitial');
const statsRow = document.getElementById('statsRow');
const lastVisitBar = document.getElementById('lastVisitBar');
const lastVisitText = document.getElementById('lastVisitText');
const cardsGrid = document.getElementById('cardsGrid');

// ======================== USER INITIALIZATION ========================
function initUser() {
    const stored = localStorage.getItem('quizarena_user');
    if (stored) {
        try {
            const data = JSON.parse(stored);
            currentUser = data.name;
            userStats = data.stats || {
                totalTests: 0,
                totalCorrect: 0,
                totalQuestions: 0,
                lastVisit: new Date().toISOString(),
                subjectProgress: {}
            };
            updateUIForUser();
            nameOverlay.classList.remove('active');
            loadSubjects();
        } catch(e) {
            showNamePrompt();
        }
    } else {
        showNamePrompt();
    }
}

function showNamePrompt() {
    nameOverlay.classList.add('active');
    nameInput.focus();
}

nameSubmit.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name.length === 0) {
        nameInput.placeholder = "Iltimos ismingizni kiriting!";
        nameInput.style.borderColor = "var(--danger)";
        return;
    }
    if (name.length > 30) {
        nameInput.value = name.slice(0, 30);
    }
    currentUser = nameInput.value.trim();
    userStats = {
        totalTests: 0,
        totalCorrect: 0,
        totalQuestions: 0,
        lastVisit: new Date().toISOString(),
        subjectProgress: {}
    };
    saveUser();
    updateUIForUser();
    nameOverlay.classList.remove('active');
    loadSubjects();
});

function saveUser() {
    localStorage.setItem('quizarena_user', JSON.stringify({
        name: currentUser,
        stats: userStats
    }));
}

function updateUIForUser() {
    if (currentUser) {
        greetingBadge.style.display = 'flex';
        const initial = currentUser.charAt(0).toUpperCase();
        avatarInitial.textContent = initial;
        const hour = new Date().getHours();
        let timeGreet = '';
        if (hour < 12) timeGreet = 'Xayrli tong';
        else if (hour < 18) timeGreet = 'Xayrli kun';
        else timeGreet = 'Xayrli kech';
        greetingText.textContent = `${timeGreet}, ${currentUser}`;
        
        // Update stats row
        const totalTests = userStats.totalTests || 0;
        const totalCorrect = userStats.totalCorrect || 0;
        const totalQuestions = userStats.totalQuestions || 0;
        const accuracy = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : 0;
        
        statsRow.innerHTML = `
            <div class="stat-chip"><span class="num">${totalTests}</span><span class="label">Testlar</span></div>
            <div class="stat-chip"><span class="num">${totalCorrect}</span><span class="label">To‘g‘ri</span></div>
            <div class="stat-chip"><span class="num">${accuracy}%</span><span class="label">Aniqlik</span></div>
        `;
        
        // Last visit
        if (userStats.lastVisit) {
            const lastDate = new Date(userStats.lastVisit);
            const formatted = lastDate.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
            lastVisitText.innerHTML = `Oxirgi tashrif: <strong>${formatted}</strong>`;
            lastVisitBar.style.display = 'flex';
        }
    }
}

// ======================== LOAD SUBJECTS ========================
function loadSubjects() {
    if (!window.QUIZ_DATA) {
        cardsGrid.innerHTML = '<div style="color:var(--danger); text-align:center;">❌ Savollar bazasi topilmadi! questions.js faylini tekshiring.</div>';
        return;
    }
    
    const subjects = {
        0: { name: "📐 Matematika", icon: "📐", desc: "Logarifm, hosila, integral, stereometriya" },
        1: { name: "⚡ Fizika", icon: "⚡", desc: "Magnetizm, elektrodinamika, optika" },
        2: { name: "💻 Dasturlash", icon: "💻", desc: "C++, Python, algoritmlar (TATU 1-kurs)" },
        3: { name: "📜 Tarix", icon: "📜", desc: "O‘zbekiston va jahon tarixi (11-sinf)" },
        4: { name: "🇬🇧 Ingliz tili", icon: "🇬🇧", desc: "Harbiy-texnik terminologiya + grammatika" }
    };
    
    let cardsHtml = '';
    for (let i = 0; i <= 4; i++) {
        const subject = subjects[i];
        if (!subject) continue;
        const questionCount = window.QUIZ_DATA[i] ? window.QUIZ_DATA[i].length : 0;
        const progress = userStats.subjectProgress[i] || { completed: 0, bestScore: 0 };
        const bestPercent = progress.bestScore || 0;
        
        cardsHtml += `
            <div class="subject-card" data-subject-id="${i}">
                <span class="card-icon">${subject.icon}</span>
                <div class="card-name">${subject.name}</div>
                <div class="card-meta">
                    <span>📋 ${questionCount} savol</span>
                    <span class="dot"></span>
                    <span>🏆 Eng yaxshi: ${bestPercent}%</span>
                </div>
                <div class="card-badge">
                    ${progress.completed ? `✅ ${progress.completed} marta bajarilgan` : '✨ Yangi test'}
                </div>
                <div class="card-arrow">→</div>
            </div>
        `;
    }
    cardsGrid.innerHTML = cardsHtml;
    
    // Add click handlers
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', () => {
            const subjectId = parseInt(card.dataset.subjectId);
            startQuiz(subjectId, subjects[subjectId].name);
        });
    });
}

// ======================== QUIZ START ========================
function startQuiz(subjectId, subjectName) {
    const questions = window.QUIZ_DATA[subjectId];
    if (!questions || questions.length === 0) {
        alert('❌ Bu fanda hozircha savollar mavjud emas!');
        return;
    }
    
    selectedSubjectId = subjectId;
    selectedSubjectName = subjectName;
    currentQuestions = shuffleArray([...questions]);
    currentIndex = 0;
    userAnswers = new Array(currentQuestions.length).fill(null);
    quizStartTime = Date.now();
    
    // Create quiz interface dynamically
    createQuizInterface();
}

function createQuizInterface() {
    // Remove existing quiz if any
    const existingQuiz = document.getElementById('quizContainer');
    if (existingQuiz) existingQuiz.remove();
    
    const quizHTML = `
        <div id="quizContainer" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: var(--bg); z-index: 200; overflow-y: auto; padding: 20px;">
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                    <button id="closeQuizBtn" style="background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 10px 20px; border-radius: 40px; cursor: pointer; font-family: inherit;">← Chiqish</button>
                    <div style="display: flex; gap: 12px;">
                        <div style="background: var(--surface); padding: 8px 16px; border-radius: 40px;">
                            ${selectedSubjectName}
                        </div>
                        <div style="background: var(--surface); padding: 8px 16px; border-radius: 40px;" id="quizProgress">
                                1 / ${currentQuestions.length}
                        </div>
                    </div>
                </div>
                
                <div style="background: var(--surface); border-radius: 24px; padding: 32px; border: 1px solid var(--border);">
                    <div id="quizQuestion" style="font-size: 1.3rem; font-weight: 600; margin-bottom: 28px; line-height: 1.4;"></div>
                    <div id="quizOptions" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;"></div>
                    <div id="quizExplanation" style="display: none; background: rgba(56,189,248,0.08); border-left: 3px solid var(--accent); padding: 16px; border-radius: 12px; margin-bottom: 24px;"></div>
                    <div style="display: flex; justify-content: space-between; gap: 16px;">
                        <button id="prevQuizBtn" style="background: var(--surface2); border: none; color: var(--text); padding: 14px 24px; border-radius: 12px; cursor: pointer; font-weight: 600;">◀ Oldingi</button>
                        <button id="nextQuizBtn" style="background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; color: #0f172a; padding: 14px 32px; border-radius: 12px; cursor: pointer; font-weight: 700;">Keyingi ▶</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', quizHTML);
    document.body.style.overflow = 'hidden';
    
    renderQuizQuestion();
    
    // Event listeners
    document.getElementById('closeQuizBtn').addEventListener('click', () => {
        document.getElementById('quizContainer').remove();
        document.body.style.overflow = '';
        updateUIForUser();
        loadSubjects();
    });
    
    document.getElementById('prevQuizBtn').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuizQuestion();
        }
    });
    
    document.getElementById('nextQuizBtn').addEventListener('click', () => {
        if (userAnswers[currentIndex] === null) {
            alert('⚠ Iltimos, avval javob tanlang!');
            return;
        }
        if (currentIndex < currentQuestions.length - 1) {
            currentIndex++;
            renderQuizQuestion();
        } else {
            finishQuiz();
        }
    });
}

function renderQuizQuestion() {
    const question = currentQuestions[currentIndex];
    const questionEl = document.getElementById('quizQuestion');
    const optionsEl = document.getElementById('quizOptions');
    const explanationEl = document.getElementById('quizExplanation');
    const progressEl = document.getElementById('quizProgress');
    
    questionEl.textContent = `${currentIndex + 1}. ${question.question}`;
    progressEl.textContent = `${currentIndex + 1} / ${currentQuestions.length}`;
    
    // Render options
    optionsEl.innerHTML = '';
    question.options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const isChecked = (userAnswers[currentIndex] === opt);
        const isAnswered = (userAnswers[currentIndex] !== null);
        const isCorrect = (opt === question.answer);
        const isUserWrong = (userAnswers[currentIndex] === opt && userAnswers[currentIndex] !== question.answer);
        
        let bgColor = 'var(--surface2)';
        if (isAnswered && isCorrect) bgColor = 'rgba(52,211,153,0.15)';
        if (isAnswered && isUserWrong) bgColor = 'rgba(248,113,113,0.15)';
        
        const optionDiv = document.createElement('div');
        optionDiv.style.cssText = `
            background: ${bgColor};
            border: 1px solid ${isAnswered && isCorrect ? 'var(--accent3)' : 'var(--border)'};
            border-radius: 14px;
            padding: 14px 18px;
            cursor: ${isAnswered ? 'default' : 'pointer'};
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quizOption';
        radio.value = opt;
        radio.checked = isChecked;
        radio.disabled = isAnswered;
        radio.style.width = '18px';
        radio.style.height = '18px';
        radio.style.cursor = isAnswered ? 'default' : 'pointer';
        if (!isAnswered) {
            radio.addEventListener('change', () => selectQuizAnswer(opt));
        }
        
        const label = document.createElement('label');
        label.textContent = `${letter}. ${opt}`;
        label.style.cssText = `
            flex: 1;
            cursor: ${isAnswered ? 'default' : 'pointer'};
            font-size: 0.95rem;
            line-height: 1.4;
        `;
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        optionsEl.appendChild(optionDiv);
    });
    
    // Show explanation if answered
    if (userAnswers[currentIndex] !== null) {
        const isCorrect = (userAnswers[currentIndex] === question.answer);
        explanationEl.style.display = 'block';
        explanationEl.innerHTML = `
            <strong style="color: ${isCorrect ? 'var(--accent3)' : 'var(--danger)'}">
                ${isCorrect ? '✅ To‘g‘ri!' : '❌ Noto‘g‘ri!'}
            </strong><br>
            📘 ${question.explanation}
        `;
    } else {
        explanationEl.style.display = 'none';
    }
    
    // Update prev button state
    const prevBtn = document.getElementById('prevQuizBtn');
    prevBtn.disabled = (currentIndex === 0);
    prevBtn.style.opacity = (currentIndex === 0) ? '0.5' : '1';
    
    // Update next button text
    const nextBtn = document.getElementById('nextQuizBtn');
    if (currentIndex === currentQuestions.length - 1) {
        nextBtn.textContent = '🏁 Tugatish';
    } else {
        nextBtn.textContent = 'Keyingi ▶';
    }
}

function selectQuizAnswer(selectedOpt) {
    if (userAnswers[currentIndex] !== null) return;
    userAnswers[currentIndex] = selectedOpt;
    renderQuizQuestion();
}

function finishQuiz() {
    // Calculate results
    const total = currentQuestions.length;
    const correct = userAnswers.filter((ans, idx) => ans === currentQuestions[idx].answer).length;
    const percentage = (correct / total * 100).toFixed(1);
    const timeSpent = Math.round((Date.now() - quizStartTime) / 1000);
    
    // Update user stats
    userStats.totalTests = (userStats.totalTests || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + correct;
    userStats.totalQuestions = (userStats.totalQuestions || 0) + total;
    userStats.lastVisit = new Date().toISOString();
    
    if (!userStats.subjectProgress[selectedSubjectId]) {
        userStats.subjectProgress[selectedSubjectId] = { completed: 0, bestScore: 0 };
    }
    userStats.subjectProgress[selectedSubjectId].completed += 1;
    if (percentage > (userStats.subjectProgress[selectedSubjectId].bestScore || 0)) {
        userStats.subjectProgress[selectedSubjectId].bestScore = parseFloat(percentage);
    }
    
    saveUser();
    
    // Show results modal
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
            <div style="background: var(--surface); border-radius: 24px; padding: 40px; border: 1px solid var(--border); text-align: center;">
                <div style="font-size: 64px; margin-bottom: 20px;">${percentage >= 70 ? '🏆' : (percentage >= 50 ? '📚' : '💪')}</div>
                <h2 style="font-family: 'Syne', sans-serif; font-size: 2rem; margin-bottom: 12px;">Test yakunlandi!</h2>
                <p style="color: var(--muted); margin-bottom: 32px;">${selectedSubjectName} · ${timeSpent} soniya</p>
                
                <div style="display: flex; justify-content: center; gap: 32px; margin-bottom: 32px; flex-wrap: wrap;">
                    <div><span style="font-size: 2rem; font-weight: 800; color: var(--accent3);">${correct}</span><br><span style="color: var(--muted);">To‘g‘ri</span></div>
                    <div><span style="font-size: 2rem; font-weight: 800; color: var(--danger);">${total - correct}</span><br><span style="color: var(--muted);">Noto‘g‘ri</span></div>
                    <div><span style="font-size: 2rem; font-weight: 800; color: var(--accent);">${percentage}%</span><br><span style="color: var(--muted);">Natija</span></div>
                </div>
                
                <div style="max-height: 400px; overflow-y: auto; text-align: left; margin-bottom: 24px; padding: 16px; background: var(--surface2); border-radius: 16px;">
                    <h4 style="margin-bottom: 16px;">📋 Batafsil tahlil:</h4>
                    ${currentQuestions.map((q, idx) => {
                        const isCorrect = (userAnswers[idx] === q.answer);
                        return `
                            <div style="margin-bottom: 16px; padding: 12px; background: var(--surface); border-radius: 12px; border-left: 3px solid ${isCorrect ? 'var(--accent3)' : 'var(--danger)'};">
                                <strong style="display: block; margin-bottom: 6px;">${idx + 1}. ${q.question}</strong>
                                <div style="font-size: 0.85rem;">Siz: ${userAnswers[idx] || 'Tanlanmagan'} ${isCorrect ? '✅' : '❌'}</div>
                                <div style="font-size: 0.85rem; color: var(--accent3);">To‘g‘ri: ${q.answer}</div>
                                <div style="font-size: 0.8rem; color: var(--muted); margin-top: 6px;">📘 ${q.explanation}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <button id="closeResultsBtn" style="background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; color: #0f172a; padding: 14px 32px; border-radius: 12px; cursor: pointer; font-weight: 700; width: 100%;">Bosh sahifaga qaytish</button>
            </div>
        </div>
    `;
    
    document.getElementById('closeResultsBtn').addEventListener('click', () => {
        quizContainer.remove();
        document.body.style.overflow = '';
        updateUIForUser();
        loadSubjects();
    });
}

// ======================== INIT ========================
initUser();
