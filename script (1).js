/* ══════════════════════════════════════════════
   AI INTEGRATSIYA — MULTI-MODEL TIZIMI
══════════════════════════════════════════════ */

const AI_CONFIG = {
    // API kalitlarni bu yerga joylashtiring
    gemini: {
        key: "YOUR_GEMINI_API_KEY",
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
    },
    claude: {
        key: "YOUR_CLAUDE_API_KEY",
        url: "https://api.anthropic.com/v1/messages"
    },
    grok: {
        key: "YOUR_XAI_GROK_API_KEY",
        url: "https://api.x.ai/v1/chat/completions"
    }
};

/**
 * AI dan savollarni olish funksiyasi
 * @param {string} category - Fan nomi
 */
async function fetchAIQuestions(category) {
    const subjectName = SLBL[category] || category;
    
    // Savollar har xil bo'lishi uchun tasodifiy "seed" qo'shamiz
    const randomSeed = Math.floor(Math.random() * 1000);
    
    const prompt = `Menga ${subjectName} fanidan 10 ta qiziqarli va ${A.difficulty} darajadagi test savollarini tayyorlab ber. 
    ID: ${randomSeed}. 
    Javob faqat va faqat quyidagi formatdagi JSON massivi bo'lsin:
    [{"question": "savol matni", "options": ["variant1", "variant2", "variant3", "variant4"], "correct": "to'g'ri variant matni"}]
    Hech qanday tushuntirish yoki qo'shimcha matn yozma!`;

    // 1-urinish: Gemini (Tez va tekinroq)
    try {
        return await callGemini(prompt);
    } catch (e) {
        console.warn("Gemini xatosi, Grok/Claude'ga o'tilmoqda...", e);
        // Bu yerda zaxira sifatida boshqa modellarni chaqirish mumkin
        // return await callGrok(prompt); 
    }
}

// --- GEMINI IMPLEMENTATION ---
async function callGemini(prompt) {
    const response = await fetch(`${AI_CONFIG.gemini.url}?key=${AI_CONFIG.gemini.key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();
    let rawText = data.candidates[0].content.parts[0].text;
    return parseAIJson(rawText);
}

// AI qaytargan matnni toza JSONga aylantirish
function parseAIJson(text) {
    try {
        // Markdown backticklarini tozalash
        const cleanJson = text.replace(/```json|```/g, "").trim();
        return JSON.parse(cleanJson);
    } catch (err) {
        console.error("JSON parsing xatosi:", err);
        return null;
    }
}

/* ══════════════════════════════════════════════
   IMTIHONNI BOSHLASH (YANGILANGAN)
══════════════════════════════════════════════ */
async function startExam(category) {
    // Loader ko'rsatish
    $('loader').classList.remove('gone');
    toast("AI yangi savollar tayyorlamoqda...", "info");

    try {
        const aiQuestions = await fetchAIQuestions(category);

        if (aiQuestions && aiQuestions.length > 0) {
            // Kelgan savollarni formatlab BANKS'ga joylaymiz
            BANKS[category] = aiQuestions.map(item => ({
                q: item.question,
                o: shuffle(item.options), // Variantlarni ham aralashtiramiz
                a: 0 // To'g'ri javobni topish logikasini quyida qilamiz
            }));

            // To'g'ri javob indeksini qayta aniqlash (chunki variantlar aralashdi)
            BANKS[category].forEach(item => {
                const originalCorrect = aiQuestions.find(q => q.question === item.q).correct;
                item.a = item.o.indexOf(originalCorrect);
            });

            toast("Savollar yangilandi!", "ok");
        }
    } catch (err) {
        toast("AI dan savol olishda xatolik. Eski savollar yuklanadi.", "warn");
    } finally {
        $('loader').classList.add('gone');
    }

    // Imtihonni eski tartibda davom ettirish
    A.examMode = category;
    A.examAns = {}; A.examQs = {};
    A.examSec = EXAM_DUR;
    A.examStart = Date.now();
    
    const subs = category === 'full' ? SUBS : [category];
    subs.forEach(s => {
        // Agar AI savol bermagan bo'lsa, lokal bazadan oladi
        A.examQs[s] = shuffle(BANKS[s]).slice(0, 20);
        A.examAns[s] = {};
    });

    A.curSub = subs[0];
    A.curIdx = 0;
    scr('s-exam');
    buildExamUI(subs);
    renderQ();
    startExamTimer();
}
