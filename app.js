// ============================================================
// app.js - DARK MODE VA UMUMIY FUNKSIYALAR (ROOT PAPKADA)
// ============================================================

(function() {
    'use strict';

    // ========== YAGONA DARK MODE TIZIMI ==========
    function initDarkMode() {
        const savedTheme = localStorage.getItem('quiz_theme');
        const isDark = savedTheme === 'dark';
        
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Barcha dark mode tugmalarini yangilash
        const themeBtns = document.querySelectorAll('#theme-toggle-btn, #theme-btn');
        themeBtns.forEach(btn => {
            btn.innerHTML = isDark ? '☀️ Light' : '🌙 Dark';
        });
        
        return isDark;
    }

    function toggleDarkMode() {
        const isDark = document.body.classList.contains('dark-mode');
        
        if (isDark) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('quiz_theme', 'light');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('quiz_theme', 'dark');
        }
        
        // Barcha tugmalarni yangilash
        const themeBtns = document.querySelectorAll('#theme-toggle-btn, #theme-btn');
        themeBtns.forEach(btn => {
            btn.innerHTML = !isDark ? '☀️ Light' : '🌙 Dark';
        });
    }

    // ========== TOAST XABARLAR ==========
    function showToast(message, type = 'info') {
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#4f46e5' };
        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
        
        toast.style.cssText = `
            position: fixed; bottom: 30px; right: 30px; padding: 12px 24px;
            background: ${colors[type]}; color: white; border-radius: 12px;
            z-index: 10000; animation: slideIn 0.3s ease-out; font-weight: 500;
            display: flex; align-items: center; gap: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ========== ANIMATSIYALAR ==========
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .option-btn { transition: all 0.2s ease; }
        .option-btn:hover { transform: translateX(5px); border-color: var(--primary); }
        .btn-start, .next-btn, .theme-toggle { transition: all 0.2s ease; }
        .btn-start:hover, .next-btn:hover, .theme-toggle:hover { transform: translateY(-2px); filter: brightness(1.05); }
    `;
    document.head.appendChild(style);

    // ========== GLOBAL EXPORT ==========
    window.QuizApp = {
        initDarkMode,
        toggleDarkMode,
        showToast,
        formatTime: (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        },
        shuffleArray: (arr) => {
            const array = [...arr];
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        getUrlParam: (param) => {
            const params = new URLSearchParams(window.location.search);
            return params.get(param);
        }
    };

    // Sahifa yuklanganda dark mode ni qo'llash
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initDarkMode();
            // Dark mode tugmalarini ulash
            document.querySelectorAll('#theme-toggle-btn, #theme-btn').forEach(btn => {
                btn.addEventListener('click', toggleDarkMode);
            });
        });
    } else {
        initDarkMode();
        document.querySelectorAll('#theme-toggle-btn, #theme-btn').forEach(btn => {
            btn.addEventListener('click', toggleDarkMode);
        });
    }
    
    console.log("✅ app.js yuklandi - Dark Mode tayyor!");
})();
