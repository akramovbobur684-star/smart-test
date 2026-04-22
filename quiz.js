/**
 * ============================================================
 * QUIZ_DATA — Intellectual Quiz Database v3.0
 * Global eksport va fallback tizimi bilan
 * ============================================================
 */

(function() {
    'use strict';

    // Asosiy ma'lumotlar bazasi
    const QUIZ_DATA_RAW = [
        {
            id: 0,
            subject: "JavaScript Asoslari",
            icon: "📘",
            color: "#f7df1e",
            questions: [
                {
                    question: "JavaScript qanday turdagi til?",
                    options: ["Kompilyatsiya", "Interpretatsiya", "Gibrid", "Machine Code"],
                    answer: "Interpretatsiya"
                },
                {
                    question: "`var`, `let`, `const` orasida qaysi biri block-scoped?",
                    options: ["Faqat var", "Faqat let", "let va const", "Hammasi"],
                    answer: "let va const"
                },
                {
                    question: "`===` va `==` farqi?",
                    options: ["Hech qanday", "`===` tiplarni tekshiradi", "`==` tiplarni tekshiradi", "Teskari ishlaydi"],
                    answer: "`===` tiplarni tekshiradi"
                }
            ]
        },
        {
            id: 1,
            subject: "React.js",
            icon: "⚛️",
            color: "#61dafb",
            questions: [
                {
                    question: "React komponentlari qanday ma'lumotlarni qabul qiladi?",
                    options: ["State", "Props", "Both", "Store"],
                    answer: "Props"
                },
                {
                    question: "Hook lar qaysi versiyada qo'shilgan?",
                    options: ["v15", "v16.8", "v17", "v18"],
                    answer: "v16.8"
                }
            ]
        },
        {
            id: 2,
            subject: "Python Dasturlash",
            icon: "🐍",
            color: "#3776ab",
            questions: [
                {
                    question: "Python qaysi paradigmada ishlaydi?",
                    options: ["Funktsional", "Obyektga yo'naltirilgan", "Ikkalasi", "Hech biri"],
                    answer: "Ikkalasi"
                }
            ]
        }
    ];

    // FALLBACK — agar asosiy ma'lumotlar yo'qolsa yoki buzilsa
    const FALLBACK_QUIZ_DATA = [
        {
            id: 0,
            subject: "Fallback Test",
            icon: "🛡️",
            color: "#ff6b6b",
            questions: [
                {
                    question: "Bu fallback savol. Tizim asosiy ma'lumotlarni topa olmadi.",
                    options: ["Davom etish", "Qayta yuklash", "Admin bilan bog'lanish", "Keyinroq"],
                    answer: "Davom etish"
                }
            ]
        }
    ];

    // Xavfsiz global eksport
    window.QUIZ_DATA = null;
    window.QUIZ_DATA_LOADED = false;
    window.QUIZ_DATA_ERROR = null;

    function validateData(data) {
        if (!data || !Array.isArray(data)) return false;
        if (data.length === 0) return false;
        
        // Har bir fanni tekshirish
        for (let i = 0; i < data.length; i++) {
            const subject = data[i];
            if (!subject.subject || !subject.questions || !Array.isArray(subject.questions)) {
                console.error(`[QuizData] ${i}-indeksli fan noto'g'ri formatda`);
                return false;
            }
            if (subject.questions.length === 0) {
                console.warn(`[QuizData] ${subject.subject} fanida savollar yo'q`);
            }
        }
        return true;
    }

    // Asosiy ma'lumotlarni yuklash
    try {
        if (validateData(QUIZ_DATA_RAW)) {
            window.QUIZ_DATA = QUIZ_DATA_RAW;
            window.QUIZ_DATA_LOADED = true;
            console.log("%c[QuizData] ✅ Ma'lumotlar bazasi muvaffaqiyatli yuklandi", "color: #2ed573; font-weight: bold;");
        } else {
            throw new Error("Asosiy ma'lumotlar validatsiyadan o'tmadi");
        }
    } catch (e) {
        console.error("[QuizData] Asosiy ma'lumotlarni yuklashda xatolik:", e);
        window.QUIZ_DATA_ERROR = e.message;
        
        // Fallback ni ishga tushirish
        if (validateData(FALLBACK_QUIZ_DATA)) {
            window.QUIZ_DATA = FALLBACK_QUIZ_DATA;
            console.warn("%c[QuizData] ⚠️ Fallback ma'lumotlar ishlatilmoqda", "color: #ffa502; font-weight: bold;");
        } else {
            console.error("[QuizData] Fallback ham ishlamadi!");
            window.QUIZ_DATA = [];
        }
    }

    // Qo'shimcha: ma'lumotlar holatini tekshirish funksiyasi
    window.quizDataHealth = function() {
        return {
            loaded: window.QUIZ_DATA_LOADED,
            subjectsCount: window.QUIZ_DATA ? window.QUIZ_DATA.length : 0,
            error: window.QUIZ_DATA_ERROR,
            details: window.QUIZ_DATA ? window.QUIZ_DATA.map(s => ({
                name: s.subject,
                questionsCount: s.questions.length
            })) : []
        };
    };
})();
