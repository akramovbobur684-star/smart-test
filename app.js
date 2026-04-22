// ============================================================
// app.js - QuizMaster Pro ULTRA v6.0
// Yuklash mantiqi, diagnostika, Dark Mode, Timeout
// ============================================================

(function() {
    'use strict';

    // ========== 1. DARK MODE (ENG TEZKOR) ==========
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
        const saved = localStorage.getItem('quiz_theme');
        if (saved !== null) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function toggleDarkMode() {
        const isDark = !document.body.classList.contains('dark-mode');
        applyDarkMode(isDark);
        localStorage.setItem('quiz_theme', isDark ? 'dark' : 'light');
        if (window.showToast) {
            window.showToast(isDark ? '🌙 Tungi rejim yoqildi' : '🌞 Yorug\' rejim yoqildi', 'info');
        }
    }

    // Dark Mode ni darhol ishga tushirish
    applyDarkMode(getDarkModeState());

    // ========== 2. TOAST XABAR ==========
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
        `;
        toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutToast 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // ========== 3. LOADER ==========
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
            <div style="background: var(--card-bg, white); padding: 30px 40px; border-radius: 24px; text-align: center;">
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

    // ========== 4. YUKLASH DIAGNOSTIKASI ==========
    let dataLoadAttempts = 0;
    let dataCheckInterval = null;
    let timeoutId = null;
    
    window.waitForData = function() {
        return new Promise((resolve, reject) => {
            console.log("[App] Ma'lumotlarni kutish boshlandi...");
            window.updateLoaderMessage("Kutish rejimi: ma'lumotlar tekshirilmoqda...");
            
            dataLoadAttempts = 0;
            const MAX_ATTEMPTS = 100; // 10 soniya (100 * 100ms)
            
            if (dataCheckInterval) clearInterval(dataCheckInterval);
            if (timeoutId) clearTimeout(timeoutId);
            
            dataCheckInterval = setInterval(() => {
                dataLoadAttempts++;
                
                if (window.QUIZ_DATA && window.QUIZ_DATA.length > 0) {
                    console.log(`[App] ✅ Ma'lumotlar topildi! (${window.QUIZ_DATA.length} ta fan, ${dataLoadAttempts} urinish)`);
                    window.updateLoaderMessage(`✅ ${window.QUIZ_DATA.length} ta fan yuklandi!`);
                    clearInterval(dataCheckInterval);
                    if (timeoutId) clearTimeout(timeoutId);
                    resolve(window.QUIZ_DATA);
                } else if (dataLoadAttempts >= MAX_ATTEMPTS) {
                    console.error("[App] ❌ Ma'lumotlar topilmadi! Maksimal urinish:", dataLoadAttempts);
                    window.updateLoaderMessage("❌ Ma'lumotlar topilmadi!");
                    clearInterval(dataCheckInterval);
                    reject(new Error("Ma'lumotlar bazasi yuklanmadi - timeout"));
                } else if (dataLoadAttempts % 10 === 0) {
                    console.log(`[App] Ma'lumotlar kutilmoqda... (${dataLoadAttempts}/${MAX_ATTEMPTS})`);
                    window.updateLoaderMessage(`Kutilmoqda... (${dataLoadAttempts}/${MAX_ATTEMPTS})`);
                }
            }, 100);
            
            // Umumiy timeout (15 soniya)
            timeoutId = setTimeout(() => {
                if (dataCheckInterval) {
                    clearInterval(dataCheckInterval);
                    dataCheckInterval = null;
                }
                console.error("[App] ❌ Umumiy timeout! Ma'lumotlar yuklanmadi.");
                reject(new Error("Ma'lumotlar yuklashda umumiy timeout (15s)"));
            }, 15000);
        });
    };

    // ========== 5. FAN KARTOCHKALARINI RENDER QILISH ==========
    window.renderSubjects = function() {
        const grid = document.getElementById('subjects-grid');
        if (!grid) {
            console.error("[App] subjects-grid elementi topilmadi!");
            return;
        }
        
        if (!window.QUIZ_DATA || !window.QUIZ_DATA.length) {
            console.error("[App] QUIZ_DATA mavjud emas yoki bo'sh!");
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                    <i class="fas fa-database" style="font-size: 64px; color: #ef4444; margin-bottom: 20px;"></i>
                    <h3 style="color: #ef4444;">Ma'lumotlar bazasi topilmadi!</h3>
                    <p style="margin: 15px 0;">Sabablari:</p>
                    <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                        <li>questions.js fayli yuklanmagan</li>
                        <li>Fayl yo'li noto'g'ri (root papkada bo'lishi kerak)</li>
                        <li>questions.js da sintaksis xatosi</li>
                    </ul>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;">🔄 Qayta yuklash</button>
                    <button onclick="window.testQuestionsLoad()" style="margin-top: 20px; margin-left: 10px; padding: 10px 24px; background: #6b7280; color: white; border: none; border-radius: 8px; cursor: pointer;">🔍 Test</button>
                </div>
            `;
            return;
        }
        
        console.log(`[App] ${window.QUIZ_DATA.length} ta fan render qilinmoqda...`);
        
        // Natijalarni localStorage'dan o'qish
        let resultsMap = new Map();
        try {
            const stored = localStorage.getItem('qm_results');
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
        
        for (let i = 0; i < window.QUIZ_DATA.length; i++) {
            const subject = window.QUIZ_DATA[i];
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
        if (window.QuizApp && window.QuizApp.updateDashboard) {
            window.QuizApp.updateDashboard();
        }
    };
    
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    // ========== 6. DASHBOARD ==========
    window.updateDashboard = function() {
        // Jami savollar soni
        const totalQuestions = window.QUIZ_DATA ? window.QUIZ_DATA.reduce((sum, s) => sum + (s.questions?.length || 0), 0) : 0;
        
        // Jami testlar
        let totalTests = 0;
        let avgScore = 0;
        let masteredCount = 0;
        
        try {
            const stored = localStorage.getItem('qm_results');
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

    // ========== 7. QIDIRUV VA FILTR ==========
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
                
                const cards = document.querySelectorAll('.subject-card');
                cards.forEach(card => {
                    const idx = parseInt(card.getAttribute('data-subject-id'));
                    const subject = window.QUIZ_DATA?.[idx];
                    
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

    // ========== 8. DIAGNOSTIK TEST ==========
    window.testQuestionsLoad = function() {
        console.log("=== DIAGNOSTIK TEST ===");
        console.log("window.QUIZ_DATA mavjudmi?", !!window.QUIZ_DATA);
        if (window.QUIZ_DATA) {
            console.log("window.QUIZ_DATA uzunligi:", window.QUIZ_DATA.length);
            console.log("Fanlar:", window.QUIZ_DATA.map(s => s.subject));
            console.log("Jami savollar:", window.QUIZ_DATA.reduce((s, f) => s + (f.questions?.length || 0), 0));
        } else {
            console.error("window.QUIZ_DATA undefined!");
            console.log("document.querySelector('script[src*=\"questions\"]')", document.querySelector('script[src*="questions"]'));
        }
        console.log("========================");
        window.showToast("Diagnostika tugallandi, konsolni tekshiring (F12)", 'info');
    };

    // ========== 9. ASOSIY INIT ==========
    window.initApp = async function() {
        console.log("[App] QuizMaster Pro v6.0 ishga tushmoqda...");
        window.showLoader("Ma'lumotlar yuklanmoqda...");
        
        try {
            // Dark Mode tugmalarini ulash
            setTimeout(() => {
                const btns = document.querySelectorAll('#theme-toggle-btn, #theme-btn, .theme-toggle');
                btns.forEach(btn => {
                    btn.removeEventListener('click', toggleDarkMode);
                    btn.addEventListener('click', toggleDarkMode);
                });
            }, 100);
            
            // Ma'lumotlarni kutish
            await window.waitForData();
            
            // Dashboard va kartochkalarni yangilash
            window.updateDashboard();
            window.renderSubjects();
            window.initSearchAndFilter();
            
            window.showToast(`✅ ${window.QUIZ_DATA.length} ta fan muvaffaqiyatli yuklandi!`, 'success');
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
                        <p style="margin: 15px 0;">Xato: ${error.message}</p>
                        <p style="margin: 10px 0; font-size: 13px;">Iltimos, F12 tugmasini bosing va konsolni tekshiring.</p>
                        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;">🔄 Qayta yuklash</button>
                        <button onclick="window.testQuestionsLoad()" style="margin-top: 20px; margin-left: 10px; padding: 10px 24px; background: #6b7280; color: white; border: none; border-radius: 8px; cursor: pointer;">🔍 Diagnostika</button>
                    </div>
                `;
            }
            window.showToast("❌ Ma'lumotlar bazasi yuklanmadi!", 'error');
        }
    };
    
    // ========== 10. ISHGA TUSHIRISH ==========
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.initApp();
        });
    } else {
        window.initApp();
    }
    
    // Global eksport
    window.QuizApp = {
        darkMode: { getState: getDarkModeState, apply: applyDarkMode, toggle: toggleDarkMode },
        showToast: window.showToast,
        showLoader: window.showLoader,
        hideLoader: window.hideLoader,
        updateDashboard: window.updateDashboard,
        renderSubjects: window.renderSubjects,
        testQuestionsLoad: window.testQuestionsLoad,
        waitForData: window.waitForData
    };
    
    console.log("[App] ✅ app.js v6.0 yuklandi - Ultra Optimized with Diagnostics!");
})();
