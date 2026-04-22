document.addEventListener('DOMContentLoaded', () => {
  const TIMER_DURATION = 15
  const LETTERS = ['A', 'B', 'C', 'D']
  const RESULT_MESSAGES = [
    { min: 0,   max: 30,  emoji: '😔', msg: 'Tushkunlikka tushmang, keyingi safar yaxshiroq bo\'lasiz!' },
    { min: 31,  max: 50,  emoji: '🤔', msg: 'Yaxshi urinish! Ko\'proq mashq qiling.' },
    { min: 51,  max: 70,  emoji: '👍', msg: 'Yaxshi natija! Bilimingiz o\'sib bormoqda.' },
    { min: 71,  max: 89,  emoji: '🎉', msg: 'Ajoyib! Siz juda yaxshi ekanligingizni isbotladingiz!' },
    { min: 90,  max: 100, emoji: '🏆', msg: 'Mukammal natija! Siz haqiqiy bilimdon ekansiz!' }
  ]

  const app = document.getElementById('quizApp')

  let subjectData = null
  let questions = []
  let currentIndex = 0
  let score = 0
  let timerInterval = null
  let timeLeft = TIMER_DURATION
  let answered = false

  function getSubjectIdFromURL() {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get('subject')
    if (raw === null) return null
    const num = parseInt(raw, 10)
    if (isNaN(num)) return null
    return num
  }

  function shuffleArray(arr) {
    const copy = [...arr]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = copy[i]
      copy[i] = copy[j]
      copy[j] = temp
    }
    return copy
  }

  function renderError(title, message) {
    app.innerHTML = `
      <div class="error-state">
        <div class="icon">❌</div>
        <h2>${title}</h2>
        <p>${message}</p>
        <a href="index.html" class="btn-outline">← Bosh sahifaga qaytish</a>
      </div>
    `
  }

  function getResultInfo(percent) {
    return RESULT_MESSAGES.find(r => percent >= r.min && percent <= r.max) || RESULT_MESSAGES[0]
  }

  function buildQuizLayout() {
    app.innerHTML = `
      <div class="quiz-header">
        <div class="quiz-top-row">
          <div class="subject-pill">📚 ${subjectData.name}</div>
          <div class="timer-container">
            <div class="timer-ring" id="timerRing">
              <svg width="48" height="48" viewBox="0 0 48 48">
                <circle class="bg-circle" cx="24" cy="24" r="20" fill="none" stroke-width="4"/>
                <circle class="progress-circle" id="timerCircle" cx="24" cy="24" r="20" fill="none" stroke-width="4" stroke-linecap="round"/>
              </svg>
              <div class="timer-text" id="timerText">${TIMER_DURATION}</div>
            </div>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" id="progressFill" style="width: 0%"></div>
        </div>
        <div class="progress-labels">
          <span id="progressLabel">1 / ${questions.length}</span>
          <span id="scoreLabel">Ball: 0</span>
        </div>
      </div>

      <div id="questionArea"></div>
      <div class="timeout-overlay" id="timeoutOverlay">
        <div class="big-icon">⏰</div>
        <h2>Vaqt tugadi!</h2>
        <p>Afsuski, bu savol uchun vaqtingiz tugadi.</p>
        <button class="btn-restart" id="restartBtn">🔄 Qayta boshlash</button>
      </div>
      <div class="result-screen" id="resultScreen"></div>
    `
  }

  function updateProgress() {
    const percent = (currentIndex / questions.length) * 100
    document.getElementById('progressFill').style.width = `${percent}%`
    document.getElementById('progressLabel').textContent = `${currentIndex + 1} / ${questions.length}`
    document.getElementById('scoreLabel').textContent = `Ball: ${score}`
  }

  function updateTimerUI(time) {
    const circle = document.getElementById('timerCircle')
    const text = document.getElementById('timerText')
    const circumference = 126

    if (!circle || !text) return

    const offset = circumference - (time / TIMER_DURATION) * circumference
    circle.style.strokeDashoffset = offset
    text.textContent = time

    if (time <= 5) {
      circle.style.stroke = 'var(--danger)'
      text.style.color = 'var(--danger)'
    } else if (time <= 10) {
      circle.style.stroke = '#fbbf24'
      text.style.color = '#fbbf24'
    } else {
      circle.style.stroke = 'var(--accent)'
      text.style.color = 'var(--text)'
    }
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  function startTimer() {
    stopTimer()
    timeLeft = TIMER_DURATION
    updateTimerUI(timeLeft)

    timerInterval = setInterval(() => {
      timeLeft--
      updateTimerUI(timeLeft)

      if (timeLeft <= 0) {
        stopTimer()
        handleTimeout()
      }
    }, 1000)
  }

  function handleTimeout() {
    stopTimer()
    const questionArea = document.getElementById('questionArea')
    const timeoutOverlay = document.getElementById('timeoutOverlay')
    const restartBtn = document.getElementById('restartBtn')

    if (questionArea) questionArea.style.display = 'none'
    if (timeoutOverlay) {
      timeoutOverlay.classList.add('active')
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', restartQuiz)
    }
  }

  function renderQuestion() {
    const questionArea = document.getElementById('questionArea')
    if (!questionArea) return

    questionArea.style.display = 'block'
    answered = false

    const q = questions[currentIndex]
    updateProgress()

    questionArea.innerHTML = `
      <div class="question-card">
        <div class="question-number">Savol ${currentIndex + 1}</div>
        <div class="question-text">${q.question}</div>
      </div>
      <div class="options-grid" id="optionsGrid">
        ${q.options.map((opt, i) => `
          <button class="option-btn" data-index="${i}">
            <span class="option-letter">${LETTERS[i]}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
    `

    const optionsGrid = document.getElementById('optionsGrid')
    if (optionsGrid) {
      optionsGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.option-btn')
        if (!btn || answered) return
        handleAnswer(parseInt(btn.dataset.index, 10))
      })
    }

    startTimer()
  }

  function handleAnswer(selectedIndex) {
    if (answered) return
    answered = true
    stopTimer()

    const q = questions[currentIndex]
    const buttons = document.querySelectorAll('.option-btn')

    buttons.forEach(btn => {
      btn.disabled = true
    })

    const correctIndex = q.answer
    const selectedBtn = buttons[selectedIndex]
    const correctBtn = buttons[correctIndex]

    if (selectedIndex === correctIndex) {
      selectedBtn.classList.add('correct')
      score++
      document.getElementById('scoreLabel').textContent = `Ball: ${score}`
    } else {
      selectedBtn.classList.add('wrong')
      correctBtn.classList.add('correct')
    }

    setTimeout(() => {
      currentIndex++
      if (currentIndex < questions.length) {
        renderQuestion()
      } else {
        showResult()
      }
    }, 900)
  }

  function showResult() {
    stopTimer()

    const questionArea = document.getElementById('questionArea')
    const quizHeader = document.querySelector('.quiz-header')
    const resultScreen = document.getElementById('resultScreen')

    if (questionArea) questionArea.style.display = 'none'
    if (quizHeader) quizHeader.style.display = 'none'

    const percent = Math.round((score / questions.length) * 100)
    const info = getResultInfo(percent)

    resultScreen.innerHTML = `
      <div class="result-card">
        <span class="result-emoji">${info.emoji}</span>
        <h2>Natijangiz</h2>
        <div class="score-display">
          <div class="score-fraction">${score}/${questions.length}</div>
          <div class="score-label">To'g'ri javoblar</div>
          <div class="score-bar-wrap">
            <div class="score-bar-track">
              <div class="score-bar-fill" id="scoreBarFill" style="width: 0%"></div>
            </div>
          </div>
        </div>
        <p class="result-message">${info.msg}</p>
        <div class="result-buttons">
          <a href="index.html" class="btn-home">🏠 Bosh sahifa</a>
          <button class="btn-restart" id="restartFromResult">🔄 Qayta boshlash</button>
        </div>
      </div>
    `

    resultScreen.classList.add('active')

    setTimeout(() => {
      const fill = document.getElementById('scoreBarFill')
      if (fill) fill.style.width = `${percent}%`
    }, 100)

    const restartBtn = document.getElementById('restartFromResult')
    if (restartBtn) {
      restartBtn.addEventListener('click', restartQuiz)
    }
  }

  function restartQuiz() {
    currentIndex = 0
    score = 0
    answered = false
    questions = shuffleArray(subjectData.questions)
    buildQuizLayout()

    const timeoutOverlay = document.getElementById('timeoutOverlay')
    const restartBtn = document.getElementById('restartBtn')

    if (timeoutOverlay) {
      timeoutOverlay.classList.remove('active')
    }
    if (restartBtn) {
      restartBtn.addEventListener('click', restartQuiz)
    }

    renderQuestion()
  }

  function startQuiz() {
    buildQuizLayout()
    renderQuestion()
  }

  function init() {
    if (!window.QUIZ_DATA || !Array.isArray(window.QUIZ_DATA)) {
      renderError('Ma\'lumot topilmadi', 'Quiz ma\'lumotlari yuklanmadi. Sahifani yangilang.')
      return
    }

    const subjectId = getSubjectIdFromURL()

    if (subjectId === null) {
      renderError('Mavzu ko\'rsatilmagan', 'URL da mavzu ID si topilmadi.')
      return
    }

    const found = window.QUIZ_DATA.find(s => s.id === subjectId)

    if (!found) {
      renderError('Mavzu topilmadi', `ID: ${subjectId} mavzu mavjud emas.`)
      return
    }

    if (!Array.isArray(found.questions) || found.questions.length === 0) {
      renderError('Savollar yo\'q', 'Bu mavzuda savollar mavjud emas.')
      return
    }

    subjectData = found
    questions = shuffleArray(subjectData.questions)

    startQuiz()
  }

  init()
})
