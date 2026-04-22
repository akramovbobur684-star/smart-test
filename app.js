// ============================================================
// app.js - QuizMaster Pro v8.0 (MOBILE OPTIMIZED + RETRY)
// ============================================================

(function() {
    'use strict';

    // ========== 1. KONFIGURATSIYA ==========
    const CONFIG = {
        LOAD_TIMEOUT: 20000,        // 20 soniya (mobile uchun)
        DATA_CHECK_INTERVAL: 200,
        MAX_ATTEMPTS: 100,
        STORAGE_KEY: 'qm_results',
        THEME_KEY: 'quiz_theme',
        RETRY_PARAM: 'retry'
    };

    // URL parametrlarini olish
    function getUrlParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    // ========== 2. KESHNI TOZALASH (Mobile uchun) ==========
    function clearIncompleteData() {
        try {
            // 1. localStorage dan eski natijalarni tozalash
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (stored) {
                const results = JSON.parse(stored);
                const now = Date.now();
                const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
                const validResults = results.filter(r => (now - (r.timestamp || 0)) < ONE_MONTH);
                if (validResults.length !== results.length) {
                    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(validResults));
                    console.log(`[Cache] ${results.length - validResults.length} ta eski natija tozalandi`);
                }
            }
            
            // 2. Agar retry parametri bo'lsa, localStorageni to'liq tozalash
            if (getUrlParam(CONFIG.RETRY_PARAM) === 'true') {
                const tempTheme = localStorage.getItem(CONFIG.THEME_KEY);
                localStorage.clear();
                if (tempTheme) localStorage.setItem(CONFIG.THEME_KEY, tempTheme);
                console.log('[Cache] Retry mode: localStorage tozalandi');
                window.showToast('Kesh tozalandi, sahifa qayta yuklanmoqda...', 'info');
                setTimeout(() => location.reload(), 1500);
                return true;
            }
        } catch(e) {
            console.warn('[Cache] Tozalash xatosi:', e);
        }
        return false;
    }

    // ========== 3. DARK MODE ==========
    function applyDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        const btns = document.querySelectorAll('#theme-toggle-btn, #theme-btn, .theme-toggle');
        btns.forEach(btn => {
            if (btn) btn.innerHTML = isDark ? '☀️ Light' : '🌙 Dark';
        });
    }

    function getDarkModeState() {
        const saved = localStorage.getItem(CONFIG.THEME_KEY);
        if (saved !== null) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function toggleDarkMode() {
        const isDark = !document.body.classList.contains('dark-mode');
        applyDarkMode(isDark);
        localStorage.setItem(CONFIG.THEME_KEY, isDark ? 'dark' : 'light');
    }

    applyDarkMode(getDarkModeState());

    // ========== 4. TOAST ==========
    window.showToast = function(message, type = 'info', duration = 3000) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#4f46e5' };
        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
        
        toast.style.cssText = `
            position: fixed; bottom: 30px; right: 30px; padding: 12px 20px;
            background: ${colors[type]}; color: white; border-radius: 12px;
            z-index: 10000; font-weight: 500; display: flex; align-items: center; gap: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2); animation: slideInToast 0.3s ease-out;
            max-width: 85%; font-size: 14px; word-break: break-word;
        `;
        toast.innerHTML = `<i class="fas ${icons[type]}"></i> <span>${message}</span>`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutToast 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    // ========== 5. LOADER ==========
    window.showLoader = function(message = "Ma'lumotlar yuklanmoqda...") {
        const existing = document.querySelector('.loader-overlay');
        if (existing) existing.remove();
        
        const loader = document.createElement('div');
        loader.className = 'loader-overlay';
        loader.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.7); display: flex; justify-content: center;
            align-items: center; z-index: 9999; backdrop-filter: blur(4px);
        `;
        loader.innerHTML = `
            <div style="background: var(--card-bg, white); padding: 25px 30px; border-radius: 24px; text-align: center; max-width: 85%;">
                <div style="width: 45px; height: 45px; border: 4px solid var(--card-border, #e5e7eb); border-top-color: var(--primary, #4f46e5); border-radius: 50%; margin: 0 auto 15px; animation: spinLoader 1s linear infinite;"></div>
                <p style="color: var(--text, #1f2937); margin-bottom: 8px;">${message}</p>
                <p style="font-size: 11px; color: var(--text-secondary, #6b7280);" id="loader-debug"></p>
            </div>
        `;
        
        if (!document.querySelector('#loader-animations')) {
            const style = document.createElement('style');
            style.id = 'loader-animations';
            style.textContent = `
                @keyframes spinLoader { to { transform: rotate(360deg); } }
                @keyframes slideInToast { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes slideOutToast { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(loader);
    };
    
    window.hideLoader = function() {
        const loader = document.querySelector('.loader-overlay');
        if (loader) loader.remove();
    };
    
    window.updateLoaderMessage = function(msg) {
        const debugEl = document.getElementById('loader-debug');
        if (debugEl) debugEl.innerHTML = msg;
    };

    // ========== 6. YUKLASH DIAGNOSTIKASI ==========
    let dataCheckInterval = null;
    let timeoutId = null;
    let loadStartTime = null;
    
    window.waitForData = function() {
        return new Promise((resolve, reject) => {
            loadStartTime = Date.now();
            console.log(`[App] Ma'lumotlarni kutish boshlandi (timeout: ${CONFIG.LOAD_TIMEOUT/1000}s)`);
            window.updateLoaderMessage("Kutilmoqda...");
            
            let attempts = 0;
            
            if (dataCheckInterval) clearInterval(dataCheckInterval);
            if (timeoutId) clearTimeout(timeoutId);
            
            dataCheckInterval = setInterval(() => {
                attempts++;
                const elapsed = ((Date.now() - loadStartTime) / 1000).toFixed(1);
                
                if (window.QUIZ_DATA && window.QUIZ_DATA.length > 0) {
                    console.log(`[App] ✅ Ma'lumotlar topildi! ${window.QUIZ_DATA.length} ta fan, ${elapsed}s`);
                    window.updateLoaderMessage(`✅ ${window.QUIZ_DATA.length} ta fan yuklandi (${elapsed}s)`);
                    clearInterval(dataCheckInterval);
                    if (timeoutId) clearTimeout(timeoutId);
                    resolve(window.QUIZ_DATA);
                } else if (attempts >= CONFIG.MAX_ATTEMPTS) {
                    console.error(`[App] ❌ Ma'lumotlar topilmadi! ${attempts} urinish, ${elapsed}s`);
                    window.updateLoaderMessage("❌ Ma'lumotlar topilmadi!");
                    clearInterval(dataCheckInterval);
                    reject(new Error(`Ma'lumotlar bazasi yuklanmadi (${elapsed}s)`));
                } else if (attempts % 15 === 0) {
                    console.log(`[App] Kutilmoqda... (${attempts}/${CONFIG.MAX_ATTEMPTS}) ${elapsed}s`);
                    window.updateLoaderMessage(`Yuklanmoqda... ${Math.round(attempts/CONFIG.MAX_ATTEMPTS*100)}% (${elapsed}s)`);
                }
            }, CONFIG.DATA_CHECK_INTERVAL);
            
            timeoutId = setTimeout(() => {
                if (dataCheckInterval) {
                    clearInterval(dataCheckInterval);
                    dataCheckInterval = null;
                }
                const elapsed = ((Date.now() - loadStartTime) / 1000).toFixed(1);
                console.error(`[App] ❌ Timeout! ${elapsed}s`);
                reject(new Error(`Yuklash vaqti tugadi (${elapsed}s)`));
            }, CONFIG.LOAD_TIMEOUT);
        });
    };

    // ========== 7. YENGIL METADATA (FAQAT FANLAR HAQIDA) ==========
    function getSubjectsMeta() {
        if (!window.QUIZ_DATA || !window.QUIZ_DATA.length) return [];
        return window.QUIZ_DATA.map(s => ({
            id: s.id,
            subject: s.subject,
            icon: s.icon,
            color: s.color,
            questionsCount: s.questions ? s.questions.length : 0
        }));
    }

    // ========== 8. DASHBOARD (YENGIL VERSIYA) ==========
    window.updateDashboard = function() {
        const meta = getSubjectsMeta();
        
        // Jami savollar soni (yengil hisoblash)
        let totalQuestions = 0;
        for (let i = 0; i < meta.length; i++) {
            totalQuestions += meta[i].questionsCount || 0;
        }
        
        // Natijalarni o'qish
        let totalTests = 0;
        let avgScore = 0;
        let masteredCount = 0;
        
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (stored) {
                const results = JSON.parse(stored);
                totalTests = results.length;
                if (totalTests > 0) {
                    let sum = 0;
                    for (let i = 0; i < results.length; i++) {
                        sum += results[i].percent || 0;
                    }
                    avgScore = Math.round(sum / totalTests);
                }
                const masteredSet = new Set();
                for (let i = 0; i < results.length; i++) {
                    if ((results[i].percent || 0) >= 85) {
                        masteredSet.add(results[i].subjectIndex);
                    }
                }
                masteredCount = masteredSet.size;
            }
        } catch(e) {
            console.warn('[Dashboard] Natijalarni o\'qishda xatolik:', e);
        }
        
        const totalTestsEl = document.getElementById('stat-total-tests');
        const avgScoreEl = document.getElementById('stat-avg-score');
        const masteredEl = document.getElementById('stat-mastered');
        const totalQuestionsEl = document.getElementById('stat-total-questions');
        
        if (totalTestsEl) totalTestsEl.textContent = totalTests;
        if (avgScoreEl) avgScoreEl.textContent = `${avgScore}%`;
        if (masteredEl) masteredEl.textContent = masteredCount;
        if (totalQuestionsEl) totalQuestionsEl.textContent = totalQuestions;
    };

    // ========== 9. FAN KARTOCHKALARI ==========
    window.renderSubjects = function() {
        const grid = document.getElementById('subjects-grid');
        if (!grid) {
            console.error("[App] subjects-grid topilmadi!");
            return;
        }
        
        const meta = getSubjectsMeta();
        
        if (!meta.length) {
            const retryUrl = window.location.pathname + '?retry=true';
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 50px 20px;">
                    <i class="fas fa-database" style="font-size: 55px; color: #ef4444; margin-bottom: 15px;"></i>
                    <h3 style="color: #ef4444; margin-bottom: 10px;">Ma'lumotlar bazasi topilmadi!</h3>
                    <p style="margin-bottom: 20px; font-size: 14px;">Sabab: questions.js fayli yuklanmagan yoki bo'sh</p>
                    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="location.reload()" style="padding: 10px 20px; background: #4f46e5; color: white; border: none; border-radius: 30px; cursor: pointer;">
                            🔄 Qayta yuklash
                        </button>
                        <button onclick="location.href='${retryUrl}'" style="padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 30px; cursor: pointer;">
                            🔧 Keshni tozalab qayta yuklash
                        </button>
                    </div>
                    <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">Agar muammo davom etsa, F12 tugmasini bosing va konsolni tekshiring</p>
                </div>
            `;
            return;
        }
        
        console.log(`[App] ${meta.length} ta fan render qilinmoqda...`);
        
        // Natijalarni o'qish
        let resultsMap = new Map();
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (stored) {
                const results = JSON.parse(stored);
                for (let i = 0; i < results.length; i++) {
                    const r = results[i];
                    if (!resultsMap.has(r.subjectIndex)) {
                        resultsMap.set(r.subjectIndex, []);
                    }
                    resultsMap.get(r.subjectIndex).push(r);
                }
            }
        } catch(e) {}
        
        grid.innerHTML = '';
        
        for (let i = 0; i < meta.length; i++) {
            const subject = meta[i];
            const subjectResults = resultsMap.get(i) || [];
            
            let bestScore = null;
            for (let j = 0; j < subjectResults.length; j++) {
                const score = subjectResults[j].percent || 0;
                if (bestScore === null || score > bestScore) bestScore = score;
            }
            
            const attemptsCount = subjectResults.length;
            
            let badgeClass = 'badge-new';
            let badgeText = '🆕 Hali topshirilmagan';
            let badgeIcon = 'fa-hourglass-half';
            
            if (bestScore !== null) {
                if (bestScore >= 85) {
                    badgeClass = 'badge-expert';
                    badgeText = '🏆 Ustasiz!';
                    badgeIcon = 'fa-crown';
                } else if (bestScore >= 60) {
                    badgeClass = 'badge-good';
                    badgeText = '👍 Yaxshi natija';
                    badgeIcon = 'fa-thumbs-up';
                } else {
                    badgeClass = 'badge-retake';
                    badgeText = '⚠️ Qayta topshirish';
                    badgeIcon = 'fa-rotate-right';
                }
            }
            
            const card = document.createElement('div');
            card.className = 'subject-card';
            card.setAttribute('data-subject-id', i);
            card.innerHTML = `
                <div class="card-icon"><i class="fas ${subject.icon || 'fa-graduation-cap'}" style="color: ${subject.color || '#4f46e5'}"></i></div>
                <h3 class="subject-name">${escapeHtml(subject.subject)}</h3>
                <div class="subject-stats">
                    <div class="best-score">
                        <div class="score-value">${bestScore ? bestScore + '%' : '—'}</div>
                        <div class="score-label">Eng yaxshi natija</div>
                    </div>
                    <div class="attempt-count">
                        <div class="attempt-number">${attemptsCount}</div>
                        <div class="attempt-label">Urinishlar</div>
                    </div>
                </div>
                <div class="smart-badge ${badgeClass}">
                    <i class="fas ${badgeIcon}"></i> ${badgeText}
                </div>
                <button class="btn-start" data-idx="${i}">
                    <i class="fas fa-play"></i> Testni boshlash
                </button>
            `;
            
            const btn = card.querySelector('.btn-start');
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.getAttribute('data-idx'));
                window.location.href = `quiz.html?subject=${idx}`;
            });
            
            card.addEventListener('click', (e) => {
                if (e.target !== btn && !btn.contains(e.target)) {
                    btn.click();
                }
            });
            
            grid.appendChild(card);
        }
        
        window.hideLoader();
    };
    
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    // ========== 10. QIDIRUV VA FILTR ==========
    window.initSearchAndFilter = function() {
        const searchInput = document.getElementById('search-input');
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const cards = document.querySelectorAll('.subject-card');
                for (let i = 0; i < cards.length; i++) {
                    const name = cards[i].querySelector('.subject-name')?.innerText.toLowerCase() || '';
                    cards[i].style.display = name.includes(term) ? '' : 'none';
                }
            });
        }
        
        const meta = getSubjectsMeta();
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                for (let i = 0; i < filterBtns.length; i++) {
                    filterBtns[i].classList.remove('active');
                }
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                
                const cards = document.querySelectorAll('.subject-card');
                for (let i = 0; i < cards.length; i++) {
                    const idx = parseInt(cards[i].getAttribute('data-subject-id'));
                    const subject = meta[idx];
                    
                    if (filter === 'all') {
                        cards[i].style.display = '';
                    } else if (filter === 'exact') {
                        const exact = ['Matematika', 'Fizika', 'Dasturlash', 'Biologiya'];
                        cards[i].style.display = subject && exact.includes(subject.subject) ? '' : 'none';
                    } else if (filter === 'humanitarian') {
                        const human = ['Ingliz tili', 'Tarix', 'Adabiyot'];
                        cards[i].style.display = subject && human.includes(subject.subject) ? '' : 'none';
                    } else if (filter === 'retake') {
                        const badge = cards[i].querySelector('.smart-badge');
                        cards[i].style.display = badge && badge.classList.contains('badge-retake') ? '' : 'none';
                    }
                }
            });
        });
    };

    // ========== 11. DARK MODE TUGMALARINI ULASH ==========
    function bindDarkModeButtons() {
        const btns = document.querySelectorAll('#theme-toggle-btn, #theme-btn, .theme-toggle');
        for (let i = 0; i < btns.length; i++) {
            btns[i].removeEventListener('click', toggleDarkMode);
            btns[i].addEventListener('click', toggleDarkMode);
        }
    }

    // ========== 12. XATO SAHIFASINI KO'RSATISH ==========
    function showErrorPage(errorMessage, details = '') {
        window.hideLoader();
        const grid = document.getElementById('subjects-grid');
        if (!grid) return;
        
        const retryUrl = window.location.pathname + '?retry=true';
        
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 50px 20px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 55px; color: #ef4444; margin-bottom: 15px;"></i>
                <h3 style="color: #ef4444; margin-bottom: 10px;">Ma'lumotlar yuklanmadi!</h3>
                <p style="margin-bottom: 10px;">${escapeHtml(errorMessage)}</p>
                ${details ? `<p style="font-size: 12px; color: #6b7280; margin-bottom: 20px;">${escapeHtml(details)}</p>` : ''}
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="location.reload()" style="padding: 10px 20px; background: #4f46e5; color: white; border: none; border-radius: 30px; cursor: pointer;">
                        🔄 Qayta yuklash
                    </button>
                    <button onclick="location.href='${retryUrl}'" style="padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 30px; cursor: pointer;">
                        🗑️ Keshni tozalab qayta yuklash
                    </button>
                </div>
                <p style="margin-top: 25px; font-size: 12px; color: #6b7280;">
                    <i class="fas fa-terminal"></i> F12 tugmasini bosing va konsolni tekshiring
                </p>
            </div>
        `;
    }

    // ========== 13. ASOSIY INIT ==========
    window.initApp = async function() {
        console.log("[App] Mobile Optimized v8.0 ishga tushmoqda...");
        
        // 1. Keshni tozalash (agar retry=true bo'lsa)
        const isRetry = clearIncompleteData();
        if (isRetry) return;
        
        // 2. Loaderni ko'rsatish
        window.showLoader("Ma'lumotlar yuklanmoqda...");
        
        // 3. Dark Mode tugmalarini ulash
        bindDarkModeButtons();
        
        try {
            // 4. Ma'lumotlarni kutish
            await window.waitForData();
            
            // 5. Ma'lumotlarni tekshirish
            if (!window.QUIZ_DATA || window.QUIZ_DATA.length === 0) {
                throw new Error("Ma'lumotlar bazasi bo'sh");
            }
            
            console.log(`[App] ${window.QUIZ_DATA.length} ta fan, jami savollar:`, 
                window.QUIZ_DATA.reduce((s, f) => s + (f.questions?.length || 0), 0));
            
            // 6. Dashboard va kartochkalarni yangilash
            window.updateDashboard();
            window.renderSubjects();
            window.initSearchAndFilter();
            
            window.showToast(`✅ ${window.QUIZ_DATA.length} ta fan yuklandi!`, 'success', 2000);
            console.log("[App] ✅ Initialization complete!");
            
        } catch (error) {
            console.error("[App] ❌ Initialization failed:", error);
            console.error("[App] Xato tafsilotlari:", {
                message: error.message,
                stack: error.stack,
                url: window.location.href,
                timestamp: new Date().toISOString()
            });
            
            let errorMsg = "Ma'lumotlar bazasi yuklanmadi";
            let details = "";
            
            if (error.message.includes("timeout") || error.message.includes("vaqti tugadi")) {
                details = "Internet aloqangiz sekin yoki fayl juda katta. Qayta urunib ko'ring.";
            } else if (error.message.includes("bo'sh")) {
                details = "questions.js fayli mavjud lekin savollar yo'q. Faylni tekshiring.";
            } else {
                details = "Tizimda texnik muammo yuz berdi. Qayta urunib ko'ring.";
            }
            
            showErrorPage(errorMsg, details);
            window.showToast("❌ Ma'lumotlar yuklanmadi! Qayta urunib ko'ring.", 'error', 4000);
        }
    };
    
    // ========== 14. ISHGA TUSHIRISH ==========
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.initApp();
        });
    } else {
        window.initApp();
    }
    
    // ========== 15. GLOBAL EKSPORT ==========
    window.QuizApp = {
        darkMode: { getState: getDarkModeState, apply: applyDarkMode, toggle: toggleDarkMode },
        showToast: window.showToast,
        showLoader: window.showLoader,
        hideLoader: window.hideLoader,
        updateDashboard: window.updateDashboard,
        renderSubjects: window.renderSubjects,
        getSubjectsMeta: getSubjectsMeta,
        waitForData: window.waitForData,
        clearIncompleteData: clearIncompleteData
    };
    
    console.log("[App] ✅ Mobile Optimized v8.0 yuklandi!");
})();
