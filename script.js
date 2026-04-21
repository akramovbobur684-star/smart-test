const BANKS = {
math:[
  {q:"sin(x) ning hosilasi nima?",o:["cos(x)","-cos(x)","sin(x)","-sin(x)"],a:0},
  {q:"2x + 5 = 13 dan x ni toping.",o:["3","4","5","6"],a:1},
  {q:"log₂(64) = ?",o:["4","5","6","7"],a:2},
  {q:"∫x² dx ning natijasi nima?",o:["x³","x³/3 + C","2x","3x²"],a:1},
  {q:"f(x) = x² - 4 funksiyasining nollari qaysilar?",o:["faqat x=2","faqat x=-2","x=±2","x=0 va 4"],a:2},
  {q:"Uchburchakning ikki burchagi 45° va 45°. Uchinchisi?",o:["60°","80°","90°","100°"],a:2},
  {q:"240 ning 15% qancha?",o:["34","36","38","40"],a:1},
  {q:"Birinchi n ta natural son yig'indisi formulasi?",o:["n(n+1)","n(n+1)/2","n²","(n+1)/2"],a:1},
  {q:"lim(x→0) sin(x)/x = ?",o:["0","∞","1","aniqlanmaydi"],a:2},
  {q:"Radiusi 7 bo'lgan doiraning yuzi?",o:["49π","14π","7π","154π"],a:0},
  {q:"√144 = ?",o:["10","12","13","14"],a:1},
  {q:"2⁸ = ?",o:["128","256","512","64"],a:1},
  {q:"x² = 49 dan |x| = ?",o:["6","7","8","9"],a:1},
  {q:"y = 3x - 5 to'g'ri chiziqning qiyaligi?",o:["3","-5","5","-3"],a:0},
  {q:"Katetlari 3 va 4 bo'lgan to'g'ri burchakli uchburchak gipotenuzasi?",o:["5","6","7","√7"],a:0},
  {q:"[[2,3],[1,4]] matritsaning determinanti?",o:["5","8","11","6"],a:0},
  {q:"3x - 2 = 7x + 6 ni yeching.",o:["x=-2","x=2","x=4","x=-4"],a:0},
  {q:"5, 10, 15, 20 sonlarining arifmetik o'rtasi?",o:["10","12,5","15","11"],a:1},
  {q:"5 ta kitobni javonga necha xil tartibda joylashtirish mumkin?",o:["25","100","120","60"],a:2},
  {q:"cos(60°) = ?",o:["√3/2","1/2","1","0"],a:1},
  {q:"48 va 36 ning EUKMi?",o:["6","8","12","24"],a:2},
  {q:"Fibonachchi ketma-ketligining 10-hadi?",o:["34","55","89","21"],a:1},
  {q:"a+b=10 va ab=24 bo'lsa, (a-b)² = ?",o:["4","16","52","100"],a:3},
  {q:"Tomoni 4 bo'lgan kubning hajmi?",o:["16","48","64","256"],a:2},
  {q:"e⁰ = ?",o:["0","e","1","∞"],a:2},
  {q:"(x³·x⁴)/x² = ?",o:["x⁵","x⁶","x⁹","x¹⁰"],a:0},
  {q:"∫₀¹ x dx = ?",o:["0","1/2","1","2"],a:1},
  {q:"sin(2x) funksiyasining davri?",o:["π","2π","π/2","4π"],a:0},
  {q:"1 dan 20 gacha nechta tub son bor?",o:["6","7","8","9"],a:2},
  {q:"7! (7 faktorial) = ?",o:["720","2520","5040","840"],a:2},
],

physics:[
  {q:"Kuch o'lchov birligi (SI)?",o:["Joule","Vatt","Nyuton","Paskal"],a:2},
  {q:"Nyutonning ikkinchi qonuni?",o:["F=mv","F=ma","a=mv","E=mc²"],a:1},
  {q:"Yorug'lik taxminan qanday tezlikda tarqaladi?",o:["3×10⁶ m/s","3×10⁸ m/s","3×10¹⁰ m/s","3×10⁴ m/s"],a:1},
  {q:"E=mc² formulasi nimani ifodalaydi?",o:["Kinetik energiya","Massa-energiya ekvivalentligi","Potentsial energiya","Elektr energiyasi"],a:1},
  {q:"Elektr qarshilik o'lchov birligi?",o:["Volt","Amper","Om","Farad"],a:2},
  {q:"Qaysi to'lqin tarqalish uchun muhit talab qilmaydi?",o:["Tovush","Suv","Elektromagnit","Seysmik"],a:2},
  {q:"Energiyaning saqlanish qonuni nimani bildiradi?",o:["Energiya faqat yaratiladi","Energiya faqat yo'qoladi","Energiya yaratilmaydi va yo'qolmaydi","Ikkalasi ham mumkin"],a:2},
  {q:"Yerda erkin tushish tezlanishi taxminan?",o:["6,8 m/s²","9,8 m/s²","11,2 m/s²","8,9 m/s²"],a:1},
  {q:"2 soniyadan so'ng tinchlikdan tushayotgan jismning tezligi?",o:["9,8 m/s","19,6 m/s","4,9 m/s","29,4 m/s"],a:1},
  {q:"Qizil yorug'likning taxminiy to'lqin uzunligi?",o:["400 nm","500 nm","650 nm","800 nm"],a:2},
  {q:"Om qonuni: V = ?",o:["IR","I/R","I²R","P/I"],a:0},
  {q:"Qaysi zarraning elektr zaryadi yo'q?",o:["Proton","Elektron","Neytron","Pozitron"],a:2},
  {q:"Quvvat o'lchov birligi?",o:["Joule","Nyuton","Vatt","Paskal"],a:2},
  {q:"Boyl qonuni nimalar o'rtasidagi bog'liqlikni tavsiflaydi?",o:["Harorat va hajm","Bosim va hajm","Harorat va bosim","Massa va hajm"],a:1},
  {q:"Doppler effekti nimaga bog'liq?",o:["Amplituda","Chastota","Tezlik","Harakatga bog'liq to'lqin uzunligi"],a:3},
  {q:"Yupqa linzalar uchun: 1/f = ?",o:["1/v + 1/u","u + v","uv","u/v"],a:0},
  {q:"Qaysi modda holatida zarrachalar eng tez harakatlanadi?",o:["Qattiq","Suyuq","Gaz","Plazma"],a:3},
  {q:"Termodinamikaning birinchi qonuni nimaga oid?",o:["Entropiya","Energiyaning saqlanishi","Muvozanat","Harorat"],a:1},
  {q:"Uglerod-14 ning yarimparchalanish davri?",o:["730 yil","5730 yil","57300 yil","573 yil"],a:1},
  {q:"Qaysi rang eng yuqori chastotaga ega?",o:["Qizil","To'q sariq","Sariq","Binafsha"],a:3},
  {q:"Ish birlimi?",o:["Nyuton","Vatt","Joule","Paskal"],a:2},
  {q:"Markazga intilma tezlanish qaysi tomonga yo'nalgan?",o:["Tangensial","Markazdan tashqariga","Markazga tomon","Vertikal pastga"],a:2},
  {q:"20°C da havoda tovushning tezligi taxminan?",o:["300 m/s","343 m/s","400 m/s","200 m/s"],a:1},
  {q:"Elektr maydon kuchlanganligining birlimi?",o:["N/C","V/m","Ham N/C ham V/m","Kulon"],a:2},
  {q:"Kinetik energiya formulasi?",o:["mv","mv²","½mv²","2mv²"],a:2},
  {q:"Fotonlar qaysi kuchning tashuvchilari?",o:["Gravitatsiya","Kuchli yadroviy","Zaif yadroviy","Elektromagnit"],a:3},
  {q:"Muhitning sindirish ko'rsatkichi = ?",o:["c/v","v/c","cv","c-v"],a:0},
  {q:"Elastik to'qnashuvlarda doimo saqlanadigan kattalik?",o:["Faqat kinetik energiya","Faqat impuls","Ikkisi ham","Hech biri"],a:2},
  {q:"Magnit maydon kuchi birlimi?",o:["Tesla","Volt","Kulon","Joule"],a:0},
  {q:"Yadrorni birlashtirib turadigan kuch?",o:["Gravitatsiya","Elektromagnit","Kuchli yadroviy","Zaif yadroviy"],a:2},
],

english:[
  {q:"'Ephemeral' so'zining sinoniomi?",o:["Abadiy","O'tkinchi","Mustahkam","Yorqin"],a:1},
  {q:"To'g'ri gapni tanlang:",o:["She don't know","She doesn't know","She didn't knew","She not know"],a:1},
  {q:"'Criterion' so'zining ko'pligi?",o:["Criterions","Criteri","Criteria","Criterias"],a:2},
  {q:"'Shamol sirlarni pichirladi' — qaysi badiiy usul?",o:["Tashhis (Simile)","Metafora","Personifikatsiya","Mubolag'a"],a:2},
  {q:"'Loquacious' nimani anglatadi?",o:["Jim","Serzuv","Tajovuzkor","Dangasa"],a:1},
  {q:"'Neither of the students ___ prepared.' — bo'shliqni to'ldiring.",o:["were","are","is","was"],a:3},
  {q:"'Benevolent' so'zining antonimi?",o:["Mehribon","Zararkunanda","Saxiy","Muloyim"],a:1},
  {q:"Hot : Cold :: Wet : ___",o:["Yomg'ir","Quruq","Suv","Qor"],a:1},
  {q:"'To bite the bullet' idiomasi nimani anglatadi?",o:["Metal yemoq","Qiyinchilikka bardoshli chidamoq","Kimnidir otmoq","Vazifadan qochmoq"],a:1},
  {q:"Passiv nisbatli gapni tanlang:",o:["She baked the cake","The cake was baked by her","He will bake tomorrow","Baking is easy"],a:1},
  {q:"Nuqta-vergulning vazifasi?",o:["Gapni tugatadi","Ikki mustaqil gapni bog'laydi","Ro'yxatni kiritadi","Oddiy ro'yxatni ajratadi"],a:1},
  {q:"'Ameliorate' nimani anglatadi?",o:["Yomonlashtirmoq","Yaxshilamoq","Baholamoq","E'tibor bermaslik"],a:1},
  {q:"'She had been studying for hours' — qaysi zamon?",o:["Oddiy o'tgan","O'tgan mukammal","O'tgan mukammal davomli","Hozirgi mukammal davomli"],a:2},
  {q:"Simile qanday qiyoslash usulini ishlatadi?",o:["Qiyoslashsiz","'Kabi' yoki 'singari' so'zlari bilan","Mubolag'a bilan","Ziddiyat bilan"],a:1},
  {q:"'The team ___ won the match.' — to'g'ri shakl?",o:["has","have","had been","are"],a:0},
  {q:"Oksümoron nima?",o:["Katta so'z","Ikki qarama-qarshi tushuncha birikmassi","Takroriy undosh tovush","Kamaytirilgan ta'rif"],a:1},
  {q:"To'g'ri yozilgan so'zni tanlang:",o:["Accomodate","Accommodate","Acommodate","Acomodate"],a:1},
  {q:"'Ubiquitous' nimani anglatadi?",o:["Kamdan-kam","Noyob","Hamma joyda mavjud","Xavfli"],a:2},
  {q:"'Although it rained, we played.' — bosh gap qaysi?",o:["Although it rained","We played","It rained","Although"],a:1},
  {q:"'Verbose' nimani anglatadi?",o:["Qisqa va lo'nda","Ortiqcha so'z ishlatadigan","Emotsional","Texnik"],a:1},
  {q:"'___ is going to the market?' — to'g'ri olmosh?",o:["Who","Whom","Whose","Which"],a:0},
  {q:"'Swimming is good exercise' — gerund qaysi so'z?",o:["is","good","exercise","Swimming"],a:3},
  {q:"'Ostentatious' nimani anglatadi?",o:["Kamtarin","Boylikni namoyishkorona ko'rsatuvchi","Juda qadimiy","Haddan tashqari ehtiyotkor"],a:1},
  {q:"'She gave him the book.' — bilvosita to'ldiruvchi?",o:["She","gave","him","the book"],a:2},
  {q:"Tovushni taqlid qiluvchi so'z qanday ataladi?",o:["Alliteratsiya","Onomatopeya","Assonans","Konsonans"],a:1},
  {q:"'Good' sifatining qiyosiy darajasi?",o:["Gooder","More good","Better","Best"],a:2},
  {q:"'Pragmatic' nimani anglatadi?",o:["Nazariy","Idealistik","Amaliy","Hissiyotli"],a:2},
  {q:"Qaysi qo'shma gap?",o:["She ran fast.","She ran fast and she won.","Although fast, she lost.","Running fast, she won."],a:1},
  {q:"'Meticulous' nimani anglatadi?",o:["Beparvo","Juda diqqatli va aniq","Shoshqaloq","Ijodiy"],a:1},
  {q:"Prefiks 'un-' qanday ma'no qo'shadi?",o:["Yana","Oldida","Inkor (emas)","Ortiqcha"],a:2},
],

programming:[
  {q:"HTML ning to'liq nomi?",o:["Hyper Text Markup Language","High Text Markup Language","Hyper Transfer Markup Language","High Transfer Machine Language"],a:0},
  {q:"Ikkilik qidiruvning vaqt murakkabligi?",o:["O(n)","O(n²)","O(log n)","O(1)"],a:2},
  {q:"LIFO tamoyilida ishlovchi ma'lumot tuzilmasi?",o:["Navbat","Stek","Massiv","Bog'liq ro'yxat"],a:1},
  {q:"OOP nimaning qisqartmasi?",o:["Ob'ektga yo'naltirilgan dasturlash","Ochiq operatsion protsedura","Tartibli ob'ekt qayta ishlash","Hech biri"],a:0},
  {q:"NULL ko'rsatkich nima?",o:["Qiymati yo'q ko'rsatkich","0 manzilga ishora qiluvchi ko'rsatkich","Ishga tushirilmagan ko'rsatkich","A va B ikkalasi"],a:3},
  {q:"O'rtacha holatda eng yaxshi saralash algoritmi?",o:["Bubble Sort — O(n²)","Merge Sort — O(n log n)","Insertion Sort — O(n²)","Selection Sort — O(n²)"],a:1},
  {q:"SQL nima uchun ishlatiladi?",o:["Sahifalarni bezash","Ma'lumotlar bazasini so'rash","Server dasturlash","Apparat boshqaruvi"],a:1},
  {q:"Java da merosni oldini oluvchi kalit so'z?",o:["static","abstract","private","final"],a:3},
  {q:"Operatsion tizimda 'deadlock' nima?",o:["Tizim ishdan chiqishi","Ikki jarayon bir-birini kutishi","Xotira to'lib ketishi","Virus turi"],a:1},
  {q:"REST API qaysi protokol ustida ishlaydi?",o:["FTP","SMTP","HTTP","TCP"],a:2},
  {q:"Python da print(type([])) ning natijasi?",o:["<class 'tuple'>","<class 'list'>","<class 'array'>","<class 'set'>"],a:1},
  {q:"Python da 'pass' operatori nima qiladi?",o:["Sikldan chiqadi","Keyingiga o'tadi","Hech narsa qilmaydi (o'rin egallovchi)","None qaytaradi"],a:2},
  {q:"'Big O' belgisi nimani tavsiflaydi?",o:["Faqat xotira","Faqat vaqt","Eng yomon holat algoritm samaradorligi","Eng yaxshi holat"],a:2},
  {q:"Quyidagilardan qaysi biri JavaScript freymvorki EMAS?",o:["React","Angular","Django","Vue"],a:2},
  {q:"'git commit' nima qiladi?",o:["GitHubga yuklaydi","O'zgarishlarni mahalliy repozitoriyga saqlaydi","Yangi tarmoq yaratadi","Tarmoqlarni birlashtiradi"],a:1},
  {q:"OOP da 'inkapsulatsiya' nima anglatadi?",o:["Xususiyatlarni meros qilish","Ichki holatni yashirish","Polimorf xulq","Ob'ekt yaratish"],a:1},
  {q:"Xesh funksiyasi qaysi ma'lumot tuzilmasida ishlatiladi?",o:["Massiv","Bog'liq ro'yxat","Xesh jadval","Stek"],a:2},
  {q:"Rekursiya nima?",o:["Abadiy tsikl","O'z-o'zini chaqiruvchi funksiya","Ma'lumot tuzilmasi turi","Xato ishlovchi"],a:1},
  {q:"TCP nima kafolatlaydi?",o:["Tezlik","Ishonchsiz yetkazib berish","Ishonchli, tartibli yetkazib berish","Ulansiz uzatish"],a:2},
  {q:"Ma'lumotlar bazasida tashqi kalit (foreign key) maqsadi?",o:["Har bir qatorni noyob identifikatsiya qilish","Ikki jadvaldagi qatorlarni bog'lash","Jadvalni indekslash","Ma'lumotlarni shifrlash"],a:1},
  {q:"Qaysi biri NoSQL ma'lumotlar bazasi?",o:["MySQL","PostgreSQL","MongoDB","SQLite"],a:2},
  {q:"Polimorfizm nima?",o:["Bir interfeys, ko'p shakl","Ma'lumotlarni yashirish","Maydonlarni meros qilish","Massiv yaratish"],a:0},
  {q:"CSS ning to'liq nomi?",o:["Computer Style Sheet","Cascading Style Sheet","Creative Style Sheet","Colorful Style Sheet"],a:1},
  {q:"JavaScript da 'closure' nima?",o:["Tugatilgan jarayon","Tashqi doiraga kirishni saqlaydigan funksiya","CSS xususiyati","Ma'lumotlar bazasi tranzaksiyasi"],a:1},
  {q:"QuickSort ning eng yomon holat vaqti?",o:["O(n log n)","O(n)","O(n²)","O(log n)"],a:2},
  {q:"Har bir tugunida ko'pi bilan 2 ta bola bo'lgan daraxt?",o:["To'liq ikkilik daraxt","Tugallangan ikkilik daraxt","Ikkilik daraxt","AVL daraxt"],a:2},
  {q:"Dasturlashda 'axlat yig'ish' (garbage collection) nima?",o:["Foydalanilmagan kodni olib tashlash","Avtomatik xotira boshqaruvi","Ma'lumotlar bazasi yozuvlarini o'chirish","Keshni tozalash"],a:1},
  {q:"Resursni YANGILASH uchun qaysi HTTP usuli ishlatiladi?",o:["GET","POST","PUT","DELETE"],a:2},
  {q:"JavaScript da 'async/await' nima muammoni hal qiladi?",o:["O'zgaruvchilar doirasi","Callback do'zax va asinxron kod o'qilishi","CSS animatsiyalar","Ma'lumotlar bazasi so'rovlari"],a:1},
  {q:"Ko'p tillarda 0.1 + 0.2 == 0.3 natijasi?",o:["true","false","undefined","xato"],a:1},
],

history:[
  {q:"Ikkinchi Jahon urushi qaysi yilda tugadi?",o:["1943","1944","1945","1946"],a:2},
  {q:"Amerika Qo'shma Shtatlarining birinchi prezidenti kim?",o:["John Adams","Tomas Jefferson","Jorj Vashington","Benjamin Franklin"],a:2},
  {q:"Renessans qaysi mamlakatda boshlandi?",o:["Fransiya","Ispaniya","Germaniya","Italiya"],a:3},
  {q:"Yuliy Tsezar qaysi imperiyaga hukmdorlik qilgan?",o:["Grek","Usmonli","Rim","Fors"],a:2},
  {q:"Fransuz inqilobi qaysi yilda boshlandi?",o:["1776","1789","1799","1815"],a:1},
  {q:"'Urush san'ati' asarini kim yozgan?",o:["Konfutsiy","Sun Tszi","Lao Tszi","Chingizxon"],a:1},
  {q:"Berlin devori qaysi yilda qulab tushdi?",o:["1987","1988","1989","1990"],a:2},
  {q:"Iskandariyada qaysi qadimiy mo'jiza joylashgan edi?",o:["Kolizey","Kutubxona","Mayoq","Bog'lar"],a:2},
  {q:"Birinchi bo'lib ayollarga milliy saylov huquqini bergan davlat?",o:["AQSH","Britaniya","Yangi Zelandiya","Fransiya"],a:2},
  {q:"Ipak yo'li Xitoyni qaysi yerga bog'lagan?",o:["Hindiston","Afrika","Yevropa","Amerika"],a:2},
  {q:"Rossiyaning oxirgi imperatori kim?",o:["Aleksandr III","Nikolay II","Buyuk Pyotr","Ivan IV"],a:1},
  {q:"Magna Karta qaysi yilda imzolandi?",o:["1066","1215","1349","1455"],a:1},
  {q:"Machu Picchuni qaysi sivilizatsiya qurgan?",o:["Asteklar","Mayalar","Inklar","Olmeklar"],a:2},
  {q:"Napoleon qaysi orolga surgun qilingan?",o:["Korsika","Elba","Muqaddas Yelena","Malta"],a:2},
  {q:"Sanoat inqilobi avval qaysi mamlakatda ro'y bergan?",o:["AQSH","Fransiya","Germaniya","Britaniya"],a:3},
  {q:"Hindistonning mustaqillik harakatini zo'ravonliksiz kim boshqargan?",o:["Nehru","Gandi","Bos","Ambedkar"],a:1},
  {q:"Sovuq urush asosan AQSH va qaysi davlat o'rtasida bo'lgan?",o:["Xitoy","SSSR","Germaniya","Britaniya"],a:1},
  {q:"Oy sirtiga birinchi qadamlar qaysi yilda qo'yildi?",o:["1965","1967","1969","1971"],a:2},
  {q:"Chingizxon qaysi imperiyani tashkil etgan?",o:["Usmonli","Mo'g'ul","Xitoy","Temuriylar"],a:1},
  {q:"'Qora o'lim' kasalligi nimadan kelib chiqqan?",o:["Virus","Bakteriya (Yersinia pestis)","Zamburug'","Parazit"],a:1},
  {q:"Sikstina kapellasi shiftini kim chizgan?",o:["Leonardo da Vinchi","Rafael","Mikelanjelo","Botticelli"],a:2},
  {q:"Versal shartnomasi qaysi urushni tugatgan?",o:["II Jahon urushi","Koreya urushi","I Jahon urushi","Vyetnam urushi"],a:2},
  {q:"Mixxat yozuvi qaysi sivilizatsiya tomonidan ixtiro qilingan?",o:["Misr","Shumer","Hind vodiysi","Xitoy"],a:1},
  {q:"Amerika fuqarolar urushi qaysi yilda tugagan?",o:["1861","1863","1865","1867"],a:2},
  {q:"Nobel mukofotiga sazovor bo'lgan birinchi ayol kim?",o:["Ona Tereza","Rozalind Franklin","Mariya Kyuri","Doroti Xodgkin"],a:2},
  {q:"Usmonli imperiya qaysi zamonaviy davlat hududida joylashgan edi?",o:["Eron","Misr","Turiya","Saudiya Arabistoni"],a:2},
  {q:"1815 yilda Napoleonning hokimiyatiga barham bergan jang?",o:["Trafalgar jangi","Austerlits jangi","Vaterloo jangi","Borodino jangi"],a:2},
  {q:"Xitoy buyuk devori asosan kimga qarshi qurilgan?",o:["Mo'g'ul bosqinchilariga","Yapon hujumlariga","Selga qarshi","Ichki isyonlarga"],a:0},
  {q:"Sovet Ittifoqi qaysi yilda tarqaldi?",o:["1989","1990","1991","1992"],a:2},
  {q:"1492 yilda Amerikaga yetib kelgan birinchi Yevropalik kim?",o:["Vaska da Gama","Amerigo Vespuchchi","Kristofor Kolumb","Ferdinand Magellan"],a:2},
],

};

