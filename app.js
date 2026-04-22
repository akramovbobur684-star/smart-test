// ============================================================
// app.js - Dashboard (To'g'ri URL yaratish + Debug Logs)
// ============================================================

(function() {
    'use strict';

    // ========== DARK MODE ==========
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

    applyDarkMode(getDarkModeState());

    // ========== TOAST ==========
    window.showToast = function(message, type = 'info') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#4f46e5' };
        toast.style.backgroundColor = colors[type];
        toast.style.cssText = `
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
            padding: 12px 24px; border-radius: 60px; color: white; z-index: 10000;
            font-weight: 600; font-size: 14px; white-space: nowrap; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideUp 0.3s ease-out; background-color: ${colors[type]};
        `;
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    };

    // ========== DASHBOARD FUNKSIYALARI ==========
    function getSubjectsMeta() {
        if (!window.QUIZ_DATA || !window.QUIZ_DATA.length) return [];
        return window.QUIZ_DATA.map((s, idx) => ({
            id: idx,
            subject: s.subject,
            icon: s.icon,
            color: s.color,
            questionsCount: s.questions ? s.questions.length : 0
        }));
    }

    function updateDashboard() {
        const meta = getSubjectsMeta();
        
        let totalQuestions = 0;
        for (let i = 0; i < meta.length; i++) {
            totalQuestions += meta[i].questionsCount || 0;
        }
        
        let totalTests = 0, avgScore = 0, masteredCount = 0;
        try {
            const stored = localStorage.getItem('qm_results');
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
        } catch(e) {}
        
        const totalTestsEl = document.getElementById('stat-total-tests');
        const avgScoreEl = document.getElementById('stat-avg-score');
        const masteredEl = document.getElementById('stat-mastered');
        const totalQuestionsEl = document.getElementById('stat-total-questions');
        
        if (totalTestsEl) totalTestsEl.textContent = totalTests;
        if (avgScoreEl) avgScoreEl.textContent = `${avgScore}%`;
        if (masteredEl) masteredEl.textContent = masteredCount;
        if (totalQuestionsEl) totalQuestionsEl.textContent = totalQuestions;
    }

    function renderSubjects() {
        const grid = document.getElementById('subjects-grid');
        if (!grid) return;
        
        const meta = getSubjectsMeta();
        
        if (!meta.length) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                    <i class="fas fa-database" style="font-size: 64px; color: #ef4444; margin-bottom: 20px;"></i>
                    <h3 style="color: #ef4444;">Ma'lumotlar bazasi topilmadi!</h3>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;">🔄 Qayta yuklash</button>
                </div>
            `;
            return;
        }
        
        let resultsMap = new Map();
        try {
            const stored = localStorage.getItem('qm_results');
            if (stored) {
                const results = JSON.parse(stored);
                for (let i = 0; i < results.length; i++) {
                    const r = results[i];
                    if (!resultsMap.has(r.subjectIndex)) resultsMap.set(r.subjectIndex, []);
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
            // ========== MUHIM: To'g'ri URL yaratish ==========
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.getAttribute('data-idx'), 10);
                const targetUrl = `quiz.html?subject=${idx}`;
                console.log(`[Dashboard] 🔗 Testga o'tish: ID=${idx} → ${targetUrl}`);
                window.location.href = targetUrl;
            });
            
            card.addEventListener('click', (e) => {
                if (e.target !== btn && !btn.contains(e.target)) {
                    btn.click();
                }
            });
            
            grid.appendChild(card);
        }
        
        console.log(`[Dashboard] ✅ ${meta.length} ta fan kartochkasi yaratildi`);
    }
    
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function initSearchAndFilter() {
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
    }

    function waitForData() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50;
            
            const interval = setInterval(() => {
                attempts++;
                if (window.QUIZ_DATA && window.QUIZ_DATA.length > 0) {
                    clearInterval(interval);
                    console.log(`[Dashboard] ✅ Ma'lumotlar yuklandi: ${window.QUIZ_DATA.length} ta fan`);
                    resolve();
                } else if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    console.error('[Dashboard] ❌ Ma\'lumotlar yuklanmadi!');
                    reject();
                }
            }, 100);
        });
    }

    async function initApp() {
        console.log('[Dashboard] 🚀 Sahifa ishga tushmoqda...');
        
        try {
            await waitForData();
            updateDashboard();
            renderSubjects();
            initSearchAndFilter();
            window.showToast(`✅ ${window.QUIZ_DATA.length} ta fan yuklandi!`, 'success');
            console.log('[Dashboard] ✅ Initialization complete!');
        } catch(e) {
            console.error('[Dashboard] ❌ Initialization failed:', e);
            const grid = document.getElementById('subjects-grid');
            if (grid) {
                grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 64px; color: #ef4444; margin-bottom: 20px;"></i>
                        <h3 style="color: #ef4444;">Ma'lumotlar bazasi yuklanmadi!</h3>
                        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;">🔄 Qayta yuklash</button>
                    </div>
                `;
            }
        }
    }
    
    // Dark Mode tugmalarini ulash
    setTimeout(() => {
        const btns = document.querySelectorAll('#theme-toggle-btn, #theme-btn, .theme-toggle');
        btns.forEach(btn => {
            btn.removeEventListener('click', toggleDarkMode);
            btn.addEventListener('click', toggleDarkMode);
        });
    }, 100);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
    
    window.QuizApp = {
        updateDashboard: updateDashboard,
        renderSubjects: renderSubjects,
        showToast: window.showToast
    };
})();
</script>
