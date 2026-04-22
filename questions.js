/**
 * ============================================================
 * QUIZ_DATA — Ma'lumotlar bazasi (root papkada)
 * ============================================================
 */

window.QUIZ_DATA = [
    {
        id: 0,
        subject: "Matematika",
        icon: "∑",
        color: "#4f46e5",
        questions: [
            { question: "10 ning 20 foizi nechaga teng?", options: ["1", "2", "3", "4"], answer: "2" },
            { question: "Agar x + 5 = 12 bo'lsa, x nechaga teng?", options: ["5", "6", "7", "8"], answer: "7" },
            { question: "Kvadratning barcha tomonlari uzunligi...", options: ["Har xil", "Teng", "Parallel", "Perpendikulyar"], answer: "Teng" },
            { question: "π (pi) sonining taxminiy qiymati?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14" },
            { question: "√16 nechaga teng?", options: ["2", "4", "6", "8"], answer: "4" }
        ]
    },
    {
        id: 1,
        subject: "Fizika",
        icon: "⚡",
        color: "#ef4444",
        questions: [
            { question: "Tezlikni o'lchov birligi?", options: ["m/s", "kg", "N", "J"], answer: "m/s" },
            { question: "Nyuton qaysi kuch birligi?", options: ["Kuch", "Mass", "Tezlik", "Energiya"], answer: "Kuch" },
            { question: "Yorug'lik tezligi taxminan?", options: ["300 km/s", "300 000 km/s", "3000 km/s", "30 000 km/s"], answer: "300 000 km/s" }
        ]
    },
    {
        id: 2,
        subject: "Ingliz tili",
        icon: "ABC",
        color: "#10b981",
        questions: [
            { question: "'Book' so'zining tarjimasi?", options: ["Qalam", "Kitob", "Daftar", "Ruchka"], answer: "Kitob" },
            { question: "'Hello' so'zining ma'nosi?", options: ["Salom", "Xayr", "Rahmat", "Iltimos"], answer: "Salom" }
        ]
    },
    {
        id: 3,
        subject: "Dasturlash",
        icon: "</>",
        color: "#8b5cf6",
        questions: [
            { question: "JavaScript qanday turdagi til?", options: ["Kompilyatsiya", "Interpretatsiya", "Gibrid", "Machine"], answer: "Interpretatsiya" },
            { question: "HTML nimaning qisqartmasi?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" }
        ]
    },
    {
        id: 4,
        subject: "Tarix",
        icon: "🏛",
        color: "#f59e0b",
        questions: [
            { question: "Amir Temur qachon tug'ilgan?", options: ["1336", "1405", "1320", "1350"], answer: "1336" },
            { question: "Mustaqillik kuni qachon nishonlanadi?", options: ["1-sentabr", "1-oktabr", "1-noyabr", "1-dekabr"], answer: "1-sentabr" }
        ]
    }
];

console.log("✅ questions.js yuklandi! Jami fanlar:", window.QUIZ_DATA.length);