/* ══════════════════════════════════════════════
   IQ SAVOLLARI — O'ZBEK TILIDA
══════════════════════════════════════════════ */
const IQ_QS = [
  {cat:"Naqshni aniqlash",q:"Ketma-ketlikni davom ettiring: 2, 4, 8, 16, ___?",o:["24","30","32","36"],a:2},
  {cat:"Mantiqiy fikrlash",q:"Barcha atirlar guldir. Ba'zi gullar tez so'liydi. Demak:",o:["Barcha atirlar so'liydi","Ba'zi atirlar so'lishi mumkin","Hech bir atir so'lmaydi","Atirlar hech qachon so'lmaydi"],a:1},
  {cat:"Fazoviy fikrlash",q:"Kubni barcha tomonlarini qizilga bo'yab, keyin 27 ta teng kichik kubga kesish kerak. Qizil tomonsiz kichik kublar nechtata?",o:["0","1","8","6"],a:1},
  {cat:"Raqamli fikrlash",q:"6 ishchi devorni 10 kunda qursa, 10 ishchi necha kunda quradi?",o:["4","6","8","12"],a:1},
  {cat:"Abstrak tafakkur",q:"Qaysi so'z boshqalardan farq qiladi: Eman, Qarag'ay, Atirgul, Chinor?",o:["Eman","Qarag'ay","Atirgul","Chinor"],a:2},
  {cat:"Analogiya",q:"Shifokor : Kasalxona :: O'qituvchi : ___",o:["O'quvchi","Sinf","Maktab","Bilim"],a:2},
  {cat:"Naqshni aniqlash",q:"Ketma-ketlikni davom ettiring: 1, 1, 2, 3, 5, 8, ___",o:["10","11","13","15"],a:2},
  {cat:"Mantiqiy fikrlash",q:"Barcha mushuklar hayvon, ba'zi hayvonlar yovvoyi. Qaysi hukm aniq to'g'ri?",o:["Barcha mushuklar yovvoyi","Ba'zi mushuklar yovvoyi","Hech bir mushuk yovvoyi emas","Hech biri aniqlanmaydi"],a:3},
  {cat:"Raqamli fikrlash",q:"Poyezd 60 km/s tezlikda 2,5 soat yurar. Qancha yo'l bosadi?",o:["120 km","140 km","150 km","160 km"],a:2},
  {cat:"Abstrak tafakkur",q:"Qaysi son naqshga mos kelmaydi: 2, 4, 6, 9, 12?",o:["4","6","9","12"],a:2},
];

