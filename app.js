// ============================================================
// app.js - QuizMaster Pro ULTRA OPTIMIZED v5.0
// 1660+ savol bilan ishlash uchun maksimal tezlik
// Lazy Loading, Timeout, Error Handling, Dark Mode
// ============================================================

(function() {
    'use strict';

    // ========== 1. DARK MODE - ENG TEZKOR (BOG'LIQLIKSIZ) ==========
    
    // Dark Mode holatini olish
    function getDarkModeState() {
        const saved = localStorage.getItem('quiz_theme');
        if (saved !== null) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Dark Mode ni qo'llash
    function applyDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Barcha dark mode tugmalarini yangilash
        const btns = document.querySelectorAll('#theme-toggle-btn, #theme-btn, .theme-toggle');
        btns.forEach(btn => {
            if (btn) {
                btn.innerHTML = isDark ? '☀️ Light' : '🌙 Dark';
            }
        });
    }
    
    // Dark Mode toggle
    function toggleDarkMode() {
        const isDark = !document.body.classList.contains('dark-mode');
        applyDarkMode(isDark);
        localStorage.setItem('quiz_theme', isDark ? 'dark' : 'light');
        
        // Toast xabar (agar mavjud bo'lsa)
        if (window.showToast) {
            window.showToast(isDark ? '🌙 Tungi rejim yoqildi' : '🌞 Yorug\' rejim yoqildi', 'info');
        }
    }
    
    // Dark Mode ni ishga tushirish (darhol)
    applyDarkMode(getDarkModeState());
    
    // DOM yuklangandan keyin tugmalarni ulash
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const btns = document.querySelectorAll('#theme-toggle-btn, #theme-btn, .theme-toggle');
            btns.forEach(btn => {
                btn.removeEventListener('click', toggleDarkMode);
                btn.addEventListener('click', toggleDarkMode);
            });
        });
    } else {
        const btns = document.querySelectorAll('#theme-toggle-btn, #theme-btn, .theme-toggle');
        btns.forEach(btn => {
            btn.removeEventListener('click', toggleDarkMode);
            btn.addEventListener('click', toggleDarkMode);
        });
    }

    // ========== 2. TOAST XABAR (TEZKOR) ==========
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
    
    // Animatsiyalar
    if (!document.querySelector('#toast-animations')) {
        const style = document.createElement('style');
        style.id = 'toast-animations';
        style.textContent = `
            @keyframes slideInToast {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutToast {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ========== 3. YUKLASH INDIKATORI ==========
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
            </div>
        `;
        
        if (!document.querySelector('#loader-animations')) {
            const animStyle = document.createElement('style');
            animStyle.id = 'loader-animations';
            animStyle.textContent = `@keyframes spinLoader { to { transform: rotate(360deg); } }`;
            document.head.appendChild(animStyle);
        }
        
        document.body.appendChild(loader);
    };
    
    window.hideLoader = function() {
        const loader = document.querySelector('.loader-overlay');
        if (loader) loader.remove();
    };
    
    window.showError = function(message, showRetry = true) {
        const container = document.getElementById('subjects-grid');
        if (container) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 64px; color: #ef4444; margin-bottom: 20px;"></i>
                    <h3 style="color: #ef4444; margin-bottom: 15px;">Xatolik yuz berdi!</h3>
                    <p style="margin-bottom: 20px;">${message}</p>
                    ${showRetry ? '<button onclick="location.reload()" style="padding: 10px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;">🔄 Qayta yuklash</button>' : ''}
                </div>
            `;
        }
        window.hideLoader();
        window.showToast(message, 'error');
    };

    // ========== 4. TEZKOR STATISTIKA (LAZY LOADING) ==========
    // 1660+ savolni qotirmasdan hisoblash
    window.calculateTotalQuestions = function() {
        if (!window.QUIZ_DATA || !window.QUIZ_DATA.length) return 0;
        
        // TEZKOR USUL: reduce + length (brauzerni qotirmaydi)
        let total = 0;
        for (let i = 0; i < window.QUIZ_DATA.length; i++) {
            if (window.QUIZ_DATA[i].questions) {
                total += window.QUIZ_DATA[i].questions.length;
            }
        }
        return total;
    };
    
    // Jami testlar soni (localStorage'dan tezkor o'qish)
    window.getTotalTestsCount = function() {
        try {
            const stored = localStorage.getItem('qm_results');
            if (!stored) return 0;
            const results = JSON.parse(stored);
            return results.length;
        } catch(e) {
            return 0;
        }
    };
    
    // O'rtacha ball
    window.getAverageScore = function() {
        try {
            const stored = localStorage.getItem('qm_results');
            if (!stored) return 0;
            const results = JSON.parse(stored);
            if (!results.length) return 0;
            const sum = results.reduce((acc, r) => acc + (r.percent || 0), 0);
            return Math.round(sum / results.length);
        } catch(e) {
            return 0;
        }
    };
    
    // O'zlashtirilgan fanlar (85%+)
    window.getMasteredSubjectsCount = function() {
        try {
            const stored = localStorage.getItem('qm_results');
            if (!stored) return 0;
            const results = JSON.parse(stored);
            const mastered = new Set();
            results.forEach(r => {
                if ((r.percent || 0) >= 85) mastered.add(r.subjectIndex);
            });
            return mastered.size;
        } catch(e) {
            return 0;
        }
    };

    // ========== 5. DASHBOARDNI YANGILASH (TEZKOR) ==========
    window.updateDashboard = function() {
        const totalTestsEl = document.getElementById('stat-total-tests');
        const avgScoreEl = document.getElementById('stat-avg-score');
        const masteredEl = document.getElementById('stat-mastered');
        const totalQuestionsEl = document.getElementById('stat-total-questions');
        
        if (totalTestsEl) totalTestsEl.textContent = window.getTotalTestsCount();
        if (avgScoreEl) avgScoreEl.textContent = `${window.getAverageScore()}%`;
        if (masteredEl) masteredEl.textContent = window.getMasteredSubjectsCount();
        
        // Jami savollar (faqat bir marta hisoblanadi)
        if (totalQuestionsEl && !window._totalQuestionsCached) {
            window._totalQuestionsCached = window.calculateTotalQuestions();
            totalQuestionsEl.textContent = window._totalQuestionsCached;
        } else if (totalQuestionsEl) {
            totalQuestionsEl.textContent = window._totalQuestionsCached || 0;
        }
    };

    // ========== 6. FAN KARTOCHKALARINI RENDER QILISH (OPTIMIZED) ==========
    window.renderSubjects = function() {
        const grid = document.getElementById('subjects-grid');
        if (!grid) return;
        
        if (!window.QUIZ_DATA || !window.QUIZ_DATA.length) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <i class="fas fa-database"></i>
                    <h3>Ma'lumotlar bazasi topilmadi!</h3>
                    <p>questions.js fayli mavjudligini tekshiring.</p>
                    <button onclick="location.reload()" style="margin-top:15px; padding:10px 20px; cursor:pointer;">🔄 Qayta yuklash</button>
                </div>
            `;
            return;
        }
        
        // Natijalarni tezkor o'qish
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
        
        // Kartochkalarni yaratish
        grid.innerHTML = '';
        
        for (let i = 0; i < window.QUIZ_DATA.length; i++) {
            const subject = window.QUIZ_DATA[i];
            const subjectResults = resultsMap.get(i) || [];
            const bestScore = subjectResults.length ? Math.max(...subjectResults.map(r => r.percent || 0)) : null;
            const attemptsCount = subjectResults.length;
            
            // Badge turi
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

    // ========== 7. TIMEOUT BILAN MA'LUMOTLARNI KUTISH ==========
    let dataCheckInterval = null;
    let timeoutId = null;
    
    function waitForData() {
        let attempts = 0;
        const maxAttempts = 50; // 5 soniya (100ms * 50)
        
        if (dataCheckInterval) clearInterval(dataCheckInterval);
        if (timeoutId) clearTimeout(timeoutId);
        
        dataCheckInterval = setInterval(() => {
            attempts++;
            
            if (window.QUIZ_DATA && window.QUIZ_DATA.length > 0) {
                // Ma'lumot tayyor!
                clearInterval(dataCheckInterval);
                if (timeoutId) clearTimeout(timeoutId);
                dataCheckInterval = null;
                
                window.updateDashboard();
                window.renderSubjects();
                window.showToast(`✅ ${window.QUIZ_DATA.length} ta fan yuklandi!`, 'success');
            } else if (attempts >= maxAttempts) {
                // Timeout - ma'lumot yuklanmadi
                clearInterval(dataCheckInterval);
                if (timeoutId) clearTimeout(timeoutId);
                dataCheckInterval = null;
                
                window.showError("Ma'lumotlar bazasi yuklanmadi! Iltimos, internet aloqangizni tekshiring yoki sahifani qayta yuklang.", true);
            }
        }, 100);
        
        // Umumiy timeout (10 soniya)
        timeoutId = setTimeout(() => {
            if (dataCheckInterval) {
                clearInterval(dataCheckInterval);
                dataCheckInterval = null;
            }
            if (!window.QUIZ_DATA || !window.QUIZ_DATA.length) {
                window.showError("Ma'lumotlar yuklashda vaqt tugadi! Iltimos, sahifani qayta yuklang.", true);
            }
        }, 10000);
    }

    // ========== 8. QIDIRUV VA FILTR (TEZKOR) ==========
    window.initSearchAndFilter = function() {
        const searchInput = document.getElementById('search-input');
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const cards = document.querySelectorAll('.subject-card');
                cards.forEach(card => {
                    const name = card.querySelector('.subject-name')?.innerText.toLowerCase() || '';
                    if (name.includes(term)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
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
                        const exactSubjects = ['Matematika', 'Fizika', 'Dasturlash', 'Biologiya'];
                        card.style.display = subject && exactSubjects.includes(subject.subject) ? '' : 'none';
                    } else if (filter === 'humanitarian') {
                        const humanSubjects = ['Ingliz tili', 'Tarix', 'Adabiyot'];
                        card.style.display = subject && humanSubjects.includes(subject.subject) ? '' : 'none';
                    } else if (filter === 'retake') {
                        const badge = card.querySelector('.smart-badge');
                        const isRetake = badge && badge.classList.contains('badge-retake');
                        card.style.display = isRetake ? '' : 'none';
                    }
                });
            });
        });
    };

    // ========== 9. ASOSIY INIT ==========
    window.initApp = function() {
        window.showLoader("Ma'lumotlar yuklanmoqda...");
        waitForData();
        
        // DOM tayyor bo'lganda qidiruv va filtrni ulash
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.initSearchAndFilter();
            });
        } else {
            window.initSearchAndFilter();
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
    
    // Eksport
    window.QuizApp = {
        darkMode: { getState: getDarkModeState, apply: applyDarkMode, toggle: toggleDarkMode },
        showToast: window.showToast,
        showLoader: window.showLoader,
        hideLoader: window.hideLoader,
        updateDashboard: window.updateDashboard,
        renderSubjects: window.renderSubjects,
        calculateTotalQuestions: window.calculateTotalQuestions,
        getTotalTestsCount: window.getTotalTestsCount,
        getAverageScore: window.getAverageScore,
        getMasteredSubjectsCount: window.getMasteredSubjectsCount
    };
    
    console.log("✅ app.js v5.0 yuklandi (Ultra Optimized for 1660+ questions)");
})();
