/**
 * ============================================================
 * questions.js — QuizMaster Pro Ma'lumotlar Bazasi
 * Barcha fanlar, savollar va ularning metadata ko'rsatkichlari
 * ============================================================
 */

'use strict';

const QUIZ_DATA = [
    {
        id: "subj_math",
        subject: "Matematika",
        icon: "∑",
        color: "#6C63FF",
        gradient: "linear-gradient(135deg, #6C63FF 0%, #3ECFCF 100%)",
        description: "Algebra, geometriya va mantiqiy misollar",
        questions: [
            { id: "m1", question: "2³ × 2² nechiga teng?", options: ["16", "32", "64", "8"], answer: "32" },
            { id: "m2", question: "√144 nechiga teng?", options: ["11", "12", "13", "14"], answer: "12" },
            { id: "m3", question: "log₂(64) nechiga teng?", options: ["4", "5", "6", "7"], answer: "6" },
            { id: "m4", question: "sin(90°) nechiga teng?", options: ["0", "0.5", "1", "-1"], answer: "1" },
            { id: "m5", question: "3x + 7 = 22 bo'lsa, x = ?", options: ["4", "5", "6", "7"], answer: "5" },
            { id: "m6", question: "Aylana yuzi formulasi qaysi?", options: ["2πr", "πr²", "4πr²", "πd"], answer: "πr²" },
            { id: "m7", question: "0.75 ni kasrga o'tkazing", options: ["1/4", "3/4", "2/3", "1/3"], answer: "3/4" },
            { id: "m8", question: "5! (faktorial) nechiga teng?", options: ["60", "100", "120", "150"], answer: "120" },
            { id: "m9", question: "Ikkita son yig'indisi 48, farqi 12. Katta son qancha?", options: ["28", "30", "32", "36"], answer: "30" },
            { id: "m10", question: "7² + 24² ning kvadrat ildizi necha?", options: ["23", "24", "25", "26"], answer: "25" },
            { id: "m11", question: "Arifmetik progressiya: 2, 5, 8, 11... Keyingi son?", options: ["12", "13", "14", "15"], answer: "14" },
            { id: "m12", question: "cos(0°) nechiga teng?", options: ["0", "1", "-1", "0.5"], answer: "1" },
            { id: "m13", question: "Uchburchak perimetri: tomonlari 3, 4, 5 sm", options: ["10", "11", "12", "13"], answer: "12" },
            { id: "m14", question: "45% ni kasrga aylantiring", options: ["4/5", "9/20", "9/25", "7/16"], answer: "9/20" },
            { id: "m15", question: "2x - 3 = 11 bo'lsa, x = ?", options: ["5", "6", "7", "8"], answer: "7" },
            { id: "m16", question: "To'rtburchak yuzi: uzunligi 8, eni 6", options: ["28", "42", "48", "56"], answer: "48" },
            { id: "m17", question: "Geometrik progressiya: 3, 6, 12... Keyingi son?", options: ["18", "20", "24", "36"], answer: "24" },
            { id: "m18", question: "tan(45°) nechiga teng?", options: ["0", "1", "√2", "√3/2"], answer: "1" },
            { id: "m19", question: "(-3)² × (-2)³ = ?", options: ["-72", "72", "-36", "36"], answer: "-72" },
            { id: "m20", question: "1000 ning 35% i necha?", options: ["300", "330", "350", "375"], answer: "350" }
        ]
    },
    {
        id: "subj_phys",
        subject: "Fizika",
        icon: "⚡",
        color: "#FF6B6B",
        gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)",
        description: "Tabiat qonunlari, mexanika va energiya",
        questions: [
            { id: "p1", question: "Yorug'lik tezligi taxminan qancha?", options: ["200,000 km/s", "300,000 km/s", "400,000 km/s", "150,000 km/s"], answer: "300,000 km/s" },
            { id: "p2", question: "Nyutonning 2-qonuni qaysi formula?", options: ["F = mv", "F = ma", "F = m/a", "F = m²a"], answer: "F = ma" },
            { id: "p3", question: "Elektr quvvati birligi?", options: ["Amper", "Volt", "Vatt", "Om"], answer: "Vatt" },
            { id: "p4", question: "Suv qaynatish harorati (1 atm)?", options: ["90°C", "95°C", "100°C", "105°C"], answer: "100°C" },
            { id: "p5", question: "Gravitatsiya tezlanishi taxminan?", options: ["8.8 m/s²", "9.8 m/s²", "10.8 m/s²", "11.8 m/s²"], answer: "9.8 m/s²" },
            { id: "p6", question: "Ohm qonuni qaysi formula?", options: ["I = U×R", "I = U/R", "I = U+R", "I = U-R"], answer: "I = U/R" },
            { id: "p7", question: "Kinetik energiya formulasi?", options: ["E = mv", "E = mv²", "E = ½mv²", "E = 2mv²"], answer: "E = ½mv²" },
            { id: "p8", question: "Ovoz tezligi havoda taxminan?", options: ["240 m/s", "340 m/s", "440 m/s", "540 m/s"], answer: "340 m/s" },
            { id: "p9", question: "Atom yadrosi nimalardan tashkil topgan?", options: ["Elektron va proton", "Proton va neytron", "Neytron va elektron", "Faqat protonlar"], answer: "Proton va neytron" },
            { id: "p10", question: "Bosim birligi SI tizimida?", options: ["Nyuton", "Paskal", "Bar", "Joule"], answer: "Paskal" },
            { id: "p11", question: "Termodinamikaning 1-qonuni nimaga oid?", options: ["Entropiyaga", "Energiya saqlanishiga", "Issiqlik o'tishiga", "Absolyut nolga"], answer: "Energiya saqlanishiga" },
            { id: "p12", question: "Qaysi rangdagi yorug'lik to'lqin uzunligi eng katta?", options: ["Binafsha", "Ko'k", "Yashil", "Qizil"], answer: "Qizil" },
            { id: "p13", question: "Elektr qarshilik birligi?", options: ["Amper", "Vatt", "Om", "Farad"], answer: "Om" },
            { id: "p14", question: "Mexanik to'lqin tarqalish uchun nima kerak?", options: ["Vakuum", "Moddiy muhit", "Magnit maydon", "Elektr maydon"], answer: "Moddiy muhit" },
            { id: "p15", question: "Absolyut nol harorat nechi Kelvin?", options: ["0 K", "-100 K", "100 K", "273 K"], answer: "0 K" },
            { id: "p16", question: "Ishlangan ish formulasi (mexanika)?", options: ["W = F/s", "W = F×s", "W = F+s", "W = F²s"], answer: "W = F×s" },
            { id: "p17", question: "Foton nima?", options: ["Elektron zaryadi", "Yorug'lik kvanti", "Neytron turi", "Magnit zarrasi"], answer: "Yorug'lik kvanti" },
            { id: "p18", question: "Inersiya — bu ...", options: ["Tezlanish hodisasi", "Jismning tezlik o'zgartirishga qarshiligi", "Tortishish kuchi", "Ishqalanish kuchi"], answer: "Jismning tezlik o'zgartirishga qarshiligi" },
            { id: "p19", question: "Linza kuchi birligi?", options: ["Metr", "Dioptri", "Lumen", "Kandela"], answer: "Dioptri" },
            { id: "p20", question: "Qaysi hodisa tovush to'lqinlariga xos?", options: ["Difraksiya", "Interferentsiya", "Rezonans", "Barcha javoblar to'g'ri"], answer: "Barcha javoblar to'g'ri" }
        ]
    },
    {
        id: "subj_eng",
        subject: "Ingliz tili",
        icon: "🔤",
        color: "#4ECDC4",
        gradient: "linear-gradient(135deg, #4ECDC4 0%, #44CF6C 100%)",
        description: "Grammar, vocabulary and idioms",
        questions: [
            { id: "e1", question: "What is the past tense of 'go'?", options: ["goed", "gone", "went", "going"], answer: "went" },
            { id: "e2", question: "Choose the correct: 'She ___ a doctor.'", options: ["am", "is", "are", "be"], answer: "is" },
            { id: "e3", question: "What does 'benevolent' mean?", options: ["Cruel", "Kind-hearted", "Lazy", "Brave"], answer: "Kind-hearted" },
            { id: "e4", question: "Which is correct? 'I ___ to school every day.'", options: ["goes", "go", "going", "gone"], answer: "go" },
            { id: "e5", question: "Synonym of 'happy':", options: ["Sad", "Angry", "Joyful", "Tired"], answer: "Joyful" },
            { id: "e6", question: "'They have been working' — qaysi zamon?", options: ["Simple Past", "Present Perfect Continuous", "Past Continuous", "Future Perfect"], answer: "Present Perfect Continuous" },
            { id: "e7", question: "Antonym of 'ancient':", options: ["Old", "Modern", "Historic", "Classic"], answer: "Modern" },
            { id: "e8", question: "Complete: 'Neither John ___ Mary came.'", options: ["or", "nor", "and", "but"], answer: "nor" },
            { id: "e9", question: "What is a 'simile'?", options: ["A metaphor", "A comparison using 'like' or 'as'", "A rhyme", "An idiom"], answer: "A comparison using 'like' or 'as'" },
            { id: "e10", question: "'I wish I ___ fly.' — correct form:", options: ["can", "could", "will", "shall"], answer: "could" },
            { id: "e11", question: "Which sentence is correct?", options: ["He don't like it", "He doesn't likes it", "He doesn't like it", "He not like it"], answer: "He doesn't like it" },
            { id: "e12", question: "Passive voice: 'The cake ___ baked by her.'", options: ["is", "was", "were", "be"], answer: "was" },
            { id: "e13", question: "Word meaning 'very happy/joyful':", options: ["Elated", "Melancholy", "Serene", "Anxious"], answer: "Elated" },
            { id: "e14", question: "Correct question tag: 'You are tired, ___?'", options: ["are you", "aren't you", "don't you", "isn't you"], answer: "aren't you" },
            { id: "e15", question: "Which is a conjunction?", options: ["Quickly", "Beautiful", "Although", "Above"], answer: "Although" },
            { id: "e16", question: "Plural of 'phenomenon':", options: ["phenomenons", "phenomenas", "phenomena", "phenomenes"], answer: "phenomena" },
            { id: "e17", question: "'Despite ___ tired, she continued working.'", options: ["be", "being", "been", "to be"], answer: "being" },
            { id: "e18", question: "What is 'onomatopoeia'?", options: ["Words that imitate sounds", "Type of poem", "Grammar rule", "Silent letter"], answer: "Words that imitate sounds" },
            { id: "e19", question: "Correct: 'There ___ many students in the hall.'", options: ["is", "are", "am", "be"], answer: "are" },
            { id: "e20", question: "Idiom: 'Break a leg' means:", options: ["Get injured", "Good luck", "Work hard", "Run fast"], answer: "Good luck" }
        ]
    },
    {
        id: "subj_prog",
        subject: "Dasturlash",
        icon: "</>",
        color: "#A29BFE",
        gradient: "linear-gradient(135deg, #A29BFE 0%, #FD79A8 100%)",
        description: "Web, algoritmlar va zamonaviy texnologiyalar",
        questions: [
            { id: "d1", question: "HTML qisqartmasi nima?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Markup Language"], answer: "Hyper Text Markup Language" },
            { id: "d2", question: "CSS'da rang belgilash uchun qaysi property?", options: ["font-color", "text-color", "color", "background-color"], answer: "color" },
            { id: "d3", question: "JavaScript'da massiv uzunligini qanday topasiz?", options: ["array.size", "array.length", "array.count", "array.total"], answer: "array.length" },
            { id: "d4", question: "Qaysi HTML tegi eng katta sarlavha?", options: ["<h6>", "<h3>", "<h1>", "<header>"], answer: "<h1>" },
            { id: "d5", question: "Python'da izoh qanday yoziladi?", options: ["// izoh", "/* izoh */", "# izoh", "-- izoh"], answer: "# izoh" },
            { id: "d6", question: "OOP'da meros (inheritance) nima?", options: ["Klassni ko'paytirish", "Bir klassdan boshqa klass xususiyatlarini olish", "Metodlarni o'chirish", "Klasslar uchun xotirani ajratish"], answer: "Bir klassdan boshqa klass xususiyatlarini olish" },
            { id: "d7", question: "SQL'da barcha yozuvlarni tanlash buyrug'i?", options: ["GET * FROM table", "SELECT * FROM table", "FETCH * FROM table", "TAKE * FROM table"], answer: "SELECT * FROM table" },
            { id: "d8", question: "Git'da yangi branch yaratish buyrug'i?", options: ["git new branch", "git branch -n", "git checkout -b", "git create branch"], answer: "git checkout -b" },
            { id: "d9", question: "HTTP status 404 nima?", options: ["Server xatosi", "Sahifa topilmadi", "Ruxsat yo'q", "Muvaffaqiyatli"], answer: "Sahifa topilmadi" },
            { id: "d10", question: "JavaScript'da const va let farqi?", options: ["Farqi yo'q", "const o'zgarmas, let o'zgaruvchi", "let o'zgarmas, const o'zgaruvchi", "const global, let lokal"], answer: "const o'zgarmas, let o'zgaruvchi" },
            { id: "d11", question: "Rekursiya nima?", options: ["Funksiya o'zini o'zi chaqirishi", "Loop turlari", "Xato ushlash", "Ma'lumotlar turi"], answer: "Funksiya o'zini o'zi chaqirishi" },
            { id: "d12", question: "JSON qisqartmasi?", options: ["Java Syntax Object Notation", "JavaScript Object Notation", "Java Standard Output Number", "JavaScript Oriented Naming"], answer: "JavaScript Object Notation" },
            { id: "d13", question: "CSS Flexbox'da elementlarni markazga joylashtirish?", options: ["align: center", "justify-content: center", "position: center", "float: center"], answer: "justify-content: center" },
            { id: "d14", question: "Big O notation O(n²) qanday algoritmga xos?", options: ["Binary search", "Bubble sort", "Linear search", "Hash table"], answer: "Bubble sort" },
            { id: "d15", question: "REST API'da yangi resurs yaratish uchun qaysi HTTP method?", options: ["GET", "PUT", "POST", "DELETE"], answer: "POST" },
            { id: "d16", question: "JavaScript'da Promise nima uchun ishlatiladi?", options: ["Sinxron kod uchun", "Asinxron operatsiyalar uchun", "DOM manipulyatsiyasi uchun", "CSS animatsiyalari uchun"], answer: "Asinxron operatsiyalar uchun" },
            { id: "d17", question: "Qaysi ma'lumotlar tuzilmasi LIFO prinsipi bilan ishlaydi?", options: ["Queue", "Stack", "Linked List", "Tree"], answer: "Stack" },
            { id: "d18", question: "Python'da list comprehension misoli?", options: ["[x for x in range(10)]", "{x for x in range(10)}", "(x for x in range(10))", "list(x for x in range(10))"], answer: "[x for x in range(10)]" },
            { id: "d19", question: "Docker nima?", options: ["Dasturlash tili", "Konteynerizatsiya platformasi", "Ma'lumotlar bazasi", "Web framework"], answer: "Konteynerizatsiya platformasi" },
            { id: "d20", question: "API qisqartmasi?", options: ["Application Programming Interface", "Advanced Protocol Integration", "Automated Process Interaction", "Application Process Integration"], answer: "Application Programming Interface" }
        ]
    },
    {
        id: "subj_hist",
        subject: "Tarix",
        icon: "🏛",
        color: "#FDCB6E",
        gradient: "linear-gradient(135deg, #FDCB6E 0%, #E17055 100%)",
        description: "Jahon va O'zbekiston tarixi voqealari",
        questions: [
            { id: "h1", question: "Amir Temur qaysi yili tug'ilgan?", options: ["1320", "1336", "1350", "1362"], answer: "1336" },
            { id: "h2", question: "Birinchi jahon urushi qachon boshlangan?", options: ["1912", "1913", "1914", "1915"], answer: "1914" },
            { id: "h3", question: "O'zbekiston mustaqilligini qaysi yil e'lon qildi?", options: ["1990", "1991", "1992", "1993"], answer: "1991" },
            { id: "h4", question: "Qaysi sivilizatsiya piramidalar qurgan?", options: ["Rim", "Yunon", "Misr", "Xitoy"], answer: "Misr" },
            { id: "h5", question: "Ikkinchi jahon urushi qachon tugagan?", options: ["1943", "1944", "1945", "1946"], answer: "1945" },
            { id: "h6", question: "Buyuk Ipak yo'li qaysi shaharlarni bog'lagan?", options: ["Paris va Berlin", "Xitoy va O'rta dengiz", "Hindiston va Angliya", "Rossiya va Yaponiya"], answer: "Xitoy va O'rta dengiz" },
            { id: "h7", question: "Qaysi yil Frantsuz inqilobi bo'lgan?", options: ["1776", "1789", "1799", "1804"], answer: "1789" },
            { id: "h8", question: "Samarqandni kim qurgan (qadimda)?", options: ["Iskandar Zulqarnayn", "Amir Temur", "Ulug'bek", "Qodir xon"], answer: "Iskandar Zulqarnayn" },
            { id: "h9", question: "Chingizxon qaysi imperiyani asos solgan?", options: ["Usmonli imperiya", "Mo'g'ul imperiyasi", "Ming sulolasi", "Saljuqiylar"], answer: "Mo'g'ul imperiyasi" },
            { id: "h10", question: "Amerikaliklar mustaqilligini qaysi yil e'lon qildi?", options: ["1774", "1775", "1776", "1777"], answer: "1776" },
            { id: "h11", question: "Buyuk Berlin devori qaysi yil qurilgan?", options: ["1959", "1961", "1963", "1965"], answer: "1961" },
            { id: "h12", question: "Qaysi davlat birinchi sun'iy yo'ldoshni uchirgan?", options: ["AQSh", "Germaniya", "SSSR", "Angliya"], answer: "SSSR" },
            { id: "h13", question: "Renessans davri qaerdan boshlangan?", options: ["Fransiya", "Ispaniya", "Italiya", "Germaniya"], answer: "Italiya" },
            { id: "h14", question: "Ulug'bek rasadxonasi qayerda qurilgan?", options: ["Buxoro", "Xiva", "Samarqand", "Toshkent"], answer: "Samarqand" },
            { id: "h15", question: "Birinchi bosma kitob qaysi yili chop etilgan?", options: ["1440", "1450", "1455", "1460"], answer: "1455" },
            { id: "h16", question: "Qaysi urush 1337-1453 yillar davom etgan?", options: ["Xoch yurishi", "Yuz yillik urush", "Uch yuzlik urush", "Nafar urushi"], answer: "Yuz yillik urush" },
            { id: "h17", question: "Kolumb Amerikani qaysi yili kashf etgan?", options: ["1488", "1490", "1492", "1498"], answer: "1492" },
            { id: "h18", question: "Qaysi shaxs 'Baburnoma'ni yozgan?", options: ["Amir Temur", "Zahiriddin Muhammad Bobur", "Ulug'bek", "Alisher Navoiy"], answer: "Zahiriddin Muhammad Bobur" },
            { id: "h19", question: "Sovet Ittifoqi qaysi yili parchalangan?", options: ["1989", "1990", "1991", "1992"], answer: "1991" },
            { id: "h20", question: "Qaysi shaharda Olimpiya o'yinlari birinchi marta o'tkazilgan?", options: ["Rim", "Afina", "Paris", "London"], answer: "Afina" }
        ]
    }
];

/**
 * Ma'lumotlarni muzlatish (Xavfsizlik uchun)
 */
Object.freeze(QUIZ_DATA);

/**
 * Global obyektga eksport qilish
 */
window.QUIZ_DATA = QUIZ_DATA;