/* ══════════════════════════════════════════════
   KONSTANTALAR VA HOLAT
══════════════════════════════════════════════ */
const SUBS = ['math','physics','english','programming','history'];
const SLBL = {math:'Matematika',physics:'Fizika',english:'Ingliz tili',programming:'Dasturlash',history:'Tarix'};
const SCLR = {math:'#f59e0b',physics:'#06b6d4',english:'#8b5cf6',programming:'#10b981',history:'#ef4444'};
const EXAM_DUR = 7200; // 2 soat
const IQ_DUR   = 300;  // 5 daqiqa

let A = {
  theme:'dark',
  iqScore:0, iqAnswers:[], difficulty:'O\'rta',
  iqIdx:0, iqTimer:null, iqSec:IQ_DUR, iqStarted:false,
  examMode:null, examQs:{}, examAns:{},
  curSub:'math', curIdx:0,
  examTimer:null, examSec:EXAM_DUR, examStart:null,
};

/* ══ YORDAMCHI FUNKSIYALAR ══ */
const $=id=>document.getElementById(id);
function scr(id){document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));$(id).classList.add('on')}
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function fmtTime(s){const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;return h>0?`${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`:`${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`}
function toast(msg,type='info'){const c=$('toasts');const t=document.createElement('div');t.className=`toast ${type}`;t.textContent=msg;c.appendChild(t);setTimeout(()=>t.remove(),3400)}
function modal(title,body,cb){$('mTitle').textContent=title;$('mBody').textContent=body;$('modal').style.display='flex';$('mOk').onclick=()=>{$('modal').style.display='none';cb()}}
$('mCancel').onclick=()=>$('modal').style.display='none';
$('modal').onclick=e=>{if(e.target===$('modal'))$('modal').style.display='none'};
function save(){localStorage.setItem('it_data',JSON.stringify({iqScore:A.iqScore,difficulty:A.difficulty}))}
function load(){const d=localStorage.getItem('it_data');if(d){const p=JSON.parse(d);A.iqScore=p.iqScore||0;A.difficulty=p.difficulty||"O'rta"}}
function saveResult(r){const h=JSON.parse(localStorage.getItem('it_hist')||'[]');h.unshift(r);localStorage.setItem('it_hist',JSON.stringify(h.slice(0,20)))}
function hexRgba(hex,a){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return`rgba(${r},${g},${b},${a})`}

