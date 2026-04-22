// ============================================================
// app.js - QuizMaster Pro v7.0 (MOBILE OPTIMIZED)
// Lazy Loading, Memory Management, Extended Timeout
// ============================================================

(function() {
    'use strict';

    // ========== 1. KONFIGURATSIYA ==========
    const CONFIG = {
        LOAD_TIMEOUT: 15000,     // 15 soniya (mobile uchun)
        DATA_CHECK_INTERVAL: 100,
        MAX_ATTEMPTS: 150,
        STORAGE_KEY: 'qm_results',
        THEME_KEY: 'quiz_theme'
    };

    // ========== 2. DARK MODE (TEZKOR) ==========
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
        if (window.showToast) {
            window.showToast(isDark ? '🌙 Tungi rejim yoqildi' : '🌞 Yorug\' rejim yoqildi', 'info');
        }
    }

    applyDarkMode(getDarkModeState());

    // ========== 3. TOAST ==========
    window.showToast = function(message, type = 'info') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#4f46e5' };
        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
        
        toast.style.cssText = `
            position: fixed; bottom: 30px; right: 30px; padding: 12px 24px;
            background: ${colors[type]}; color: white; border-radius: 12px;
            z-index: 10000; font-weight: 500; display: flex; align-items: center; gap: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2); animation: slideInToast 0.3s ease-out;
            max-width: 90%; font-size: 14px;
        `;
        toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutToast 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // ========== 4. LOADER ==========
    window.showLoader = function(message = "Ma'lumotlar yuklanmoqda...") {
        const existing = document.querySelector('.loader-overlay');
        if (existing) existing.remove();
        
        const loader = document.createElement('div');
        loader.className = 'loader-overlay';
        loader.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6); display: flex; justify-content: center;
            align-items: center; z-index: 9999; backdrop-filter: blur(4px);
        `;
        loader.innerHTML = `
            <div style="background: var(--card-bg, white); padding: 30px 40px; border-radius: 24px; text-align: center; max-width: 90%;">
                <div style="width: 50px; height: 50px; border: 4px solid var(--card-border, #e5e7eb); border-top-color: var(--primary, #4f46e5); border-radius: 50%; margin: 0 auto 20px; animation: spinLoader 1s linear infinite;"></div>
                <p style="color: var(--text, #1f2937);">${message}</p>
                <p style="font-size: 12px; margin-top: 10px; color: var(--text-secondary, #6b7280);" id="loader-debug"></p>
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
        console.log(`[Loader] ${msg}`);
    };

    // ========== 5. MEMORY MANAGEMENT (KESHLARNI TOZALASH) ==========
    function clearOldCache() {
        try {
            // localStorage dan 30 kundan eski natijalarni o'chirish
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (stored) {
                const results = JSON.parse(stored);
                const now = Date.now();
                const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
                const filtered = results.filter(r => (now - (r.timestamp || 0)) < THIRTY_DAYS);
                if (filtered.length !== results.length) {
                    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(filtered));
                    console.log(`[Memory] ${results.length - filtered.length} ta eski natija o'chirildi`);
                }
            }
            
            // localStorage hajmini tekshirish
            let total = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const val = localStorage.getItem(key);
                total += (key.length + (val ? val.length : 0)) * 2;
            }
            if (total > 4 * 1024 * 1024) { // 4MB dan ortiq
                console.warn(`[Memory] localStorage hajmi: ${(total/1024/1024).toFixed(2)} MB`);
            }
        } catch(e) {
            console.warn('[Memory] Cache tozalashda xatolik:', e);
        }
    }

    // ========== 6. LAZY DATA LOADING ==========
    let subjectsMeta = null;
    let fullDataLoaded = false;
    
    function getSubjectsMeta() {
        if (subjectsMeta) return subjectsMeta;
        
        if (window.QUIZ_DATA && window.QUIZ_DATA.length) {
            subjectsMeta = window.QUIZ_DATA.map(s => ({
                id: s.id,
                subject: s.subject,
                icon: s.icon,
                color: s.color,
                questionsCount: s.questions ? s.questions.length : 0
            }));
        }
        return subjectsMeta || [];
    }
    
    function getFullSubject(index) {
        if (window.QUIZ_DATA && window.QUIZ_DATA[index]) {
            return window.QUIZ_DATA[index];
        }
        return null;
    }

    // ========== 7. YUKLASH DIAGNOSTIKASI ==========
    let dataCheckInterval = null;
    let timeoutId = null;
    
    window.waitForData = function() {
        return new Promise((resolve, reject) => {
            console.log("[App] Ma'lumotlarni kutish boshlandi (timeout: 15s)...");
            window.updateLoaderMessage("Kutilmoqda...");
            
            let attempts = 0;
            const MAX_ATTEMPTS = CONFIG.MAX_ATTEMPTS;
            
            if (dataCheckInterval) clearInterval(dataCheckInterval);
            if (timeoutId) clearTimeout(timeoutId);
            
            dataCheckInterval = setInterval(() => {
                attempts++;
                
                if (window.QUIZ_DATA && window.QUIZ_DATA.length > 0) {
                    console.log(`[App] ✅ Ma'lumotlar topildi! (${window.QUIZ_DATA.length} ta fan, ${attempts} urinish)`);
                    window.updateLoaderMessage(`✅ ${window.QUIZ_DATA.length} ta fan yuklandi!`);
                    clearInterval(dataCheckInterval);
                    if (timeoutId) clearTimeout(timeoutId);
                    resolve(window.QUIZ_DATA);
                } else if (attempts >= MAX_ATTEMPTS) {
                    console.error("[App] ❌ Ma'lumotlar topilmadi!");
                    window.updateLoaderMessage("❌ Ma'lumotlar topilmadi!");
                    clearInterval(dataCheckInterval);
                    reject(new Error("Ma'lumotlar bazasi yuklanmadi"));
                } else if (attempts % 20 === 0) {
                    console.log(`[App] Kutilmoqda... (${attempts}/${MAX_ATTEMPTS})`);
                    window.updateLoaderMessage(`Yuklanmoqda... (${Math.round(attempts/MAX_ATTEMPTS*100)}%)`);
                }
            }, CONFIG.DATA_CHECK_INTERVAL);
            
            timeoutId = setTimeout(() => {
                if (dataCheckInterval) {
                    clearInterval(dataCheckInterval);
                    dataCheckInterval = null;
                }
                console.error("[App] ❌ Timeout!");
                reject(new Error("Yuklash vaqti tugadi (15s)"));
            }, CONFIG.LOAD_TIMEOUT);
        });
    };

    // ========== 8. DASHBOARD (FAQAT METADATA) ==========
    window.updateDashboard = function() {
        const meta = getSubjectsMeta();
        
        // Jami savollar soni (metadata dan)
        const totalQuestions = meta.reduce((sum, s) => sum + (s.questionsCount || 0), 0);
        
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
                    avgScore = Math.round(results.reduce((s, r) => s + (r.percent || 0), 0) / totalTests);
                }
                const masteredSet = new Set();
                results.forEach(r => {
                    if ((r.percent || 0) >= 85) masteredSet.add(r.subjectIndex);
                });
                masteredCount = masteredSet.size;
            }
        } catch(e) {}
        
        const totalTestsEl = document.getElementById('stat-total-tests');
        const avgScoreEl = document.getElementById('stat-avg-score');
        const masteredEl = document.getElementById('stat-mastered');
        const totalQuestionsEl = document.getElementById('stat-total-questions');
        
        if (totalTestsEl) totalTestsEl.textContent = totalTests;
        if (avgScoreEl) avgScoreEl.textContent = `${avgScore}%`;
        if (masteredEl) masteredEl.textContent = masteredCount;
        if (totalQuestionsEl) totalQuestionsEl.textContent = totalQuestions;
    };

    // ========== 9. FAN KARTOCHKALARI (FAQAT METADATA BILAN) ==========
    window.renderSubjects = function() {
        const grid = document.getElementById('subjects-grid');
        if (!grid) {
            console.error("[App] subjects-grid topilmadi!");
            return;
        }
        
        const meta = getSubjectsMeta();
        
        if (!meta.length) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                    <i class="fas fa-database" style="font-size: 64px; color: #ef4444; margin-bottom: 20px;"></i>
                    <h3 style="color: #ef4444;">Ma'lumotlar bazasi topilmadi!</h3>
                    <p>Iltimos, internet aloqangizni tekshiring.</p>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;">🔄 Qayta yuklash</button>
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
                results.forEach(r => {
                    if (!resultsMap.has(r.subjectIndex)) {
                        resultsMap.set(r.subjectIndex, []);
                    }
                    resultsMap.get(r.subjectIndex).push(r);
                });
            }
        } catch(e) {}
        
        grid.innerHTML = '';
        
        for (let i = 0; i < meta.length; i++) {
            const subject = meta[i];
            const subjectResults = resultsMap.get(i) || [];
            const bestScore = subjectResults.length ? Math.max(...subjectResults.map(r => r.percent || 0)) : null;
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
                cards.forEach(card => {
                    const name = card.querySelector('.subject-name')?.innerText.toLowerCase() || '';
                    card.style.display = name.includes(term) ? '' : 'none';
                });
            });
        }
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                const meta = getSubjectsMeta();
                
                const cards = document.querySelectorAll('.subject-card');
                cards.forEach(card => {
                    const idx = parseInt(card.getAttribute('data-subject-id'));
                    const subject = meta[idx];
                    
                    if (filter === 'all') {
                        card.style.display = '';
                    } else if (filter === 'exact') {
                        const exact = ['Matematika', 'Fizika', 'Dasturlash', 'Biologiya'];
                        card.style.display = subject && exact.includes(subject.subject) ? '' : 'none';
                    } else if (filter === 'humanitarian') {
                        const human = ['Ingliz tili', 'Tarix', 'Adabiyot'];
                        card.style.display = subject && human.includes(subject.subject) ? '' : 'none';
                    } else if (filter === 'retake') {
                        const badge = card.querySelector('.smart-badge');
                        card.style.display = badge && badge.classList.contains('badge-retake') ? '' : 'none';
                    }
                });
            });
        });
    };

    // ========== 11. DIAGNOSTIKA ==========
    window.testQuestionsLoad = function() {
        console.log("=== DIAGNOSTIKA ===");
        console.log("window.QUIZ_DATA mavjudmi?", !!window.QUIZ_DATA);
        if (window.QUIZ_DATA) {
            console.log("Fanlar soni:", window.QUIZ_DATA.length);
            console.log("Jami savollar:", window.QUIZ_DATA.reduce((s, f) => s + (f.questions?.length || 0), 0));
        } else {
            console.error("window.QUIZ_DATA undefined!");
        }
        console.log("================");
        window.showToast("Diagnostika tugadi, konsolni tekshiring (F12)", 'info');
    };

    // ========== 12. DARK MODE TUGMALARINI ULASH ==========
    function bindDarkModeButtons() {
        const btns = document.querySelectorAll('#theme-toggle-btn, #theme-btn, .theme-toggle');
        btns.forEach(btn => {
            btn.removeEventListener('click', toggleDarkMode);
            btn.addEventListener('click', toggleDarkMode);
        });
    }

    // ========== 13. ASOSIY INIT ==========
    window.initApp = async function() {
        console.log("[App] Mobile Optimized v7.0 ishga tushmoqda...");
        
        // 1. Keshni tozalash
        clearOldCache();
        
        // 2. Loaderni ko'rsatish
        window.showLoader("Ma'lumotlar yuklanmoqda...");
        
        // 3. Dark Mode tugmalarini ulash
        bindDarkModeButtons();
        
        try {
            // 4. Ma'lumotlarni kutish
            await window.waitForData();
            
            // 5. Dashboard va kartochkalarni yangilash
            window.updateDashboard();
            window.renderSubjects();
            window.initSearchAndFilter();
            
            window.showToast(`✅ ${window.QUIZ_DATA.length} ta fan yuklandi!`, 'success');
            console.log("[App] ✅ Initialization complete!");
            
        } catch (error) {
            console.error("[App] ❌ Initialization failed:", error);
            window.hideLoader();
            
            const grid = document.getElementById('subjects-grid');
            if (grid) {
                grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 64px; color: #ef4444; margin-bottom: 20px;"></i>
                        <h3 style="color: #ef4444;">Ma'lumotlar bazasi yuklanmadi!</h3>
                        <p>Sabab: ${error.message}</p>
                        <p style="font-size: 13px; margin-top: 10px;">Internet aloqangizni tekshiring.</p>
                        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;">🔄 Qayta yuklash</button>
                    </div>
                `;
            }
            window.showToast("❌ Ma'lumotlar bazasi yuklanmadi!", 'error');
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
        getFullSubject: getFullSubject,
        testQuestionsLoad: window.testQuestionsLoad,
        waitForData: window.waitForData
    };
    
    console.log("[App] ✅ Mobile Optimized v7.0 yuklandi!");
})();
