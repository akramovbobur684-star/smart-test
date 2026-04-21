// ============================================================
// app.js — Asosiy ilova mantig'i (Kengaytirilgan Versiya)
// Mavzu (dark/light), localStorage, Toast va Loader funksiyalari
// ============================================================

'use strict';

// -------------------------------------------------------
// 1. MAVZU (THEME) BOSHQARUVI
// -------------------------------------------------------

/**
 * Joriy mavzuni localStorage'dan o'qib qaytaradi.
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
    document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
    localStorage.setItem('qm_theme', theme);

    // Toggle tugmasidagi ikonni yangilash
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    toggleBtns.forEach(btn => {
        if (btn) {
            btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
            btn.setAttribute('aria-label', theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim');
        }
    });
}

/**
 * Mavzuni almashtiradi (dark ↔ light)
 */
function toggleTheme() {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(`Mavzu o'zgardi: ${next === 'dark' ? 'Tungi' : 'Kunduzgi'}`);
}

// -------------------------------------------------------
// 2. TOAST VA LOADER XABARNOMASI
// -------------------------------------------------------

/**
 * Ekran burchagida chiroyli xabar ko'rsatadi.
 */
function showToast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} animate-slideIn`;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || '🔔'}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // O'chirish animatsiyasi
    setTimeout(() => {
        toast.classList.add('animate-fadeOut');
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

/**
 * Sahifa yuklanayotganini ko'rsatish uchun loader
 */
function toggleLoader(show = true) {
    let loader = document.getElementById('app-loader');
    if (show) {
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'app-loader';
            loader.innerHTML = '<div class="spinner"></div>';
            document.body.appendChild(loader);
        }
        loader.style.display = 'flex';
    } else if (loader) {
        loader.style.display = 'none';
    }
}

// -------------------------------------------------------
// 3. NATIJALAR BOSHQARUVI (localStorage)
// -------------------------------------------------------

const STORAGE_KEYS = {
    results: 'qm_results',
    currentSession: 'qm_session',
    theme: 'qm_theme',
    user: 'qm_user_profile'
};

/**
 * Barcha natijalar tarixini qaytaradi va saralaydi.
 */
function getAllResults() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.results);
        const results = data ? JSON.parse(data) : [];
        return results.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (e) {
        console.error("Natijalarni yuklashda xato:", e);
        return [];
    }
}

/**
 * Yangi natijani saqlaydi va eskilarni tozalaydi.
 */
function saveResult(result) {
    const all = getAllResults();
    const newEntry = {
        ...result,
        id: 'res_' + Date.now(),
        date: new Date().toISOString()
    };
    
    all.unshift(newEntry);
    
    // Faqat oxirgi 50 ta natijani saqlash (xotirani to'ldirmaslik uchun)
    if (all.length > 50) all.pop();
    
    localStorage.setItem(STORAGE_KEYS.results, JSON.stringify(all));
    return newEntry;
}

function saveSession(session) {
    localStorage.setItem(STORAGE_KEYS.currentSession, JSON.stringify(session));
}

function loadSession() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.currentSession));
    } catch { return null; }
}

function clearSession() {
    localStorage.removeItem(STORAGE_KEYS.currentSession);
}

// -------------------------------------------------------
// 4. UMUMIY YORDAMCHI FUNKSIYALAR
// -------------------------------------------------------

/**
 * Massivni tasodifiy tartibga aralashtirish (Fisher-Yates algoritmi)
 */
function shuffleArray(arr) {
    if (!Array.isArray(arr)) return [];
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function calcPercent(correct, total) {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
}

/**
 * Natijaga qarab kengaytirilgan ma'lumotlar qaytaradi.
 */
function getGrade(percent) {
    const data = [
        { min: 90, grade: 'A+', msg: 'Siz koinot darajasidagi dahosiz!', emoji: '👑', color: '#00B894' },
        { min: 75, grade: 'A',  msg: 'Juda yaxshi! Mukammallikka bir qadam!', emoji: '🌟', color: '#6C63FF' },
        { min: 60, grade: 'B',  msg: 'Yaxshi, lekin yanada yaxshiroq bo\'lishi mumkin!', emoji: '💪', color: '#4ECDC4' },
        { min: 45, grade: 'C',  msg: 'O\'rtacha natija, ko\'proq mutolaa qiling.', emoji: '📖', color: '#FDCB6E' },
        { min: 0,  grade: 'F',  msg: 'Xafa bo\'lmang, qaytadan urinib ko'ring!', emoji: '🎯', color: '#FF6B6B' }
    ];
    return data.find(d => percent >= d.min);
}

// -------------------------------------------------------
// 5. URL VA DOM BOSHQARUVI
// -------------------------------------------------------

function getUrlParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

// Sahifa yuklanganda bajariladigan ishlar
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mavzuni o'rnatish
    applyTheme(getCurrentTheme());

    // 2. Eventlarni bog'lash
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    // 3. Kirish animatsiyasi
    document.body.classList.add('page-loaded');
    
    console.log("QuizMaster Pro App initialized...");
});

// -------------------------------------------------------
// 6. GLOBAL EXPORT
// -------------------------------------------------------
window.QuizApp = {
    getCurrentTheme,
    applyTheme,
    toggleTheme,
    showToast,
    toggleLoader,
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
    STORAGE_KEYS
};