/* ══ LOADER ══ */
window.addEventListener('load',()=>{load();setTimeout(()=>{$('loader').classList.add('gone');scr('s-home')},1900)});

/* ══ TEMA ══ */
$('themeBtn').addEventListener('click',()=>{A.theme=A.theme==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',A.theme);$('themeBtn').textContent=A.theme==='dark'?'☀':'☾'});

/* ══════════════════════════════
   BOSH SAHIFA
══════════════════════════════ */
$('btnStartIQ').addEventListener('click',()=>{scr('s-iq');resetIQ()});
$('btnHistory').addEventListener('click',()=>{if(A.iqScore===0&&!localStorage.getItem('it_data')){toast("Avval IQ testini bajaring!",'warn');return}updateDash();scr('s-dash');showSec('tarix')});

/* ══════════════════════════════
   IQ TESTI
══════════════════════════════ */
function resetIQ(){A.iqIdx=0;A.iqAnswers=[];A.iqSec=IQ_DUR;A.iqStarted=false;clearInterval(A.iqTimer);$('iqIntro').style.display='block';$('iqQwrap').style.display='none';$('iqFill').style.width='0%';$('iqCnt').textContent='0 / 10';$('iqTimer').textContent=fmtTime(IQ_DUR)}

$('btnIQGo').addEventListener('click',startIQ);
function startIQ(){
  A.iqStarted=true;
  $('iqIntro').style.display='none';
  $('iqQwrap').style.display='block';
  A.iqTimer=setInterval(()=>{
    A.iqSec--;
    $('iqTimer').textContent=fmtTime(A.iqSec);
    if(A.iqSec<=60)$('iqTimer').className='timer-chip red';
    if(A.iqSec<=0){clearInterval(A.iqTimer);finishIQ()}
  },1000);
  renderIQQ();
}

function renderIQQ(){
  const q=IQ_QS[A.iqIdx];
  $('iqCat').textContent=q.cat;
  $('iqQNum').textContent=`${A.iqIdx+1} / 10`;
  $('iqQText').textContent=q.q;
  const o=$('iqOpts');o.innerHTML='';
  ['A','B','C','D'].forEach((L,i)=>{
    const b=document.createElement('button');b.className='opt';
    b.innerHTML=`<span class="opt-l">${L}</span><span>${q.o[i]}</span>`;
    b.addEventListener('click',()=>handleIQAns(i));
    o.appendChild(b);
  });
  $('iqFill').style.width=(A.iqIdx/10*100)+'%';
  $('iqCnt').textContent=`${A.iqIdx} / 10`;
}

function handleIQAns(sel){
  const q=IQ_QS[A.iqIdx];const ok=sel===q.a;
  A.iqAnswers.push({sel,ok});
  $('iqOpts').querySelectorAll('.opt').forEach((b,i)=>{
    b.disabled=true;
    if(i===q.a)b.classList.add('ok');
    if(i===sel&&!ok)b.classList.add('ng');
  });
  setTimeout(()=>{A.iqIdx++;A.iqIdx>=IQ_QS.length?finishIQ():renderIQQ()},850);
}

function finishIQ(){
  clearInterval(A.iqTimer);
  A.iqScore=A.iqAnswers.filter(x=>x.ok).length;
  A.difficulty=A.iqScore>=8?"Qiyin":A.iqScore>=5?"O'rta":"Oson";
  save();updateDash();scr('s-dash');renderIQChart();
  toast(`IQ baholash tugadi! Daraja: ${A.difficulty}`,'ok');
}

/* ══════════════════════════════
   DASHBOARD
══════════════════════════════ */
function updateDash(){
  $('userAvatar').textContent="O'";$('userName').textContent="O'quvchi";$('dashName').textContent="O'quvchi";
  const lvlClr={Oson:'#10b981',"O'rta":'#f59e0b',Qiyin:'#ef4444'};
  $('ldot').style.background=lvlClr[A.difficulty]||'#10b981';
  $('userLevel').textContent=A.difficulty;
  $('iqLvlBadge').textContent=A.difficulty;
  $('iqScoreShow').textContent=A.iqScore;
  const desc={Oson:"Natijangiz Oson darajani ko'rsatmoqda. Asoslarni mustahkamlashga e'tibor bering."
    ,"O'rta":"Natijangiz O'rta darajani ko'rsatmoqda. Yaxshi boshlang'ich!"
    ,Qiyin:"Ajoyib! Yuqori kognitiv ball Qiyin darajani ochadi — !"};
  $('iqResDesc').textContent=desc[A.difficulty]||'';
  renderHist();updateSubSc();
}

function updateSubSc(){
  const h=JSON.parse(localStorage.getItem('it_hist')||'[]');
  SUBS.forEach(s=>{
    const el=$(s+'Sc');if(!el)return;
    const rel=h.filter(x=>x.subjects&&x.subjects[s]!==undefined);
    if(rel.length>0){const best=Math.max(...rel.map(x=>x.subjects[s]));el.textContent=`Eng yuqori: ${best}/20`;el.style.color='var(--ok)'}
  });
}

function renderHist(){
  const list=$('histList');
  const h=JSON.parse(localStorage.getItem('it_hist')||'[]');
  if(h.length===0){list.innerHTML='<div class="hist-empty">Hali yakunlangan imtihon yo\'q. Birinchi imtihonni boshlang!</div>';return}
  list.innerHTML=h.map(x=>`<div class="hist-item"><div><h4>${x.mode==='full'?"To'liq Imtihon":SLBL[x.mode]+' Mashqi'}</h4><span>${x.date} · ${x.dur} · ${x.diff}</span></div><div class="hist-score">${x.total}%</div></div>`).join('');
}

document.querySelectorAll('.sni').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.sni').forEach(x=>x.classList.remove('on'));
  b.classList.add('on');showSec(b.dataset.sec);
}));
function showSec(name){document.querySelectorAll('.dsec').forEach(s=>s.classList.remove('on'));$('sec-'+name)?.classList.add('on')}

