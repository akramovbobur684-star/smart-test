/**
 * ============================================================
 * QuizMaster Pro — Core Application v3.0
 * Yagona Dark Mode tizimi, Toast, Loader va umumiy funksiyalar
 * ============================================================
 */

(function() {
    'use strict';

    // -------------------------------------------------------
    // 1. KONFIGURATSIYA
    // -------------------------------------------------------
    const AppConfig = {
        storageKey: 'qm_results',
        themeKey: 'quiz_theme',
        defaultTheme: 'light'
    };

    // -------------------------------------------------------
    // 2. DARK MODE — YAGONA TIZIM
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
        applyDarkMode(isDark);
        
        console.log(`[App] Dark Mode: ${isDark ? 'yoqilgan' : 'o\'chirilgan'}`);
        return isDark;
    }
    
    function applyDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Barcha sahifalardagi tugmalarni yangilash
        updateAllThemeButtons(isDark);
    }
    
    function updateAllThemeButtons(isDark) {
        const themeBtns = document.querySelectorAll('#theme-toggle-btn, #theme-btn');
        themeBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            const textSpan = btn.querySelector('#theme-text');
            
            if (icon) {
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
            if (textSpan) {
                textSpan.textContent = isDark ? 'Light' : 'Dark';
            } else {
                btn.innerHTML = isDark ? '☀️ Light' : '🌙 Dark';
            }
        });
    }
    
    function toggleDarkMode() {
        const isDark = !document.body.classList.contains('dark-mode');
        applyDarkMode(isDark);
        localStorage.setItem(AppConfig.themeKey, isDark ? 'dark' : 'light');
        
        showToast(isDark ? '🌙 Tungi rejim yoqildi' : '🌞 Yorug\' rejim yoqildi', 'info');
        console.log(`[App] Dark Mode toggled: ${isDark ? 'yoqilgan' : 'o\'chirilgan'}`);
    }

    // -------------------------------------------------------
    // 3. TOAST XABARLAR
    // -------------------------------------------------------
    function showToast(message, type = 'info') {
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#4f46e5'
        };
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 14px 24px;
            background: ${colors[type]};
            color: white;
            border-radius: 16px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        toast.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // -------------------------------------------------------
    // 4. LOADER
    // -------------------------------------------------------
    function showLoader(message = "Ma'lumotlar yuklanmoqda...") {
        const existingLoader = document.querySelector('.loader-overlay');
        if (existingLoader) existingLoader.remove();
        
        const loader = document.createElement('div');
        loader.className = 'loader-overlay';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            backdrop-filter: blur(4px);
        `;
        loader.innerHTML = `
            <div style="background: var(--card-bg, white); padding: 30px 40px; border-radius: 24px; text-align: center; box-shadow: 0 20px 35px rgba(0,0,0,0.2);">
                <div style="width: 50px; height: 50px; border: 4px solid var(--card-border, #e5e7eb); border-top-color: var(--primary, #4f46e5); border-radius: 50%; margin: 0 auto 20px; animation: spin 1s linear infinite;"></div>
                <p style="color: var(--text, #1f2937);">${message}</p>
            </div>
        `;
        
        if (!document.querySelector('style#loader-animation')) {
            const style = document.createElement('style');
            style.id = 'loader-animation';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
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
            while (results.length > 100) results.pop();
            localStorage.setItem(AppConfig.storageKey, JSON.stringify(results));
            showToast(`✅ Natija saqlandi: ${result.correct}/${result.total}`, 'success');
            return true;
        } catch (e) {
            console.error("[App] Natijani saqlashda xatolik:", e);
            showToast("❌ Natijani saqlashda xatolik", 'error');
            return false;
        }
    }

    // -------------------------------------------------------
    // 6. YORDAMCHI FUNKSIYALAR
    // -------------------------------------------------------
    function formatTime(seconds) {
        const mins = Math.floor(Math.abs(seconds) / 60);
        const secs = Math.abs(seconds) % 60;
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
    
    function getSmartFeedback(percent) {
        if (percent >= 90) {
            return { 
                message: "🎉 Ajoyib! Siz ushbu fan bo'yicha mutaxassissiz! Bilimingiz yuqori darajada.", 
                type: "expert",
                icon: "fa-crown",
                advice: "Keyingi bosqichga tayyorsiz!"
            };
        } else if (percent >= 70) {
            return { 
                message: "👍 Yaxshi natija! Bilimingiz mustahkam, ammo yana bir bor takrorlash zarar emas.", 
                type: "good",
                icon: "fa-thumbs-up",
                advice: "Xato qilgan savollaringizni tahlil qiling."
            };
        } else if (percent >= 50) {
            return { 
                message: "📚 O'rtacha natija. Ko'proq mashq qilish va nazariyani takrorlash tavsiya etiladi.", 
                type: "average",
                icon: "fa-book",
                advice: "Har bir xato — bu o'rganish imkoniyati."
            };
        } else {
            return { 
                message: "⚠️ Sizga ko'proq nazariya o'qish va amaliyot mashqlarini bajarish tavsiya etiladi. Taslim bo'lmang!", 
                type: "poor",
                icon: "fa-chart-line",
                advice: "Testni qayta topshirib, o'z o'sishingizni kuzating."
            };
        }
    }

    // -------------------------------------------------------
    // 7. ASOSIY INIT
    // -------------------------------------------------------
    function initApp() {
        console.log("[App] QuizMaster Pro v3.0 ishga tushmoqda...");
        
        // Dark Mode
        initDarkMode();
        
        // Dark Mode tugmalarini ulash
        document.querySelectorAll('#theme-toggle-btn, #theme-btn').forEach(btn => {
            btn.removeEventListener('click', toggleDarkMode);
            btn.addEventListener('click', toggleDarkMode);
        });
        
        console.log("[App] Initialization complete!");
    }
    
    // DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
    
    // -------------------------------------------------------
    // 8. GLOBAL EKSPORT
    // -------------------------------------------------------
    window.QuizApp = {
        // UI
        showToast,
        showLoader,
        hideLoader,
        
        // Dark Mode
        initDarkMode,
        toggleDarkMode,
        applyDarkMode,
        
        // Natijalar
        getAllResults,
        saveResult,
        
        // Yordamchi funksiyalar
        formatTime,
        shuffleArray,
        escapeHtml,
        getUrlParam,
        getSmartFeedback,
        
        // Konfig
        config: AppConfig
    };
    
    console.log("[App] QuizApp global obyekti eksport qilindi!");
})();
/**
 * QuizMaster Pro — Core Application v3.0
 * Umumiy funksiyalar (agar app.js alohida kerak bo'lsa)
 */

window.QuizApp = window.QuizApp || {};

(function() {
    'use strict';
    
    window.QuizApp = {
        showToast: function(message, type) {
            console.log(`[Toast] ${type}: ${message}`);
            // Toast implementatsiyasi (agar kerak bo'lsa)
        },
        
        formatTime: function(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        },
        
        getUrlParam: function(param) {
            const params = new URLSearchParams(window.location.search);
            return params.get(param);
        }
    };
    
    console.log("[App] QuizApp loaded");
})();
