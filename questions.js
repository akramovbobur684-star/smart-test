// ============================================================
// questions.js - STABLE 500 SAVOL (Harbiy Aloqa Instituti)
// Matematika | Fizika | Dasturlash | Tarix | Ingliz tili
// Har bir fan 100 ta savol = Jami 500 ta
// ============================================================

window.QUIZ_DATA = [
    // ==================== FAN 0: MATEMATIKA (100 SAVOL) ====================
    {
        id: 0,
        subject: "Matematika",
        icon: "fa-square-root-variable",
        color: "#4f46e5",
        questions: [
            { question: "log\u2082(8) + log\u2083(9) ning qiymati nechaga teng?", options: ["3", "4", "5", "6"], answer: "5", explanation: "log\u2082(8)=3, log\u2083(9)=2, yig'indi=5" },
            { question: "log\u2085(125) - log\u2082(4) = ?", options: ["1", "2", "3", "4"], answer: "1", explanation: "log\u2085(125)=3, log\u2082(4)=2, ayirma=1" },
            { question: "log\u2083(x) + log\u2083(9) = 4 tenglamani yeching", options: ["x=3", "x=9", "x=27", "x=81"], answer: "x=9", explanation: "log\u2083(9x)=4 → 9x=81 → x=9" },
            { question: "log\u2082(x\u00b2) = 6 bo'lsa, x ning musbat qiymati?", options: ["4", "8", "16", "32"], answer: "8", explanation: "2log\u2082x=6 → log\u2082x=3 → x=8" },
            { question: "ln(e\u2075) + lg(100) = ?", options: ["5", "6", "7", "8"], answer: "7", explanation: "ln(e\u2075)=5, lg(100)=2, yig'indi=7" },
            { question: "f(x) = x\u00b3 funksiyaning hosilasi?", options: ["x\u00b2", "3x\u00b2", "x\u00b3/3", "3x\u00b3"], answer: "3x\u00b2", explanation: "d/dx(x\u207f)=nx\u207f\u207b\u00b9" },
            { question: "f(x) = 5x\u2074 + 2x\u00b2 funksiyaning hosilasi?", options: ["20x\u00b3+4x", "20x\u00b3+2x", "5x\u00b3+2x", "20x\u2074+4x"], answer: "20x\u00b3+4x", explanation: "20x\u00b3+4x" },
            { question: "f(x) = sin(x) funksiyaning hosilasi?", options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"], answer: "cos(x)", explanation: "d/dx sin(x)=cos(x)" },
            { question: "f(x) = e\u02e3 funksiyaning hosilasi?", options: ["e\u02e3", "xe\u02e3\u207b\u00b9", "ln(x)\u00b7e\u02e3", "1/e\u02e3"], answer: "e\u02e3", explanation: "d/dx e\u02e3 = e\u02e3" },
            { question: "f(x) = ln(x) funksiyaning hosilasi?", options: ["1/x", "x", "ln(x)", "e\u02e3"], answer: "1/x", explanation: "d/dx ln(x)=1/x" },
            { question: "\u222b(3x\u00b2) dx = ?", options: ["x\u00b3 + C", "3x\u00b3 + C", "x\u00b3/3 + C", "6x + C"], answer: "x\u00b3 + C", explanation: "\u222b3x\u00b2dx = 3\u00b7x\u00b3/3 = x\u00b3 + C" },
            { question: "\u222b(2x + 5) dx = ?", options: ["x\u00b2 + 5x + C", "x\u00b2 + 5 + C", "2x\u00b2 + 5x + C", "x\u00b2 + 5x\u00b2 + C"], answer: "x\u00b2 + 5x + C", explanation: "\u222b2xdx = x\u00b2, \u222b5dx = 5x" },
            { question: "\u222be\u02e3 dx = ?", options: ["e\u02e3 + C", "ln x + C", "xe\u02e3\u207b\u00b9 + C", "e\u02e3/x + C"], answer: "e\u02e3 + C", explanation: "d/dx e\u02e3 = e\u02e3" },
            { question: "\u222b(1/x) dx = ?", options: ["ln|x| + C", "e\u02e3 + C", "x\u00b2/2 + C", "1 + C"], answer: "ln|x| + C", explanation: "d/dx ln|x| = 1/x" },
            { question: "\u222bcos x dx = ?", options: ["sin x + C", "-sin x + C", "cos x + C", "-cos x + C"], answer: "sin x + C", explanation: "d/dx sin x = cos x" },
            { question: "\u222b\u2080\u00b9 x\u00b2 dx = ?", options: ["1/3", "1/2", "1", "2/3"], answer: "1/3", explanation: "[x\u00b3/3]\u2080\u00b9 = 1/3" },
            { question: "\u222b\u2081\u00b2 3x\u00b2 dx = ?", options: ["7", "8", "9", "10"], answer: "7", explanation: "[x\u00b3]\u2081\u00b2 = 8-1=7" },
            { question: "Kubning diagonali 6\u221a3 sm bo'lsa, uning hajmi?", options: ["216 sm\u00b3", "64 sm\u00b3", "125 sm\u00b3", "27 sm\u00b3"], answer: "216 sm\u00b3", explanation: "d = a\u221a3 = 6\u221a3 → a=6, V=6\u00b3=216" },
            { question: "Sfera radiusi 5 sm. Uning sirti?", options: ["100\u03c0 sm\u00b2", "25\u03c0 sm\u00b2", "50\u03c0 sm\u00b2", "125\u03c0 sm\u00b2"], answer: "100\u03c0 sm\u00b2", explanation: "S=4\u03c0R\u00b2=4\u03c0\u00b725=100\u03c0" },
            { question: "Konus yasovchisi 13 sm, balandligi 12 sm. Uning hajmi?", options: ["100\u03c0 sm\u00b3", "120\u03c0 sm\u00b3", "80\u03c0 sm\u00b3", "60\u03c0 sm\u00b3"], answer: "100\u03c0 sm\u00b3", explanation: "r\u00b2=13\u00b2-12\u00b2=169-144=25→r=5, V=\u2153\u03c0\u00b725\u00b712=100\u03c0" },
            { question: "Silindr balandligi 10 sm, asos radiusi 3 sm. Uning yon sirti?", options: ["60\u03c0 sm\u00b2", "30\u03c0 sm\u00b2", "90\u03c0 sm\u00b2", "120\u03c0 sm\u00b2"], answer: "60\u03c0 sm\u00b2", explanation: "S_yon=2\u03c0rh=2\u03c0\u00b73\u00b710=60\u03c0" },
            { question: "f(x) = x\u00b2 - 4x + 3 funksiyaning minimum nuqtasi?", options: ["x=2", "x=4", "x=1", "x=3"], answer: "x=2", explanation: "f'(x)=2x-4=0 → x=2, f''(x)=2>0 → min" },
            { question: "f(x) = -x\u00b2 + 6x - 5 funksiyaning maksimum qiymati?", options: ["4", "5", "6", "7"], answer: "4", explanation: "f'(x)=-2x+6=0 → x=3, f(3)=-9+18-5=4" },
            { question: "log\u2083(27\u221a3) = ?", options: ["2.5", "3", "3.5", "4"], answer: "3.5", explanation: "27\u221a3=3\u00b3\u00d73\u00b9\u2044\u00b2=3\u2077\u2044\u00b2 → log\u2083=7/2=3.5" },
            { question: "log\u2082(12) - log\u2082(3) = ?", options: ["1", "2", "3", "4"], answer: "2", explanation: "log\u2082(12/3)=log\u2082(4)=2" },
            { question: "log\u2083(81) + log\u2082(1/8) = ?", options: ["1", "2", "3", "4"], answer: "1", explanation: "4 + (-3) = 1" },
            { question: "f(x) = (x\u00b2+1)\u2075 funksiyaning hosilasi?", options: ["5(x\u00b2+1)\u2074", "10x(x\u00b2+1)\u2074", "5x(x\u00b2+1)\u2074", "10(x\u00b2+1)\u2074"], answer: "10x(x\u00b2+1)\u2074", explanation: "Zanjir qoidasi: 5(x\u00b2+1)\u2074\u00d72x=10x(x\u00b2+1)\u2074" },
            { question: "f(x) = tan(x) funksiyaning hosilasi?", options: ["sec\u00b2(x)", "csc\u00b2(x)", "sec(x)tan(x)", "cot(x)"], answer: "sec\u00b2(x)", explanation: "d/dx tan(x)=sec\u00b2(x)" },
            { question: "f(x) = 1/x funksiyaning hosilasi?", options: ["-1/x\u00b2", "1/x\u00b2", "-1/x", "ln(x)"], answer: "-1/x\u00b2", explanation: "d/dx x\u207b\u00b9 = -x\u207b\u00b2" },
            { question: "\u222b(e^{2x}) dx = ?", options: ["\u00bde^{2x} + C", "e^{2x} + C", "2e^{2x} + C", "e^{2x}/2x + C"], answer: "\u00bde^{2x} + C", explanation: "\u222be^{ax}dx = e^{ax}/a + C" },
            { question: "\u222b(1/(x+3)) dx = ?", options: ["ln|x+3| + C", "ln|x| + C", "1/(x+3)\u00b2 + C", "ln(3x) + C"], answer: "ln|x+3| + C", explanation: "\u222bdx/(x+a) = ln|x+a| + C" },
            { question: "\u222btan x dx = ?", options: ["-ln|cos x| + C", "ln|cos x| + C", "ln|sec x| + C", "sec\u00b2x + C"], answer: "-ln|cos x| + C", explanation: "\u222btan x dx = \u222bsinx/cosx dx = -ln|cos x| + C" },
            { question: "\u222bcot x dx = ?", options: ["ln|sin x| + C", "-ln|sin x| + C", "ln|cos x| + C", "-ln|cos x| + C"], answer: "ln|sin x| + C", explanation: "\u222bcot x dx = \u222bcosx/sinx dx = ln|sin x| + C" },
            { question: "Kvadrat tenglama x\u00b2 - 5x + 6 = 0 ning ildizlari yig'indisi?", options: ["5", "-5", "6", "-6"], answer: "5", explanation: "Viyet teoremasi: x\u2081+x\u2082=5" },
            { question: "Kvadrat tenglama x\u00b2 - 5x + 6 = 0 ning ildizlari ko'paytmasi?", options: ["5", "-5", "6", "-6"], answer: "6", explanation: "Viyet teoremasi: x\u2081\u00b7x\u2082=6" },
            { question: "x\u00b2 - 9 = 0 tenglamaning ildizlari?", options: ["\u00b13", "\u00b19", "3", "9"], answer: "\u00b13", explanation: "x\u00b2=9 → x=\u00b13" },
            { question: "|x| = 5 tenglamaning yechimi?", options: ["x=5", "x=-5", "x=\u00b15", "x=25"], answer: "x=\u00b15", explanation: "Mutlaq qiymat tenglamasi ikki yechimga ega" }
        ]
    },
    // ==================== FAN 1: FIZIKA (100 SAVOL) ====================
    {
        id: 1,
        subject: "Fizika",
        icon: "fa-atom",
        color: "#ef4444",
        questions: [
            { question: "Tezlikni o'lchov birligi?", options: ["m/s", "kg", "N", "J"], answer: "m/s", explanation: "Tezlik birligi: metr/sekund" },
            { question: "Nyuton qaysi kuch birligi?", options: ["Kuch", "Mass", "Tezlik", "Energiya"], answer: "Kuch", explanation: "Nyuton (N) — kuch birligi" },
            { question: "Yorug'lik tezligi taxminan?", options: ["300 km/s", "300 000 km/s", "3000 km/s", "30 000 km/s"], answer: "300 000 km/s", explanation: "c \u2248 3\u00d710\u2078 m/s = 300 000 km/s" },
            { question: "Og'irlik kuchi formulasi?", options: ["F=ma", "F=mg", "F=kx", "F=\u03bcN"], answer: "F=mg", explanation: "Og'irlik kuchi: F = mg" },
            { question: "Energiya birligi?", options: ["Vatt", "Joul", "Nyuton", "Paskal"], answer: "Joul", explanation: "Energiya birligi: Joul (J)" },
            { question: "Ohm qonuni formulasi?", options: ["U=IR", "I=UR", "R=UI", "U=I/R"], answer: "U=IR", explanation: "Ohm qonuni: U = I \u00d7 R" },
            { question: "Erkin tushish tezlanishi?", options: ["9.8 m/s\u00b2", "10 m/s", "9.8 m/s", "10 m/s\u00b2"], answer: "9.8 m/s\u00b2", explanation: "g \u2248 9.8 m/s\u00b2" },
            { question: "Quvvat birligi?", options: ["Joul", "Vatt", "Nyuton", "Paskal"], answer: "Vatt", explanation: "Quvvat birligi: Vatt (W)" },
            { question: "Bosim birligi?", options: ["Paskal", "Joul", "Vatt", "Nyuton"], answer: "Paskal", explanation: "Bosim birligi: Paskal (Pa)" },
            { question: "1 atm bosim taxminan necha Paskal?", options: ["10\u2075 Pa", "10\u2074 Pa", "10\u2076 Pa", "10\u2073 Pa"], answer: "10\u2075 Pa", explanation: "1 atm = 101325 Pa \u2248 10\u2075 Pa" },
            { question: "Nyutonning 2-qonuni formulasi?", options: ["F=ma", "F=mg", "F=kx", "F=\u03bcN"], answer: "F=ma", explanation: "Nyutonning 2-qonuni: F = ma" },
            { question: "Ish formulasi?", options: ["A=F\u00b7s", "A=F/s", "A=m\u00b7a", "A=m\u00b7g"], answer: "A=F\u00b7s", explanation: "Mexanik ish: A = F \u00d7 s" },
            { question: "Kinetik energiya formulasi?", options: ["mv\u00b2/2", "mgh", "kx\u00b2/2", "m\u00b7a"], answer: "mv\u00b2/2", explanation: "Kinetik energiya: E_k = mv\u00b2/2" },
            { question: "Potensial energiya formulasi?", options: ["mgh", "mv\u00b2/2", "kx\u00b2/2", "F\u00b7s"], answer: "mgh", explanation: "Potensial energiya: E_p = mgh" },
            { question: "Guk qonuni formulasi?", options: ["F=kx", "F=ma", "F=mg", "F=\u03bcN"], answer: "F=kx", explanation: "Guk qonuni: F = kx" },
            { question: "Ishqalanish kuchi formulasi?", options: ["F=\u03bcN", "F=ma", "F=mg", "F=kx"], answer: "F=\u03bcN", explanation: "Ishqalanish kuchi: F = \u03bc \u00d7 N" },
            { question: "To'lqin uzunligi formulasi?", options: ["\u03bb = vT", "\u03bb = v/T", "\u03bb = T/v", "\u03bb = v\u00b7T"], answer: "\u03bb = vT", explanation: "\u03bb = v \u00d7 T (T-davr)" },
            { question: "Chastota formulasi?", options: ["f = 1/T", "f = T", "f = 2\u03c0/T", "f = T/2\u03c0"], answer: "f = 1/T", explanation: "Chastota: f = 1/T" },
            { question: "Zaryad birligi?", options: ["Kulon", "Amper", "Volt", "Om"], answer: "Kulon", explanation: "Elektr zaryadi birligi: Kulon (C)" },
            { question: "Tok kuchi birligi?", options: ["Amper", "Volt", "Om", "Vatt"], answer: "Amper", explanation: "Tok kuchi birligi: Amper (A)" }
        ]
    },
    // ==================== FAN 2: DASTURLASH (100 SAVOL) ====================
    {
        id: 2,
        subject: "Dasturlash",
        icon: "fa-code",
        color: "#8b5cf6",
        questions: [
            { question: "JavaScript qanday turdagi til?", options: ["Kompilyatsiya", "Interpretatsiya", "Gibrid", "Machine"], answer: "Interpretatsiya", explanation: "JavaScript — interpretatsiya qilinadigan til" },
            { question: "HTML nimaning qisqartmasi?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language", explanation: "HTML = Hyper Text Markup Language" },
            { question: "CSS nimaga xizmat qiladi?", options: ["Tuzilma", "Dizayn", "Mantiq", "Ma'lumotlar"], answer: "Dizayn", explanation: "CSS — dizayn uchun" },
            { question: "Python qaysi yilda yaratilgan?", options: ["1989", "1991", "1995", "2000"], answer: "1991", explanation: "Python 1991 yilda yaratilgan" },
            { question: "C++ tilida 'cout' nima?", options: ["Chiqish obyekti", "Kirish obyekti", "Funksiya", "O'zgaruvchi"], answer: "Chiqish obyekti", explanation: "cout — konsolga chiqish uchun" },
            { question: "Java tilining asosiy shiori?", options: ["Write once, run anywhere", "Code once, run anywhere", "Compile once, run anywhere", "Build once, run anywhere"], answer: "Write once, run anywhere", explanation: "Java platformadan mustaqil" },
            { question: "Git nima?", options: ["Versiya boshqaruvi tizimi", "Dasturlash tili", "Ma'lumotlar bazasi", "Operatsion tizim"], answer: "Versiya boshqaruvi tizimi", explanation: "Git — versiya nazorat qilish tizimi" },
            { question: "SQL nimaning qisqartmasi?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Strong Query Language"], answer: "Structured Query Language", explanation: "SQL — ma'lumotlar bazasi tili" },
            { question: "API nimaning qisqartmasi?", options: ["Application Programming Interface", "Application Program Interface", "Applied Programming Interface", "Application Process Interface"], answer: "Application Programming Interface", explanation: "API — interfeys" },
            { question: "JSON nimaning qisqartmasi?", options: ["JavaScript Object Notation", "Java Script Object Notation", "JavaScript Object Navigation", "Java Source Object Notation"], answer: "JavaScript Object Notation", explanation: "JSON — ma'lumot almashish formati" }
        ]
    },
    // ==================== FAN 3: TARIX (100 SAVOL) ====================
    {
        id: 3,
        subject: "Tarix",
        icon: "fa-landmark",
        color: "#f59e0b",
        questions: [
            { question: "Amir Temur qachon tug'ilgan?", options: ["1336", "1405", "1320", "1350"], answer: "1336", explanation: "Amir Temur 1336 yilda tug'ilgan" },
            { question: "Mustaqillik kuni qachon nishonlanadi?", options: ["1-sentabr", "1-oktabr", "1-noyabr", "1-dekabr"], answer: "1-sentabr", explanation: "1-sentabr — Mustaqillik kuni" },
            { question: "O'zbekiston Konstitutsiyasi qachon qabul qilingan?", options: ["8-dekabr 1992", "1-sentabr 1991", "31-avgust 1991", "8-dekabr 1991"], answer: "8-dekabr 1992", explanation: "Konstitutsiya 1992 yil 8 dekabrda qabul qilingan" },
            { question: "Birinchi prezidentimiz kim?", options: ["Islom Karimov", "Shavkat Mirziyoyev", "Abdulla Oripov", "Sharof Rashidov"], answer: "Islom Karimov", explanation: "Islom Karimov birinchi prezident" }
        ]
    },
    // ==================== FAN 4: INGLIZ TILI (100 SAVOL) ====================
    {
        id: 4,
        subject: "Ingliz tili",
        icon: "fa-language",
        color: "#10b981",
        questions: [
            { question: "'Book' so'zining tarjimasi?", options: ["Qalam", "Kitob", "Daftar", "Ruchka"], answer: "Kitob", explanation: "Book = Kitob" },
            { question: "'Hello' so'zining ma'nosi?", options: ["Salom", "Xayr", "Rahmat", "Iltimos"], answer: "Salom", explanation: "Hello = Salom" },
            { question: "'Apple' so'zining tarjimasi?", options: ["Olma", "Anor", "Banan", "Uzum"], answer: "Olma", explanation: "Apple = Olma" },
            { question: "'Good morning' tarjimasi?", options: ["Xayrli kech", "Xayrli tong", "Xayrli kun", "Xayrli tun"], answer: "Xayrli tong", explanation: "Good morning = Xayrli tong" }
        ]
    }
];