document.querySelectorAll('.subj-btn').forEach(b=>b.addEventListener('click',()=>startExam(b.dataset.sub)));
$('btnFullExam').addEventListener('click',()=>modal("To'liq Imtihonni Boshlash",`Bu barcha 5 fandan 100 savol, 2 soat, ${A.difficulty} darajasida imtihon. Tayyormisiz?`,()=>startExam('full')));
$('btnReset').addEventListener('click',()=>modal("Profilni Tiklash","Bu barcha natijalar va tarixingizni o'chiradi. Ishonchingiz komilmi?",()=>{localStorage.clear();A.iqScore=0;A.difficulty="O'rta";scr('s-home');toast("Profil tiklandi!",'ok')}));

/* IQ Gauge Chart */
let iqGCh=null;
function renderIQChart(){
  const ctx=$('iqGauge').getContext('2d');
  if(iqGCh)iqGCh.destroy();
  const clr={Qiyin:'#5b6ef5',"O'rta":'#f59e0b',Oson:'#10b981'};
  iqGCh=new Chart(ctx,{type:'doughnut',data:{datasets:[{data:[A.iqScore,10-A.iqScore],backgroundColor:[clr[A.difficulty],'rgba(255,255,255,.06)'],borderWidth:0,circumference:270,rotation:-135}]},options:{cutout:'78%',plugins:{legend:{display:false},tooltip:{enabled:false}},animation:{animateRotate:true,duration:1200}}});
  const catMap={};
  IQ_QS.forEach((q,i)=>{if(!catMap[q.cat])catMap[q.cat]={t:0,c:0};catMap[q.cat].t++;if(A.iqAnswers[i]?.ok)catMap[q.cat].c++});
  $('iqBreakdown').innerHTML=Object.entries(catMap).map(([k,v])=>`<div class="ibd-item"><span style="flex:1">${k}</span><strong style="color:var(--acc)">${v.c}/${v.t}</strong></div>`).join('');
}

