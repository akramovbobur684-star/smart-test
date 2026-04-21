// ============================================================
// app.js — Asosiy ilova mantig'i
// Mavzu (dark/light), localStorage va umumiy yordamchi funksiyalar
// ============================================================

'use strict';

// -------------------------------------------------------
// 1. MAVZU (THEME) BOSHQARUVI
// -------------------------------------------------------

/**
 * Joriy mavzuni localStorage'dan o'qib qaytaradi.
 * Agar saqlanmagan bo'lsa, tizim mavzusini ishlatadi.
 */
function getCurrentTheme() {
  const saved = localStorage.getItem('qm_theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Mavzuni HTML elementiga va localStorage'ga qo'llaydi.
 * @param {string} theme - 'dark' yoki 'light'
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('qm_theme', theme);

  // Toggle tugmasidagi ikonni yangilash
  const toggleBtns = document.querySelectorAll('.theme-toggle');
  toggleBtns.forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim');
  });
}

/**
 * Mavzuni almashtiradi (dark ↔ light)
 */
function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

// -------------------------------------------------------
// 2. TOAST XABARNOMASI
// -------------------------------------------------------

/**
 * Ekran pastida qisqa xabar ko'rsatadi.
 * @param {string} message - Ko'rsatiladigan matn
 * @param {'success'|'error'|'info'} type  - Tur (rang uchun)
 * @param {number} duration - Millisekundlarda vaqt (default 2500)
 */
function showToast(message, type = 'info', duration = 2500) {
  // Eski toastni o'chirish
  const old = document.querySelector('.toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(30px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// -------------------------------------------------------
// 3. NATIJALAR BOSHQARUVI (localStorage)
// -------------------------------------------------------

const STORAGE_KEYS = {
  results: 'qm_results',        // Barcha natijalar tarixi
  currentSession: 'qm_session', // Joriy sessiya
  theme: 'qm_theme',
  stats: 'qm_stats'
};

/**
 * Barcha natijalar tarixini qaytaradi.
 * @returns {Array}
 */
function getAllResults() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.results)) || [];
  } catch {
    return [];
  }
}

/**
 * Yangi natijani saqlaydi.
 * @param {Object} result - Natija ob'ekti
 */
function saveResult(result) {
  const all = getAllResults();
  all.unshift({ ...result, id: Date.now(), date: new Date().toISOString() });
  // Faqat oxirgi 50 ta natijani saqlash
  if (all.length > 50) all.splice(50);
  localStorage.setItem(STORAGE_KEYS.results, JSON.stringify(all));
}

/**
 * Joriy test sessiyasini saqlaydi.
 * @param {Object} session
 */
function saveSession(session) {
  localStorage.setItem(STORAGE_KEYS.currentSession, JSON.stringify(session));
}

/**
 * Joriy sessiyani o'qiydi.
 * @returns {Object|null}
 */
function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.currentSession));
  } catch {
    return null;
  }
}

/**
 * Joriy sessiyani o'chiradi.
 */
function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.currentSession);
}

// -------------------------------------------------------
// 4. UMUMIY YORDAMCHI FUNKSIYALAR
// -------------------------------------------------------

/**
 * Massivni tasodifiy tartibga aralashtirib qaytaradi (Fisher-Yates).
 * @param {Array} arr
 * @returns {Array}
 */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Sonni 2 xonali formatda qaytaradi (masalan: 9 → "09")
 * @param {number} n
 * @returns {string}
 */
function padTwo(n) {
  return String(n).padStart(2, '0');
}

/**
 * Sekundlarni "MM:SS" formatiga aylantiradi.
 * @param {number} seconds
 * @returns {string}
 */
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${padTwo(m)}:${padTwo(s)}`;
}

/**
 * Foizni hisoblaydi.
 * @param {number} correct
 * @param {number} total
 * @returns {number}
 */
function calcPercent(correct, total) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Natijaga qarab baho va xabar qaytaradi.
 * @param {number} percent
 * @returns {{ grade: string, message: string, emoji: string, color: string }}
 */
function getGrade(percent) {
  if (percent >= 90) return { grade: 'A+', message: 'Ajoyib natija! Siz zo\'rsiz!', emoji: '🏆', color: '#00B894' };
  if (percent >= 75) return { grade: 'A',  message: 'Zo\'r! Juda yaxshi natija!', emoji: '🌟', color: '#6C63FF' };
  if (percent >= 60) return { grade: 'B',  message: 'Yaxshi natija! Davom eting!', emoji: '👍', color: '#4ECDC4' };
  if (percent >= 45) return { grade: 'C',  message: 'O\'rtacha. Ko\'proq mashq qiling.', emoji: '📚', color: '#FDCB6E' };
  if (percent >= 30) return { grade: 'D',  message: 'Yana urinib ko\'ring!', emoji: '💪', color: '#E17055' };
  return { grade: 'F', message: 'Tayyorgarlik ko\'ring va qayta urinib ko\'ring!', emoji: '📖', color: '#FF6B6B' };
}

// -------------------------------------------------------
// 5. URL PARAMETER YORDAMCHILARI
// -------------------------------------------------------

/**
 * URL dan parametr o'qiydi.
 * @param {string} name
 * @returns {string|null}
 */
function getUrlParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// -------------------------------------------------------
// 6. DOM YUKLANGANDA ISHLATILADIGAN INIT
// -------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Mavzuni qo'llash
  applyTheme(getCurrentTheme());

  // Barcha theme-toggle tugmalariga event qo'shish
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Sahifani fade-in bilan ko'rsatish
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
});

// -------------------------------------------------------
// 7. GLOBAL EXPORT (boshqa fayllarda ishlatish uchun)
// -------------------------------------------------------
window.QuizApp = {
  getCurrentTheme,
  applyTheme,
  toggleTheme,
  showToast,
  getAllResults,
  saveResult,
  saveSession,
  loadSession,
  clearSession,
  shuffleArray,
  formatTime,
  calcPercent,
  getGrade,
  getUrlParam,
  padTwo
};
