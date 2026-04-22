// ============================================================
// questions.js - DIAGNOSTIKA BILAN YUKLANMOQDA
// ============================================================

console.log("%c🔵 [questions.js] Fayl yuklanmoqda...", "color: #3b82f6; font-weight: bold;");
console.log("[questions.js] Yuklanish vaqti:", new Date().toLocaleTimeString());

// ============================================================
// MA'LUMOTLAR BAZASI (SODDA VA XAVFSIZ FORMAT)
// ============================================================

window.QUIZ_DATA = [
    // Fan 0: Matematika
    {
        id: 0,
        subject: "Matematika",
        icon: "fa-square-root-variable",
        color: "#4f46e5",
        questions: [
            {
                question: "log₂(8) + log₃(9) ning qiymati nechaga teng?",
                options: ["3", "4", "5", "6"],
                answer: "5",
                explanation: "log₂(8)=3, log₃(9)=2, yig'indi=5"
            },
            {
                question: "log₅(125) - log₂(4) = ?",
                options: ["1", "2", "3", "4"],
                answer: "1",
                explanation: "log₅(125)=3, log₂(4)=2, ayirma=1"
            },
            {
                question: "log₃(x) + log₃(9) = 4 tenglamani yeching",
                options: ["x=3", "x=9", "x=27", "x=81"],
                answer: "x=9",
                explanation: "log₃(9x)=4 → 9x=81 → x=9"
            },
            {
                question: "log₂(x²) = 6 bo'lsa, x ning musbat qiymati?",
                options: ["4", "8", "16", "32"],
                answer: "8",
                explanation: "2log₂x=6 → log₂x=3 → x=8"
            },
            {
                question: "ln(e⁵) + lg(100) = ?",
                options: ["5", "6", "7", "8"],
                answer: "7",
                explanation: "ln(e⁵)=5, lg(100)=2, yig'indi=7"
            },
            {
                question: "f(x) = x³ funksiyaning hosilasi?",
                options: ["x²", "3x²", "x³/3", "3x³"],
                answer: "3x²",
                explanation: "d/dx(xⁿ)=nxⁿ⁻¹"
            },
            {
                question: "f(x) = 5x⁴ + 2x² funksiyaning hosilasi?",
                options: ["20x³+4x", "20x³+2x", "5x³+2x", "20x⁴+4x"],
                answer: "20x³+4x",
                explanation: "20x³+4x"
            },
            {
                question: "f(x) = sin(x) funksiyaning hosilasi?",
                options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
                answer: "cos(x)",
                explanation: "d/dx sin(x)=cos(x)"
            },
            {
                question: "f(x) = eˣ funksiyaning hosilasi?",
                options: ["eˣ", "xeˣ⁻¹", "ln(x)·eˣ", "1/eˣ"],
                answer: "eˣ",
                explanation: "d/dx eˣ = eˣ"
            },
            {
                question: "∫(3x²) dx = ?",
                options: ["x³ + C", "3x³ + C", "x³/3 + C", "6x + C"],
                answer: "x³ + C",
                explanation: "∫3x²dx = 3·x³/3 = x³ + C"
            },
            {
                question: "∫₀¹ x² dx = ?",
                options: ["1/3", "1/2", "1", "2/3"],
                answer: "1/3",
                explanation: "[x³/3]₀¹ = 1/3"
            },
            {
                question: "Kubning diagonali 6√3 sm bo'lsa, uning hajmi?",
                options: ["216 sm³", "64 sm³", "125 sm³", "27 sm³"],
                answer: "216 sm³",
                explanation: "d = a√3 = 6√3 → a=6, V=6³=216"
            },
            {
                question: "Sfera radiusi 5 sm. Uning sirti?",
                options: ["100π sm²", "25π sm²", "50π sm²", "125π sm²"],
                answer: "100π sm²",
                explanation: "S=4πR²=4π·25=100π"
            },
            {
                question: "Konus yasovchisi 13 sm, balandligi 12 sm. Uning hajmi?",
                options: ["100π sm³", "120π sm³", "80π sm³", "60π sm³"],
                answer: "100π sm³",
                explanation: "r²=13²-12²=169-144=25→r=5, V=⅓π·25·12=100π"
            }
        ]
    },
    // Fan 1: Fizika
    {
        id: 1,
        subject: "Fizika",
        icon: "fa-atom",
        color: "#ef4444",
        questions: [
            {
                question: "Tezlikni o'lchov birligi?",
                options: ["m/s", "kg", "N", "J"],
                answer: "m/s",
                explanation: "Tezlik birligi: metr/sekund"
            },
            {
                question: "Nyuton qaysi kuch birligi?",
                options: ["Kuch", "Mass", "Tezlik", "Energiya"],
                answer: "Kuch",
                explanation: "Nyuton (N) — kuch birligi"
            },
            {
                question: "Yorug'lik tezligi taxminan?",
                options: ["300 km/s", "300 000 km/s", "3000 km/s", "30 000 km/s"],
                answer: "300 000 km/s",
                explanation: "Yorug'lik tezligi ≈ 3×10⁸ m/s = 300 000 km/s"
            },
            {
                question: "Og'irlik kuchi formulasi?",
                options: ["F=ma", "F=mg", "F=kx", "F=μN"],
                answer: "F=mg",
                explanation: "Og'irlik kuchi: F = mg"
            },
            {
                question: "Energiya birligi?",
                options: ["Vatt", "Joul", "Nyuton", "Paskal"],
                answer: "Joul",
                explanation: "Energiya birligi: Joul (J)"
            },
            {
                question: "Ohm qonuni formulasi?",
                options: ["U=IR", "I=UR", "R=UI", "U=I/R"],
                answer: "U=IR",
                explanation: "Ohm qonuni: U = I × R"
            },
            {
                question: "Erkin tushish tezlanishi?",
                options: ["9.8 m/s²", "10 m/s", "9.8 m/s", "10 m/s²"],
                answer: "9.8 m/s²",
                explanation: "g ≈ 9.8 m/s²"
            }
        ]
    },
    // Fan 2: Dasturlash
    {
        id: 2,
        subject: "Dasturlash",
        icon: "fa-code",
        color: "#8b5cf6",
        questions: [
            {
                question: "JavaScript qanday turdagi til?",
                options: ["Kompilyatsiya", "Interpretatsiya", "Gibrid", "Machine"],
                answer: "Interpretatsiya",
                explanation: "JavaScript — interpretatsiya qilinadigan til"
            },
            {
                question: "HTML nimaning qisqartmasi?",
                options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
                answer: "Hyper Text Markup Language",
                explanation: "HTML = Hyper Text Markup Language"
            },
            {
                question: "CSS nimaga xizmat qiladi?",
                options: ["Tuzilma", "Dizayn", "Mantiq", "Ma'lumotlar"],
                answer: "Dizayn",
                explanation: "CSS — dizayn uchun"
            },
            {
                question: "Python qaysi yilda yaratilgan?",
                options: ["1989", "1991", "1995", "2000"],
                answer: "1991",
                explanation: "Python 1991 yilda yaratilgan"
            }
        ]
    },
    // Fan 3: Tarix
    {
        id: 3,
        subject: "Tarix",
        icon: "fa-landmark",
        color: "#f59e0b",
        questions: [
            {
                question: "Amir Temur qachon tug'ilgan?",
                options: ["1336", "1405", "1320", "1350"],
                answer: "1336",
                explanation: "Amir Temur 1336 yilda tug'ilgan"
            },
            {
                question: "Mustaqillik kuni qachon nishonlanadi?",
                options: ["1-sentabr", "1-oktabr", "1-noyabr", "1-dekabr"],
                answer: "1-sentabr",
                explanation: "1-sentabr — Mustaqillik kuni"
            }
        ]
    },
    // Fan 4: Ingliz tili
    {
        id: 4,
        subject: "Ingliz tili",
        icon: "fa-language",
        color: "#10b981",
        questions: [
            {
                question: "'Book' so'zining tarjimasi?",
                options: ["Qalam", "Kitob", "Daftar", "Ruchka"],
                answer: "Kitob",
                explanation: "Book = Kitob"
            },
            {
                question: "'Hello' so'zining ma'nosi?",
                options: ["Salom", "Xayr", "Rahmat", "Iltimos"],
                answer: "Salom",
                explanation: "Hello = Salom"
            }
        ]
    }
];

// DIAGNOSTIKA
console.log(`%c🟢 [questions.js] ✅ MA'LUMOTLAR YUKLANDI!`, "color: #10b981; font-weight: bold;");
console.log(`[questions.js] Jami fanlar: ${window.QUIZ_DATA.length}`);
console.log(`[questions.js] Jami savollar: ${window.QUIZ_DATA.reduce((sum, f) => sum + f.questions.length, 0)}`);
console.log("[questions.js] Yuklanish tugadi:", new Date().toLocaleTimeString());