/* ══════════════════════════════
   IMTIHON MEXANIZMI
══════════════════════════════ */
function startExam(mode){
  A.examMode=mode;A.examAns={};A.examQs={};
  A.examSec=EXAM_DUR;A.examStart=Date.now();
  const subs=mode==='full'?SUBS:[mode];
  subs.forEach(s=>{A.examQs[s]=shuffle(BANKS[s]).slice(0,20);A.examAns[s]={}});
  A.curSub=subs[0];A.curIdx=0;
  scr('s-exam');buildExamUI(subs);renderQ();startExamTimer();
}

function buildExamUI(subs){
  $('examTitle').textContent=A.examMode==='full'?"To'liq Imtihon":SLBL[A.examMode]+' Mashqi';
  const tabs=$('examTabs');tabs.innerHTML='';
  subs.forEach(s=>{
    const t=document.createElement('button');t.className='etab';t.dataset.sub=s;
    t.style.setProperty('--tc',SCLR[s]);t.style.setProperty('--tc-bg',hexRgba(SCLR[s],.12));
    const cnt=Object.keys(A.examAns[s]||{}).length;
    t.innerHTML=`<span>${SLBL[s]}</span><span class="etab-cnt">${cnt}</span>`;
    t.addEventListener('click',()=>{A.curSub=s;A.curIdx=0;updTabs();renderQ();buildGrid()});
    tabs.appendChild(t);
  });updTabs();buildGrid();
}

