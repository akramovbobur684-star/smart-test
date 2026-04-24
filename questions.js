// Questions Database - QuizArena
// This file contains only data, no logic

const questions = [
    {
        id: 1,
        subject: "JavaScript",
        question: "JavaScript'da 'let' va 'var' o'rtasidagi asosiy farq nima?",
        options: ["Hech qanday farq yo'q", "let faqat blok doirasida ishlaydi", "var faqat blok doirasida ishlaydi", "let faqat global o'zgaruvchi"],
        answer: "let faqat blok doirasida ishlaydi"
    },
    {
        id: 2,
        subject: "JavaScript",
        question: "Array.map() metodi nima qaytaradi?",
        options: ["Yangi array", "O'zgartirilgan original array", "Boolean qiymat", "Object"],
        answer: "Yangi array"
    },
    {
        id: 3,
        subject: "JavaScript",
        question: "Promise objectining to'g'ri holatlari qaysi?",
        options: ["Pending, Resolved, Rejected", "Start, Middle, End", "Waiting, Done, Error", "None of the above"],
        answer: "Pending, Resolved, Rejected"
    },
    {
        id: 4,
        subject: "React",
        question: "React'da 'state' o'zgartirish uchun qaysi metod ishlatiladi?",
        options: ["setState()", "changeState()", "updateState()", "modifyState()"],
        answer: "setState()"
    },
    {
        id: 5,
        subject: "React",
        question: "React'da 'props' nima?",
        options: ["Komponentga yuboriladigan ma'lumotlar", "Komponentning ichki holati", "React hook", "CSS class"],
        answer: "Komponentga yuboriladigan ma'lumotlar"
    },
    {
        id: 6,
        subject: "Python",
        question: "Python'da list comprehension nima?",
        options: ["List yaratishning qisqa usuli", "Listni o'chirish", "Listni tartiblash", "Listni nusxalash"],
        answer: "List yaratishning qisqa usuli"
    },
    {
        id: 7,
        subject: "Python",
        question: "Python'da 'pip' nima uchun ishlatiladi?",
        options: ["Paketlarni boshqarish uchun", "Kodni kompilyatsiya qilish uchun", "Test yozish uchun", "Ma'lumotlar bazasiga ulanish uchun"],
        answer: "Paketlarni boshqarish uchun"
    },
    {
        id: 8,
        subject: "HTML/CSS",
        question: "CSS'da 'flexbox' nima uchun ishlatiladi?",
        options: ["Layout yaratish uchun", "Rasmlarni o'zgartirish uchun", "Animatsiya qilish uchun", "Matnni formatlash uchun"],
        answer: "Layout yaratish uchun"
    },
    {
        id: 9,
        subject: "HTML/CSS",
        question: "HTML5'da 'canvas' elementi nima uchun ishlatiladi?",
        options: ["Grafika chizish uchun", "Video ko'rsatish uchun", "Matn yozish uchun", "Forma yaratish uchun"],
        answer: "Grafika chizish uchun"
    },
    {
        id: 10,
        subject: "General",
        question: "Git'da 'commit' nima?",
        options: ["O'zgarishlarni saqlash", "Branch yaratish", "Repository ni klonlash", "Fayllarni o'chirish"],
        answer: "O'zgarishlarni saqlash"
    }
];

// Make questions available globally
if (typeof window !== 'undefined') {
    window.questions = questions;
}

// For module exports (if needed later)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questions;
}
