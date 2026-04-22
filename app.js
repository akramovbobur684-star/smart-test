// Fisher-Yates shuffle algoritmi
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Quiz holati
let currentQuestions = [];
let currentIndex = 0;
let userAnswers = [];
let selectedSubject = 0;

// DOM elementlari
const subjectSelect = document.getElementById('subjectSelect');
const startBtn = document.getElementById('startBtn');
const quizContainer = document.getElementById('quizContainer');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progress = document.getElementById('progress');
const resultContainer = document.getElementById('resultContainer');
const explanationDiv = document.getElementById('explanation');

// Testni boshlash
function startTest() {
    selectedSubject = parseInt(subjectSelect.value);
    const allQuestions = window.QUIZ_DATA[selectedSubject];
    
    if (!allQuestions || allQuestions.length === 0) {
        alert(`Bu fanda savollar mavjud emas! Mavjud fanlar: ${Object.keys(window.QUIZ_DATA).join(', ')}`);
        return;
    }
    
    // Savollarni randomlashtirish (Fisher-Yates)
    currentQuestions = shuffleArray([...allQuestions]);
    currentIndex = 0;
    userAnswers = new Array(currentQuestions.length).fill(null);
    
    // Interfeysni ko'rsatish
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    startBtn.disabled = true;
    subjectSelect.disabled = true;
    
    renderQuestion();
}

// Savolni render qilish
function renderQuestion() {
    if (currentIndex >= currentQuestions.length) {
        showResults();
        return;
    }
    
    const question = currentQuestions[currentIndex];
    questionText.textContent = `${currentIndex + 1}. ${question.question}`;
    
    // Variantlarni render qilish
    optionsContainer.innerHTML = '';
    question.options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const isChecked = (userAnswers[currentIndex] === opt);
        
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        if (userAnswers[currentIndex] !== null) {
            if (opt === question.answer) {
                optionDiv.classList.add('correct');
            } else if (userAnswers[currentIndex] === opt) {
                optionDiv.classList.add('wrong');
            }
        }
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'question';
        radio.value = opt;
        radio.id = `opt_${idx}`;
        radio.checked = isChecked;
        radio.disabled = (userAnswers[currentIndex] !== null);
        radio.addEventListener('change', () => selectAnswer(opt));
        
        const label = document.createElement('label');
        label.htmlFor = `opt_${idx}`;
        label.textContent = `${letter}. ${opt}`;
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Explanation ko'rsatish
    if (userAnswers[currentIndex] !== null) {
        const isCorrect = (userAnswers[currentIndex] === question.answer);
        explanationDiv.style.display = 'block';
        explanationDiv.innerHTML = `
            <strong>${isCorrect ? '✅ TO‘G‘RI!' : '❌ NOTO‘G‘RI!'}</strong><br>
            📘 ${question.explanation}
        `;
    } else {
        explanationDiv.style.display = 'none';
    }
    
    // Progress yangilash
    progress.textContent = `${currentIndex + 1} / ${currentQuestions.length}`;
    
    // Navigation tugmalar
    prevBtn.disabled = (currentIndex === 0);
    nextBtn.textContent = (currentIndex === currentQuestions.length - 1) ? '🏁 Tugatish' : '➡ Keyingi';
}

// Javob tanlash
function selectAnswer(selectedOpt) {
    if (userAnswers[currentIndex] !== null) return;
    
    userAnswers[currentIndex] = selectedOpt;
    renderQuestion();
}

// Keyingi savol
function nextQuestion() {
    if (userAnswers[currentIndex] === null) {
        alert('⚠ Iltimos, avval javob tanlang!');
        return;
    }
    
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        showResults();
    }
}

// Oldingi savol
function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
}

// Natijalarni ko'rsatish
function showResults() {
    const total = currentQuestions.length;
    const correct = userAnswers.filter((ans, idx) => ans === currentQuestions[idx].answer).length;
    const percentage = (correct / total * 100).toFixed(1);
    
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    let grade = '';
    if (percentage >= 90) grade = '🏆 A'lo darajada!';
    else if (percentage >= 75) grade = '📚 Yaxshi!';
    else if (percentage >= 60) grade = '⚠ Qoniqarli';
    else grade = '❌ Qayta tayyorlanish kerak';
    
    let resultHTML = `
        <div style="text-align: center;">
            <h2>📊 Test natijalari</h2>
            <p style="font-size: 1.2em;">To‘g‘ri javoblar: <strong style="color: green;">${correct}</strong> / ${total}</p>
            <p style="font-size: 1.2em;">Foiz: <strong>${percentage}%</strong></p>
            <p style="font-size: 1.1em;">${grade}</p>
            <button onclick="resetTest()" style="margin: 20px 0;">🔄 Yangi test boshlash</button>
        </div>
        <div class="result-details">
            <h4>📖 Batafsil tahlil:</h4>
            <ol>
    `;
    
    currentQuestions.forEach((q, idx) => {
        const userAns = userAnswers[idx];
        const isCorrect = (userAns === q.answer);
        resultHTML += `
            <li style="margin-bottom: 15px; padding: 10px; background: ${isCorrect ? '#e8f5e9' : '#ffebee'}; border-radius: 8px;">
                <strong>${idx + 1}. ${q.question}</strong><br>
                🎯 Sizning javob: ${userAns || 'Tanlanmagan'} ${isCorrect ? '✅' : '❌'}<br>
                ✅ To‘g‘ri javob: ${q.answer}<br>
                📘 <em>Izoh: ${q.explanation}</em>
            </li>
        `;
    });
    
    resultHTML += `</ol></div>`;
    resultContainer.innerHTML = resultHTML;
}

// Testni reset qilish
function resetTest() {
    location.reload();
}

// Event listenerlar
startBtn.addEventListener('click', startTest);
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