function updTabs(){
  document.querySelectorAll('.etab').forEach(t=>{
    t.classList.toggle('on',t.dataset.sub===A.curSub);
    const cnt=Object.keys(A.examAns[t.dataset.sub]||{}).length;
    const ic=t.querySelector('.etab-cnt');if(ic)ic.textContent=cnt;
  });
}

function buildGrid(){
  const grid=$('qgrid');grid.innerHTML='';
  const qs=A.examQs[A.curSub]||[];
  qs.forEach((_,i)=>{
    const b=document.createElement('button');b.className='qgbtn';b.textContent=i+1;
    if(A.examAns[A.curSub][i]!==undefined)b.classList.add('answered');
    if(i===A.curIdx)b.classList.add('current');
    b.addEventListener('click',()=>{A.curIdx=i;renderQ();buildGrid()});
    grid.appendChild(b);
  });
  let totAns=0,totQ=0;
  Object.keys(A.examQs).forEach(s=>{totAns+=Object.keys(A.examAns[s]||{}).length;totQ+=A.examQs[s].length});
  $('msAns').textContent=totAns;$('msRem').textContent=totQ-totAns;
  $('eprog').style.width=(totAns/totQ*100)+'%';
}

function renderQ(){
  const qs=A.examQs[A.curSub],q=qs[A.curIdx];
  const answered=A.examAns[A.curSub][A.curIdx];
  $('qstag').textContent=SLBL[A.curSub];
  $('qnum').textContent=`${A.curIdx+1} / ${qs.length}`;
  $('qdiff').textContent=A.difficulty;
  $('qdiff').className='qdiff '+A.difficulty;
  $('qtext').textContent=q.q;
  const opts=$('qopts');opts.innerHTML='';
  ['A','B','C','D'].forEach((L,i)=>{
    const b=document.createElement('button');b.className='opt';
    b.innerHTML=`<span class="opt-l">${L}</span><span>${q.o[i]}</span>`;
    if(answered!==undefined){b.disabled=true;if(i===q.a)b.classList.add('ok');if(i===answered&&answered!==q.a)b.classList.add('ng')}
    else b.addEventListener('click',()=>submitAns(i));
    opts.appendChild(b);
  });
  const fb=$('afb');
  if(answered!==undefined){fb.style.display='block';if(answered===q.a){fb.className='afb ok';fb.textContent='✓ To\'g\'ri! Barakalla.'}else{fb.className='afb ng';fb.textContent=`✗ Noto'g'ri. To'g'ri javob: ${q.o[q.a]}`}}
  else fb.style.display='none';
  buildGrid();
}

function submitAns(sel){
  const s=A.curSub,i=A.curIdx,q=A.examQs[s][i];
  A.examAns[s][i]=sel;
  $('qopts').querySelectorAll('.opt').forEach((b,j)=>{b.disabled=true;if(j===q.a)b.classList.add('ok');if(j===sel&&sel!==q.a)b.classList.add('ng')});
  const fb=$('afb');fb.style.display='block';
  if(sel===q.a){fb.className='afb ok';fb.textContent="✓ To'g'ri! Barakalla."}
  else{fb.className='afb ng';fb.textContent=`✗ Noto'g'ri. To'g'ri javob: ${q.o[q.a]}`}
  updTabs();buildGrid();
  setTimeout(()=>{const qs=A.examQs[s];if(i+1<qs.length){A.curIdx=i+1;renderQ()}},1100);
}

$('btnNext').addEventListener('click',()=>{const qs=A.examQs[A.curSub];if(A.curIdx<qs.length-1){A.curIdx++;renderQ()}});
$('btnPrev').addEventListener('click',()=>{if(A.curIdx>0){A.curIdx--;renderQ()}});

/* ══ TIMER ══ */
function startExamTimer(){
  clearInterval(A.examTimer);
  A.examTimer=setInterval(()=>{
    A.examSec--;const el=$('examTimer');
    $('timerTxt').textContent=fmtTime(A.examSec);
    if(A.examSec<=600&&A.examSec>300){el.className='etimer warn';if(A.examSec===600)toast('10 daqiqa qoldi!','warn')}
    else if(A.examSec<=300){el.className='etimer red';if(A.examSec===300)toast('5 daqiqa qoldi! Tezlashing.','err')}
    if(A.examSec<=0){clearInterval(A.examTimer);toast("Vaqt tugadi! Topshirilmoqda…",'err');setTimeout(submitExam,1400)}
  },1000);
}

/* ══ TOPSHIRISH ══ */
$('btnSubmit').addEventListener('click',()=>modal("Imtihonni Topshirish","Topshirmoqchi ekansiz. Topshirilgandan so'ng o'zgartirish mumkin emas.",submitExam));

function submitExam(){
  clearInterval(A.examTimer);
  const elapsed=Math.floor((Date.now()-A.examStart)/1000);
  const subSc={};
  SUBS.forEach(s=>{
    if(!A.examQs[s])return;
    let ok=0;A.examQs[s].forEach((q,i)=>{if(A.examAns[s][i]===q.a)ok++});
    subSc[s]=ok;
  });
  const att=Object.keys(A.examQs);
  const totOk=att.reduce((sm,s)=>sm+(subSc[s]||0),0);
  const totQ=att.reduce((sm,s)=>sm+A.examQs[s].length,0);
  const pct=Math.round(totOk/totQ*100);
  saveResult({mode:A.examMode,date:new Date().toLocaleDateString('uz-UZ'),dur:fmtTime(elapsed),diff:A.difficulty,total:pct,subjects:subSc});
  scr('s-res');showResults(subSc,totOk,totQ,pct,fmtTime(elapsed));
}

