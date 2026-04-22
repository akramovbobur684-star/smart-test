const STORAGE_KEYS = {
  userName: 'quizarena_user_name',
  visitHistory: 'quizarena_visit_history'
}

const SUBJECT_ICONS = ['🧮', '🔬', '📚', '🌍', '💻', '🎨', '⚗️', '🏛️', '🧬', '📐']

const SUBJECT_COLORS = [
  'rgba(56,189,248,0.12)',
  'rgba(129,140,248,0.12)',
  'rgba(52,211,153,0.12)',
  'rgba(251,146,60,0.12)',
  'rgba(244,114,182,0.12)'
]

function getUserName() {
  return localStorage.getItem(STORAGE_KEYS.userName)
}

function setUserName(name) {
  localStorage.setItem(STORAGE_KEYS.userName, name.trim())
}

function getVisitHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.visitHistory)) || []
  } catch {
    return []
  }
}

function recordVisit() {
  const history = getVisitHistory()
  const now = new Date().toISOString()
  history.push(now)
  if (history.length > 20) {
    history.splice(0, history.length - 20)
  }
  localStorage.setItem(STORAGE_KEYS.visitHistory, JSON.stringify(history))
}

function getLastVisit() {
  const history = getVisitHistory()
  if (history.length < 2) return null
  return new Date(history[history.length - 2])
}

function formatDate(date) {
  const now = new Date()
  const diff = now - date
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (mins < 1) return 'Hozirgina'
  if (mins < 60) return `${mins} daqiqa oldin`
  if (hours < 24) return `${hours} soat oldin`
  if (days === 1) return 'Kecha'
  if (days < 7) return `${days} kun oldin`
  return date.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long' })
}

function getInitial(name) {
  return name.trim().charAt(0).toUpperCase()
}

function showNameModal() {
  const overlay = document.getElementById('nameOverlay')
  const input = document.getElementById('nameInput')
  const btn = document.getElementById('nameSubmit')

  overlay.classList.add('active')
  setTimeout(() => input.focus(), 300)

  function submit() {
    const val = input.value.trim()
    if (!val) {
      input.style.borderColor = 'var(--danger)'
      input.style.animation = 'none'
      setTimeout(() => {
        input.style.borderColor = ''
      }, 600)
      return
    }
    setUserName(val)
    overlay.classList.remove('active')
    initGreeting(val)
    recordVisit()
  }

  btn.addEventListener('click', submit)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submit()
  })
}

function initGreeting(name) {
  const badge = document.getElementById('greetingBadge')
  const text = document.getElementById('greetingText')
  const avatar = document.getElementById('avatarInitial')

  badge.style.display = 'flex'
  text.textContent = `Salom, ${name}`
  avatar.textContent = getInitial(name)
}

function renderLastVisit() {
  const last = getLastVisit()
  if (!last) return

  const bar = document.getElementById('lastVisitBar')
  const txt = document.getElementById('lastVisitText')

  bar.style.display = 'flex'
  txt.innerHTML = `Oxirgi tashrif: <strong>${formatDate(last)}</strong> — Jami tashriflar: <strong>${getVisitHistory().length}</strong> marta`
}

function renderStats() {
  const data = window.QUIZ_DATA
  const row = document.getElementById('statsRow')

  const totalQuestions = data.reduce((acc, s) => acc + s.questions.length, 0)

  const stats = [
    { num: data.length, label: 'Mavzu' },
    { num: totalQuestions, label: 'Savollar' },
    { num: '15s', label: 'Vaqt/Savol' }
  ]

  row.innerHTML = stats.map(s => `
    <div class="stat-chip">
      <span class="num">${s.num}</span>
      <span class="label">${s.label}</span>
    </div>
  `).join('')
}

function renderCards() {
  const data = window.QUIZ_DATA
  const grid = document.getElementById('cardsGrid')

  grid.innerHTML = data.map((subject, i) => {
    const icon = SUBJECT_ICONS[i % SUBJECT_ICONS.length]
    const color = SUBJECT_COLORS[i % SUBJECT_COLORS.length]

    return `
      <a class="subject-card" href="quiz.html?subject=${subject.id}" style="--card-color: ${color}">
        <div class="card-arrow">→</div>
        <span class="card-icon">${icon}</span>
        <div class="card-name">${subject.name}</div>
        <div class="card-meta">
          <span>${subject.questions.length} ta savol</span>
          <span class="dot"></span>
          <span>15s / savol</span>
        </div>
        <div class="card-badge">▶ Boshlash</div>
      </a>
    `
  }).join('')
}

function init() {
  if (!window.QUIZ_DATA || !Array.isArray(window.QUIZ_DATA)) {
    console.error('QUIZ_DATA topilmadi')
    return
  }

  const name = getUserName()

  if (!name) {
    showNameModal()
  } else {
    initGreeting(name)
    recordVisit()
    renderLastVisit()
  }

  renderStats()
  renderCards()
}

document.addEventListener('DOMContentLoaded', init)
