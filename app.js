/**
 * ============================================================
 * QuizMaster Pro — Core Application v3.0
 * UI, Dark Mode, Toast, Loader va umumiy funksiyalar
 * ============================================================
 */

(function() {
    'use strict';

    // -------------------------------------------------------
    // 1. APP KONFIGURATSIYASI
    // -------------------------------------------------------
    const AppConfig = {
        storageKey: 'qm_results',
        themeKey: 'quiz_theme',
        defaultTheme: 'light'
    };

    // -------------------------------------------------------
    // 2. TOAST XABARLAR
    // -------------------------------------------------------
    function showToast(message, type = 'info') {
        // Mavjud toastni o'chirish
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        // Ranglar
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#4f46e5'
        };
        
        toast.style.backgroundColor = colors[type] || colors.info;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span style="margin-left: 10px;">${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // 3 soniyadan keyin o'chirish
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // -------------------------------------------------------
    // 3. DARK MODE BOSHQARUVI (ASOSIY FUNKSIYA)
    // -------------------------------------------------------
    function initDarkMode() {
        console.log("[App] Dark Mode init...");
        
        // LocalStorage dan saqlangan holatni olish
        let isDark = localStorage.getItem(AppConfig.themeKey);
        
        if (isDark === null) {
            // Agar saqlangan bo'lmasa, sistemaning preferensiyasini tekshirish
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
            isDark = isDark === 'dark';
        }
        
        // Dark mode ni qo'llash
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Tugma matnini yangilash
        updateThemeButton(isDark);
        
        console.log(`[App] Dark Mode: ${isDark ? 'yoqilgan' : 'o\'chirilgan'}`);
        return isDark;
    }
    
    function updateThemeButton(isDark) {
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (!themeBtn) return;
        
        const icon = themeBtn.querySelector('i');
        const textSpan = themeBtn.querySelector('#theme-text');
        
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        if (textSpan) {
            textSpan.textContent = isDark ? 'Light' : 'Dark';
        }
    }
    
    function toggleDarkMode() {
        const isDark = document.body.classList.contains('dark-mode');
        
        if (isDark) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem(AppConfig.themeKey, 'light');
            showToast('🌞 Yorug\' rejim yoqildi', 'info');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem(AppConfig.themeKey, 'dark');
            showToast('🌙 Tungi rejim yoqildi', 'info');
        }
        
        updateThemeButton(!isDark);
        console.log(`[App] Dark Mode toggled: ${!isDark ? 'yoqilgan' : 'o\'chirilgan'}`);
    }

    // -------------------------------------------------------
    // 4. LOADER (Yuklanish indikatori)
    // -------------------------------------------------------
    function showLoader() {
        const container = document.getElementById('quiz-content');
        if (!container) return;
        
        // Agar loader allaqachon mavjud bo'lsa, qayta yaratmaslik
        if (document.querySelector('.loader-overlay')) return;
        
        const loader = document.createElement('div');
        loader.className = 'loader-overlay';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        loader.innerHTML = `
            <div style="background: var(--card-bg); padding: 30px; border-radius: 20px; text-align: center;">
                <div style="width: 50px; height: 50px; border: 4px solid var(--card-border); border-top-color: var(--primary); border-radius: 50%; margin: 0 auto 20px; animation: spin 1s linear infinite;"></div>
                <p>Ma'lumotlar yuklanmoqda...</p>
            </div>
        `;
        
        // Spin animatsiyasini qo'shish
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(loader);
    }
    
    function hideLoader() {
        const loader = document.querySelector('.loader-overlay');
        if (loader) loader.remove();
    }

    // -------------------------------------------------------
    // 5. NATIJALAR BILAN ISHLASH
    // -------------------------------------------------------
    function getAllResults() {
        try {
            const stored = localStorage.getItem(AppConfig.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("[App] Natijalarni yuklashda xatolik:", e);
            return [];
        }
    }
    
    function saveResult(result) {
        try {
            const results = getAllResults();
            results.unshift({ ...result, timestamp: Date.now() });
            // Oxirgi 100 ta natijani saqlash
            while (results.length > 100) results.pop();
            localStorage.setItem(AppConfig.storageKey, JSON.stringify(results));
            showToast(`✅ Natija saqlandi: ${result.correct}/${result.total}`, 'success');
        } catch (e) {
            console.error("[App] Natijani saqlashda xatolik:", e);
            showToast("❌ Natijani saqlashda xatolik", 'error');
        }
    }
    
    function clearAllResults() {
        if (confirm("Barcha natijalarni o'chirmoqchimisiz?")) {
            localStorage.removeItem(AppConfig.storageKey);
            showToast("🗑️ Barcha natijalar o'chirildi", 'warning');
        }
    }

    // -------------------------------------------------------
    // 6. YORDAMCHI FUNKSIYALAR
    // -------------------------------------------------------
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    function shuffleArray(arr) {
        const array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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
    
    function getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // -------------------------------------------------------
    // 7. ASOSIY INIT FUNKSIYASI
    // -------------------------------------------------------
    function initApp() {
        console.log("[App] Initializing QuizMaster Pro App...");
        
        // Dark Mode ni ishga tushirish
        initDarkMode();
        
        // Dark Mode tugmasini ulash
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            // Eski event listenerlarni o'chirish
            const newBtn = themeBtn.cloneNode(true);
            themeBtn.parentNode.replaceChild(newBtn, themeBtn);
            newBtn.addEventListener('click', toggleDarkMode);
            console.log("[App] Dark Mode tugmasi ulandi");
        } else {
            console.warn("[App] Dark Mode tugmasi topilmadi!");
        }
        
        // Ma'lumotlar bazasini tekshirish
        if (!window.QUIZ_DATA) {
            console.error("[App] QUIZ_DATA topilmadi! questions.js faylini tekshiring.");
            showToast("⚠️ Ma'lumotlar bazasi topilmadi!", 'error');
        } else {
            console.log(`[App] QUIZ_DATA mavjud: ${window.QUIZ_DATA.length} ta fan`);
        }
        
        console.log("[App] Initialization complete!");
    }
    
    // -------------------------------------------------------
    // 8. DOMContentLoaded EVENT
    // -------------------------------------------------------
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        // DOM allaqachon yuklangan
        initApp();
    }
    
    // -------------------------------------------------------
    // 9. GLOBAL EKSPORT
    // -------------------------------------------------------
    window.QuizApp = {
        // UI
        showToast,
        showLoader,
        hideLoader,
        
        // Dark Mode
        initDarkMode,
        toggleDarkMode,
        
        // Natijalar
        getAllResults,
        saveResult,
        clearAllResults,
        
        // Yordamchi funksiyalar
        formatTime,
        shuffleArray,
        escapeHtml,
        getUrlParam,
        
        // Konfig
        config: AppConfig
    };
    
    console.log("[App] QuizApp global obyekti eksport qilindi!");
})();