/* ══════════════════════════════
   NATIJALAR
══════════════════════════════ */
function showResults(subSc,totOk,totQ,pct,dur){
  $('trophy').textContent=pct>=90?'🏆':pct>=70?'🥈':pct>=50?'🥉':'📝';
  const grade=pct>=90?"A+":pct>=80?"A":pct>=70?"B":pct>=60?"C":pct>=50?"D":"F";
  $('ovScore').textContent=pct;$('ovGrade').textContent=grade;$('ovTime').textContent="Vaqt: "+dur;
  const sr=$('srList');sr.innerHTML='';
  Object.keys(A.examQs).forEach(s=>{
    const sc=subSc[s]||0,t=A.examQs[s].length,p=Math.round(sc/t*100);
    sr.innerHTML+=`<div class="sr-row"><div class="sr-lbl">${SLBL[s]}</div><div class="sr-bar-w"><div class="sr-bar" style="width:${p}%;background:${SCLR[s]}"></div></div><div class="sr-sc">${sc}/${t}</div></div>`;
  });
  setTimeout(()=>{buildRadar(subSc);buildBar(subSc);buildDnt(totOk,totQ)},80);
  renderRev('all');setupRevFilters();
}

let rCh=null,bCh=null,dCh=null;
function buildRadar(sc){
  const ctx=$('radarCh').getContext('2d');if(rCh)rCh.destroy();
  const labels=[],data=[];
  Object.keys(A.examQs).forEach(s=>{labels.push(SLBL[s]);const v=sc[s]||0,t=A.examQs[s].length;data.push(Math.round(v/t*100))});
  const tcol=document.documentElement.getAttribute('data-theme')==='dark'?'rgba(255,255,255,.45)':'rgba(0,0,0,.5)';
  rCh=new Chart(ctx,{type:'radar',data:{labels,datasets:[{label:'Ball %',data,backgroundColor:'rgba(91,110,245,.22)',borderColor:'#5b6ef5',borderWidth:2,pointBackgroundColor:'#5b6ef5',pointRadius:4}]},options:{scales:{r:{min:0,max:100,grid:{color:'rgba(128,128,128,.15)'},ticks:{display:false},pointLabels:{color:tcol,font:{size:10}}}},plugins:{legend:{display:false}}}});
}
function buildBar(sc){
  const ctx=$('barCh').getContext('2d');if(bCh)bCh.destroy();
  const labels=[],data=[],bg=[];
  Object.keys(A.examQs).forEach(s=>{labels.push(SLBL[s].slice(0,4));data.push(sc[s]||0);bg.push(hexRgba(SCLR[s],.85))});
  bCh=new Chart(ctx,{type:'bar',data:{labels,datasets:[{data,backgroundColor:bg,borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:'#666'}},y:{grid:{color:'rgba(128,128,128,.1)'},ticks:{color:'#666'},max:20}}}});
}
function buildDnt(ok,total){
  const ctx=$('dntCh').getContext('2d');if(dCh)dCh.destroy();
  let ans=0;Object.keys(A.examQs).forEach(s=>ans+=Object.keys(A.examAns[s]||{}).length);
  const skip=total-ans,wrong=ans-ok;
  dCh=new Chart(ctx,{type:'doughnut',data:{labels:["To'g'ri","Noto'g'ri","O'tkazilgan"],datasets:[{data:[ok,wrong,skip],backgroundColor:['rgba(16,185,129,.85)','rgba(239,68,68,.85)','rgba(100,116,139,.5)'],borderWidth:0,hoverOffset:5}]},options:{responsive:true,maintainAspectRatio:false,cutout:'64%',plugins:{legend:{display:false}}}});
  $('dntLeg').innerHTML=`<span><span class="dnt-dot" style="background:#10b981"></span>To'g'ri: ${ok}</span><span><span class="dnt-dot" style="background:#ef4444"></span>Noto'g'ri: ${wrong}</span><span><span class="dnt-dot" style="background:#64748b"></span>O'tkazilgan: ${skip}</span>`;
}

function renderRev(filter){
  const list=$('revList');list.innerHTML='';
  Object.keys(A.examQs).forEach(s=>{
    A.examQs[s].forEach((q,i)=>{
      const ua=A.examAns[s][i],answered=ua!==undefined,correct=answered&&ua===q.a;
      const st=!answered?'sk':correct?'ok':'ng';
      if(filter!=='all'&&filter!==st)return;
      const stLbl=st==='ok'?"TO'G'RI":st==='ng'?"NOTO'G'RI":"O'TKAZILGAN";
      list.innerHTML+=`<div class="rev-item"><div class="rev-item-head"><div class="rev-qt">[${SLBL[s]}] ${q.q}</div><div class="rev-st ${st}">${stLbl}</div></div><div class="rev-ans"><div class="yu">Sizning javob: <span>${answered?q.o[ua]:'—'}</span></div><div class="cr">To'g'ri javob: <span>${q.o[q.a]}</span></div></div></div>`;
    });
  });
  if(!list.innerHTML)list.innerHTML='<div class="hist-empty">Bu kategoriyada savol yo\'q.</div>';
}
function setupRevFilters(){
  document.querySelectorAll('.rfbtn').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.rfbtn').forEach(x=>x.classList.remove('on'));b.classList.add('on');renderRev(b.dataset.f);
  }));
}

$('btnBackDash').addEventListener('click',()=>{updateDash();scr('s-dash')});
$('btnRetake').addEventListener('click',()=>modal("Qayta Topshirish","Yangi savollar bilan qayta topshirasizmi?",()=>startExam(A.examMode)));
$('btnHome').addEventListener('click',()=>scr('s-home'));

/* ══ KLAVIATURA YORLIQLARI ══ */
document.addEventListener('keydown',e=>{
  if($('s-exam').classList.contains('on')){
    const keys={'1':0,'2':1,'3':2,'4':3};
    if(keys[e.key]!==undefined&&A.examAns[A.curSub][A.curIdx]===undefined){
      const btns=$('qopts').querySelectorAll('.opt:not(:disabled)');
      if(btns[keys[e.key]])btns[keys[e.key]].click();
    }
    if(e.key==='ArrowRight')$('btnNext').click();
    if(e.key==='ArrowLeft')$('btnPrev').click();
  }
});

/* ══ ANTI-CHEAT ══ */
document.addEventListener('contextmenu',e=>{if($('s-exam').classList.contains('on')){e.preventDefault();toast("Imtihon davomida o'ng tugma o'chirilgan.",'warn')}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&$('s-exam').classList.contains('on'))toast('⚠ Boshqa sahifaga o\'tish aniqlandi!','err')});
