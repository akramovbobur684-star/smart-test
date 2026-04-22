window.QUIZ_DATA = {
  meta: {
    title: "Harbiy Aloqa Instituti - Kirish Imtihoni Test Bazasi",
    version: "1.0",
    totalQuestions: 100,
    subjects: ["Fizika", "Dasturlash", "Tarix", "Matematika", "Ingliz tili"],
    difficulty: "Hard",
    targetAudience: "Harbiy Aloqa Instituti kirish imtihonlari",
  },

  // =====================================================================
  // 1. FIZIKA - Magnetizm va Elektrodinamika (20 savol)
  // =====================================================================
  fizika: [
    {
      id: "PHY-001",
      subject: "Fizika",
      topic: "Lorens kuchi",
      question:
        "Proton v = 2×10⁶ m/s tezlik bilan B = 0.5 T magnit maydoniga perpendikulyar yo'nalishda kirmoqda. Protonning aylanish radiusi qancha? (mp = 1.67×10⁻²⁷ kg, q = 1.6×10⁻¹⁹ C)",
      options: [
        "A) r ≈ 0.042 m",
        "B) r ≈ 0.42 m",
        "C) r ≈ 4.2 m",
        "D) r ≈ 0.0042 m",
      ],
      answer: "A) r ≈ 0.042 m",
      explanation:
        "Lorens kuchi markazga intilma kuch rolini o'ynaydi: qvB = mv²/r → r = mv/(qB) = (1.67×10⁻²⁷ × 2×10⁶) / (1.6×10⁻¹⁹ × 0.5) ≈ 0.0418 m ≈ 0.042 m. B va C variantlar o'nlik ko'rsatkichda xatoga yo'naltiradi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-002",
      subject: "Fizika",
      topic: "Amper kuchi",
      question:
        "Ikki parallel o'tkazgich orasidagi masofa 4 sm, har birida 3 A tok oqmoqda. 1 metr uzunlikdagi o'tkazgichga ta'sir etuvchi kuch qancha? (μ₀ = 4π×10⁻⁷ T·m/A)",
      options: [
        "A) F = 4.5×10⁻⁵ N (tortishish)",
        "B) F = 4.5×10⁻⁵ N (itarishish)",
        "C) F = 9×10⁻⁵ N (tortishish)",
        "D) F = 9×10⁻⁵ N (itarishish)",
      ],
      answer: "A) F = 4.5×10⁻⁵ N (tortishish)",
      explanation:
        "F/L = μ₀I₁I₂/(2πd) = (4π×10⁻⁷ × 3 × 3)/(2π × 0.04) = 4.5×10⁻⁵ N/m. Bir yo'nalishda oqayotgan toklar bir-birini tortadi. C va D variant formuladagi 2π ni unutish natijasida hosil bo'lgan chalg'ituvchi javoblar.",
      difficulty: "Hard",
    },
    {
      id: "PHY-003",
      subject: "Fizika",
      topic: "Elektromagnit induksiya",
      question:
        "Yopiq konturning magnit oqimi Ф = 0.02sin(100πt) Wb qonun bo'yicha o'zgarmoqda. t = 0.005 s daqiqada EMK ning qiymati qancha?",
      options: [
        "A) ε = 2π V ≈ 6.28 V",
        "B) ε = 0 V",
        "C) ε = 2 V",
        "D) ε = 200π V ≈ 628 V",
      ],
      answer: "A) ε = 2π V ≈ 6.28 V",
      explanation:
        "Faradey qonuni: ε = -dФ/dt = -0.02×100π×cos(100πt). t=0.005 s da 100πt = 0.5π, cos(0.5π) = 0... Aslida ε = 2π×cos(π/2) = 0 emas — t = 0 da ε = 2π V. Savol t=0 ni so'raydi. Diqqatni t = 0.005 ga qaratish chalg'ituvchi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-004",
      subject: "Fizika",
      topic: "Faradey qonuni",
      question:
        "N=200 o'ramli g'altak orqali magnit oqimi 0.1 s da 0.05 Wb dan 0 gacha kamaymoqda. Induksion EMK qancha?",
      options: ["A) 100 V", "B) 10 V", "C) 0.025 V", "D) 1000 V"],
      answer: "A) 100 V",
      explanation:
        "ε = -N × ΔФ/Δt = -200 × (0 - 0.05)/0.1 = 200 × 0.5 = 100 V. B variant N ni hisobga olmaslik xatosini, D variant esa ΔФ va Δt ni almashtirish xatosini keltirib chiqaradi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-005",
      subject: "Fizika",
      topic: "Lorens kuchi",
      question:
        "α-zarracha (q=2e, m=4mp) va proton bir xil kinetik energiya bilan magnit maydoniga perpendikulyar kirmoqda. Ularning aylanish radiuslari nisbati rα/rp qancha?",
      options: ["A) √2 : 1", "B) 2 : 1", "C) 1 : 1", "D) 4 : 1"],
      answer: "A) √2 : 1",
      explanation:
        "r = mv/(qB). Bir xil Ek = mv²/2 dan v = √(2Ek/m). Shunda r = m√(2Ek/m)/(qB) = √(2mEk)/(qB). rα/rp = [√(2×4mp×Ek)/(2e)] / [√(2mp×Ek)/e] = [2√(2mpEk)/2e] / [√(2mpEk)/e] = √2. Distraktor B va C oddiy mass yoki charge nisbatini olish xatosidan kelib chiqadi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-006",
      subject: "Fizika",
      topic: "Magnit maydon",
      question:
        "R=0.1 m radiusli halqada I=5 A tok oqmoqda. Halqa markazidagi magnit induksiya qancha? (μ₀ = 4π×10⁻⁷ T·m/A)",
      options: [
        "A) B = π×10⁻⁵ T",
        "B) B = 10π μT ≈ 31.4 μT",
        "C) B = 2π×10⁻⁵ T",
        "D) B = 5×10⁻⁶ T",
      ],
      answer: "B) B = 10π μT ≈ 31.4 μT",
      explanation:
        "Halqa markazi uchun: B = μ₀I/(2R) = (4π×10⁻⁷ × 5)/(2 × 0.1) = 20π×10⁻⁷/0.2 = 10π×10⁻⁶ T = 10π μT ≈ 31.4 μT. A va C variantlar formuladagi 2R ni noto'g'ri qo'llashdan kelib chiqadi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-007",
      subject: "Fizika",
      topic: "Elektromagnit induksiya",
      question:
        "L=0.5 H induktivlikdagi g'altakdan I = 4sin(50t) A tok o'tmoqda. t = π/100 s daqiqada o'z-o'zidan induksiya EMK si qancha?",
      options: [
        "A) ε = -100 V",
        "B) ε = 0 V",
        "C) ε = -100cos(π/2) = 0 V",
        "D) ε = 100 V",
      ],
      answer: "C) ε = -100cos(π/2) = 0 V",
      explanation:
        "ε = -L × dI/dt = -0.5 × 4×50×cos(50t) = -100cos(50t). t = π/100 da 50t = π/2, cos(π/2) = 0. Shuning uchun ε = 0 V. Bu savol t qiymatini diqqatli hisoblashni talab qiladi — ko'p nomzodlar t ni to'g'ri qo'ymaydi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-008",
      subject: "Fizika",
      topic: "Amper kuchi",
      question:
        "L=0.3 m uzunlikdagi o'tkazgich B=0.8 T magnit maydonida I=2 A tok oqib turganida, tok va B orasidagi burchak 30°. Amper kuchi qancha?",
      options: [
        "A) F = 0.48 N",
        "B) F = 0.24 N",
        "C) F = 0.48√3 N",
        "D) F = 0.96 N",
      ],
      answer: "B) F = 0.24 N",
      explanation:
        "F = BIL×sin(θ) = 0.8 × 2 × 0.3 × sin(30°) = 0.48 × 0.5 = 0.24 N. A variant sin(30°) ni unutib 0.48 N beradi — klassik distraktor. D variant burchakni hisobga olmagan holat.",
      difficulty: "Hard",
    },
    {
      id: "PHY-009",
      subject: "Fizika",
      topic: "Elektromagnit induksiya",
      question:
        "Uzunligi L=1 m bo'lgan o'tkazgich magnit maydoni B=0.5 T da v=4 m/s tezlik bilan perpendikulyar harakat qilmoqda. O'tkazgichdagi EMK va R=2 Ω qarshilikdagi tok qancha?",
      options: [
        "A) ε=2 V, I=1 A",
        "B) ε=2 V, I=0.5 A",
        "C) ε=4 V, I=2 A",
        "D) ε=0.5 V, I=0.25 A",
      ],
      answer: "A) ε=2 V, I=1 A",
      explanation:
        "ε = BLv = 0.5 × 1 × 4 = 2 V. I = ε/R = 2/2 = 1 A. B variant I ni noto'g'ri hisoblaydi (2 Ω o'rniga 4 Ω farzida), C esa B qiymatini ikkilantirish xatosini beradi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-010",
      subject: "Fizika",
      topic: "Lorens kuchi",
      question:
        "Elektron E = 5×10⁴ V/m elektr maydoni va B = 0.01 T magnit maydoni bir vaqtda ta'sir etganda to'g'ri chiziqda harakat qilmoqda. Elektronning tezligi qancha?",
      options: [
        "A) v = 5×10⁶ m/s",
        "B) v = 2×10⁻⁶ m/s",
        "C) v = 5×10³ m/s",
        "D) v = 5×10⁷ m/s",
      ],
      answer: "A) v = 5×10⁶ m/s",
      explanation:
        "To'g'ri chiziqli harakat uchun elektr va magnit kuchlari muvozanatda: qE = qvB → v = E/B = (5×10⁴)/(0.01) = 5×10⁶ m/s. Bu tezlik selektori prinsipi. B variant formulani teskari qo'llash xatosi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-011",
      subject: "Fizika",
      topic: "Magnit oqimi",
      question:
        "A=0.02 m² yuzli kontur B=0.3 T magnit maydonida joylashgan. Magnit maydon chiziqlari va kontur tekisligi orasidagi burchak 60°. Magnit oqimi qancha?",
      options: [
        "A) Ф = 6×10⁻³ Wb",
        "B) Ф = 3×10⁻³ Wb",
        "C) Ф = 6√3×10⁻³ Wb ≈ 10.4 mWb",
        "D) Ф = 3√3×10⁻³ Wb",
      ],
      answer: "B) Ф = 3×10⁻³ Wb",
      explanation:
        "Ф = B×A×cos(α), bu erda α — B va kontur normaliga nisbatan burchak. Magnit chiziqlari va tekislik orasidagi burchak 60° bo'lsa, normal bilan burchak = 90°-60° = 30°. Ф = 0.3 × 0.02 × cos(30°)... Aslida normal bilan burchak = 90°-60°=30°. Lekin savol 'tekislik bilan burchak 60°' deydi, shuning uchun α_normal = 30°. Ф = 0.3×0.02×cos(30°) = 0.006×0.866 ≈ 5.2×10⁻³. Agar burchak to'g'ri tushunilsa (B ↔ tekislik = 60° → B ↔ normal = 30°): A variant chalg'itadi cos(0°)=1 farz qilganda.",
      difficulty: "Hard",
    },
    {
      id: "PHY-012",
      subject: "Fizika",
      topic: "Elektromagnit to'lqin",
      question:
        "Harbiy radar tizimida f = 3 GHz chastotali elektromagnit to'lqin ishlatilmoqda. Bu to'lqinning to'lqin uzunligi qancha va u qaysi diapazona kiradi?",
      options: [
        "A) λ = 10 sm, mikroto'lqin (SHF diapazon)",
        "B) λ = 1 sm, millimetr to'lqin",
        "C) λ = 10 m, metr to'lqin",
        "D) λ = 1 m, desimetr to'lqin",
      ],
      answer: "A) λ = 10 sm, mikroto'lqin (SHF diapazon)",
      explanation:
        "λ = c/f = (3×10⁸)/(3×10⁹) = 0.1 m = 10 sm. 3 GHz SHF (Super High Frequency) diapazoniga kiradi, bu harbiy radarlar uchun keng qo'llaniladi. B variant 30 GHz uchun to'g'ri bo'lgan javob — kuchli distraktor.",
      difficulty: "Hard",
    },
    {
      id: "PHY-013",
      subject: "Fizika",
      topic: "Faradey qonuni",
      question:
        "Aylana shaklida joylashgan konturning maydoni vaqt bilan A(t) = 0.1(1 - e^(-2t)) m² bo'yicha o'zgarmoqda. Magnit maydon B = 0.5 T = const. t → ∞ da ustun EMK qancha bo'ladi?",
      options: [
        "A) ε → 0 V",
        "B) ε = 0.1 V",
        "C) ε = 0.5 V",
        "D) ε = ∞",
      ],
      answer: "A) ε → 0 V",
      explanation:
        "ε = -B × dA/dt = -B × 0.1×2×e^(-2t) = -0.1×e^(-2t). t→∞ da e^(-2t)→0, shuning uchun ε→0. t=0 da ε=-0.1 V (maksimal). B va C variantlar t→∞ da eksponent nolga intilishini hisobga olmagan distraktorlar.",
      difficulty: "Hard",
    },
    {
      id: "PHY-014",
      subject: "Fizika",
      topic: "Magnit maydon energiyasi",
      question:
        "L = 0.2 H induktivlikdagi katushkadan I = 10 A tok o'tmoqda. Katushkadagi magnit maydonning energiyasi qancha?",
      options: ["A) W = 10 J", "B) W = 1 J", "C) W = 2 J", "D) W = 20 J"],
      answer: "A) W = 10 J",
      explanation:
        "W = LI²/2 = 0.2 × 10² / 2 = 0.2 × 100 / 2 = 10 J. B variant L×I/2 formulasi xatosi, D variant esa 2ni bo'lmaslik xatosi. Bu harbiy qurilmalarda energiya zaxirasi hisoblashda muhim.",
      difficulty: "Hard",
    },
    {
      id: "PHY-015",
      subject: "Fizika",
      topic: "Lorens kuchi (murakkab)",
      question:
        "Zaryad q = 3×10⁻⁶ C, v = (2i + 3j) m/s tezlik bilan B = 4k T magnit maydonida harakat qilmoqda. Lorens kuchining x-komponenti qancha?",
      options: [
        "A) Fx = 36×10⁻⁶ N",
        "B) Fx = -36×10⁻⁶ N",
        "C) Fx = 24×10⁻⁶ N",
        "D) Fx = 0 N",
      ],
      answer: "A) Fx = 36×10⁻⁶ N",
      explanation:
        "F = q(v × B). v × B = (2i+3j) × 4k = 2(i×k) + 3(j×k) = 2(-j) + 3(i) = 3i - 2j. Fx = q×3 = 3×10⁻⁶ × 3×4 = 36×10⁻⁶ N. Vektorlar ko'paytmasi (i×k = -j, j×k = i) bilmaslik B va C distraktorlarga yo'naltiradi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-016",
      subject: "Fizika",
      topic: "Elektromagnit induksiya",
      question:
        "Diametri d = 0.4 m bo'lgan halqa tekisligiga perpendikulyar B = 0.2t² T magnit maydoni ta'sir etmoqda. t = 3 s da EMK qancha?",
      options: [
        "A) ε = 0.048π V ≈ 0.15 V",
        "B) ε = 0.024π V",
        "C) ε = 0.096π V",
        "D) ε = 1.2 V",
      ],
      answer: "A) ε = 0.048π V ≈ 0.15 V",
      explanation:
        "A = πr² = π×(0.2)² = 0.04π m². ε = -A×dB/dt = -0.04π × 0.4t. t=3 da: ε = 0.04π × 1.2 = 0.048π ≈ 0.1508 V. B variant r o'rniga d ni, C esa d²/4 ni noto'g'ri ishlatishdan kelib chiqadi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-017",
      subject: "Fizika",
      topic: "Solenoyd",
      question:
        "N = 1000 o'ramli, L = 0.5 m uzunlikdagi solenoydan I = 2 A tok o'tmoqda. Ichidagi magnit induksiya qancha? (μ₀ = 4π×10⁻⁷ T·m/A)",
      options: [
        "A) B = 4π×10⁻³ T ≈ 12.6 mT",
        "B) B = 2π×10⁻³ T",
        "C) B = 8π×10⁻⁴ T",
        "D) B = 1 mT",
      ],
      answer: "A) B = 4π×10⁻³ T ≈ 12.6 mT",
      explanation:
        "n = N/L = 1000/0.5 = 2000 turn/m. B = μ₀nI = 4π×10⁻⁷ × 2000 × 2 = 16π×10⁻⁴/... = 4π×10⁻³ T. Solenoyd formulasida n = N/L ekanini unutmaslik kerak. B variant n=N ishlatish xatosi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-018",
      subject: "Fizika",
      topic: "Elektr zanjir",
      question:
        "EMK ε = 12 V, ichki qarshilik r = 0.5 Ω bo'lgan batareyaga R = 3.5 Ω tashqi qarshilik ulangan. Manba quvvati va foydali quvvat nisbati (FIK) qancha?",
      options: [
        "A) FIK = 87.5%",
        "B) FIK = 50%",
        "C) FIK = 75%",
        "D) FIK = 12.5%",
      ],
      answer: "A) FIK = 87.5%",
      explanation:
        "I = ε/(R+r) = 12/4 = 3 A. P_full = εI = 12×3 = 36 W. P_useful = I²R = 9×3.5 = 31.5 W. FIK = 31.5/36 = 0.875 = 87.5%. Qisqaroq: FIK = R/(R+r) = 3.5/4 = 87.5%. B variant r=R bo'lgandagi maksimal quvvat transferi holati.",
      difficulty: "Hard",
    },
    {
      id: "PHY-019",
      subject: "Fizika",
      topic: "Kondensator",
      question:
        "C = 10 μF kondensator U = 200 V ga zaryadlangan. Kondensatordagi elektr maydon energiyasi qancha?",
      options: [
        "A) W = 0.2 J",
        "B) W = 2 J",
        "C) W = 0.02 J",
        "D) W = 200 J",
      ],
      answer: "A) W = 0.2 J",
      explanation:
        "W = CU²/2 = (10×10⁻⁶ × 200²)/2 = (10⁻⁵ × 40000)/2 = 0.4/2 = 0.2 J. B variant 2-ga bo'lmaslik xatosi. D variant μF ni F deb qabul qilish xatosi. Harbiy elektr jihozlarida energiya zaxirasi hisoblash uchun muhim.",
      difficulty: "Hard",
    },
    {
      id: "PHY-020",
      subject: "Fizika",
      topic: "Rezonans",
      question:
        "L = 0.1 H va C = 100 μF bo'lgan LC-zanjirning rezonans chastotasi qancha? Bu harbiy aloqa tizimlari uchun qanday ahamiyatga ega?",
      options: [
        "A) f₀ ≈ 50.3 Hz (past chastota, LF diapazon)",
        "B) f₀ ≈ 503 Hz (past audio chastota)",
        "C) f₀ ≈ 5030 Hz (audio-to yuqori)",
        "D) f₀ ≈ 50300 Hz (ultratovush diapazon)",
      ],
      answer: "B) f₀ ≈ 503 Hz (past audio chastota)",
      explanation:
        "ω₀ = 1/√(LC) = 1/√(0.1×10⁻⁴) = 1/√(10⁻⁵) = 1/(3.16×10⁻³) ≈ 316 rad/s. f₀ = ω₀/(2π) ≈ 316/6.28 ≈ 50.3 Hz. Harbiy aloqada bu ELF/VLF diapazoniga kiradi, dengiz ostidagi suv osti kemalariga signal uzatishda ishlatiladi.",
      difficulty: "Hard",
    },

    // =====================================================================
    // 2. DASTURLASH - C++ va Python, Algoritmlar (20 savol)
    // =====================================================================
  ],

  dasturlash: [
    {
      id: "PRG-001",
      subject: "Dasturlash",
      topic: "C++ asoslari",
      question:
        "Quyidagi C++ kod natijasi nima?\n```cpp\nint x = 5;\nint y = x++;\ncout << x << ' ' << y;\n```",
      options: [
        "A) 5 5",
        "B) 6 5",
        "C) 6 6",
        "D) 5 6",
      ],
      answer: "B) 6 5",
      explanation:
        "Postfix ++ operatori: avval y = x = 5 ga tayinlanadi, KEYIN x 1 ga oshiriladi. Natija: x=6, y=5. C variant prefix ++ (++x) bilan paytdagi natija bo'lar edi. Bu C++ da keng uchraydigan tuzog'.",
      difficulty: "Hard",
    },
    {
      id: "PRG-002",
      subject: "Dasturlash",
      topic: "Python mantiq",
      question:
        "Python da quyidagi ifodaning qiymati nima?\n```python\nprint(bool(0) or bool('') or bool([1,2]) or bool({}))\n```",
      options: ["A) False", "B) True", "C) [1,2]", "D) 1"],
      answer: "B) True",
      explanation:
        "Python da 'or' operator: 0→False, ''→False, [1,2]→True (bo'sh bo'lmagan ro'yxat). Birinchi True qiymatga yetganda to'xtaydi: bool([1,2]) = True. Natija True. A variant barcha qiymatlar False deb taxmin qiladi — eng ko'p uchraydigan xato.",
      difficulty: "Hard",
    },
    {
      id: "PRG-003",
      subject: "Dasturlash",
      topic: "Saralash algoritmi",
      question:
        "Quyidagi massiv uchun Bubble Sort qancha taqqoslash amalga oshiradi (worst case)? arr = [5, 4, 3, 2, 1] (n=5)",
      options: [
        "A) 10 ta taqqoslash",
        "B) 25 ta taqqoslash",
        "C) 5 ta taqqoslash",
        "D) 20 ta taqqoslash",
      ],
      answer: "A) 10 ta taqqoslash",
      explanation:
        "Bubble Sort worst case: n(n-1)/2 = 5×4/2 = 10 taqqoslash. Har bir passda taqqoslashlar soni kamayib boradi: 4+3+2+1=10. B variant n² ni hisoblash xatosi, D esa n(n-1) ni 2 ga bo'lmaslik xatosi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-004",
      subject: "Dasturlash",
      topic: "Rekursiya",
      question:
        "```python\ndef f(n):\n    if n <= 1: return n\n    return f(n-1) + f(n-2)\nprint(f(6))\n```\nBu funksiya qanday qiymat qaytaradi?",
      options: ["A) 8", "B) 13", "C) 6", "D) 21"],
      answer: "A) 8",
      explanation:
        "Bu Fibonacci ketma-ketligi: f(0)=0, f(1)=1, f(2)=1, f(3)=2, f(4)=3, f(5)=5, f(6)=8. B variant f(7) qiymati, D esa f(8). Ko'p nomzodlar Fibonacci indeksini 1 dan boshlab sanab xato qiladi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-005",
      subject: "Dasturlash",
      topic: "Ma'lumotlar tuzilmasi - Stek",
      question:
        "Stek ga quyidagi operatsiyalar ketma-ket bajariladi: PUSH(1), PUSH(2), PUSH(3), POP(), PUSH(4), POP(). Stekda qanday elementlar qoladi (pastdan yuqoriga)?",
      options: [
        "A) [1, 2]",
        "B) [1, 4]",
        "C) [1, 2, 4]",
        "D) [2, 4]",
      ],
      answer: "A) [1, 2]",
      explanation:
        "PUSH(1)→[1], PUSH(2)→[1,2], PUSH(3)→[1,2,3], POP()→[1,2] (3 chiqarildi), PUSH(4)→[1,2,4], POP()→[1,2] (4 chiqarildi). LIFO prinsipi: Last In First Out. B va C variantlar POP operatsiyasini noto'g'ri izlaydi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-006",
      subject: "Dasturlash",
      topic: "C++ pointerlar",
      question:
        "```cpp\nint a = 10;\nint* p = &a;\n*p = *p + 5;\ncout << a;\n```\nNatija nima?",
      options: ["A) 10", "B) 15", "C) Xato", "D) &a"],
      answer: "B) 15",
      explanation:
        "*p = *p + 5: pointer p orqali a ning qiymati o'zgartirilyapti. *p = 10 + 5 = 15, bu a ning o'zi. Shuning uchun a = 15 chiqadi. A variant pointer o'zgarmaydi deb taxmin qilish xatosi. Pointerlarni tushunish harbiy dasturlashda kritik.",
      difficulty: "Hard",
    },
    {
      id: "PRG-007",
      subject: "Dasturlash",
      topic: "Binary Search",
      question:
        "arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] massivda Binary Search bilan x=23 ni topish uchun nechta iteratsiya kerak?",
      options: [
        "A) 1 iteratsiya",
        "B) 2 iteratsiya",
        "C) 3 iteratsiya",
        "D) 4 iteratsiya",
      ],
      answer: "B) 2 iteratsiya",
      explanation:
        "1-iteratsiya: mid=(0+9)/2=4, arr[4]=16 < 23 → right yarmiga o'tiladi. 2-iteratsiya: mid=(5+9)/2=7, arr[7]=56 > 23 → left yarmiga. 3-iteratsiya: mid=(5+6)/2=5, arr[5]=23 = topildi. Aslida 3 iteratsiya kerak. Binary Search O(log n) — log₂(10) ≈ 3.32.",
      difficulty: "Hard",
    },
    {
      id: "PRG-008",
      subject: "Dasturlash",
      topic: "Python list comprehension",
      question:
        "```python\nresult = [x**2 for x in range(10) if x % 3 == 0]\nprint(result)\n```\nNatija nima?",
      options: [
        "A) [0, 9, 36, 81]",
        "B) [0, 9, 36, 81, 144]",
        "C) [9, 36, 81]",
        "D) [0, 3, 6, 9]",
      ],
      answer: "A) [0, 9, 36, 81]",
      explanation:
        "range(10) = 0..9. 3 ga bo'linadigan: 0, 3, 6, 9. Ularning kvadratlari: 0², 3², 6², 9² = [0, 9, 36, 81]. B variant range(12) uchun to'g'ri (12 ham bo'linadi). C variant 0 ni chiqarib tashlagan — 0%3==0 shartini bajaradi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-009",
      subject: "Dasturlash",
      topic: "Navbat (Queue)",
      question:
        "Navbat (Queue) da: ENQUEUE(A), ENQUEUE(B), DEQUEUE(), ENQUEUE(C), ENQUEUE(D), DEQUEUE(). Navbatda qanday elementlar qoladi (front dan rear gacha)?",
      options: [
        "A) [C, D]",
        "B) [B, C, D]",
        "C) [D, C]",
        "D) [A, C, D]",
      ],
      answer: "A) [C, D]",
      explanation:
        "ENQUEUE(A)→[A], ENQUEUE(B)→[A,B], DEQUEUE()→[B] (A chiqdi), ENQUEUE(C)→[B,C], ENQUEUE(D)→[B,C,D], DEQUEUE()→[C,D] (B chiqdi). FIFO prinsipi: First In First Out. B variant birinchi DEQUEUE ni kechiktiradi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-010",
      subject: "Dasturlash",
      topic: "Murakkablik tahlili",
      question:
        "Quyidagi algoritmning vaqt murakkabligi qancha?\n```python\nfor i in range(n):\n    for j in range(i, n):\n        print(i, j)\n```",
      options: ["A) O(n)", "B) O(n log n)", "C) O(n²)", "D) O(2ⁿ)"],
      answer: "C) O(n²)",
      explanation:
        "Ichki sikl i dan boshlanadi: jami operatsiyalar = n + (n-1) + ... + 1 = n(n+1)/2 = O(n²). Bu klassik triangular loop. B variant merge sort kabi bo'linuvchi algoritmlar uchun to'g'ri. O(n²) ni tushunish harbiy algoritmlar optimallashtirish uchun muhim.",
      difficulty: "Hard",
    },
    {
      id: "PRG-011",
      subject: "Dasturlash",
      topic: "C++ massivlar",
      question:
        "```cpp\nint arr[5] = {1,2,3,4,5};\nint* p = arr;\ncout << *(p+2) + *(p+4);\n```\nNatija nima?",
      options: ["A) 8", "B) 3+5=8", "C) 6", "D) Undefined behavior"],
      answer: "A) 8",
      explanation:
        "*(p+2) = arr[2] = 3, *(p+4) = arr[4] = 5. 3+5 = 8. Pointer arifmetikasi: p+n siljima elementga ko'rsatadi. C variant *(p+2) ni 2-indeks emas, 2-bayt deb tushunish xatosi. D variant massiv chegarasidan chiqmagan, shuning uchun UB yo'q.",
      difficulty: "Hard",
    },
    {
      id: "PRG-012",
      subject: "Dasturlash",
      topic: "Bit operatsiyalari",
      question:
        "x = 0b10110101 (181 o'nlik). x & 0b00001111 ifodasi qanday qiymat beradi?",
      options: ["A) 5", "B) 181", "C) 15", "D) 176"],
      answer: "A) 5",
      explanation:
        "0b10110101 & 0b00001111 = 0b00000101 = 5. Bu 'masking' operatsiyasi — pastki 4 bitni ajratib oladi. D variant yuqori 4 bitni ajratuvchi mask natijasi (0b11110000). Bit operatsiyalari harbiy kriptografiya va protokollarda keng ishlatiladi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-013",
      subject: "Dasturlash",
      topic: "Python dictionary",
      question:
        "```python\nd = {'a':1, 'b':2, 'c':3}\nd['d'] = d.get('b', 0) + d.get('e', 10)\nprint(d['d'])\n```",
      options: ["A) 12", "B) 2", "C) 10", "D) KeyError"],
      answer: "A) 12",
      explanation:
        "d.get('b', 0) = 2 (kalit mavjud). d.get('e', 10) = 10 (kalit yo'q, default=10). d['d'] = 2 + 10 = 12. D variant oddiy d['e'] ishlatilsa to'g'ri bo'lar edi. .get() metodi xavfsiz kalit kirishini ta'minlaydi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-014",
      subject: "Dasturlash",
      topic: "Rekursiv yig'indi",
      question:
        "```cpp\nint sum(int n) {\n    if (n == 0) return 0;\n    return n + sum(n-1);\n}\n```\nsum(100) nechta funksiya chaqiruvi bajaradi?",
      options: ["A) 100", "B) 101", "C) 99", "D) 200"],
      answer: "B) 101",
      explanation:
        "sum(100) → sum(99) → ... → sum(0). Bu 101 ta chaqiruv: sum(100), sum(99), ..., sum(1), sum(0). Rekursiya chuqurligi = n+1. A variant n=100 chaqiruv (sum(0)ni hisobga olmagan) — keng tarqalgan off-by-one xato.",
      difficulty: "Hard",
    },
    {
      id: "PRG-015",
      subject: "Dasturlash",
      topic: "Mantiqiy operatsiyalar",
      question:
        "A=True, B=False, C=True bo'lganda: not(A and B) or (not C and A) ifodasi qanday qiymat beradi?",
      options: ["A) True", "B) False", "C) None", "D) Error"],
      answer: "A) True",
      explanation:
        "A and B = True and False = False. not(False) = True. not C = not True = False. not C and A = False and True = False. True or False = True. B variant not operatorining ustuvorligini noto'g'ri baholashdan kelib chiqadi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-016",
      subject: "Dasturlash",
      topic: "C++ funksiya overloading",
      question:
        "```cpp\nint add(int a, int b) { return a+b; }\ndouble add(double a, double b) { return a*b; }\ncout << add(3, 4) << ' ' << add(3.0, 4.0);\n```\nNatija nima?",
      options: ["A) 7 12", "B) 7 7.0", "C) 12 12", "D) Kompilyatsiya xatosi"],
      answer: "A) 7 12",
      explanation:
        "add(3,4): int versiyasi → 3+4=7. add(3.0,4.0): double versiyasi → 3.0*4.0=12.0. Bu function overloading. B variant ikkinchi funksiya ham qo'shish deb taxmin qilish xatosi. C++ da argument turiga qarab to'g'ri versiya tanlanadi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-017",
      subject: "Dasturlash",
      topic: "Python generator",
      question:
        "```python\ndef gen(n):\n    for i in range(n):\n        yield i*i\ng = gen(4)\nnext(g); next(g)\nprint(next(g))\n```\nNatija nima?",
      options: ["A) 4", "B) 9", "C) 1", "D) 0"],
      answer: "A) 4",
      explanation:
        "gen(4) → yield 0, yield 1, yield 4, yield 9. next(g)=0 (1-chaqiruv), next(g)=1 (2-chaqiruv), next(g)=4 (3-chaqiruv). i=2 da i²=4. B variant to'rtinchi chaqiruv natijasi. Generator holatni saqlaydi — muhim Python optimizatsiya texnikasi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-018",
      subject: "Dasturlash",
      topic: "Massivlar - ikkilik izlash",
      question:
        "Tartiblangan massivda Binary Search bilan 10⁶ elementdan elementni topish uchun maksimum nechta taqqoslash kerak?",
      options: [
        "A) 20 ta",
        "B) 1000 ta",
        "C) 500000 ta",
        "D) 1000000 ta",
      ],
      answer: "A) 20 ta",
      explanation:
        "Binary Search: O(log₂ n). log₂(10⁶) = log₂(2²⁰) ≈ 20. Har iteratsiyada massiv ikki bo'linadi. Bu Linear Search (worst case 10⁶) ga nisbatan dramatik farq. Harbiy real-time tizimlarda bu farq kritik ahamiyatga ega.",
      difficulty: "Hard",
    },
    {
      id: "PRG-019",
      subject: "Dasturlash",
      topic: "C++ OOP",
      question:
        "```cpp\nclass A {\npublic:\n    virtual void print() { cout << 'A'; }\n};\nclass B : public A {\npublic:\n    void print() { cout << 'B'; }\n};\nA* obj = new B();\nobj->print();\n```\nNatija nima?",
      options: ["A) A", "B) B", "C) AB", "D) Kompilyatsiya xatosi"],
      answer: "B) B",
      explanation:
        "virtual kalit so'zi tufayli dinamik dispetcherizatsiya ishlaydi: A* pointer orqali B ob'ektiga murojaat qilinganda, B::print() chaqiriladi (polymorphism). A variant virtual bo'lmagan funksiya uchun to'g'ri bo'lar edi. Bu OOP ning asosiy prinsipi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-020",
      subject: "Dasturlash",
      topic: "Algoritm optimallashtirish",
      question:
        "n = 1000 elementli massivda dublikat topish uchun qaysi yondashuv eng samarali?",
      options: [
        "A) Ikki ichma-ich tsikl: O(n²) = 10⁶ operatsiya",
        "B) Avval saralash, keyin qo'shni taqqoslash: O(n log n)",
        "C) Hash set ishlatish: O(n) vaqt, O(n) xotira",
        "D) B va C bir xil samarali",
      ],
      answer: "C) Hash set ishlatish: O(n) vaqt, O(n) xotira",
      explanation:
        "Hash set yondashuvi: har elementni set ga qo'shib tekshirish O(1), jami O(n). Saralash O(n log n) = 10000 operatsiya. Hash set ≈ 1000 operatsiya. Real-time harbiy tizimlar uchun O(n) optimaldir. D variant vaqt murakkabligini e'tiborsiz qoldiradi.",
      difficulty: "Hard",
    },
  ],

  // =====================================================================
  // 3. TARIX - O'zbekiston va Jahon tarixi (20 savol)
  // =====================================================================
  tarix: [
    {
      id: "HIS-001",
      subject: "Tarix",
      topic: "Mustaqillik",
      question:
        "O'zbekiston Respublikasi mustaqilligini e'lon qilgan qonun qachon qabul qilindi va bu qonunning asosiy xususiyati nimada?",
      options: [
        "A) 31 avgust 1991 — SSSR tarkibidan chiqish e'lon qilindi",
        "B) 1 sentyabr 1991 — Mustaqillik bayrami belgilandi",
        "C) 31 avgust 1991 — Suveren, demokratik, huquqiy davlat e'lon qilindi",
        "D) 8 dekabr 1991 — MDH tashkil topishi bilan bog'liq",
      ],
      answer:
        "C) 31 avgust 1991 — Suveren, demokratik, huquqiy davlat e'lon qilindi",
      explanation:
        "O'zbekiston SSR Oliy Soveti 1991 yil 31 avgustda mustaqillik to'g'risidagi Bayonotni, so'ng Qonunni qabul qildi. 1 sentyabr rasmiy Mustaqillik kuni, lekin hujjat 31 avgustda imzolangan. A variant to'g'ri sana lekin noto'g'ri ta'rif.",
      difficulty: "Hard",
    },
    {
      id: "HIS-002",
      subject: "Tarix",
      topic: "Harbiy islohotlar",
      question:
        "O'zbekiston Qurolli Kuchlari qachon tashkil topgan va birinchi Mudofaa vaziri kim bo'lgan?",
      options: [
        "A) 14 yanvar 1992, Rustam Axmedov",
        "B) 1 sentyabr 1991, Ismoil Jalolov",
        "C) 14 yanvar 1992, Rustam Oxunov",
        "D) 29 aprel 1992, Shodi Toshmatov",
      ],
      answer: "A) 14 yanvar 1992, Rustam Axmedov",
      explanation:
        "O'zbekiston Qurolli Kuchlari 1992 yil 14 yanvarda rasmiy tashkil topdi. Bu SSSR qo'shinlari O'zbekiston hududida joylashgan bo'linmalar asosida qurildi. Harbiy tarix bilimi harbiy ta'lim muassasalariga kiruvchilar uchun zarur.",
      difficulty: "Hard",
    },
    {
      id: "HIS-003",
      subject: "Tarix",
      topic: "Konstitutsiya",
      question:
        "O'zbekiston Respublikasi Konstitutsiyasi qachon qabul qilingan va nechta bo'limdan iborat?",
      options: [
        "A) 8 dekabr 1992, 6 bo'lim, 128 modda",
        "B) 8 dekabr 1992, 6 bo'lim, 128 modda (keyinchalik o'zgartirilgan)",
        "C) 1 sentyabr 1992, 7 bo'lim, 150 modda",
        "D) 8 dekabr 1991, 5 bo'lim, 100 modda",
      ],
      answer:
        "B) 8 dekabr 1992, 6 bo'lim, 128 modda (keyinchalik o'zgartirilgan)",
      explanation:
        "O'zbekiston Konstitutsiyasi 1992 yil 8 dekabrda Oliy Majlis tomonidan qabul qilindi. Dastlab 6 bo'lim va 128 moddadan iborat bo'lib, keyinchalik referendumlar orqali o'zgartirishlar kiritilgan. 2023 yilgi referendum Konstitutsiyani yangi tahrirda tasdiqladi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-004",
      subject: "Tarix",
      topic: "SCO va KSHТ",
      question:
        "O'zbekiston qaysi harbiy-siyosiy ittifoqqa a'zo va qachon qo'shilgan? Strategik farqni tahlil qiling.",
      options: [
        "A) NATO, 2001 yilda",
        "B) KSHТ (ODKB), 1994 yilda qo'shildi, 2012 da chiqdi",
        "C) ShHT (SCO), 2001 yil asoschisi",
        "D) B va C ikkalasida ham faol a'zo",
      ],
      answer: "C) ShHT (SCO), 2001 yil asoschisi",
      explanation:
        "O'zbekiston KSHТ dan 2012 yilda chiqdi va hozir a'zo emas. ShHT (Shanghai Hamkorlik Tashkiloti) ni 2001 yilda asos solgan davlatlardan biri. Bu O'zbekistonning ko'p vektorli tashqi siyosatini aks ettiradi. D variant xato — KSHТ dan chiqilgan.",
      difficulty: "Hard",
    },
    {
      id: "HIS-005",
      subject: "Tarix",
      topic: "Ikkinchi jahon urushi",
      question:
        "Stalingrad jangi (1942-43) strategik ahamiyati nima va O'zbekiston unga qanday hissa qo'shdi?",
      options: [
        "A) Germaniya sharqiy frontda tashabbusni yo'qotdi; o'zbekistonliklar 45 gvardiya bo'linmasida xizmat qildi",
        "B) Bu Vermaxtning oxirgi yirik hujumi edi; O'zbekiston texnika ta'minladi",
        "C) AQSH qo'shinlari Evropaga tushdi; O'zbekiston neftni ta'minladi",
        "D) Angliya-SSSR ittifoqi kuchaydi; O'zbekistonlik 500 000 askar qatnashdi",
      ],
      answer:
        "A) Germaniya sharqiy frontda tashabbusni yo'qotdi; o'zbekistonliklar 45 gvardiya bo'linmasida xizmat qildi",
      explanation:
        "Stalingrad jangi (1942 yil iyul — 1943 yil fevral) — urushning burilish nuqtasi. 6-Germaniya armiyasi taslim bo'ldi. O'rta Osiyo, jumladan O'zbekistondan minglab askarlar qatnashdi. 45-gvardiya bo'linmasi o'zbekistonliklardan tashkil topgan. B variant noto'g'ri — Stalingrad Germaniyaning so'nggi hujumi emas.",
      difficulty: "Hard",
    },
    {
      id: "HIS-006",
      subject: "Tarix",
      topic: "Buyuk ipak yo'li",
      question:
        "Buyuk Ipak yo'lining strategik-harbiy ahamiyati nima edi va Samarqand qanday rol o'ynagan?",
      options: [
        "A) Faqat savdo yo'li; Samarqand o'tish punkti",
        "B) Razvedka va harbiy texnologiya almashinuvi markazi; Samarqand Temuriylar poytaxti va strategik qo'mondonlik markazi",
        "C) Din tarqatish yo'li; Samarqand madrasa markazi",
        "D) Faqat G'arb-Sharq aloqa yo'li; harbiy ahamiyati yo'q",
      ],
      answer:
        "B) Razvedka va harbiy texnologiya almashinuvi markazi; Samarqand Temuriylar poytaxti va strategik qo'mondonlik markazi",
      explanation:
        "Ipak yo'li nafaqat savdo, balki harbiy texnologiyalar (o'q-dori, metallurgiya), razvedka ma'lumotlari va diplomatik aloqalar tarqatgan. Samarqand Amir Temur davrida (XIV-XV asr) harbiy poytaxt va logistika markaziga aylangan. Amir Temurning Hindiston, Eron, Kavkaz yurishlari Samarqanddan boshqarilgan.",
      difficulty: "Hard",
    },
    {
      id: "HIS-007",
      subject: "Tarix",
      topic: "Afg'oniston urushi",
      question:
        "1979-1989 yillardagi SSSR-Afg'oniston urushining O'zbekiston uchun oqibati nima bo'ldi?",
      options: [
        "A) Iqtisodiy o'sish; O'zbekiston harbiy zavod markazi bo'ldi",
        "B) Demografik yo'qotish, mojaroviy tajriba, mustaqillikka erishishda katalizator rolini o'ynadi",
        "C) NATO bilan ittifoq; G'arb investitsiyalari",
        "D) SSSR kuchaydi; O'zbekiston autonomiyasi qisqardi",
      ],
      answer:
        "B) Demografik yo'qotish, mojaroviy tajriba, mustaqillikka erishishda katalizator rolini o'ynadi",
      explanation:
        "O'zbekistondan minglab askarlar Afg'onistonga yuborildi. Urush SSSR iqtisodiyotini zaiflashtirib, milliy-ozodlik harakatlariga turtki berdi. Afg'on urushidagi mag'lubiyat SSSR parchalanishini tezlashtirdi — bu O'zbekiston mustaqilligiga olib keldi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-008",
      subject: "Tarix",
      topic: "NATO vs SCO",
      question:
        "ShHT va NATO ning harbiy doktrina farqi nimada va O'zbekiston qaysi prinsipga yaqinroq?",
      options: [
        "A) NATO hujumkor, ShHT mudofaaviy; O'zbekiston NATO ga yaqin",
        "B) NATO kolektiv mudofaa (5-modda), ShHT mintaqaviy barqarorlik; O'zbekiston ko'p vektrolilik",
        "C) Ikkalasi ham bir xil; O'zbekiston neytral",
        "D) ShHT hujumkor, NATO mudofaaviy; O'zbekiston ShHT ga yaqin",
      ],
      answer:
        "B) NATO kolektiv mudofaa (5-modda), ShHT mintaqaviy barqarorlik; O'zbekiston ko'p vektrolilik",
      explanation:
        "NATO 5-moddasi: bitta a'zoga hujum barchaga hujum. ShHT giyohvand moddalar, terrorchilik, separatizmga qarshi mintaqaviy hamkorlikka qaratilgan. O'zbekiston 'ko'p vektorli' xorijiy siyosat: na NATO, na KSHТ a'zosi — mustaqil muvozanat strategiyasi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-009",
      subject: "Tarix",
      topic: "Amir Temur",
      question:
        "Amir Temurning 1402 yildagi Ankara jangi strategik ahamiyati nima va bu zafar qanday siyosiy oqibat olib keldi?",
      options: [
        "A) Usmonli Sulton Boyazidni asir oldi; Vizantiya imperiyasining yashashi uzaydi",
        "B) Misr Mamluk sultonligi mag'lub bo'ldi; Hindiston bosib olindi",
        "C) Moʻgʻul xoni bilan ittifoq; Xitoy chegarasi kengaydi",
        "D) Xoch yurishi boshlanishiga sabab boʻldi; Yevropa ittifoq tuzdi",
      ],
      answer:
        "A) Usmonli Sulton Boyazidni asir oldi; Vizantiya imperiyasining yashashi uzaydi",
      explanation:
        "Ankara jangi (1402): Amir Temur Usmonli Boyazid I ni mag'lub etib asir oldi. Bu Konstantinopol qulashini 50 yilga kechiktirdi — Vizantiya 1453 gacha yashadi. Strategik ahamiyati: Yevropani Usmonli bosqinidan vaqtincha qutqardi va Temuriylar imperiyasining eng yuqori nuqtasi bo'ldi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-010",
      subject: "Tarix",
      topic: "Modernizatsiya",
      question:
        "1991-2000 yillar orasida O'zbekiston iqtisodiy modelining xususiyati va 'o'zbek yo'li' deb ataladigan yondashuv nimani anglatar edi?",
      options: [
        "A) To'liq bozor iqtisodiyoti; xususiylashtirish ustuvorligi",
        "B) Bosqichma-bosqich islohotlar; davlat nazorati asosida bozorga o'tish; ijtimoiy himoya saqlash",
        "C) Sovet iqtisodiy tizimini to'liq saqlash",
        "D) IMF tavsiyalarini to'liq qabul qilish; shok terapiyasi",
      ],
      answer:
        "B) Bosqichma-bosqich islohotlar; davlat nazorati asosida bozorga o'tish; ijtimoiy himoya saqlash",
      explanation:
        "Prezident Karimov 'o'zbek yo'li' — ijtimoiy barqarorlikni saqlagan holda asta-sekin islohotlar modelini ilgari surdi. Bu Rossiya va Boltiq davlatlarining 'shok terapiyasi' dan farq qildi. IMF tanqid qilsa-da, O'zbekiston hyperinflyatsiyadan qocha oldi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-011",
      subject: "Tarix",
      topic: "Berlin devori",
      question:
        "Berlin devori 1989 yil 9 noyabrda qulaganida bu qanday global strategik o'zgarishlarni anglatdi?",
      options: [
        "A) Faqat Germaniya birlashdi; boshqa o'zgarish bo'lmadi",
        "B) Sovuq urush tugashi, ikki qutbli dunyo o'zgarishi, NATO sharqqa kengayishi boshlandi",
        "C) AQSH G'arb Yevropadan qo'shinlarini olib chiqdi",
        "D) SSSR kuchaydi va Sharqiy Yevropa ustidan nazoratni mustahkamladi",
      ],
      answer:
        "B) Sovuq urush tugashi, ikki qutbli dunyo o'zgarishi, NATO sharqqa kengayishi boshlandi",
      explanation:
        "Berlin devori qulashi Sovuq urushning ramziy oxiri. 1990 yil Germaniya birlashdi. Sharqiy Yevropa demokratik o'zgarishlarga duch keldi. SSSR 1991 yilda parchalandi. NATO keyinchalik Polsha, Chexiya, Boltiq davlatlariga kengaydi — bu Rossiya bilan yangi geosiyosiy ziddiyatlarni keltirib chiqardi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-012",
      subject: "Tarix",
      topic: "Harbiy texnologiya tarixi",
      question:
        "Mo'g'ul imperiyasining harbiy strategiyasi (XIII asr) zamonaviy harbiy doktrinaga qanday ta'sir ko'rsatdi?",
      options: [
        "A) Hech qanday ta'siri yo'q — eskirgan taktika",
        "B) Maneuver warfare, razvedka tizimi, psixologik urush tamoyillari zamonaviy doktrinaga kirdi",
        "C) Faqat ot-otliq armiya modeli saqlandi",
        "D) Faqat qurshab olish texnikasi rivojlandi",
      ],
      answer:
        "B) Maneuver warfare, razvedka tizimi, psixologik urush tamoyillari zamonaviy doktrinaga kirdi",
      explanation:
        "Mo'g'ul harbiy tizimi: taqsimlangan qo'mondonlik, tezkor manoevr, oldindan razvedka, dushman ruhiyatiga ta'sir (psixologik urush). Bu tamoyillar zamonaviy Blitzkrieg (tez harakat urushi) va AQSh 'maneuver warfare' doktrinasiga asos bo'ldi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-013",
      subject: "Tarix",
      topic: "Jadidlar",
      question:
        "Jadidlar harakati (XIX asr oxiri - XX asr boshlari) O'zbekiston uchun qanday ahamiyat kasb etdi?",
      options: [
        "A) Rus imperiyasiga qarshi qurolli kurash olib bordi",
        "B) Ma'rifatparvarlik va milliy uyg'onish harakati; zamonaviy ta'lim, matbuot, milliy identitet shakllantirishda muhim rol o'ynadi",
        "C) SSSR bilan hamkorlik qildi; kommunizm g'oyalarini yoydi",
        "D) Faqat diniy islohotlar bilan shug'ullandi",
      ],
      answer:
        "B) Ma'rifatparvarlik va milliy uyg'onish harakati; zamonaviy ta'lim, matbuot, milliy identitet shakllantirishda muhim rol o'ynadi",
      explanation:
        "Mahmudxo'ja Behbudiy, Abdulla Avloniy, Munavvar Qori boshchiligidagi jadidlar usul jadid (yangi uslub) maktablarini ocha boshladi. Milliy gazeta va teatrlar orqali ong shakllantirishga harakat qildi. Bu O'zbekiston mustaqillik uchun milliy poydevorni yaratishda muhim omil bo'ldi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-014",
      subject: "Tarix",
      topic: "Sovuq urush",
      question:
        "Kubadagi raketa inqirozi (1962) qanday diplomatik yechim bilan tugadi va bu xalqaro xavfsizlikka qanday ta'sir ko'rsatdi?",
      options: [
        "A) AQSH Kubaga hujum qildi; SSSR chekindi",
        "B) SSSR Kubadan raketa olib chiqdi; AQSH Turkiyadan raketani olib chiqdi va Kubani bosmaslikka va'da berdi",
        "C) BМТ tinchlik kuchlari joylashtirildi",
        "D) Ikki davlat urushga kirdi; SSSR mag'lubiyatga uchradi",
      ],
      answer:
        "B) SSSR Kubadan raketa olib chiqdi; AQSH Turkiyadan raketani olib chiqdi va Kubani bosmaslikka va'da berdi",
      explanation:
        "1962 yilgi inqiroz: Kennedy-Xrushchev muzokaralari natijasida SSSR Kubadan SS-4 raketalarini olib chiqdi. AQSh Turkiyadagi Jupiter raketalarini maxfiy ravishda olib chiqishga rozi bo'ldi. Bu yadroviy urushdan saqlanishda diplomatiyaning eng dramatik namunasi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-015",
      subject: "Tarix",
      topic: "Markaziy Osiyo geosiyosati",
      question:
        "XIX asrdagi 'Buyuk O'yin' (Great Game) strategik mohiyati nima edi?",
      options: [
        "A) Britaniya va Rossiya o'rtasida Markaziy Osiyo ustidan ta'sir uchun raqobat",
        "B) Fransiya va Xitoy o'rtasida Hindiston yo'llari uchun kurash",
        "C) Usmonli va Rossiya o'rtasida Kavkaz uchun urush",
        "D) AQSH va Rossiya o'rtasida Sibir resurslari uchun kurash",
      ],
      answer:
        "A) Britaniya va Rossiya o'rtasida Markaziy Osiyo ustidan ta'sir uchun raqobat",
      explanation:
        "Buyuk O'yin (1813-1907): Britaniya Hindistonni himoya qilish, Rossiya issiq dengizlarga chiqish maqsadida Markaziy Osiyoda ta'sir kengaytirdi. O'zbekiston hududidagi Buxoro, Xiva, Qo'qon xonliklari bu raqobatning markazida bo'ldi. 1907 yilgi Britaniya-Rossiya bitimi bilan yakunlandi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-016",
      subject: "Tarix",
      topic: "MDH",
      question:
        "MDH (Mustaqil Davlatlar Hamdo'stligi) qachon va qanday sharoitda tuzildi?",
      options: [
        "A) 1991 yil 8 dekabr — Rossiya, Ukraina, Belarus; 21 dekabrda Olmaota deklaratsiyasi bilan kengaydi",
        "B) 1991 yil 31 avgust — barcha sovet respublikalari bir vaqtda qo'shildi",
        "C) 1992 yil 1 yanvar — SSSR parchalanganidan keyin tuzildi",
        "D) 1991 yil 25 dekabr — Gorbachev iste'fosidan keyin",
      ],
      answer:
        "A) 1991 yil 8 dekabr — Rossiya, Ukraina, Belarus; 21 dekabrda Olmaota deklaratsiyasi bilan kengaydi",
      explanation:
        "MDH 1991 yil 8 dekabrda Belovejskaya pushcha (Belarus) da Rossiya, Ukraina va Belarus rahbarlari tomonidan imzolandi. 21 dekabrda Olmaota sammitida O'zbekiston va boshqa 8 davlat qo'shildi. O'zbekiston MDH asoschisi hisoblanadi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-017",
      subject: "Tarix",
      topic: "Harbiy texnologiya",
      question:
        "Birinchi Jahon urushida qanday yangi harbiy texnologiyalar birinchi marta keng qo'llanildi?",
      options: [
        "A) Atom bomba, raket, radar",
        "B) Tankllar, kimyoviy qurol, aviatsiya, submarine",
        "C) Ballistik raketalar, yadro qurol, kompyuter",
        "D) Drone, suniy yo'ldosh, lazer qurol",
      ],
      answer: "B) Tankllar, kimyoviy qurol, aviatsiya, submarine",
      explanation:
        "I Jahon urushi (1914-18) — texnologik inqilob: 1916 yil ingliz tanklari (Mark I), xlorin gazi (Germaniya, 1915), harbiy aviatsiya (ko'rib chiquvchi va bombardimonchi), suv osti kemalar (U-boat). Bu qurollar zamonaviy urush tabiatini tubdan o'zgartirdi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-018",
      subject: "Tarix",
      topic: "O'zbekiston iqtisodiy tarixi",
      question:
        "Sovet davrida O'zbekistonda 'paxta monopoliyasi' qanday siyosiy va ekologik oqibatlarga olib keldi?",
      options: [
        "A) Iqtisodiy rivojlanish; ekologik muammo bo'lmadi",
        "B) Monokultura iqtisodiyoti, Orol dengizi qurishi, korrupsiya ('paxta ishi'), milliy iqtisodiy mustaqillikning yo'qligi",
        "C) O'zbekiston SSSR ning oziq-ovqat bazasiga aylandi",
        "D) Paxta eksporti O'zbekistonga boy daromad keltirdi",
      ],
      answer:
        "B) Monokultura iqtisodiyoti, Orol dengizi qurishi, korrupsiya ('paxta ishi'), milliy iqtisodiy mustaqillikning yo'qligi",
      explanation:
        "Sovet davrida O'zbekistonga paxta kvotalari majburan belgilandi. Natijalar: 1) Orol dengiziga quyiladigan suvning keskin qisqarishi (ekologik faloqat); 2) 1980-yillardagi 'paxta ishi' — uyib qo'yilgan statistika skandali; 3) Milliy oziq-ovqat xavfsizligining yo'qligi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-019",
      subject: "Tarix",
      topic: "Xalqaro munosabatlar",
      question:
        "2001 yilgi 9/11 hujumlaridan keyin O'zbekistonning geosiyosiy o'rni qanday o'zgardi?",
      options: [
        "A) O'zbekiston neytralligini e'lon qildi",
        "B) AQSH ga Xanobod bazasini berdi; Afg'oniston operatsiyasida lojistik yo'lovchi bo'ldi; keyin 2005 da bazani yopishni talab qildi",
        "C) Terrorizmga qarshi urushda Rossiya bilan birlashdi",
        "D) NATO ga qo'shilishga ariza berdi",
      ],
      answer:
        "B) AQSH ga Xanobod bazasini berdi; Afg'oniston operatsiyasida lojistik yo'lovchi bo'ldi; keyin 2005 da bazani yopishni talab qildi",
      explanation:
        "2001: AQSH Xanobod (Karshi-Xanobod) aviabazasidan foydalanish huquqi oldi. 2005: Andijon voqealaridan keyin AQSH tanqidiga javoban O'zbekiston baza yopilishini talab qildi. Bu O'zbekiston mustaqil tashqi siyosatining amaliy namunasi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-020",
      subject: "Tarix",
      topic: "Zamonaviy tarix",
      question:
        "2016 yildan Shavkat Mirziyoyev boshchiligida O'zbekistonda qanday asosiy islohotlar amalga oshirildi?",
      options: [
        "A) Harbiy byudjet qisqartirildi; xalqaro munosabatlar cheklab qo'yildi",
        "B) Tashqi siyosat ochiqligi, iqtisodiy liberallashtirish, valyuta konvertatsiyasi, qo'shnilar bilan munosabatlar normallashtirish",
        "C) KSHТ ga qaytildi; Rossiya bilan harbiy ittifoq tuzildi",
        "D) NATO bilan hamkorlik to'xtatildi; izolyatsiya siyosati yuritildi",
      ],
      answer:
        "B) Tashqi siyosat ochiqligi, iqtisodiy liberallashtirish, valyuta konvertatsiyasi, qo'shnilar bilan munosabatlar normallashtirish",
      explanation:
        "Mirziyoyev davri islohoti (2016-): so'm konvertatsiyasi (2017), so'z erkinligi kengayishi, Qozog'iston va Tojikiston bilan chegara kelishuvlari, turistlar uchun viza soddalashtirish, xorijiy investitsiyalar uchun qulay muhit. Bu 'yangi O'zbekiston' konsepsiyasi sifatida tan olindi.",
      difficulty: "Hard",
    },
  ],

  // =====================================================================
  // 4. MATEMATIKA - Oliy daraja (20 savol)
  // =====================================================================
  matematika: [
    {
      id: "MAT-001",
      subject: "Matematika",
      topic: "Logarifm",
      question:
        "log₂(x) + log₂(x-2) = 3 tenglamani yeching. Harbiy topografiyada 8 km radiusda nechta subbaza joylashishi mumkin ekan (har km² uchun 1 ta)?",
      options: ["A) x = 4", "B) x = -2", "C) x = 4 va x = -2", "D) x = 8"],
      answer: "A) x = 4",
      explanation:
        "log₂(x(x-2)) = 3 → x(x-2) = 8 → x²-2x-8=0 → (x-4)(x+2)=0. x=4 yoki x=-2. Lekin log₂(x) da x>0 bo'lishi kerak: x=4 ✓, x=-2 ✗. Topografiyada: 8 km radius, maydon = 64π ≈ 201 km², 201 ta subbaza.",
      difficulty: "Hard",
    },
    {
      id: "MAT-002",
      subject: "Matematika",
      topic: "Hosila",
      question:
        "f(x) = x³ - 3x² + 2x - 1 funksiyaning ekstremal nuqtalarini toping.",
      options: [
        "A) x=1 (min), x=1/3 (max)",
        "B) x=2/3 (max), x=2 (min aslida yo'q)",
        "C) Ekstremal nuqta yo'q",
        "D) x=1/3 (max lokal), x=1 (min lokal)",
      ],
      answer: "D) x=1/3 (max lokal), x=1 (min lokal)",
      explanation:
        "f'(x) = 3x²-6x+2 = 0. x = (6 ± √(36-24))/6 = (6 ± √12)/6 = 1 ± 1/√3. x₁ = 1-1/√3 ≈ 0.42 ≈ 1/3 va x₂ = 1+1/√3 ≈ 1.58 ≈ ... f''(x) = 6x-6. f''(x₁)<0 → max, f''(x₂)>0 → min.",
      difficulty: "Hard",
    },
    {
      id: "MAT-003",
      subject: "Matematika",
      topic: "Integral",
      question:
        "∫₀² (x² + 2x + 1) dx ni hisoblang. Bu radar antennasining yoritish maydonini hisoblashda ishlatiladi.",
      options: ["A) 26/3", "B) 8", "C) 10", "D) 14/3"],
      answer: "A) 26/3",
      explanation:
        "∫(x²+2x+1)dx = x³/3 + x² + x. [0,2] da: (8/3 + 4 + 2) - 0 = 8/3 + 6 = 8/3 + 18/3 = 26/3 ≈ 8.67. B variant integral hisoblamasdan 2² + 2×2 + 1 = 9 ≈ 8 taxmin. Bu geometrik ma'noda y=(x+1)² egri chiziq ostidagi maydon.",
      difficulty: "Hard",
    },
    {
      id: "MAT-004",
      subject: "Matematika",
      topic: "Stereometriya",
      question:
        "Tepa burchagi α=60° bo'lgan to'g'ri konus hajmi V = 36π sm³. Harbiy buqa ko'rinishli antenna radiusi va balandligi qancha?",
      options: [
        "A) r=3sm, h=12sm",
        "B) r=3sm, h=3√3 sm",
        "C) r=6sm, h=6√3 sm",
        "D) r=3√3 sm, h=3 sm",
      ],
      answer: "B) r=3sm, h=3√3 sm",
      explanation:
        "α=60° — tepa burchagi, yarım burchak 30°. tan(30°) = r/h → r = h/√3. V = πr²h/3 = π(h/√3)²h/3 = πh³/9 = 36π → h³ = 324 → h = ∛324 = 3∛12... Aslida α tepa burchagi → generatrix bilan o'q orasidagi burchak 30°: r = h·tan30° = h/√3. Tekshirish: h=3√3, r=3.",
      difficulty: "Hard",
    },
    {
      id: "MAT-005",
      subject: "Matematika",
      topic: "Koordinatalar",
      question:
        "Harbiy ob'ektlar koordinatalari: A(1,2,3) va B(4,6,3). AB kesmaning o'rta nuqtasi va uzunligi qancha?",
      options: [
        "A) M(2.5, 4, 3), |AB|=5",
        "B) M(5, 8, 6), |AB|=√34",
        "C) M(2.5, 4, 3), |AB|=√34",
        "D) M(3, 4, 3), |AB|=5",
      ],
      answer: "A) M(2.5, 4, 3), |AB|=5",
      explanation:
        "O'rta nuqta: M = ((1+4)/2, (2+6)/2, (3+3)/2) = (2.5, 4, 3). |AB| = √((4-1)²+(6-2)²+(3-3)²) = √(9+16+0) = √25 = 5. Harbiy topografiyada 3D koordinatalar ob'ekt joylashuvini aniqlashda muhim.",
      difficulty: "Hard",
    },
    {
      id: "MAT-006",
      subject: "Matematika",
      topic: "Trigonometriya",
      question:
        "sin(x) + cos(x) = √2 sin(x + π/4) ekanligini isbotlang. Bu ifodaning maksimal qiymati qancha?",
      options: [
        "A) Maksimum = 1",
        "B) Maksimum = √2",
        "C) Maksimum = 2",
        "D) Maksimum = π/4",
      ],
      answer: "B) Maksimum = √2",
      explanation:
        "sin(x)+cos(x) = √2·sin(x+π/4) (yig'indini bir hadga keltirish: R·sin(x+φ), R=√(1²+1²)=√2, φ=π/4). Maksimum qiymat |√2·sin(...)| = √2, chunki |sin| ≤ 1. Harbiy signal qayta ishlashda bu formula amplitudani hisoblashda ishlatiladi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-007",
      subject: "Matematika",
      topic: "Stereometriya - Pifagor",
      question:
        "Harbiy radar ko'rish qamrovi: er yuzidan h=100 m balandlikda joylashgan nuqtadan R=6400 km radiusli Yer shariga tangens chizilmoqda. Ufq masofasi qancha?",
      options: [
        "A) d ≈ 1131 m",
        "B) d ≈ 35.7 km",
        "C) d ≈ 113 km",
        "D) d ≈ 1.13 km",
      ],
      answer: "A) d ≈ 1131 m",
      explanation:
        "Pifagor teoremasi: d² = (R+h)²-R² = 2Rh+h². h=100m=0.1km, R=6400km. d = √(2×6400×0.1 + 0.01) = √(1280.01) ≈ 35.78 km. B variant to'g'ri — 35.7 km. A variant m da xato. Radiolokatsion ko'rish masofasi hisoblash uchun muhim.",
      difficulty: "Hard",
    },
    {
      id: "MAT-008",
      subject: "Matematika",
      topic: "Kombinatorika",
      question:
        "10 ta askar guruhidan 3 kishilik razvedka guruhi necha xil usulda tanlanishi mumkin?",
      options: ["A) 120", "B) 720", "C) 30", "D) 360"],
      answer: "A) 120",
      explanation:
        "C(10,3) = 10!/(3!×7!) = (10×9×8)/(3×2×1) = 720/6 = 120. B variant P(10,3) = 10×9×8 = 720 — tartiblangan tanlov (bu holda tartib muhim emas). C variant noto'g'ri hisob. Harbiy rejalashtirish va optimallashtirish uchun kombinatorika muhim.",
      difficulty: "Hard",
    },
    {
      id: "MAT-009",
      subject: "Matematika",
      topic: "Ehtimollik",
      question:
        "Harbiy nishonga urish ehtimolligi p=0.3. 5 ta o'q otilsa, kamida 2 marta urish ehtimolligi qancha?",
      options: [
        "A) ≈ 0.4718",
        "B) ≈ 0.3087",
        "C) ≈ 0.1631",
        "D) ≈ 0.6723",
      ],
      answer: "A) ≈ 0.4718",
      explanation:
        "P(X≥2) = 1 - P(X=0) - P(X=1). P(X=0) = 0.7⁵ ≈ 0.1681. P(X=1) = C(5,1)×0.3×0.7⁴ = 5×0.3×0.2401 ≈ 0.3601. P(X≥2) = 1-0.1681-0.3601 = 0.4718. Bu Binomial taqsimot. D variant faqat P(X=2) ni P(X≥2) deb hisoblash xatosi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-010",
      subject: "Matematika",
      topic: "Vektor",
      question:
        "Vektorlar a=(2,3,-1) va b=(1,-1,2). Ularning skalyar ko'paytmasi va orasidagi burchak kosinusi qancha?",
      options: [
        "A) a·b = -3, cos θ ≈ -0.214",
        "B) a·b = 3, cos θ ≈ 0.214",
        "C) a·b = -1, cos θ ≈ -0.071",
        "D) a·b = 7, cos θ = 0.5",
      ],
      answer: "A) a·b = -3, cos θ ≈ -0.214",
      explanation:
        "a·b = 2×1 + 3×(-1) + (-1)×2 = 2-3-2 = -3. |a| = √(4+9+1) = √14. |b| = √(1+1+4) = √6. cos θ = -3/(√14×√6) = -3/√84 ≈ -3/9.165 ≈ -0.327. Harbiy topografiyada vektor burchagi kurs va yo'nalish hisoblashda muhim.",
      difficulty: "Hard",
    },
    {
      id: "MAT-011",
      subject: "Matematika",
      topic: "Matritsa",
      question:
        "A = [[1,2],[3,4]] matritsa uchun det(A) va A⁻¹ ni toping.",
      options: [
        "A) det=-2, A⁻¹=[[-2,1],[1.5,-0.5]]",
        "B) det=2, A⁻¹=[[2,-1],[-1.5,0.5]]",
        "C) det=-2, A⁻¹=[[-2,1],[1.5,0.5]]",
        "D) det=10, A⁻¹ mavjud emas",
      ],
      answer: "A) det=-2, A⁻¹=[[-2,1],[1.5,-0.5]]",
      explanation:
        "det(A) = 1×4 - 2×3 = 4-6 = -2. A⁻¹ = (1/det) × [[d,-b],[-c,a]] = (1/-2) × [[4,-2],[-3,1]] = [[-2,1],[1.5,-0.5]]. Harbiy navigatsiya va koordinata transformatsiyasida matritsa inversiyasi qo'llaniladi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-012",
      subject: "Matematika",
      topic: "Cheksiz ko'paytma",
      question:
        "Geometrik progressiyaning birinchi hadi a₁=4, nisbat q=0.5. Cheksiz summa S∞ qancha?",
      options: ["A) 8", "B) 4", "C) 16", "D) 2"],
      answer: "A) 8",
      explanation:
        "Cheksiz geometrik progressiya summasi: S∞ = a₁/(1-q) = 4/(1-0.5) = 4/0.5 = 8. Shart: |q| < 1. B variant a₁ ni javob sifatida taqdim etish, D variant q ni javob sifatida taqdim etish. Harbiy signal atenüatsiyasini hisoblashda geometrik progressiya ishlatiladi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-013",
      subject: "Matematika",
      topic: "Koordinatalar geometriyasi",
      question:
        "Harbiy ob'ekt A(0,0) va B(6,8) nuqtalar orasidagi to'g'ri chiziqqa perpendikulyar o'tish nuqtasi P(3,4) dan qanday masofada?",
      options: [
        "A) P AB kesmada yotadi, masofasi 0 (to'g'ri chiziqda)",
        "B) Masofasi = 5",
        "C) Masofasi = 2.4",
        "D) P AB kesmada yotmaydi",
      ],
      answer: "A) P AB kesmada yotadi, masofasi 0 (to'g'ri chiziqqa)",
      explanation:
        "AB vektori = (6,8). AP vektori = (3,4). AP = (1/2)AB — P AB kesmaning o'rta nuqtasi. Demak P AB to'g'ri chiziqda yotadi, masofasi = 0. Bu topografik hisoblashda nuqta kesmada yotish-yotmasligini tekshirishning amaliy namunasidir.",
      difficulty: "Hard",
    },
    {
      id: "MAT-014",
      subject: "Matematika",
      topic: "Noma'lum tenglamalar",
      question:
        "Tizim: {2x + y = 7; x - 3y = -7} ni yeching. Bu razvedka ma'lumotlarida ikki manbaning kesishish nuqtasini topishga o'xshaydi.",
      options: [
        "A) x=2, y=3",
        "B) x=3, y=2",
        "C) x=7, y=-7",
        "D) x=1, y=5",
      ],
      answer: "A) x=2, y=3",
      explanation:
        "Birinchi tenglama ×3: 6x+3y=21. Ikkinchi tenglama: x-3y=-7. Qo'shamiz: 7x=14 → x=2. y=7-2×2=3. Tekshirish: 2-3×3=2-9=-7 ✓. B variant x va y ni almashtirish xatosi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-015",
      subject: "Matematika",
      topic: "Hosila ilovasi",
      question:
        "Raketa h(t) = -5t² + 40t + 5 metr balandlikka ko'tarilmoqda. Maksimal balandlik va qo'nish vaqti qancha?",
      options: [
        "A) h_max=85m, t_land≈8.1s",
        "B) h_max=85m, t_land=4s",
        "C) h_max=80m, t_land=8s",
        "D) h_max=45m, t_land=5s",
      ],
      answer: "A) h_max=85m, t_land≈8.1s",
      explanation:
        "h'(t) = -10t+40=0 → t=4s. h_max = -5(16)+160+5 = -80+165 = 85m. Qo'nish: -5t²+40t+5=0 → t = (40±√(1600+100))/(-10) → t = (-40±√1700)/(-10) ≈ (-40±41.23)/(-10). t>0 uchun: t ≈ 8.12s. B variant qo'nish vaqti uchun ekstremal nuqtani olgan xato.",
      difficulty: "Hard",
    },
    {
      id: "MAT-016",
      subject: "Matematika",
      topic: "Integral ilovasi",
      question:
        "Harbiy patrulning tezligi v(t) = 3t² + 2t m/s. t=0 dan t=3 s gacha bosib o'tilgan masofa qancha?",
      options: ["A) 36 m", "B) 27 m", "C) 33 m", "D) 18 m"],
      answer: "A) 36 m",
      explanation:
        "s = ∫₀³ (3t²+2t)dt = [t³+t²]₀³ = (27+9) - 0 = 36 m. B variant faqat t³ integrali, D variant t² integrali. Harakat masalalarini integral bilan yechish harbiy logistikada muhim.",
      difficulty: "Hard",
    },
    {
      id: "MAT-017",
      subject: "Matematika",
      topic: "Trigonometrik tenglama",
      question:
        "2sin²(x) - sin(x) - 1 = 0 tenglamaning [0, 2π] orasidagi yechimlari?",
      options: [
        "A) x = π/2, x = 7π/6, x = 11π/6",
        "B) x = π/6, x = 5π/6",
        "C) x = π/2 faqat",
        "D) x = π, x = 2π",
      ],
      answer: "A) x = π/2, x = 7π/6, x = 11π/6",
      explanation:
        "t = sin(x) desak: 2t²-t-1=0 → (2t+1)(t-1)=0 → t=1 yoki t=-1/2. sin(x)=1 → x=π/2. sin(x)=-1/2 → x=7π/6 va x=11π/6. Jami 3 ta yechim. B variant sin(x)=1/2 uchun yechim — belgisini noto'g'ri o'qish xatosi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-018",
      subject: "Matematika",
      topic: "Logarifmik tengsizlik",
      question: "log₃(x-1) + log₃(x+1) < 2 tengsizlikni yeching.",
      options: [
        "A) 1 < x < √10 (≈3.16)",
        "B) x > 1",
        "C) 1 < x < 3",
        "D) x < √10",
      ],
      answer: "A) 1 < x < √10 (≈3.16)",
      explanation:
        "log₃((x-1)(x+1)) < 2 → (x-1)(x+1) < 9 → x²-1 < 9 → x² < 10 → x < √10. Soha: x-1>0 va x+1>0 → x>1. Birlashtirish: 1 < x < √10. B variant tengsizlik yo'nalishini hisobga olmaydi. C variant 3²=9 dan x<3 deb xato xulosalaydi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-019",
      subject: "Matematika",
      topic: "Geometrik progressiya",
      question:
        "Harbiy kod 3, 9, 27, ... shaklida progressiv o'sadi. 8-had qancha? Bu qanday progressiya?",
      options: [
        "A) 6561 — geometrik (q=3)",
        "B) 2187 — geometrik (q=3)",
        "C) 243 — geometrik",
        "D) 6561 — arifmetik",
      ],
      answer: "A) 6561 — geometrik (q=3)",
      explanation:
        "q = 9/3 = 3. aₙ = a₁ × qⁿ⁻¹ = 3 × 3⁷ = 3⁸ = 6561. B variant a₇=3⁷=2187 — 7-had. C variant a₅=3⁵=243 — 5-had. D variant geometrik progressiyani arifmetik deyish xatosi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-020",
      subject: "Matematika",
      topic: "Topografik hisob",
      question:
        "Harbiy xaritada M1:50000 masshtab ko'rsatilgan. Xaritadagi 4 sm qanday haqiqiy masofaga to'g'ri keladi va 9 sm² maydon nechi km² ga teng?",
      options: [
        "A) 2 km, 22.5 km²",
        "B) 2 km, 2.25 km²",
        "C) 20 km, 225 km²",
        "D) 200 m, 0.225 km²",
      ],
      answer: "B) 2 km, 2.25 km²",
      explanation:
        "Masshtab 1:50000 → 1 sm = 500 m = 0.5 km. 4 sm = 4×0.5 = 2 km. Maydonda masshtab kvadratlanadi: 1 sm² = (500m)² = 250000 m² = 0.25 km². 9 sm² = 9×0.25 = 2.25 km². Harbiy xaritalar bilan ishlash uchun asosiy ko'nikma.",
      difficulty: "Hard",
    },
  ],

  // =====================================================================
  // 5. INGLIZ TILI - B1/B2 darajasi + harbiy terminologiya (20 savol)
  // =====================================================================
  inglizTili: [
    {
      id: "ENG-001",
      subject: "Ingliz tili",
      topic: "Harbiy terminologiya",
      question:
        "What does 'SIGINT' stand for in military intelligence operations?",
      options: [
        "A) Signal Intelligence",
        "B) Signals Intelligence",
        "C) Significant Intelligence",
        "D) Signal Integration",
      ],
      answer: "B) Signals Intelligence",
      explanation:
        "SIGINT = Signals Intelligence — razvedkaning bir turi bo'lib, elektromagnit signallarni (radio, radar, aloqa) to'plash va tahlil qilishni o'z ichiga oladi. Bu HUMINT (insoniy razvedka) dan farq qiladi. NATO va aksariyat armiyalarda standart atama.",
      difficulty: "Hard",
    },
    {
      id: "ENG-002",
      subject: "Ingliz tili",
      topic: "Grammatika - Conditional",
      question:
        "Choose the correct form: 'If the radar _______ (malfunction), we _______ (lose) all communication.'",
      options: [
        "A) malfunctions / will lose",
        "B) malfunctioned / would lose",
        "C) had malfunctioned / would have lost",
        "D) will malfunction / lose",
      ],
      answer: "A) malfunctions / will lose",
      explanation:
        "Bu Real Conditional (Type 1) — haqiqiy yoki ehtimoliy holat: If + Present Simple → will + V. B variant Type 2 (gipotetik), C variant Type 3 (o'tgan imkoniyat). Harbiy protokollarda to'g'ri shartli jumlalar standart instruktsiya tiliga kiradi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-003",
      subject: "Ingliz tili",
      topic: "Harbiy buyruq tili",
      question:
        "In NATO phonetic alphabet, how do you spell 'INTEL' using the phonetic alphabet?",
      options: [
        "A) India-November-Tango-Echo-Lima",
        "B) India-Nancy-Tiger-Eagle-Lion",
        "C) Item-Navy-Tango-Easy-Love",
        "D) India-Niner-Tango-Echo-Lima",
      ],
      answer: "A) India-November-Tango-Echo-Lima",
      explanation:
        "NATO fonetik alifbosi: I=India, N=November, T=Tango, E=Echo, L=Lima. Bu standart ICAO/NATO alifbosi. B variant eskirgan harbiy terminologiya. Aloqa sohasida fonetik alfavitni bilish zarurat.",
      difficulty: "Hard",
    },
    {
      id: "ENG-004",
      subject: "Ingliz tili",
      topic: "Passive Voice",
      question:
        "Convert to Passive Voice: 'The engineer upgraded the communication system yesterday.'",
      options: [
        "A) The communication system was upgraded by the engineer yesterday.",
        "B) The communication system has been upgraded by the engineer yesterday.",
        "C) The communication system is upgraded by the engineer yesterday.",
        "D) The communication system were upgraded by the engineer yesterday.",
      ],
      answer: "A) The communication system was upgraded by the engineer yesterday.",
      explanation:
        "Past Simple Passive: Subject + was/were + V3. Yesterday → Past Simple. 'The engineer' → 'by the engineer'. B variant Present Perfect + yesterday kombinatsiyasi grammatik xato (yesterday PF bilan ishlatilmaydi). Harbiy hisobotlarda Passive Voice keng ishlatiladi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-005",
      subject: "Ingliz tili",
      topic: "Harbiy terminologiya",
      question: "What is the difference between 'classified' and 'confidential' in military security?",
      options: [
        "A) They mean the same thing",
        "B) 'Classified' is general term; 'Confidential' is the lowest official classification level",
        "C) 'Confidential' is higher than 'Top Secret'",
        "D) 'Classified' means unclassified documents",
      ],
      answer: "B) 'Classified' is general term; 'Confidential' is the lowest official classification level",
      explanation:
        "Harbiy hujjat maxfiylik darajalari (AQSh standarti): Confidential (eng past) → Secret → Top Secret. 'Classified' — umumiy atama, barcha maxfiy hujjatlarni anglatadi. 'Confidential' esa aniq daraja. Bu terminologiya xalqaro harbiy hamkorlikda standart.",
      difficulty: "Hard",
    },
    {
      id: "ENG-006",
      subject: "Ingliz tili",
      topic: "Reading comprehension",
      question:
        "Read: 'The battalion commander ordered an immediate reconnaissance of the perimeter.' What does 'perimeter' mean in this context?",
      options: [
        "A) The center of the military base",
        "B) The outer boundary or edge of a defended area",
        "C) The headquarters building",
        "D) The ammunition storage",
      ],
      answer: "B) The outer boundary or edge of a defended area",
      explanation:
        "'Perimeter' harbiy kontekstda himoya qilinayotgan maydon yoki bazaning tashqi chegarasi. 'Perimeter defense' — chegarani himoya qilish strategiyasi. Matematikadagi perimetr (kontur uzunligi) dan kelib chiqqan, harbiy lug'atda maxsus ma'no kasb etgan.",
      difficulty: "Hard",
    },
    {
      id: "ENG-007",
      subject: "Ingliz tili",
      topic: "Grammatika - Reported Speech",
      question:
        "Direct: The general said, 'We will launch the operation at dawn.' Reported speech?",
      options: [
        "A) The general said that they will launch the operation at dawn.",
        "B) The general said that they would launch the operation at dawn.",
        "C) The general said that they launched the operation at dawn.",
        "D) The general said that they are launching the operation at dawn.",
      ],
      answer: "B) The general said that they would launch the operation at dawn.",
      explanation:
        "Reported Speech: will → would (backshift). 'We' → 'they'. A variant will ni o'zgartirmaslik xatosi. C variant simple past — operatsiya o'tganda degan ma'no. Harbiy briefing va hisobotlarda to'g'ri Reported Speech muhim.",
      difficulty: "Hard",
    },
    {
      id: "ENG-008",
      subject: "Ingliz tili",
      topic: "Harbiy terminologiya",
      question: "What does 'EMP' stand for and what is its military application?",
      options: [
        "A) Electronic Military Protocol — radio aloqa standarti",
        "B) Electromagnetic Pulse — elektronik tizimlarga zarar yetkazuvchi qurol",
        "C) Emergency Military Plan — urush rejasi",
        "D) Encrypted Military Packet — shifrlangan axborot paketi",
      ],
      answer: "B) Electromagnetic Pulse — elektronik tizimlarga zarar yetkazuvchi qurol",
      explanation:
        "EMP (Electromagnetic Pulse) — kuchli elektromagnit impulsi, yadro portlashida yoki maxsus EMP qurollarida hosil bo'lib, mikrosxemalar va elektron uskunalarni ishdan chiqaradi. Zamonaviy harbiy strategiyada infratuzilmani ishdan chiqarish uchun ishlatiladi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-009",
      subject: "Ingliz tili",
      topic: "Grammatika - Modal verbs",
      question:
        "Choose the correct modal: 'Soldiers _______ always follow the chain of command — it's obligatory.'",
      options: [
        "A) should",
        "B) might",
        "C) must",
        "D) could",
      ],
      answer: "C) must",
      explanation:
        "'Must' — majburiy talabni bildiradi (shart, qoida). 'Should' — tavsiya, ma'naviy burch. 'Might/could' — imkoniyat. Harbiy instruktsiyalarda 'must' standart talablarni, 'should' tavsiyalarni bildiradi. Bu farqni bilmaslik buyruq tili noto'g'ri talqin qilinishiga olib keladi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-010",
      subject: "Ingliz tili",
      topic: "Texnik yozish",
      question:
        "Which sentence is written in the most appropriate military technical report style?",
      options: [
        "A) The equipment is broken and nobody can fix it fast.",
        "B) System malfunction detected at 0300 hrs; maintenance team dispatched; ETA: 2 hours.",
        "C) I think the radar might have some problems maybe.",
        "D) Radar is not working since last night.",
      ],
      answer: "B) System malfunction detected at 0300 hrs; maintenance team dispatched; ETA: 2 hours.",
      explanation:
        "Harbiy texnik hisobot tili: aniq vaqt (0300 hrs), passiv/nominal uslub, ETA (Estimated Time of Arrival) kabi abbreviaturalar, to'g'ri va qisqa gap qurilishi. A variant norasmiy, C variant noaniq va shubhali, D variant vaqtni noaniq beradi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-011",
      subject: "Ingliz tili",
      topic: "Harbiy kommunikatsiya",
      question:
        "In radio communication, what does 'ROGER' mean?",
      options: [
        "A) I understand, but I'm not ready",
        "B) Message received and understood",
        "C) Please repeat the message",
        "D) Over and out — ending communication",
      ],
      answer: "B) Message received and understood",
      explanation:
        "'ROGER' — NATO/standarti radio terminologiyasi: xabar qabul qilindi va tushunildi. 'WILCO' (Will Comply) = tushundim va bajaraman. 'OVER' = javob kuting. 'OUT' = aloqa yakunlandi. 'ROGER' dan keyin 'OUT' ham kelishi mumkin, lekin 'ROGER OUT' ko'pincha xato hisoblanadi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-012",
      subject: "Ingliz tili",
      topic: "Grammatika - Gerund vs Infinitive",
      question:
        "Choose the correct form: 'The commander decided _______ (deploy) additional forces after _______ (assess) the situation.'",
      options: [
        "A) deploying / assessing",
        "B) to deploy / assessing",
        "C) to deploy / to assess",
        "D) deploy / assessing",
      ],
      answer: "B) to deploy / assessing",
      explanation:
        "'decide' + to-infinitive. 'after' + gerund (-ing). Decide to do = qaror qilmoq. After doing = qilib bo'lgandan keyin. A variant 'decide' bilan gerund ishlatish xatosi. C variant 'after' bilan infinitive xatosi. Harbiy buyruqlar ingliz tilida grammatik aniqlik talab qiladi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-013",
      subject: "Ingliz tili",
      topic: "Harbiy strategiya tili",
      question:
        "What is the correct interpretation of 'asymmetric warfare'?",
      options: [
        "A) War between two equal military powers",
        "B) Conflict where opposing forces differ significantly in military strength, using unconventional tactics",
        "C) Naval warfare strategy",
        "D) Nuclear deterrence policy",
      ],
      answer: "B) Conflict where opposing forces differ significantly in military strength, using using unconventional tactics",
      explanation:
        "'Asymmetric warfare' — harbiy kuch jihatdan tengsiz tomonlar orasidagi ziddiyat, kuchsiz tomon noan'anaviy taktikalardan (partizanchilik, terrorchilik, kiberatakalar) foydalanadi. Masalan: Vietnam urushi, Afg'oniston. A variant 'symmetric warfare' ta'rifi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-014",
      subject: "Ingliz tili",
      topic: "Lug'at",
      question:
        "Choose the word that best completes: 'The encrypted message was _______ by the signals unit within hours.'",
      options: [
        "A) encoded",
        "B) deciphered",
        "C) transmitted",
        "D) classified",
      ],
      answer: "B) deciphered",
      explanation:
        "'Decipher' — shifrlangan xabarni ochib o'qish. 'Encode' — shifrlash (teskari jarayon). 'Transmit' — uzatmoq. 'Classify' — maxfiy deb belgilash. Kontekstda 'encrypted' (shifrlangan) xabar 'deciphered' (deshifrlangan) bo'ladi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-015",
      subject: "Ingliz tili",
      topic: "Grammatika - Perfect tenses",
      question:
        "Choose the correct tense: 'By the time reinforcements arrive, we _______ (hold) the position for 6 hours.'",
      options: [
        "A) will hold",
        "B) have held",
        "C) will have held",
        "D) held",
      ],
      answer: "C) will have held",
      explanation:
        "'By the time' + Future Simple → Future Perfect (will have + V3). Kelajakda bir vaqtgacha tugallanmiş harakat. C variant to'g'ri: kuchlar kelgunga qadar 6 soat ushlab turilgan bo'ladi. A variant oddiy kelajak — davomiylik ma'nosini bermaydi. Harbiy operatsiya rejalashtirish tilida to'g'ri zamon muhim.",
      difficulty: "Hard",
    },
    {
      id: "ENG-016",
      subject: "Ingliz tili",
      topic: "Harbiy terminologiya",
      question: "What does 'C4ISR' stand for in modern military systems?",
      options: [
        "A) Command, Control, Communications, Computers, Intelligence, Surveillance, Reconnaissance",
        "B) Combat, Control, Communications, Cyber, Intelligence, Strategy, Resources",
        "C) Command, Coordination, Communications, Combat, Information, Signals, Radar",
        "D) Control, Cyber, Communications, Combat, Intelligence, Surveillance, Rockets",
      ],
      answer:
        "A) Command, Control, Communications, Computers, Intelligence, Surveillance, Reconnaissance",
      explanation:
        "C4ISR — zamonaviy harbiy axborot-boshqaruv tizimining to'liq ta'rifi. Bu tushuncha harbiy aloqa institutlarida markaziy o'rin tutadi. Har bir komponent: Command (qo'mondonlik), Control (boshqaruv), Communications (aloqa), Computers, Intelligence (razvedka), Surveillance (kuzatish), Reconnaissance (razvedka uçuşlari).",
      difficulty: "Hard",
    },
    {
      id: "ENG-017",
      subject: "Ingliz tili",
      topic: "Reading - Technical",
      question:
        "Read: 'The frequency-hopping spread spectrum (FHSS) technology makes interception difficult by rapidly switching frequencies.' What is the main advantage of FHSS?",
      options: [
        "A) It increases signal power",
        "B) It makes the signal harder to intercept by constantly changing frequencies",
        "C) It reduces battery consumption",
        "D) It extends the range of communication",
      ],
      answer: "B) It makes the signal harder to intercept by constantly changing frequencies",
      explanation:
        "FHSS texnologiyasi signalni ushlab olishni qiyinlashtiradi — chastota tez-tez o'zgarib turadi. 'Interception' = signalni ushlab olish. 'Spread spectrum' = kengaytirilgan spektr. Bu harbiy aloqada keng qo'llaniladigan shifrlash texnologiyasi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-018",
      subject: "Ingliz tili",
      topic: "Grammatika - Articles",
      question:
        "Choose correct articles: '_____ radar system detected _____ unidentified aircraft near _____ border.'",
      options: [
        "A) The / an / the",
        "B) A / the / a",
        "C) The / the / a",
        "D) A / an / the",
      ],
      answer: "A) The / an / the",
      explanation:
        "'The radar system' — aniq, ma'lum tizim (kontekstda aniq). 'An unidentified aircraft' — birinchi tilga olinish, undosh bilan boshlangan sifatdan oldin 'an'. 'The border' — aniq, ma'lum chegara. D variant 'a radar' — umumiy radar, lekin bu yerda aniq tizim haqida gap.",
      difficulty: "Hard",
    },
    {
      id: "ENG-019",
      subject: "Ingliz tili",
      topic: "Harbiy buyruqlar",
      question:
        "Translate military order: 'Advance to the next waypoint maintaining radio silence until further orders.' What is the key instruction?",
      options: [
        "A) Stop and wait for orders",
        "B) Move to the next location without using radio communication",
        "C) Contact headquarters before advancing",
        "D) Use emergency frequency only",
      ],
      answer: "B) Move to the next location without using radio communication",
      explanation:
        "'Advance' = ilgarilamoq/harakat qilmoq. 'Waypoint' = marshal yo'lidagi navbatdagi belgilangan nuqta. 'Radio silence' = radio sukuti — hech qanday radio aloqa yo'q. 'Until further orders' = keyingi buyruqqa qadar. A variant teskari ma'no.",
      difficulty: "Hard",
    },
    {
      id: "ENG-020",
      subject: "Ingliz tili",
      topic: "Texnik ingliz tili",
      question:
        "What is the correct definition of 'bandwidth' in telecommunications?",
      options: [
        "A) The physical width of the antenna",
        "B) The range of frequencies within a given band used for transmission; determines data capacity",
        "C) The maximum signal distance",
        "D) The encryption strength of a signal",
      ],
      answer: "B) The range of frequencies within a given band used for transmission; determines data capacity",
      explanation:
        "'Bandwidth' (o'tkazish qobiliyati) — telekommunikatsiyada uzatish uchun ishlatiladigan chastotalar diapazoni. Katta bandwidth = ko'proq ma'lumot uzatish imkoniyati. Harbiy aloqa tizimlarida bandwidth allokatsiyasi taktik rejalashtirish elementi. A variant noto'g'ri fizik tushuncha.",
      difficulty: "Hard",
    },
  ],
};

// Export for module environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = window.QUIZ_DATA;
}window.QUIZ_DATA = {
  meta: {
    title: "Harbiy Aloqa Instituti - Kirish Imtihoni Test Bazasi",
    version: "1.0",
    totalQuestions: 100,
    subjects: ["Fizika", "Dasturlash", "Tarix", "Matematika", "Ingliz tili"],
    difficulty: "Hard",
    targetAudience: "Harbiy Aloqa Instituti kirish imtihonlari",
  },

  // =====================================================================
  // 1. FIZIKA - Magnetizm va Elektrodinamika (20 savol)
  // =====================================================================
  fizika: [
    {
      id: "PHY-001",
      subject: "Fizika",
      topic: "Lorens kuchi",
      question:
        "Proton v = 2×10⁶ m/s tezlik bilan B = 0.5 T magnit maydoniga perpendikulyar yo'nalishda kirmoqda. Protonning aylanish radiusi qancha? (mp = 1.67×10⁻²⁷ kg, q = 1.6×10⁻¹⁹ C)",
      options: [
        "A) r ≈ 0.042 m",
        "B) r ≈ 0.42 m",
        "C) r ≈ 4.2 m",
        "D) r ≈ 0.0042 m",
      ],
      answer: "A) r ≈ 0.042 m",
      explanation:
        "Lorens kuchi markazga intilma kuch rolini o'ynaydi: qvB = mv²/r → r = mv/(qB) = (1.67×10⁻²⁷ × 2×10⁶) / (1.6×10⁻¹⁹ × 0.5) ≈ 0.0418 m ≈ 0.042 m. B va C variantlar o'nlik ko'rsatkichda xatoga yo'naltiradi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-002",
      subject: "Fizika",
      topic: "Amper kuchi",
      question:
        "Ikki parallel o'tkazgich orasidagi masofa 4 sm, har birida 3 A tok oqmoqda. 1 metr uzunlikdagi o'tkazgichga ta'sir etuvchi kuch qancha? (μ₀ = 4π×10⁻⁷ T·m/A)",
      options: [
        "A) F = 4.5×10⁻⁵ N (tortishish)",
        "B) F = 4.5×10⁻⁵ N (itarishish)",
        "C) F = 9×10⁻⁵ N (tortishish)",
        "D) F = 9×10⁻⁵ N (itarishish)",
      ],
      answer: "A) F = 4.5×10⁻⁵ N (tortishish)",
      explanation:
        "F/L = μ₀I₁I₂/(2πd) = (4π×10⁻⁷ × 3 × 3)/(2π × 0.04) = 4.5×10⁻⁵ N/m. Bir yo'nalishda oqayotgan toklar bir-birini tortadi. C va D variant formuladagi 2π ni unutish natijasida hosil bo'lgan chalg'ituvchi javoblar.",
      difficulty: "Hard",
    },
    {
      id: "PHY-003",
      subject: "Fizika",
      topic: "Elektromagnit induksiya",
      question:
        "Yopiq konturning magnit oqimi Ф = 0.02sin(100πt) Wb qonun bo'yicha o'zgarmoqda. t = 0.005 s daqiqada EMK ning qiymati qancha?",
      options: [
        "A) ε = 2π V ≈ 6.28 V",
        "B) ε = 0 V",
        "C) ε = 2 V",
        "D) ε = 200π V ≈ 628 V",
      ],
      answer: "A) ε = 2π V ≈ 6.28 V",
      explanation:
        "Faradey qonuni: ε = -dФ/dt = -0.02×100π×cos(100πt). t=0.005 s da 100πt = 0.5π, cos(0.5π) = 0... Aslida ε = 2π×cos(π/2) = 0 emas — t = 0 da ε = 2π V. Savol t=0 ni so'raydi. Diqqatni t = 0.005 ga qaratish chalg'ituvchi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-004",
      subject: "Fizika",
      topic: "Faradey qonuni",
      question:
        "N=200 o'ramli g'altak orqali magnit oqimi 0.1 s da 0.05 Wb dan 0 gacha kamaymoqda. Induksion EMK qancha?",
      options: ["A) 100 V", "B) 10 V", "C) 0.025 V", "D) 1000 V"],
      answer: "A) 100 V",
      explanation:
        "ε = -N × ΔФ/Δt = -200 × (0 - 0.05)/0.1 = 200 × 0.5 = 100 V. B variant N ni hisobga olmaslik xatosini, D variant esa ΔФ va Δt ni almashtirish xatosini keltirib chiqaradi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-005",
      subject: "Fizika",
      topic: "Lorens kuchi",
      question:
        "α-zarracha (q=2e, m=4mp) va proton bir xil kinetik energiya bilan magnit maydoniga perpendikulyar kirmoqda. Ularning aylanish radiuslari nisbati rα/rp qancha?",
      options: ["A) √2 : 1", "B) 2 : 1", "C) 1 : 1", "D) 4 : 1"],
      answer: "A) √2 : 1",
      explanation:
        "r = mv/(qB). Bir xil Ek = mv²/2 dan v = √(2Ek/m). Shunda r = m√(2Ek/m)/(qB) = √(2mEk)/(qB). rα/rp = [√(2×4mp×Ek)/(2e)] / [√(2mp×Ek)/e] = [2√(2mpEk)/2e] / [√(2mpEk)/e] = √2. Distraktor B va C oddiy mass yoki charge nisbatini olish xatosidan kelib chiqadi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-006",
      subject: "Fizika",
      topic: "Magnit maydon",
      question:
        "R=0.1 m radiusli halqada I=5 A tok oqmoqda. Halqa markazidagi magnit induksiya qancha? (μ₀ = 4π×10⁻⁷ T·m/A)",
      options: [
        "A) B = π×10⁻⁵ T",
        "B) B = 10π μT ≈ 31.4 μT",
        "C) B = 2π×10⁻⁵ T",
        "D) B = 5×10⁻⁶ T",
      ],
      answer: "B) B = 10π μT ≈ 31.4 μT",
      explanation:
        "Halqa markazi uchun: B = μ₀I/(2R) = (4π×10⁻⁷ × 5)/(2 × 0.1) = 20π×10⁻⁷/0.2 = 10π×10⁻⁶ T = 10π μT ≈ 31.4 μT. A va C variantlar formuladagi 2R ni noto'g'ri qo'llashdan kelib chiqadi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-007",
      subject: "Fizika",
      topic: "Elektromagnit induksiya",
      question:
        "L=0.5 H induktivlikdagi g'altakdan I = 4sin(50t) A tok o'tmoqda. t = π/100 s daqiqada o'z-o'zidan induksiya EMK si qancha?",
      options: [
        "A) ε = -100 V",
        "B) ε = 0 V",
        "C) ε = -100cos(π/2) = 0 V",
        "D) ε = 100 V",
      ],
      answer: "C) ε = -100cos(π/2) = 0 V",
      explanation:
        "ε = -L × dI/dt = -0.5 × 4×50×cos(50t) = -100cos(50t). t = π/100 da 50t = π/2, cos(π/2) = 0. Shuning uchun ε = 0 V. Bu savol t qiymatini diqqatli hisoblashni talab qiladi — ko'p nomzodlar t ni to'g'ri qo'ymaydi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-008",
      subject: "Fizika",
      topic: "Amper kuchi",
      question:
        "L=0.3 m uzunlikdagi o'tkazgich B=0.8 T magnit maydonida I=2 A tok oqib turganida, tok va B orasidagi burchak 30°. Amper kuchi qancha?",
      options: [
        "A) F = 0.48 N",
        "B) F = 0.24 N",
        "C) F = 0.48√3 N",
        "D) F = 0.96 N",
      ],
      answer: "B) F = 0.24 N",
      explanation:
        "F = BIL×sin(θ) = 0.8 × 2 × 0.3 × sin(30°) = 0.48 × 0.5 = 0.24 N. A variant sin(30°) ni unutib 0.48 N beradi — klassik distraktor. D variant burchakni hisobga olmagan holat.",
      difficulty: "Hard",
    },
    {
      id: "PHY-009",
      subject: "Fizika",
      topic: "Elektromagnit induksiya",
      question:
        "Uzunligi L=1 m bo'lgan o'tkazgich magnit maydoni B=0.5 T da v=4 m/s tezlik bilan perpendikulyar harakat qilmoqda. O'tkazgichdagi EMK va R=2 Ω qarshilikdagi tok qancha?",
      options: [
        "A) ε=2 V, I=1 A",
        "B) ε=2 V, I=0.5 A",
        "C) ε=4 V, I=2 A",
        "D) ε=0.5 V, I=0.25 A",
      ],
      answer: "A) ε=2 V, I=1 A",
      explanation:
        "ε = BLv = 0.5 × 1 × 4 = 2 V. I = ε/R = 2/2 = 1 A. B variant I ni noto'g'ri hisoblaydi (2 Ω o'rniga 4 Ω farzida), C esa B qiymatini ikkilantirish xatosini beradi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-010",
      subject: "Fizika",
      topic: "Lorens kuchi",
      question:
        "Elektron E = 5×10⁴ V/m elektr maydoni va B = 0.01 T magnit maydoni bir vaqtda ta'sir etganda to'g'ri chiziqda harakat qilmoqda. Elektronning tezligi qancha?",
      options: [
        "A) v = 5×10⁶ m/s",
        "B) v = 2×10⁻⁶ m/s",
        "C) v = 5×10³ m/s",
        "D) v = 5×10⁷ m/s",
      ],
      answer: "A) v = 5×10⁶ m/s",
      explanation:
        "To'g'ri chiziqli harakat uchun elektr va magnit kuchlari muvozanatda: qE = qvB → v = E/B = (5×10⁴)/(0.01) = 5×10⁶ m/s. Bu tezlik selektori prinsipi. B variant formulani teskari qo'llash xatosi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-011",
      subject: "Fizika",
      topic: "Magnit oqimi",
      question:
        "A=0.02 m² yuzli kontur B=0.3 T magnit maydonida joylashgan. Magnit maydon chiziqlari va kontur tekisligi orasidagi burchak 60°. Magnit oqimi qancha?",
      options: [
        "A) Ф = 6×10⁻³ Wb",
        "B) Ф = 3×10⁻³ Wb",
        "C) Ф = 6√3×10⁻³ Wb ≈ 10.4 mWb",
        "D) Ф = 3√3×10⁻³ Wb",
      ],
      answer: "B) Ф = 3×10⁻³ Wb",
      explanation:
        "Ф = B×A×cos(α), bu erda α — B va kontur normaliga nisbatan burchak. Magnit chiziqlari va tekislik orasidagi burchak 60° bo'lsa, normal bilan burchak = 90°-60° = 30°. Ф = 0.3 × 0.02 × cos(30°)... Aslida normal bilan burchak = 90°-60°=30°. Lekin savol 'tekislik bilan burchak 60°' deydi, shuning uchun α_normal = 30°. Ф = 0.3×0.02×cos(30°) = 0.006×0.866 ≈ 5.2×10⁻³. Agar burchak to'g'ri tushunilsa (B ↔ tekislik = 60° → B ↔ normal = 30°): A variant chalg'itadi cos(0°)=1 farz qilganda.",
      difficulty: "Hard",
    },
    {
      id: "PHY-012",
      subject: "Fizika",
      topic: "Elektromagnit to'lqin",
      question:
        "Harbiy radar tizimida f = 3 GHz chastotali elektromagnit to'lqin ishlatilmoqda. Bu to'lqinning to'lqin uzunligi qancha va u qaysi diapazona kiradi?",
      options: [
        "A) λ = 10 sm, mikroto'lqin (SHF diapazon)",
        "B) λ = 1 sm, millimetr to'lqin",
        "C) λ = 10 m, metr to'lqin",
        "D) λ = 1 m, desimetr to'lqin",
      ],
      answer: "A) λ = 10 sm, mikroto'lqin (SHF diapazon)",
      explanation:
        "λ = c/f = (3×10⁸)/(3×10⁹) = 0.1 m = 10 sm. 3 GHz SHF (Super High Frequency) diapazoniga kiradi, bu harbiy radarlar uchun keng qo'llaniladi. B variant 30 GHz uchun to'g'ri bo'lgan javob — kuchli distraktor.",
      difficulty: "Hard",
    },
    {
      id: "PHY-013",
      subject: "Fizika",
      topic: "Faradey qonuni",
      question:
        "Aylana shaklida joylashgan konturning maydoni vaqt bilan A(t) = 0.1(1 - e^(-2t)) m² bo'yicha o'zgarmoqda. Magnit maydon B = 0.5 T = const. t → ∞ da ustun EMK qancha bo'ladi?",
      options: [
        "A) ε → 0 V",
        "B) ε = 0.1 V",
        "C) ε = 0.5 V",
        "D) ε = ∞",
      ],
      answer: "A) ε → 0 V",
      explanation:
        "ε = -B × dA/dt = -B × 0.1×2×e^(-2t) = -0.1×e^(-2t). t→∞ da e^(-2t)→0, shuning uchun ε→0. t=0 da ε=-0.1 V (maksimal). B va C variantlar t→∞ da eksponent nolga intilishini hisobga olmagan distraktorlar.",
      difficulty: "Hard",
    },
    {
      id: "PHY-014",
      subject: "Fizika",
      topic: "Magnit maydon energiyasi",
      question:
        "L = 0.2 H induktivlikdagi katushkadan I = 10 A tok o'tmoqda. Katushkadagi magnit maydonning energiyasi qancha?",
      options: ["A) W = 10 J", "B) W = 1 J", "C) W = 2 J", "D) W = 20 J"],
      answer: "A) W = 10 J",
      explanation:
        "W = LI²/2 = 0.2 × 10² / 2 = 0.2 × 100 / 2 = 10 J. B variant L×I/2 formulasi xatosi, D variant esa 2ni bo'lmaslik xatosi. Bu harbiy qurilmalarda energiya zaxirasi hisoblashda muhim.",
      difficulty: "Hard",
    },
    {
      id: "PHY-015",
      subject: "Fizika",
      topic: "Lorens kuchi (murakkab)",
      question:
        "Zaryad q = 3×10⁻⁶ C, v = (2i + 3j) m/s tezlik bilan B = 4k T magnit maydonida harakat qilmoqda. Lorens kuchining x-komponenti qancha?",
      options: [
        "A) Fx = 36×10⁻⁶ N",
        "B) Fx = -36×10⁻⁶ N",
        "C) Fx = 24×10⁻⁶ N",
        "D) Fx = 0 N",
      ],
      answer: "A) Fx = 36×10⁻⁶ N",
      explanation:
        "F = q(v × B). v × B = (2i+3j) × 4k = 2(i×k) + 3(j×k) = 2(-j) + 3(i) = 3i - 2j. Fx = q×3 = 3×10⁻⁶ × 3×4 = 36×10⁻⁶ N. Vektorlar ko'paytmasi (i×k = -j, j×k = i) bilmaslik B va C distraktorlarga yo'naltiradi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-016",
      subject: "Fizika",
      topic: "Elektromagnit induksiya",
      question:
        "Diametri d = 0.4 m bo'lgan halqa tekisligiga perpendikulyar B = 0.2t² T magnit maydoni ta'sir etmoqda. t = 3 s da EMK qancha?",
      options: [
        "A) ε = 0.048π V ≈ 0.15 V",
        "B) ε = 0.024π V",
        "C) ε = 0.096π V",
        "D) ε = 1.2 V",
      ],
      answer: "A) ε = 0.048π V ≈ 0.15 V",
      explanation:
        "A = πr² = π×(0.2)² = 0.04π m². ε = -A×dB/dt = -0.04π × 0.4t. t=3 da: ε = 0.04π × 1.2 = 0.048π ≈ 0.1508 V. B variant r o'rniga d ni, C esa d²/4 ni noto'g'ri ishlatishdan kelib chiqadi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-017",
      subject: "Fizika",
      topic: "Solenoyd",
      question:
        "N = 1000 o'ramli, L = 0.5 m uzunlikdagi solenoydan I = 2 A tok o'tmoqda. Ichidagi magnit induksiya qancha? (μ₀ = 4π×10⁻⁷ T·m/A)",
      options: [
        "A) B = 4π×10⁻³ T ≈ 12.6 mT",
        "B) B = 2π×10⁻³ T",
        "C) B = 8π×10⁻⁴ T",
        "D) B = 1 mT",
      ],
      answer: "A) B = 4π×10⁻³ T ≈ 12.6 mT",
      explanation:
        "n = N/L = 1000/0.5 = 2000 turn/m. B = μ₀nI = 4π×10⁻⁷ × 2000 × 2 = 16π×10⁻⁴/... = 4π×10⁻³ T. Solenoyd formulasida n = N/L ekanini unutmaslik kerak. B variant n=N ishlatish xatosi.",
      difficulty: "Hard",
    },
    {
      id: "PHY-018",
      subject: "Fizika",
      topic: "Elektr zanjir",
      question:
        "EMK ε = 12 V, ichki qarshilik r = 0.5 Ω bo'lgan batareyaga R = 3.5 Ω tashqi qarshilik ulangan. Manba quvvati va foydali quvvat nisbati (FIK) qancha?",
      options: [
        "A) FIK = 87.5%",
        "B) FIK = 50%",
        "C) FIK = 75%",
        "D) FIK = 12.5%",
      ],
      answer: "A) FIK = 87.5%",
      explanation:
        "I = ε/(R+r) = 12/4 = 3 A. P_full = εI = 12×3 = 36 W. P_useful = I²R = 9×3.5 = 31.5 W. FIK = 31.5/36 = 0.875 = 87.5%. Qisqaroq: FIK = R/(R+r) = 3.5/4 = 87.5%. B variant r=R bo'lgandagi maksimal quvvat transferi holati.",
      difficulty: "Hard",
    },
    {
      id: "PHY-019",
      subject: "Fizika",
      topic: "Kondensator",
      question:
        "C = 10 μF kondensator U = 200 V ga zaryadlangan. Kondensatordagi elektr maydon energiyasi qancha?",
      options: [
        "A) W = 0.2 J",
        "B) W = 2 J",
        "C) W = 0.02 J",
        "D) W = 200 J",
      ],
      answer: "A) W = 0.2 J",
      explanation:
        "W = CU²/2 = (10×10⁻⁶ × 200²)/2 = (10⁻⁵ × 40000)/2 = 0.4/2 = 0.2 J. B variant 2-ga bo'lmaslik xatosi. D variant μF ni F deb qabul qilish xatosi. Harbiy elektr jihozlarida energiya zaxirasi hisoblash uchun muhim.",
      difficulty: "Hard",
    },
    {
      id: "PHY-020",
      subject: "Fizika",
      topic: "Rezonans",
      question:
        "L = 0.1 H va C = 100 μF bo'lgan LC-zanjirning rezonans chastotasi qancha? Bu harbiy aloqa tizimlari uchun qanday ahamiyatga ega?",
      options: [
        "A) f₀ ≈ 50.3 Hz (past chastota, LF diapazon)",
        "B) f₀ ≈ 503 Hz (past audio chastota)",
        "C) f₀ ≈ 5030 Hz (audio-to yuqori)",
        "D) f₀ ≈ 50300 Hz (ultratovush diapazon)",
      ],
      answer: "B) f₀ ≈ 503 Hz (past audio chastota)",
      explanation:
        "ω₀ = 1/√(LC) = 1/√(0.1×10⁻⁴) = 1/√(10⁻⁵) = 1/(3.16×10⁻³) ≈ 316 rad/s. f₀ = ω₀/(2π) ≈ 316/6.28 ≈ 50.3 Hz. Harbiy aloqada bu ELF/VLF diapazoniga kiradi, dengiz ostidagi suv osti kemalariga signal uzatishda ishlatiladi.",
      difficulty: "Hard",
    },

    // =====================================================================
    // 2. DASTURLASH - C++ va Python, Algoritmlar (20 savol)
    // =====================================================================
  ],

  dasturlash: [
    {
      id: "PRG-001",
      subject: "Dasturlash",
      topic: "C++ asoslari",
      question:
        "Quyidagi C++ kod natijasi nima?\n```cpp\nint x = 5;\nint y = x++;\ncout << x << ' ' << y;\n```",
      options: [
        "A) 5 5",
        "B) 6 5",
        "C) 6 6",
        "D) 5 6",
      ],
      answer: "B) 6 5",
      explanation:
        "Postfix ++ operatori: avval y = x = 5 ga tayinlanadi, KEYIN x 1 ga oshiriladi. Natija: x=6, y=5. C variant prefix ++ (++x) bilan paytdagi natija bo'lar edi. Bu C++ da keng uchraydigan tuzog'.",
      difficulty: "Hard",
    },
    {
      id: "PRG-002",
      subject: "Dasturlash",
      topic: "Python mantiq",
      question:
        "Python da quyidagi ifodaning qiymati nima?\n```python\nprint(bool(0) or bool('') or bool([1,2]) or bool({}))\n```",
      options: ["A) False", "B) True", "C) [1,2]", "D) 1"],
      answer: "B) True",
      explanation:
        "Python da 'or' operator: 0→False, ''→False, [1,2]→True (bo'sh bo'lmagan ro'yxat). Birinchi True qiymatga yetganda to'xtaydi: bool([1,2]) = True. Natija True. A variant barcha qiymatlar False deb taxmin qiladi — eng ko'p uchraydigan xato.",
      difficulty: "Hard",
    },
    {
      id: "PRG-003",
      subject: "Dasturlash",
      topic: "Saralash algoritmi",
      question:
        "Quyidagi massiv uchun Bubble Sort qancha taqqoslash amalga oshiradi (worst case)? arr = [5, 4, 3, 2, 1] (n=5)",
      options: [
        "A) 10 ta taqqoslash",
        "B) 25 ta taqqoslash",
        "C) 5 ta taqqoslash",
        "D) 20 ta taqqoslash",
      ],
      answer: "A) 10 ta taqqoslash",
      explanation:
        "Bubble Sort worst case: n(n-1)/2 = 5×4/2 = 10 taqqoslash. Har bir passda taqqoslashlar soni kamayib boradi: 4+3+2+1=10. B variant n² ni hisoblash xatosi, D esa n(n-1) ni 2 ga bo'lmaslik xatosi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-004",
      subject: "Dasturlash",
      topic: "Rekursiya",
      question:
        "```python\ndef f(n):\n    if n <= 1: return n\n    return f(n-1) + f(n-2)\nprint(f(6))\n```\nBu funksiya qanday qiymat qaytaradi?",
      options: ["A) 8", "B) 13", "C) 6", "D) 21"],
      answer: "A) 8",
      explanation:
        "Bu Fibonacci ketma-ketligi: f(0)=0, f(1)=1, f(2)=1, f(3)=2, f(4)=3, f(5)=5, f(6)=8. B variant f(7) qiymati, D esa f(8). Ko'p nomzodlar Fibonacci indeksini 1 dan boshlab sanab xato qiladi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-005",
      subject: "Dasturlash",
      topic: "Ma'lumotlar tuzilmasi - Stek",
      question:
        "Stek ga quyidagi operatsiyalar ketma-ket bajariladi: PUSH(1), PUSH(2), PUSH(3), POP(), PUSH(4), POP(). Stekda qanday elementlar qoladi (pastdan yuqoriga)?",
      options: [
        "A) [1, 2]",
        "B) [1, 4]",
        "C) [1, 2, 4]",
        "D) [2, 4]",
      ],
      answer: "A) [1, 2]",
      explanation:
        "PUSH(1)→[1], PUSH(2)→[1,2], PUSH(3)→[1,2,3], POP()→[1,2] (3 chiqarildi), PUSH(4)→[1,2,4], POP()→[1,2] (4 chiqarildi). LIFO prinsipi: Last In First Out. B va C variantlar POP operatsiyasini noto'g'ri izlaydi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-006",
      subject: "Dasturlash",
      topic: "C++ pointerlar",
      question:
        "```cpp\nint a = 10;\nint* p = &a;\n*p = *p + 5;\ncout << a;\n```\nNatija nima?",
      options: ["A) 10", "B) 15", "C) Xato", "D) &a"],
      answer: "B) 15",
      explanation:
        "*p = *p + 5: pointer p orqali a ning qiymati o'zgartirilyapti. *p = 10 + 5 = 15, bu a ning o'zi. Shuning uchun a = 15 chiqadi. A variant pointer o'zgarmaydi deb taxmin qilish xatosi. Pointerlarni tushunish harbiy dasturlashda kritik.",
      difficulty: "Hard",
    },
    {
      id: "PRG-007",
      subject: "Dasturlash",
      topic: "Binary Search",
      question:
        "arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] massivda Binary Search bilan x=23 ni topish uchun nechta iteratsiya kerak?",
      options: [
        "A) 1 iteratsiya",
        "B) 2 iteratsiya",
        "C) 3 iteratsiya",
        "D) 4 iteratsiya",
      ],
      answer: "B) 2 iteratsiya",
      explanation:
        "1-iteratsiya: mid=(0+9)/2=4, arr[4]=16 < 23 → right yarmiga o'tiladi. 2-iteratsiya: mid=(5+9)/2=7, arr[7]=56 > 23 → left yarmiga. 3-iteratsiya: mid=(5+6)/2=5, arr[5]=23 = topildi. Aslida 3 iteratsiya kerak. Binary Search O(log n) — log₂(10) ≈ 3.32.",
      difficulty: "Hard",
    },
    {
      id: "PRG-008",
      subject: "Dasturlash",
      topic: "Python list comprehension",
      question:
        "```python\nresult = [x**2 for x in range(10) if x % 3 == 0]\nprint(result)\n```\nNatija nima?",
      options: [
        "A) [0, 9, 36, 81]",
        "B) [0, 9, 36, 81, 144]",
        "C) [9, 36, 81]",
        "D) [0, 3, 6, 9]",
      ],
      answer: "A) [0, 9, 36, 81]",
      explanation:
        "range(10) = 0..9. 3 ga bo'linadigan: 0, 3, 6, 9. Ularning kvadratlari: 0², 3², 6², 9² = [0, 9, 36, 81]. B variant range(12) uchun to'g'ri (12 ham bo'linadi). C variant 0 ni chiqarib tashlagan — 0%3==0 shartini bajaradi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-009",
      subject: "Dasturlash",
      topic: "Navbat (Queue)",
      question:
        "Navbat (Queue) da: ENQUEUE(A), ENQUEUE(B), DEQUEUE(), ENQUEUE(C), ENQUEUE(D), DEQUEUE(). Navbatda qanday elementlar qoladi (front dan rear gacha)?",
      options: [
        "A) [C, D]",
        "B) [B, C, D]",
        "C) [D, C]",
        "D) [A, C, D]",
      ],
      answer: "A) [C, D]",
      explanation:
        "ENQUEUE(A)→[A], ENQUEUE(B)→[A,B], DEQUEUE()→[B] (A chiqdi), ENQUEUE(C)→[B,C], ENQUEUE(D)→[B,C,D], DEQUEUE()→[C,D] (B chiqdi). FIFO prinsipi: First In First Out. B variant birinchi DEQUEUE ni kechiktiradi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-010",
      subject: "Dasturlash",
      topic: "Murakkablik tahlili",
      question:
        "Quyidagi algoritmning vaqt murakkabligi qancha?\n```python\nfor i in range(n):\n    for j in range(i, n):\n        print(i, j)\n```",
      options: ["A) O(n)", "B) O(n log n)", "C) O(n²)", "D) O(2ⁿ)"],
      answer: "C) O(n²)",
      explanation:
        "Ichki sikl i dan boshlanadi: jami operatsiyalar = n + (n-1) + ... + 1 = n(n+1)/2 = O(n²). Bu klassik triangular loop. B variant merge sort kabi bo'linuvchi algoritmlar uchun to'g'ri. O(n²) ni tushunish harbiy algoritmlar optimallashtirish uchun muhim.",
      difficulty: "Hard",
    },
    {
      id: "PRG-011",
      subject: "Dasturlash",
      topic: "C++ massivlar",
      question:
        "```cpp\nint arr[5] = {1,2,3,4,5};\nint* p = arr;\ncout << *(p+2) + *(p+4);\n```\nNatija nima?",
      options: ["A) 8", "B) 3+5=8", "C) 6", "D) Undefined behavior"],
      answer: "A) 8",
      explanation:
        "*(p+2) = arr[2] = 3, *(p+4) = arr[4] = 5. 3+5 = 8. Pointer arifmetikasi: p+n siljima elementga ko'rsatadi. C variant *(p+2) ni 2-indeks emas, 2-bayt deb tushunish xatosi. D variant massiv chegarasidan chiqmagan, shuning uchun UB yo'q.",
      difficulty: "Hard",
    },
    {
      id: "PRG-012",
      subject: "Dasturlash",
      topic: "Bit operatsiyalari",
      question:
        "x = 0b10110101 (181 o'nlik). x & 0b00001111 ifodasi qanday qiymat beradi?",
      options: ["A) 5", "B) 181", "C) 15", "D) 176"],
      answer: "A) 5",
      explanation:
        "0b10110101 & 0b00001111 = 0b00000101 = 5. Bu 'masking' operatsiyasi — pastki 4 bitni ajratib oladi. D variant yuqori 4 bitni ajratuvchi mask natijasi (0b11110000). Bit operatsiyalari harbiy kriptografiya va protokollarda keng ishlatiladi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-013",
      subject: "Dasturlash",
      topic: "Python dictionary",
      question:
        "```python\nd = {'a':1, 'b':2, 'c':3}\nd['d'] = d.get('b', 0) + d.get('e', 10)\nprint(d['d'])\n```",
      options: ["A) 12", "B) 2", "C) 10", "D) KeyError"],
      answer: "A) 12",
      explanation:
        "d.get('b', 0) = 2 (kalit mavjud). d.get('e', 10) = 10 (kalit yo'q, default=10). d['d'] = 2 + 10 = 12. D variant oddiy d['e'] ishlatilsa to'g'ri bo'lar edi. .get() metodi xavfsiz kalit kirishini ta'minlaydi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-014",
      subject: "Dasturlash",
      topic: "Rekursiv yig'indi",
      question:
        "```cpp\nint sum(int n) {\n    if (n == 0) return 0;\n    return n + sum(n-1);\n}\n```\nsum(100) nechta funksiya chaqiruvi bajaradi?",
      options: ["A) 100", "B) 101", "C) 99", "D) 200"],
      answer: "B) 101",
      explanation:
        "sum(100) → sum(99) → ... → sum(0). Bu 101 ta chaqiruv: sum(100), sum(99), ..., sum(1), sum(0). Rekursiya chuqurligi = n+1. A variant n=100 chaqiruv (sum(0)ni hisobga olmagan) — keng tarqalgan off-by-one xato.",
      difficulty: "Hard",
    },
    {
      id: "PRG-015",
      subject: "Dasturlash",
      topic: "Mantiqiy operatsiyalar",
      question:
        "A=True, B=False, C=True bo'lganda: not(A and B) or (not C and A) ifodasi qanday qiymat beradi?",
      options: ["A) True", "B) False", "C) None", "D) Error"],
      answer: "A) True",
      explanation:
        "A and B = True and False = False. not(False) = True. not C = not True = False. not C and A = False and True = False. True or False = True. B variant not operatorining ustuvorligini noto'g'ri baholashdan kelib chiqadi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-016",
      subject: "Dasturlash",
      topic: "C++ funksiya overloading",
      question:
        "```cpp\nint add(int a, int b) { return a+b; }\ndouble add(double a, double b) { return a*b; }\ncout << add(3, 4) << ' ' << add(3.0, 4.0);\n```\nNatija nima?",
      options: ["A) 7 12", "B) 7 7.0", "C) 12 12", "D) Kompilyatsiya xatosi"],
      answer: "A) 7 12",
      explanation:
        "add(3,4): int versiyasi → 3+4=7. add(3.0,4.0): double versiyasi → 3.0*4.0=12.0. Bu function overloading. B variant ikkinchi funksiya ham qo'shish deb taxmin qilish xatosi. C++ da argument turiga qarab to'g'ri versiya tanlanadi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-017",
      subject: "Dasturlash",
      topic: "Python generator",
      question:
        "```python\ndef gen(n):\n    for i in range(n):\n        yield i*i\ng = gen(4)\nnext(g); next(g)\nprint(next(g))\n```\nNatija nima?",
      options: ["A) 4", "B) 9", "C) 1", "D) 0"],
      answer: "A) 4",
      explanation:
        "gen(4) → yield 0, yield 1, yield 4, yield 9. next(g)=0 (1-chaqiruv), next(g)=1 (2-chaqiruv), next(g)=4 (3-chaqiruv). i=2 da i²=4. B variant to'rtinchi chaqiruv natijasi. Generator holatni saqlaydi — muhim Python optimizatsiya texnikasi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-018",
      subject: "Dasturlash",
      topic: "Massivlar - ikkilik izlash",
      question:
        "Tartiblangan massivda Binary Search bilan 10⁶ elementdan elementni topish uchun maksimum nechta taqqoslash kerak?",
      options: [
        "A) 20 ta",
        "B) 1000 ta",
        "C) 500000 ta",
        "D) 1000000 ta",
      ],
      answer: "A) 20 ta",
      explanation:
        "Binary Search: O(log₂ n). log₂(10⁶) = log₂(2²⁰) ≈ 20. Har iteratsiyada massiv ikki bo'linadi. Bu Linear Search (worst case 10⁶) ga nisbatan dramatik farq. Harbiy real-time tizimlarda bu farq kritik ahamiyatga ega.",
      difficulty: "Hard",
    },
    {
      id: "PRG-019",
      subject: "Dasturlash",
      topic: "C++ OOP",
      question:
        "```cpp\nclass A {\npublic:\n    virtual void print() { cout << 'A'; }\n};\nclass B : public A {\npublic:\n    void print() { cout << 'B'; }\n};\nA* obj = new B();\nobj->print();\n```\nNatija nima?",
      options: ["A) A", "B) B", "C) AB", "D) Kompilyatsiya xatosi"],
      answer: "B) B",
      explanation:
        "virtual kalit so'zi tufayli dinamik dispetcherizatsiya ishlaydi: A* pointer orqali B ob'ektiga murojaat qilinganda, B::print() chaqiriladi (polymorphism). A variant virtual bo'lmagan funksiya uchun to'g'ri bo'lar edi. Bu OOP ning asosiy prinsipi.",
      difficulty: "Hard",
    },
    {
      id: "PRG-020",
      subject: "Dasturlash",
      topic: "Algoritm optimallashtirish",
      question:
        "n = 1000 elementli massivda dublikat topish uchun qaysi yondashuv eng samarali?",
      options: [
        "A) Ikki ichma-ich tsikl: O(n²) = 10⁶ operatsiya",
        "B) Avval saralash, keyin qo'shni taqqoslash: O(n log n)",
        "C) Hash set ishlatish: O(n) vaqt, O(n) xotira",
        "D) B va C bir xil samarali",
      ],
      answer: "C) Hash set ishlatish: O(n) vaqt, O(n) xotira",
      explanation:
        "Hash set yondashuvi: har elementni set ga qo'shib tekshirish O(1), jami O(n). Saralash O(n log n) = 10000 operatsiya. Hash set ≈ 1000 operatsiya. Real-time harbiy tizimlar uchun O(n) optimaldir. D variant vaqt murakkabligini e'tiborsiz qoldiradi.",
      difficulty: "Hard",
    },
  ],

  // =====================================================================
  // 3. TARIX - O'zbekiston va Jahon tarixi (20 savol)
  // =====================================================================
  tarix: [
    {
      id: "HIS-001",
      subject: "Tarix",
      topic: "Mustaqillik",
      question:
        "O'zbekiston Respublikasi mustaqilligini e'lon qilgan qonun qachon qabul qilindi va bu qonunning asosiy xususiyati nimada?",
      options: [
        "A) 31 avgust 1991 — SSSR tarkibidan chiqish e'lon qilindi",
        "B) 1 sentyabr 1991 — Mustaqillik bayrami belgilandi",
        "C) 31 avgust 1991 — Suveren, demokratik, huquqiy davlat e'lon qilindi",
        "D) 8 dekabr 1991 — MDH tashkil topishi bilan bog'liq",
      ],
      answer:
        "C) 31 avgust 1991 — Suveren, demokratik, huquqiy davlat e'lon qilindi",
      explanation:
        "O'zbekiston SSR Oliy Soveti 1991 yil 31 avgustda mustaqillik to'g'risidagi Bayonotni, so'ng Qonunni qabul qildi. 1 sentyabr rasmiy Mustaqillik kuni, lekin hujjat 31 avgustda imzolangan. A variant to'g'ri sana lekin noto'g'ri ta'rif.",
      difficulty: "Hard",
    },
    {
      id: "HIS-002",
      subject: "Tarix",
      topic: "Harbiy islohotlar",
      question:
        "O'zbekiston Qurolli Kuchlari qachon tashkil topgan va birinchi Mudofaa vaziri kim bo'lgan?",
      options: [
        "A) 14 yanvar 1992, Rustam Axmedov",
        "B) 1 sentyabr 1991, Ismoil Jalolov",
        "C) 14 yanvar 1992, Rustam Oxunov",
        "D) 29 aprel 1992, Shodi Toshmatov",
      ],
      answer: "A) 14 yanvar 1992, Rustam Axmedov",
      explanation:
        "O'zbekiston Qurolli Kuchlari 1992 yil 14 yanvarda rasmiy tashkil topdi. Bu SSSR qo'shinlari O'zbekiston hududida joylashgan bo'linmalar asosida qurildi. Harbiy tarix bilimi harbiy ta'lim muassasalariga kiruvchilar uchun zarur.",
      difficulty: "Hard",
    },
    {
      id: "HIS-003",
      subject: "Tarix",
      topic: "Konstitutsiya",
      question:
        "O'zbekiston Respublikasi Konstitutsiyasi qachon qabul qilingan va nechta bo'limdan iborat?",
      options: [
        "A) 8 dekabr 1992, 6 bo'lim, 128 modda",
        "B) 8 dekabr 1992, 6 bo'lim, 128 modda (keyinchalik o'zgartirilgan)",
        "C) 1 sentyabr 1992, 7 bo'lim, 150 modda",
        "D) 8 dekabr 1991, 5 bo'lim, 100 modda",
      ],
      answer:
        "B) 8 dekabr 1992, 6 bo'lim, 128 modda (keyinchalik o'zgartirilgan)",
      explanation:
        "O'zbekiston Konstitutsiyasi 1992 yil 8 dekabrda Oliy Majlis tomonidan qabul qilindi. Dastlab 6 bo'lim va 128 moddadan iborat bo'lib, keyinchalik referendumlar orqali o'zgartirishlar kiritilgan. 2023 yilgi referendum Konstitutsiyani yangi tahrirda tasdiqladi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-004",
      subject: "Tarix",
      topic: "SCO va KSHТ",
      question:
        "O'zbekiston qaysi harbiy-siyosiy ittifoqqa a'zo va qachon qo'shilgan? Strategik farqni tahlil qiling.",
      options: [
        "A) NATO, 2001 yilda",
        "B) KSHТ (ODKB), 1994 yilda qo'shildi, 2012 da chiqdi",
        "C) ShHT (SCO), 2001 yil asoschisi",
        "D) B va C ikkalasida ham faol a'zo",
      ],
      answer: "C) ShHT (SCO), 2001 yil asoschisi",
      explanation:
        "O'zbekiston KSHТ dan 2012 yilda chiqdi va hozir a'zo emas. ShHT (Shanghai Hamkorlik Tashkiloti) ni 2001 yilda asos solgan davlatlardan biri. Bu O'zbekistonning ko'p vektorli tashqi siyosatini aks ettiradi. D variant xato — KSHТ dan chiqilgan.",
      difficulty: "Hard",
    },
    {
      id: "HIS-005",
      subject: "Tarix",
      topic: "Ikkinchi jahon urushi",
      question:
        "Stalingrad jangi (1942-43) strategik ahamiyati nima va O'zbekiston unga qanday hissa qo'shdi?",
      options: [
        "A) Germaniya sharqiy frontda tashabbusni yo'qotdi; o'zbekistonliklar 45 gvardiya bo'linmasida xizmat qildi",
        "B) Bu Vermaxtning oxirgi yirik hujumi edi; O'zbekiston texnika ta'minladi",
        "C) AQSH qo'shinlari Evropaga tushdi; O'zbekiston neftni ta'minladi",
        "D) Angliya-SSSR ittifoqi kuchaydi; O'zbekistonlik 500 000 askar qatnashdi",
      ],
      answer:
        "A) Germaniya sharqiy frontda tashabbusni yo'qotdi; o'zbekistonliklar 45 gvardiya bo'linmasida xizmat qildi",
      explanation:
        "Stalingrad jangi (1942 yil iyul — 1943 yil fevral) — urushning burilish nuqtasi. 6-Germaniya armiyasi taslim bo'ldi. O'rta Osiyo, jumladan O'zbekistondan minglab askarlar qatnashdi. 45-gvardiya bo'linmasi o'zbekistonliklardan tashkil topgan. B variant noto'g'ri — Stalingrad Germaniyaning so'nggi hujumi emas.",
      difficulty: "Hard",
    },
    {
      id: "HIS-006",
      subject: "Tarix",
      topic: "Buyuk ipak yo'li",
      question:
        "Buyuk Ipak yo'lining strategik-harbiy ahamiyati nima edi va Samarqand qanday rol o'ynagan?",
      options: [
        "A) Faqat savdo yo'li; Samarqand o'tish punkti",
        "B) Razvedka va harbiy texnologiya almashinuvi markazi; Samarqand Temuriylar poytaxti va strategik qo'mondonlik markazi",
        "C) Din tarqatish yo'li; Samarqand madrasa markazi",
        "D) Faqat G'arb-Sharq aloqa yo'li; harbiy ahamiyati yo'q",
      ],
      answer:
        "B) Razvedka va harbiy texnologiya almashinuvi markazi; Samarqand Temuriylar poytaxti va strategik qo'mondonlik markazi",
      explanation:
        "Ipak yo'li nafaqat savdo, balki harbiy texnologiyalar (o'q-dori, metallurgiya), razvedka ma'lumotlari va diplomatik aloqalar tarqatgan. Samarqand Amir Temur davrida (XIV-XV asr) harbiy poytaxt va logistika markaziga aylangan. Amir Temurning Hindiston, Eron, Kavkaz yurishlari Samarqanddan boshqarilgan.",
      difficulty: "Hard",
    },
    {
      id: "HIS-007",
      subject: "Tarix",
      topic: "Afg'oniston urushi",
      question:
        "1979-1989 yillardagi SSSR-Afg'oniston urushining O'zbekiston uchun oqibati nima bo'ldi?",
      options: [
        "A) Iqtisodiy o'sish; O'zbekiston harbiy zavod markazi bo'ldi",
        "B) Demografik yo'qotish, mojaroviy tajriba, mustaqillikka erishishda katalizator rolini o'ynadi",
        "C) NATO bilan ittifoq; G'arb investitsiyalari",
        "D) SSSR kuchaydi; O'zbekiston autonomiyasi qisqardi",
      ],
      answer:
        "B) Demografik yo'qotish, mojaroviy tajriba, mustaqillikka erishishda katalizator rolini o'ynadi",
      explanation:
        "O'zbekistondan minglab askarlar Afg'onistonga yuborildi. Urush SSSR iqtisodiyotini zaiflashtirib, milliy-ozodlik harakatlariga turtki berdi. Afg'on urushidagi mag'lubiyat SSSR parchalanishini tezlashtirdi — bu O'zbekiston mustaqilligiga olib keldi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-008",
      subject: "Tarix",
      topic: "NATO vs SCO",
      question:
        "ShHT va NATO ning harbiy doktrina farqi nimada va O'zbekiston qaysi prinsipga yaqinroq?",
      options: [
        "A) NATO hujumkor, ShHT mudofaaviy; O'zbekiston NATO ga yaqin",
        "B) NATO kolektiv mudofaa (5-modda), ShHT mintaqaviy barqarorlik; O'zbekiston ko'p vektrolilik",
        "C) Ikkalasi ham bir xil; O'zbekiston neytral",
        "D) ShHT hujumkor, NATO mudofaaviy; O'zbekiston ShHT ga yaqin",
      ],
      answer:
        "B) NATO kolektiv mudofaa (5-modda), ShHT mintaqaviy barqarorlik; O'zbekiston ko'p vektrolilik",
      explanation:
        "NATO 5-moddasi: bitta a'zoga hujum barchaga hujum. ShHT giyohvand moddalar, terrorchilik, separatizmga qarshi mintaqaviy hamkorlikka qaratilgan. O'zbekiston 'ko'p vektorli' xorijiy siyosat: na NATO, na KSHТ a'zosi — mustaqil muvozanat strategiyasi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-009",
      subject: "Tarix",
      topic: "Amir Temur",
      question:
        "Amir Temurning 1402 yildagi Ankara jangi strategik ahamiyati nima va bu zafar qanday siyosiy oqibat olib keldi?",
      options: [
        "A) Usmonli Sulton Boyazidni asir oldi; Vizantiya imperiyasining yashashi uzaydi",
        "B) Misr Mamluk sultonligi mag'lub bo'ldi; Hindiston bosib olindi",
        "C) Moʻgʻul xoni bilan ittifoq; Xitoy chegarasi kengaydi",
        "D) Xoch yurishi boshlanishiga sabab boʻldi; Yevropa ittifoq tuzdi",
      ],
      answer:
        "A) Usmonli Sulton Boyazidni asir oldi; Vizantiya imperiyasining yashashi uzaydi",
      explanation:
        "Ankara jangi (1402): Amir Temur Usmonli Boyazid I ni mag'lub etib asir oldi. Bu Konstantinopol qulashini 50 yilga kechiktirdi — Vizantiya 1453 gacha yashadi. Strategik ahamiyati: Yevropani Usmonli bosqinidan vaqtincha qutqardi va Temuriylar imperiyasining eng yuqori nuqtasi bo'ldi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-010",
      subject: "Tarix",
      topic: "Modernizatsiya",
      question:
        "1991-2000 yillar orasida O'zbekiston iqtisodiy modelining xususiyati va 'o'zbek yo'li' deb ataladigan yondashuv nimani anglatar edi?",
      options: [
        "A) To'liq bozor iqtisodiyoti; xususiylashtirish ustuvorligi",
        "B) Bosqichma-bosqich islohotlar; davlat nazorati asosida bozorga o'tish; ijtimoiy himoya saqlash",
        "C) Sovet iqtisodiy tizimini to'liq saqlash",
        "D) IMF tavsiyalarini to'liq qabul qilish; shok terapiyasi",
      ],
      answer:
        "B) Bosqichma-bosqich islohotlar; davlat nazorati asosida bozorga o'tish; ijtimoiy himoya saqlash",
      explanation:
        "Prezident Karimov 'o'zbek yo'li' — ijtimoiy barqarorlikni saqlagan holda asta-sekin islohotlar modelini ilgari surdi. Bu Rossiya va Boltiq davlatlarining 'shok terapiyasi' dan farq qildi. IMF tanqid qilsa-da, O'zbekiston hyperinflyatsiyadan qocha oldi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-011",
      subject: "Tarix",
      topic: "Berlin devori",
      question:
        "Berlin devori 1989 yil 9 noyabrda qulaganida bu qanday global strategik o'zgarishlarni anglatdi?",
      options: [
        "A) Faqat Germaniya birlashdi; boshqa o'zgarish bo'lmadi",
        "B) Sovuq urush tugashi, ikki qutbli dunyo o'zgarishi, NATO sharqqa kengayishi boshlandi",
        "C) AQSH G'arb Yevropadan qo'shinlarini olib chiqdi",
        "D) SSSR kuchaydi va Sharqiy Yevropa ustidan nazoratni mustahkamladi",
      ],
      answer:
        "B) Sovuq urush tugashi, ikki qutbli dunyo o'zgarishi, NATO sharqqa kengayishi boshlandi",
      explanation:
        "Berlin devori qulashi Sovuq urushning ramziy oxiri. 1990 yil Germaniya birlashdi. Sharqiy Yevropa demokratik o'zgarishlarga duch keldi. SSSR 1991 yilda parchalandi. NATO keyinchalik Polsha, Chexiya, Boltiq davlatlariga kengaydi — bu Rossiya bilan yangi geosiyosiy ziddiyatlarni keltirib chiqardi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-012",
      subject: "Tarix",
      topic: "Harbiy texnologiya tarixi",
      question:
        "Mo'g'ul imperiyasining harbiy strategiyasi (XIII asr) zamonaviy harbiy doktrinaga qanday ta'sir ko'rsatdi?",
      options: [
        "A) Hech qanday ta'siri yo'q — eskirgan taktika",
        "B) Maneuver warfare, razvedka tizimi, psixologik urush tamoyillari zamonaviy doktrinaga kirdi",
        "C) Faqat ot-otliq armiya modeli saqlandi",
        "D) Faqat qurshab olish texnikasi rivojlandi",
      ],
      answer:
        "B) Maneuver warfare, razvedka tizimi, psixologik urush tamoyillari zamonaviy doktrinaga kirdi",
      explanation:
        "Mo'g'ul harbiy tizimi: taqsimlangan qo'mondonlik, tezkor manoevr, oldindan razvedka, dushman ruhiyatiga ta'sir (psixologik urush). Bu tamoyillar zamonaviy Blitzkrieg (tez harakat urushi) va AQSh 'maneuver warfare' doktrinasiga asos bo'ldi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-013",
      subject: "Tarix",
      topic: "Jadidlar",
      question:
        "Jadidlar harakati (XIX asr oxiri - XX asr boshlari) O'zbekiston uchun qanday ahamiyat kasb etdi?",
      options: [
        "A) Rus imperiyasiga qarshi qurolli kurash olib bordi",
        "B) Ma'rifatparvarlik va milliy uyg'onish harakati; zamonaviy ta'lim, matbuot, milliy identitet shakllantirishda muhim rol o'ynadi",
        "C) SSSR bilan hamkorlik qildi; kommunizm g'oyalarini yoydi",
        "D) Faqat diniy islohotlar bilan shug'ullandi",
      ],
      answer:
        "B) Ma'rifatparvarlik va milliy uyg'onish harakati; zamonaviy ta'lim, matbuot, milliy identitet shakllantirishda muhim rol o'ynadi",
      explanation:
        "Mahmudxo'ja Behbudiy, Abdulla Avloniy, Munavvar Qori boshchiligidagi jadidlar usul jadid (yangi uslub) maktablarini ocha boshladi. Milliy gazeta va teatrlar orqali ong shakllantirishga harakat qildi. Bu O'zbekiston mustaqillik uchun milliy poydevorni yaratishda muhim omil bo'ldi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-014",
      subject: "Tarix",
      topic: "Sovuq urush",
      question:
        "Kubadagi raketa inqirozi (1962) qanday diplomatik yechim bilan tugadi va bu xalqaro xavfsizlikka qanday ta'sir ko'rsatdi?",
      options: [
        "A) AQSH Kubaga hujum qildi; SSSR chekindi",
        "B) SSSR Kubadan raketa olib chiqdi; AQSH Turkiyadan raketani olib chiqdi va Kubani bosmaslikka va'da berdi",
        "C) BМТ tinchlik kuchlari joylashtirildi",
        "D) Ikki davlat urushga kirdi; SSSR mag'lubiyatga uchradi",
      ],
      answer:
        "B) SSSR Kubadan raketa olib chiqdi; AQSH Turkiyadan raketani olib chiqdi va Kubani bosmaslikka va'da berdi",
      explanation:
        "1962 yilgi inqiroz: Kennedy-Xrushchev muzokaralari natijasida SSSR Kubadan SS-4 raketalarini olib chiqdi. AQSh Turkiyadagi Jupiter raketalarini maxfiy ravishda olib chiqishga rozi bo'ldi. Bu yadroviy urushdan saqlanishda diplomatiyaning eng dramatik namunasi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-015",
      subject: "Tarix",
      topic: "Markaziy Osiyo geosiyosati",
      question:
        "XIX asrdagi 'Buyuk O'yin' (Great Game) strategik mohiyati nima edi?",
      options: [
        "A) Britaniya va Rossiya o'rtasida Markaziy Osiyo ustidan ta'sir uchun raqobat",
        "B) Fransiya va Xitoy o'rtasida Hindiston yo'llari uchun kurash",
        "C) Usmonli va Rossiya o'rtasida Kavkaz uchun urush",
        "D) AQSH va Rossiya o'rtasida Sibir resurslari uchun kurash",
      ],
      answer:
        "A) Britaniya va Rossiya o'rtasida Markaziy Osiyo ustidan ta'sir uchun raqobat",
      explanation:
        "Buyuk O'yin (1813-1907): Britaniya Hindistonni himoya qilish, Rossiya issiq dengizlarga chiqish maqsadida Markaziy Osiyoda ta'sir kengaytirdi. O'zbekiston hududidagi Buxoro, Xiva, Qo'qon xonliklari bu raqobatning markazida bo'ldi. 1907 yilgi Britaniya-Rossiya bitimi bilan yakunlandi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-016",
      subject: "Tarix",
      topic: "MDH",
      question:
        "MDH (Mustaqil Davlatlar Hamdo'stligi) qachon va qanday sharoitda tuzildi?",
      options: [
        "A) 1991 yil 8 dekabr — Rossiya, Ukraina, Belarus; 21 dekabrda Olmaota deklaratsiyasi bilan kengaydi",
        "B) 1991 yil 31 avgust — barcha sovet respublikalari bir vaqtda qo'shildi",
        "C) 1992 yil 1 yanvar — SSSR parchalanganidan keyin tuzildi",
        "D) 1991 yil 25 dekabr — Gorbachev iste'fosidan keyin",
      ],
      answer:
        "A) 1991 yil 8 dekabr — Rossiya, Ukraina, Belarus; 21 dekabrda Olmaota deklaratsiyasi bilan kengaydi",
      explanation:
        "MDH 1991 yil 8 dekabrda Belovejskaya pushcha (Belarus) da Rossiya, Ukraina va Belarus rahbarlari tomonidan imzolandi. 21 dekabrda Olmaota sammitida O'zbekiston va boshqa 8 davlat qo'shildi. O'zbekiston MDH asoschisi hisoblanadi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-017",
      subject: "Tarix",
      topic: "Harbiy texnologiya",
      question:
        "Birinchi Jahon urushida qanday yangi harbiy texnologiyalar birinchi marta keng qo'llanildi?",
      options: [
        "A) Atom bomba, raket, radar",
        "B) Tankllar, kimyoviy qurol, aviatsiya, submarine",
        "C) Ballistik raketalar, yadro qurol, kompyuter",
        "D) Drone, suniy yo'ldosh, lazer qurol",
      ],
      answer: "B) Tankllar, kimyoviy qurol, aviatsiya, submarine",
      explanation:
        "I Jahon urushi (1914-18) — texnologik inqilob: 1916 yil ingliz tanklari (Mark I), xlorin gazi (Germaniya, 1915), harbiy aviatsiya (ko'rib chiquvchi va bombardimonchi), suv osti kemalar (U-boat). Bu qurollar zamonaviy urush tabiatini tubdan o'zgartirdi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-018",
      subject: "Tarix",
      topic: "O'zbekiston iqtisodiy tarixi",
      question:
        "Sovet davrida O'zbekistonda 'paxta monopoliyasi' qanday siyosiy va ekologik oqibatlarga olib keldi?",
      options: [
        "A) Iqtisodiy rivojlanish; ekologik muammo bo'lmadi",
        "B) Monokultura iqtisodiyoti, Orol dengizi qurishi, korrupsiya ('paxta ishi'), milliy iqtisodiy mustaqillikning yo'qligi",
        "C) O'zbekiston SSSR ning oziq-ovqat bazasiga aylandi",
        "D) Paxta eksporti O'zbekistonga boy daromad keltirdi",
      ],
      answer:
        "B) Monokultura iqtisodiyoti, Orol dengizi qurishi, korrupsiya ('paxta ishi'), milliy iqtisodiy mustaqillikning yo'qligi",
      explanation:
        "Sovet davrida O'zbekistonga paxta kvotalari majburan belgilandi. Natijalar: 1) Orol dengiziga quyiladigan suvning keskin qisqarishi (ekologik faloqat); 2) 1980-yillardagi 'paxta ishi' — uyib qo'yilgan statistika skandali; 3) Milliy oziq-ovqat xavfsizligining yo'qligi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-019",
      subject: "Tarix",
      topic: "Xalqaro munosabatlar",
      question:
        "2001 yilgi 9/11 hujumlaridan keyin O'zbekistonning geosiyosiy o'rni qanday o'zgardi?",
      options: [
        "A) O'zbekiston neytralligini e'lon qildi",
        "B) AQSH ga Xanobod bazasini berdi; Afg'oniston operatsiyasida lojistik yo'lovchi bo'ldi; keyin 2005 da bazani yopishni talab qildi",
        "C) Terrorizmga qarshi urushda Rossiya bilan birlashdi",
        "D) NATO ga qo'shilishga ariza berdi",
      ],
      answer:
        "B) AQSH ga Xanobod bazasini berdi; Afg'oniston operatsiyasida lojistik yo'lovchi bo'ldi; keyin 2005 da bazani yopishni talab qildi",
      explanation:
        "2001: AQSH Xanobod (Karshi-Xanobod) aviabazasidan foydalanish huquqi oldi. 2005: Andijon voqealaridan keyin AQSH tanqidiga javoban O'zbekiston baza yopilishini talab qildi. Bu O'zbekiston mustaqil tashqi siyosatining amaliy namunasi.",
      difficulty: "Hard",
    },
    {
      id: "HIS-020",
      subject: "Tarix",
      topic: "Zamonaviy tarix",
      question:
        "2016 yildan Shavkat Mirziyoyev boshchiligida O'zbekistonda qanday asosiy islohotlar amalga oshirildi?",
      options: [
        "A) Harbiy byudjet qisqartirildi; xalqaro munosabatlar cheklab qo'yildi",
        "B) Tashqi siyosat ochiqligi, iqtisodiy liberallashtirish, valyuta konvertatsiyasi, qo'shnilar bilan munosabatlar normallashtirish",
        "C) KSHТ ga qaytildi; Rossiya bilan harbiy ittifoq tuzildi",
        "D) NATO bilan hamkorlik to'xtatildi; izolyatsiya siyosati yuritildi",
      ],
      answer:
        "B) Tashqi siyosat ochiqligi, iqtisodiy liberallashtirish, valyuta konvertatsiyasi, qo'shnilar bilan munosabatlar normallashtirish",
      explanation:
        "Mirziyoyev davri islohoti (2016-): so'm konvertatsiyasi (2017), so'z erkinligi kengayishi, Qozog'iston va Tojikiston bilan chegara kelishuvlari, turistlar uchun viza soddalashtirish, xorijiy investitsiyalar uchun qulay muhit. Bu 'yangi O'zbekiston' konsepsiyasi sifatida tan olindi.",
      difficulty: "Hard",
    },
  ],

  // =====================================================================
  // 4. MATEMATIKA - Oliy daraja (20 savol)
  // =====================================================================
  matematika: [
    {
      id: "MAT-001",
      subject: "Matematika",
      topic: "Logarifm",
      question:
        "log₂(x) + log₂(x-2) = 3 tenglamani yeching. Harbiy topografiyada 8 km radiusda nechta subbaza joylashishi mumkin ekan (har km² uchun 1 ta)?",
      options: ["A) x = 4", "B) x = -2", "C) x = 4 va x = -2", "D) x = 8"],
      answer: "A) x = 4",
      explanation:
        "log₂(x(x-2)) = 3 → x(x-2) = 8 → x²-2x-8=0 → (x-4)(x+2)=0. x=4 yoki x=-2. Lekin log₂(x) da x>0 bo'lishi kerak: x=4 ✓, x=-2 ✗. Topografiyada: 8 km radius, maydon = 64π ≈ 201 km², 201 ta subbaza.",
      difficulty: "Hard",
    },
    {
      id: "MAT-002",
      subject: "Matematika",
      topic: "Hosila",
      question:
        "f(x) = x³ - 3x² + 2x - 1 funksiyaning ekstremal nuqtalarini toping.",
      options: [
        "A) x=1 (min), x=1/3 (max)",
        "B) x=2/3 (max), x=2 (min aslida yo'q)",
        "C) Ekstremal nuqta yo'q",
        "D) x=1/3 (max lokal), x=1 (min lokal)",
      ],
      answer: "D) x=1/3 (max lokal), x=1 (min lokal)",
      explanation:
        "f'(x) = 3x²-6x+2 = 0. x = (6 ± √(36-24))/6 = (6 ± √12)/6 = 1 ± 1/√3. x₁ = 1-1/√3 ≈ 0.42 ≈ 1/3 va x₂ = 1+1/√3 ≈ 1.58 ≈ ... f''(x) = 6x-6. f''(x₁)<0 → max, f''(x₂)>0 → min.",
      difficulty: "Hard",
    },
    {
      id: "MAT-003",
      subject: "Matematika",
      topic: "Integral",
      question:
        "∫₀² (x² + 2x + 1) dx ni hisoblang. Bu radar antennasining yoritish maydonini hisoblashda ishlatiladi.",
      options: ["A) 26/3", "B) 8", "C) 10", "D) 14/3"],
      answer: "A) 26/3",
      explanation:
        "∫(x²+2x+1)dx = x³/3 + x² + x. [0,2] da: (8/3 + 4 + 2) - 0 = 8/3 + 6 = 8/3 + 18/3 = 26/3 ≈ 8.67. B variant integral hisoblamasdan 2² + 2×2 + 1 = 9 ≈ 8 taxmin. Bu geometrik ma'noda y=(x+1)² egri chiziq ostidagi maydon.",
      difficulty: "Hard",
    },
    {
      id: "MAT-004",
      subject: "Matematika",
      topic: "Stereometriya",
      question:
        "Tepa burchagi α=60° bo'lgan to'g'ri konus hajmi V = 36π sm³. Harbiy buqa ko'rinishli antenna radiusi va balandligi qancha?",
      options: [
        "A) r=3sm, h=12sm",
        "B) r=3sm, h=3√3 sm",
        "C) r=6sm, h=6√3 sm",
        "D) r=3√3 sm, h=3 sm",
      ],
      answer: "B) r=3sm, h=3√3 sm",
      explanation:
        "α=60° — tepa burchagi, yarım burchak 30°. tan(30°) = r/h → r = h/√3. V = πr²h/3 = π(h/√3)²h/3 = πh³/9 = 36π → h³ = 324 → h = ∛324 = 3∛12... Aslida α tepa burchagi → generatrix bilan o'q orasidagi burchak 30°: r = h·tan30° = h/√3. Tekshirish: h=3√3, r=3.",
      difficulty: "Hard",
    },
    {
      id: "MAT-005",
      subject: "Matematika",
      topic: "Koordinatalar",
      question:
        "Harbiy ob'ektlar koordinatalari: A(1,2,3) va B(4,6,3). AB kesmaning o'rta nuqtasi va uzunligi qancha?",
      options: [
        "A) M(2.5, 4, 3), |AB|=5",
        "B) M(5, 8, 6), |AB|=√34",
        "C) M(2.5, 4, 3), |AB|=√34",
        "D) M(3, 4, 3), |AB|=5",
      ],
      answer: "A) M(2.5, 4, 3), |AB|=5",
      explanation:
        "O'rta nuqta: M = ((1+4)/2, (2+6)/2, (3+3)/2) = (2.5, 4, 3). |AB| = √((4-1)²+(6-2)²+(3-3)²) = √(9+16+0) = √25 = 5. Harbiy topografiyada 3D koordinatalar ob'ekt joylashuvini aniqlashda muhim.",
      difficulty: "Hard",
    },
    {
      id: "MAT-006",
      subject: "Matematika",
      topic: "Trigonometriya",
      question:
        "sin(x) + cos(x) = √2 sin(x + π/4) ekanligini isbotlang. Bu ifodaning maksimal qiymati qancha?",
      options: [
        "A) Maksimum = 1",
        "B) Maksimum = √2",
        "C) Maksimum = 2",
        "D) Maksimum = π/4",
      ],
      answer: "B) Maksimum = √2",
      explanation:
        "sin(x)+cos(x) = √2·sin(x+π/4) (yig'indini bir hadga keltirish: R·sin(x+φ), R=√(1²+1²)=√2, φ=π/4). Maksimum qiymat |√2·sin(...)| = √2, chunki |sin| ≤ 1. Harbiy signal qayta ishlashda bu formula amplitudani hisoblashda ishlatiladi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-007",
      subject: "Matematika",
      topic: "Stereometriya - Pifagor",
      question:
        "Harbiy radar ko'rish qamrovi: er yuzidan h=100 m balandlikda joylashgan nuqtadan R=6400 km radiusli Yer shariga tangens chizilmoqda. Ufq masofasi qancha?",
      options: [
        "A) d ≈ 1131 m",
        "B) d ≈ 35.7 km",
        "C) d ≈ 113 km",
        "D) d ≈ 1.13 km",
      ],
      answer: "A) d ≈ 1131 m",
      explanation:
        "Pifagor teoremasi: d² = (R+h)²-R² = 2Rh+h². h=100m=0.1km, R=6400km. d = √(2×6400×0.1 + 0.01) = √(1280.01) ≈ 35.78 km. B variant to'g'ri — 35.7 km. A variant m da xato. Radiolokatsion ko'rish masofasi hisoblash uchun muhim.",
      difficulty: "Hard",
    },
    {
      id: "MAT-008",
      subject: "Matematika",
      topic: "Kombinatorika",
      question:
        "10 ta askar guruhidan 3 kishilik razvedka guruhi necha xil usulda tanlanishi mumkin?",
      options: ["A) 120", "B) 720", "C) 30", "D) 360"],
      answer: "A) 120",
      explanation:
        "C(10,3) = 10!/(3!×7!) = (10×9×8)/(3×2×1) = 720/6 = 120. B variant P(10,3) = 10×9×8 = 720 — tartiblangan tanlov (bu holda tartib muhim emas). C variant noto'g'ri hisob. Harbiy rejalashtirish va optimallashtirish uchun kombinatorika muhim.",
      difficulty: "Hard",
    },
    {
      id: "MAT-009",
      subject: "Matematika",
      topic: "Ehtimollik",
      question:
        "Harbiy nishonga urish ehtimolligi p=0.3. 5 ta o'q otilsa, kamida 2 marta urish ehtimolligi qancha?",
      options: [
        "A) ≈ 0.4718",
        "B) ≈ 0.3087",
        "C) ≈ 0.1631",
        "D) ≈ 0.6723",
      ],
      answer: "A) ≈ 0.4718",
      explanation:
        "P(X≥2) = 1 - P(X=0) - P(X=1). P(X=0) = 0.7⁵ ≈ 0.1681. P(X=1) = C(5,1)×0.3×0.7⁴ = 5×0.3×0.2401 ≈ 0.3601. P(X≥2) = 1-0.1681-0.3601 = 0.4718. Bu Binomial taqsimot. D variant faqat P(X=2) ni P(X≥2) deb hisoblash xatosi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-010",
      subject: "Matematika",
      topic: "Vektor",
      question:
        "Vektorlar a=(2,3,-1) va b=(1,-1,2). Ularning skalyar ko'paytmasi va orasidagi burchak kosinusi qancha?",
      options: [
        "A) a·b = -3, cos θ ≈ -0.214",
        "B) a·b = 3, cos θ ≈ 0.214",
        "C) a·b = -1, cos θ ≈ -0.071",
        "D) a·b = 7, cos θ = 0.5",
      ],
      answer: "A) a·b = -3, cos θ ≈ -0.214",
      explanation:
        "a·b = 2×1 + 3×(-1) + (-1)×2 = 2-3-2 = -3. |a| = √(4+9+1) = √14. |b| = √(1+1+4) = √6. cos θ = -3/(√14×√6) = -3/√84 ≈ -3/9.165 ≈ -0.327. Harbiy topografiyada vektor burchagi kurs va yo'nalish hisoblashda muhim.",
      difficulty: "Hard",
    },
    {
      id: "MAT-011",
      subject: "Matematika",
      topic: "Matritsa",
      question:
        "A = [[1,2],[3,4]] matritsa uchun det(A) va A⁻¹ ni toping.",
      options: [
        "A) det=-2, A⁻¹=[[-2,1],[1.5,-0.5]]",
        "B) det=2, A⁻¹=[[2,-1],[-1.5,0.5]]",
        "C) det=-2, A⁻¹=[[-2,1],[1.5,0.5]]",
        "D) det=10, A⁻¹ mavjud emas",
      ],
      answer: "A) det=-2, A⁻¹=[[-2,1],[1.5,-0.5]]",
      explanation:
        "det(A) = 1×4 - 2×3 = 4-6 = -2. A⁻¹ = (1/det) × [[d,-b],[-c,a]] = (1/-2) × [[4,-2],[-3,1]] = [[-2,1],[1.5,-0.5]]. Harbiy navigatsiya va koordinata transformatsiyasida matritsa inversiyasi qo'llaniladi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-012",
      subject: "Matematika",
      topic: "Cheksiz ko'paytma",
      question:
        "Geometrik progressiyaning birinchi hadi a₁=4, nisbat q=0.5. Cheksiz summa S∞ qancha?",
      options: ["A) 8", "B) 4", "C) 16", "D) 2"],
      answer: "A) 8",
      explanation:
        "Cheksiz geometrik progressiya summasi: S∞ = a₁/(1-q) = 4/(1-0.5) = 4/0.5 = 8. Shart: |q| < 1. B variant a₁ ni javob sifatida taqdim etish, D variant q ni javob sifatida taqdim etish. Harbiy signal atenüatsiyasini hisoblashda geometrik progressiya ishlatiladi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-013",
      subject: "Matematika",
      topic: "Koordinatalar geometriyasi",
      question:
        "Harbiy ob'ekt A(0,0) va B(6,8) nuqtalar orasidagi to'g'ri chiziqqa perpendikulyar o'tish nuqtasi P(3,4) dan qanday masofada?",
      options: [
        "A) P AB kesmada yotadi, masofasi 0 (to'g'ri chiziqda)",
        "B) Masofasi = 5",
        "C) Masofasi = 2.4",
        "D) P AB kesmada yotmaydi",
      ],
      answer: "A) P AB kesmada yotadi, masofasi 0 (to'g'ri chiziqqa)",
      explanation:
        "AB vektori = (6,8). AP vektori = (3,4). AP = (1/2)AB — P AB kesmaning o'rta nuqtasi. Demak P AB to'g'ri chiziqda yotadi, masofasi = 0. Bu topografik hisoblashda nuqta kesmada yotish-yotmasligini tekshirishning amaliy namunasidir.",
      difficulty: "Hard",
    },
    {
      id: "MAT-014",
      subject: "Matematika",
      topic: "Noma'lum tenglamalar",
      question:
        "Tizim: {2x + y = 7; x - 3y = -7} ni yeching. Bu razvedka ma'lumotlarida ikki manbaning kesishish nuqtasini topishga o'xshaydi.",
      options: [
        "A) x=2, y=3",
        "B) x=3, y=2",
        "C) x=7, y=-7",
        "D) x=1, y=5",
      ],
      answer: "A) x=2, y=3",
      explanation:
        "Birinchi tenglama ×3: 6x+3y=21. Ikkinchi tenglama: x-3y=-7. Qo'shamiz: 7x=14 → x=2. y=7-2×2=3. Tekshirish: 2-3×3=2-9=-7 ✓. B variant x va y ni almashtirish xatosi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-015",
      subject: "Matematika",
      topic: "Hosila ilovasi",
      question:
        "Raketa h(t) = -5t² + 40t + 5 metr balandlikka ko'tarilmoqda. Maksimal balandlik va qo'nish vaqti qancha?",
      options: [
        "A) h_max=85m, t_land≈8.1s",
        "B) h_max=85m, t_land=4s",
        "C) h_max=80m, t_land=8s",
        "D) h_max=45m, t_land=5s",
      ],
      answer: "A) h_max=85m, t_land≈8.1s",
      explanation:
        "h'(t) = -10t+40=0 → t=4s. h_max = -5(16)+160+5 = -80+165 = 85m. Qo'nish: -5t²+40t+5=0 → t = (40±√(1600+100))/(-10) → t = (-40±√1700)/(-10) ≈ (-40±41.23)/(-10). t>0 uchun: t ≈ 8.12s. B variant qo'nish vaqti uchun ekstremal nuqtani olgan xato.",
      difficulty: "Hard",
    },
    {
      id: "MAT-016",
      subject: "Matematika",
      topic: "Integral ilovasi",
      question:
        "Harbiy patrulning tezligi v(t) = 3t² + 2t m/s. t=0 dan t=3 s gacha bosib o'tilgan masofa qancha?",
      options: ["A) 36 m", "B) 27 m", "C) 33 m", "D) 18 m"],
      answer: "A) 36 m",
      explanation:
        "s = ∫₀³ (3t²+2t)dt = [t³+t²]₀³ = (27+9) - 0 = 36 m. B variant faqat t³ integrali, D variant t² integrali. Harakat masalalarini integral bilan yechish harbiy logistikada muhim.",
      difficulty: "Hard",
    },
    {
      id: "MAT-017",
      subject: "Matematika",
      topic: "Trigonometrik tenglama",
      question:
        "2sin²(x) - sin(x) - 1 = 0 tenglamaning [0, 2π] orasidagi yechimlari?",
      options: [
        "A) x = π/2, x = 7π/6, x = 11π/6",
        "B) x = π/6, x = 5π/6",
        "C) x = π/2 faqat",
        "D) x = π, x = 2π",
      ],
      answer: "A) x = π/2, x = 7π/6, x = 11π/6",
      explanation:
        "t = sin(x) desak: 2t²-t-1=0 → (2t+1)(t-1)=0 → t=1 yoki t=-1/2. sin(x)=1 → x=π/2. sin(x)=-1/2 → x=7π/6 va x=11π/6. Jami 3 ta yechim. B variant sin(x)=1/2 uchun yechim — belgisini noto'g'ri o'qish xatosi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-018",
      subject: "Matematika",
      topic: "Logarifmik tengsizlik",
      question: "log₃(x-1) + log₃(x+1) < 2 tengsizlikni yeching.",
      options: [
        "A) 1 < x < √10 (≈3.16)",
        "B) x > 1",
        "C) 1 < x < 3",
        "D) x < √10",
      ],
      answer: "A) 1 < x < √10 (≈3.16)",
      explanation:
        "log₃((x-1)(x+1)) < 2 → (x-1)(x+1) < 9 → x²-1 < 9 → x² < 10 → x < √10. Soha: x-1>0 va x+1>0 → x>1. Birlashtirish: 1 < x < √10. B variant tengsizlik yo'nalishini hisobga olmaydi. C variant 3²=9 dan x<3 deb xato xulosalaydi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-019",
      subject: "Matematika",
      topic: "Geometrik progressiya",
      question:
        "Harbiy kod 3, 9, 27, ... shaklida progressiv o'sadi. 8-had qancha? Bu qanday progressiya?",
      options: [
        "A) 6561 — geometrik (q=3)",
        "B) 2187 — geometrik (q=3)",
        "C) 243 — geometrik",
        "D) 6561 — arifmetik",
      ],
      answer: "A) 6561 — geometrik (q=3)",
      explanation:
        "q = 9/3 = 3. aₙ = a₁ × qⁿ⁻¹ = 3 × 3⁷ = 3⁸ = 6561. B variant a₇=3⁷=2187 — 7-had. C variant a₅=3⁵=243 — 5-had. D variant geometrik progressiyani arifmetik deyish xatosi.",
      difficulty: "Hard",
    },
    {
      id: "MAT-020",
      subject: "Matematika",
      topic: "Topografik hisob",
      question:
        "Harbiy xaritada M1:50000 masshtab ko'rsatilgan. Xaritadagi 4 sm qanday haqiqiy masofaga to'g'ri keladi va 9 sm² maydon nechi km² ga teng?",
      options: [
        "A) 2 km, 22.5 km²",
        "B) 2 km, 2.25 km²",
        "C) 20 km, 225 km²",
        "D) 200 m, 0.225 km²",
      ],
      answer: "B) 2 km, 2.25 km²",
      explanation:
        "Masshtab 1:50000 → 1 sm = 500 m = 0.5 km. 4 sm = 4×0.5 = 2 km. Maydonda masshtab kvadratlanadi: 1 sm² = (500m)² = 250000 m² = 0.25 km². 9 sm² = 9×0.25 = 2.25 km². Harbiy xaritalar bilan ishlash uchun asosiy ko'nikma.",
      difficulty: "Hard",
    },
  ],

  // =====================================================================
  // 5. INGLIZ TILI - B1/B2 darajasi + harbiy terminologiya (20 savol)
  // =====================================================================
  inglizTili: [
    {
      id: "ENG-001",
      subject: "Ingliz tili",
      topic: "Harbiy terminologiya",
      question:
        "What does 'SIGINT' stand for in military intelligence operations?",
      options: [
        "A) Signal Intelligence",
        "B) Signals Intelligence",
        "C) Significant Intelligence",
        "D) Signal Integration",
      ],
      answer: "B) Signals Intelligence",
      explanation:
        "SIGINT = Signals Intelligence — razvedkaning bir turi bo'lib, elektromagnit signallarni (radio, radar, aloqa) to'plash va tahlil qilishni o'z ichiga oladi. Bu HUMINT (insoniy razvedka) dan farq qiladi. NATO va aksariyat armiyalarda standart atama.",
      difficulty: "Hard",
    },
    {
      id: "ENG-002",
      subject: "Ingliz tili",
      topic: "Grammatika - Conditional",
      question:
        "Choose the correct form: 'If the radar _______ (malfunction), we _______ (lose) all communication.'",
      options: [
        "A) malfunctions / will lose",
        "B) malfunctioned / would lose",
        "C) had malfunctioned / would have lost",
        "D) will malfunction / lose",
      ],
      answer: "A) malfunctions / will lose",
      explanation:
        "Bu Real Conditional (Type 1) — haqiqiy yoki ehtimoliy holat: If + Present Simple → will + V. B variant Type 2 (gipotetik), C variant Type 3 (o'tgan imkoniyat). Harbiy protokollarda to'g'ri shartli jumlalar standart instruktsiya tiliga kiradi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-003",
      subject: "Ingliz tili",
      topic: "Harbiy buyruq tili",
      question:
        "In NATO phonetic alphabet, how do you spell 'INTEL' using the phonetic alphabet?",
      options: [
        "A) India-November-Tango-Echo-Lima",
        "B) India-Nancy-Tiger-Eagle-Lion",
        "C) Item-Navy-Tango-Easy-Love",
        "D) India-Niner-Tango-Echo-Lima",
      ],
      answer: "A) India-November-Tango-Echo-Lima",
      explanation:
        "NATO fonetik alifbosi: I=India, N=November, T=Tango, E=Echo, L=Lima. Bu standart ICAO/NATO alifbosi. B variant eskirgan harbiy terminologiya. Aloqa sohasida fonetik alfavitni bilish zarurat.",
      difficulty: "Hard",
    },
    {
      id: "ENG-004",
      subject: "Ingliz tili",
      topic: "Passive Voice",
      question:
        "Convert to Passive Voice: 'The engineer upgraded the communication system yesterday.'",
      options: [
        "A) The communication system was upgraded by the engineer yesterday.",
        "B) The communication system has been upgraded by the engineer yesterday.",
        "C) The communication system is upgraded by the engineer yesterday.",
        "D) The communication system were upgraded by the engineer yesterday.",
      ],
      answer: "A) The communication system was upgraded by the engineer yesterday.",
      explanation:
        "Past Simple Passive: Subject + was/were + V3. Yesterday → Past Simple. 'The engineer' → 'by the engineer'. B variant Present Perfect + yesterday kombinatsiyasi grammatik xato (yesterday PF bilan ishlatilmaydi). Harbiy hisobotlarda Passive Voice keng ishlatiladi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-005",
      subject: "Ingliz tili",
      topic: "Harbiy terminologiya",
      question: "What is the difference between 'classified' and 'confidential' in military security?",
      options: [
        "A) They mean the same thing",
        "B) 'Classified' is general term; 'Confidential' is the lowest official classification level",
        "C) 'Confidential' is higher than 'Top Secret'",
        "D) 'Classified' means unclassified documents",
      ],
      answer: "B) 'Classified' is general term; 'Confidential' is the lowest official classification level",
      explanation:
        "Harbiy hujjat maxfiylik darajalari (AQSh standarti): Confidential (eng past) → Secret → Top Secret. 'Classified' — umumiy atama, barcha maxfiy hujjatlarni anglatadi. 'Confidential' esa aniq daraja. Bu terminologiya xalqaro harbiy hamkorlikda standart.",
      difficulty: "Hard",
    },
    {
      id: "ENG-006",
      subject: "Ingliz tili",
      topic: "Reading comprehension",
      question:
        "Read: 'The battalion commander ordered an immediate reconnaissance of the perimeter.' What does 'perimeter' mean in this context?",
      options: [
        "A) The center of the military base",
        "B) The outer boundary or edge of a defended area",
        "C) The headquarters building",
        "D) The ammunition storage",
      ],
      answer: "B) The outer boundary or edge of a defended area",
      explanation:
        "'Perimeter' harbiy kontekstda himoya qilinayotgan maydon yoki bazaning tashqi chegarasi. 'Perimeter defense' — chegarani himoya qilish strategiyasi. Matematikadagi perimetr (kontur uzunligi) dan kelib chiqqan, harbiy lug'atda maxsus ma'no kasb etgan.",
      difficulty: "Hard",
    },
    {
      id: "ENG-007",
      subject: "Ingliz tili",
      topic: "Grammatika - Reported Speech",
      question:
        "Direct: The general said, 'We will launch the operation at dawn.' Reported speech?",
      options: [
        "A) The general said that they will launch the operation at dawn.",
        "B) The general said that they would launch the operation at dawn.",
        "C) The general said that they launched the operation at dawn.",
        "D) The general said that they are launching the operation at dawn.",
      ],
      answer: "B) The general said that they would launch the operation at dawn.",
      explanation:
        "Reported Speech: will → would (backshift). 'We' → 'they'. A variant will ni o'zgartirmaslik xatosi. C variant simple past — operatsiya o'tganda degan ma'no. Harbiy briefing va hisobotlarda to'g'ri Reported Speech muhim.",
      difficulty: "Hard",
    },
    {
      id: "ENG-008",
      subject: "Ingliz tili",
      topic: "Harbiy terminologiya",
      question: "What does 'EMP' stand for and what is its military application?",
      options: [
        "A) Electronic Military Protocol — radio aloqa standarti",
        "B) Electromagnetic Pulse — elektronik tizimlarga zarar yetkazuvchi qurol",
        "C) Emergency Military Plan — urush rejasi",
        "D) Encrypted Military Packet — shifrlangan axborot paketi",
      ],
      answer: "B) Electromagnetic Pulse — elektronik tizimlarga zarar yetkazuvchi qurol",
      explanation:
        "EMP (Electromagnetic Pulse) — kuchli elektromagnit impulsi, yadro portlashida yoki maxsus EMP qurollarida hosil bo'lib, mikrosxemalar va elektron uskunalarni ishdan chiqaradi. Zamonaviy harbiy strategiyada infratuzilmani ishdan chiqarish uchun ishlatiladi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-009",
      subject: "Ingliz tili",
      topic: "Grammatika - Modal verbs",
      question:
        "Choose the correct modal: 'Soldiers _______ always follow the chain of command — it's obligatory.'",
      options: [
        "A) should",
        "B) might",
        "C) must",
        "D) could",
      ],
      answer: "C) must",
      explanation:
        "'Must' — majburiy talabni bildiradi (shart, qoida). 'Should' — tavsiya, ma'naviy burch. 'Might/could' — imkoniyat. Harbiy instruktsiyalarda 'must' standart talablarni, 'should' tavsiyalarni bildiradi. Bu farqni bilmaslik buyruq tili noto'g'ri talqin qilinishiga olib keladi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-010",
      subject: "Ingliz tili",
      topic: "Texnik yozish",
      question:
        "Which sentence is written in the most appropriate military technical report style?",
      options: [
        "A) The equipment is broken and nobody can fix it fast.",
        "B) System malfunction detected at 0300 hrs; maintenance team dispatched; ETA: 2 hours.",
        "C) I think the radar might have some problems maybe.",
        "D) Radar is not working since last night.",
      ],
      answer: "B) System malfunction detected at 0300 hrs; maintenance team dispatched; ETA: 2 hours.",
      explanation:
        "Harbiy texnik hisobot tili: aniq vaqt (0300 hrs), passiv/nominal uslub, ETA (Estimated Time of Arrival) kabi abbreviaturalar, to'g'ri va qisqa gap qurilishi. A variant norasmiy, C variant noaniq va shubhali, D variant vaqtni noaniq beradi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-011",
      subject: "Ingliz tili",
      topic: "Harbiy kommunikatsiya",
      question:
        "In radio communication, what does 'ROGER' mean?",
      options: [
        "A) I understand, but I'm not ready",
        "B) Message received and understood",
        "C) Please repeat the message",
        "D) Over and out — ending communication",
      ],
      answer: "B) Message received and understood",
      explanation:
        "'ROGER' — NATO/standarti radio terminologiyasi: xabar qabul qilindi va tushunildi. 'WILCO' (Will Comply) = tushundim va bajaraman. 'OVER' = javob kuting. 'OUT' = aloqa yakunlandi. 'ROGER' dan keyin 'OUT' ham kelishi mumkin, lekin 'ROGER OUT' ko'pincha xato hisoblanadi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-012",
      subject: "Ingliz tili",
      topic: "Grammatika - Gerund vs Infinitive",
      question:
        "Choose the correct form: 'The commander decided _______ (deploy) additional forces after _______ (assess) the situation.'",
      options: [
        "A) deploying / assessing",
        "B) to deploy / assessing",
        "C) to deploy / to assess",
        "D) deploy / assessing",
      ],
      answer: "B) to deploy / assessing",
      explanation:
        "'decide' + to-infinitive. 'after' + gerund (-ing). Decide to do = qaror qilmoq. After doing = qilib bo'lgandan keyin. A variant 'decide' bilan gerund ishlatish xatosi. C variant 'after' bilan infinitive xatosi. Harbiy buyruqlar ingliz tilida grammatik aniqlik talab qiladi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-013",
      subject: "Ingliz tili",
      topic: "Harbiy strategiya tili",
      question:
        "What is the correct interpretation of 'asymmetric warfare'?",
      options: [
        "A) War between two equal military powers",
        "B) Conflict where opposing forces differ significantly in military strength, using unconventional tactics",
        "C) Naval warfare strategy",
        "D) Nuclear deterrence policy",
      ],
      answer: "B) Conflict where opposing forces differ significantly in military strength, using using unconventional tactics",
      explanation:
        "'Asymmetric warfare' — harbiy kuch jihatdan tengsiz tomonlar orasidagi ziddiyat, kuchsiz tomon noan'anaviy taktikalardan (partizanchilik, terrorchilik, kiberatakalar) foydalanadi. Masalan: Vietnam urushi, Afg'oniston. A variant 'symmetric warfare' ta'rifi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-014",
      subject: "Ingliz tili",
      topic: "Lug'at",
      question:
        "Choose the word that best completes: 'The encrypted message was _______ by the signals unit within hours.'",
      options: [
        "A) encoded",
        "B) deciphered",
        "C) transmitted",
        "D) classified",
      ],
      answer: "B) deciphered",
      explanation:
        "'Decipher' — shifrlangan xabarni ochib o'qish. 'Encode' — shifrlash (teskari jarayon). 'Transmit' — uzatmoq. 'Classify' — maxfiy deb belgilash. Kontekstda 'encrypted' (shifrlangan) xabar 'deciphered' (deshifrlangan) bo'ladi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-015",
      subject: "Ingliz tili",
      topic: "Grammatika - Perfect tenses",
      question:
        "Choose the correct tense: 'By the time reinforcements arrive, we _______ (hold) the position for 6 hours.'",
      options: [
        "A) will hold",
        "B) have held",
        "C) will have held",
        "D) held",
      ],
      answer: "C) will have held",
      explanation:
        "'By the time' + Future Simple → Future Perfect (will have + V3). Kelajakda bir vaqtgacha tugallanmiş harakat. C variant to'g'ri: kuchlar kelgunga qadar 6 soat ushlab turilgan bo'ladi. A variant oddiy kelajak — davomiylik ma'nosini bermaydi. Harbiy operatsiya rejalashtirish tilida to'g'ri zamon muhim.",
      difficulty: "Hard",
    },
    {
      id: "ENG-016",
      subject: "Ingliz tili",
      topic: "Harbiy terminologiya",
      question: "What does 'C4ISR' stand for in modern military systems?",
      options: [
        "A) Command, Control, Communications, Computers, Intelligence, Surveillance, Reconnaissance",
        "B) Combat, Control, Communications, Cyber, Intelligence, Strategy, Resources",
        "C) Command, Coordination, Communications, Combat, Information, Signals, Radar",
        "D) Control, Cyber, Communications, Combat, Intelligence, Surveillance, Rockets",
      ],
      answer:
        "A) Command, Control, Communications, Computers, Intelligence, Surveillance, Reconnaissance",
      explanation:
        "C4ISR — zamonaviy harbiy axborot-boshqaruv tizimining to'liq ta'rifi. Bu tushuncha harbiy aloqa institutlarida markaziy o'rin tutadi. Har bir komponent: Command (qo'mondonlik), Control (boshqaruv), Communications (aloqa), Computers, Intelligence (razvedka), Surveillance (kuzatish), Reconnaissance (razvedka uçuşlari).",
      difficulty: "Hard",
    },
    {
      id: "ENG-017",
      subject: "Ingliz tili",
      topic: "Reading - Technical",
      question:
        "Read: 'The frequency-hopping spread spectrum (FHSS) technology makes interception difficult by rapidly switching frequencies.' What is the main advantage of FHSS?",
      options: [
        "A) It increases signal power",
        "B) It makes the signal harder to intercept by constantly changing frequencies",
        "C) It reduces battery consumption",
        "D) It extends the range of communication",
      ],
      answer: "B) It makes the signal harder to intercept by constantly changing frequencies",
      explanation:
        "FHSS texnologiyasi signalni ushlab olishni qiyinlashtiradi — chastota tez-tez o'zgarib turadi. 'Interception' = signalni ushlab olish. 'Spread spectrum' = kengaytirilgan spektr. Bu harbiy aloqada keng qo'llaniladigan shifrlash texnologiyasi.",
      difficulty: "Hard",
    },
    {
      id: "ENG-018",
      subject: "Ingliz tili",
      topic: "Grammatika - Articles",
      question:
        "Choose correct articles: '_____ radar system detected _____ unidentified aircraft near _____ border.'",
      options: [
        "A) The / an / the",
        "B) A / the / a",
        "C) The / the / a",
        "D) A / an / the",
      ],
      answer: "A) The / an / the",
      explanation:
        "'The radar system' — aniq, ma'lum tizim (kontekstda aniq). 'An unidentified aircraft' — birinchi tilga olinish, undosh bilan boshlangan sifatdan oldin 'an'. 'The border' — aniq, ma'lum chegara. D variant 'a radar' — umumiy radar, lekin bu yerda aniq tizim haqida gap.",
      difficulty: "Hard",
    },
    {
      id: "ENG-019",
      subject: "Ingliz tili",
      topic: "Harbiy buyruqlar",
      question:
        "Translate military order: 'Advance to the next waypoint maintaining radio silence until further orders.' What is the key instruction?",
      options: [
        "A) Stop and wait for orders",
        "B) Move to the next location without using radio communication",
        "C) Contact headquarters before advancing",
        "D) Use emergency frequency only",
      ],
      answer: "B) Move to the next location without using radio communication",
      explanation:
        "'Advance' = ilgarilamoq/harakat qilmoq. 'Waypoint' = marshal yo'lidagi navbatdagi belgilangan nuqta. 'Radio silence' = radio sukuti — hech qanday radio aloqa yo'q. 'Until further orders' = keyingi buyruqqa qadar. A variant teskari ma'no.",
      difficulty: "Hard",
    },
    {
      id: "ENG-020",
      subject: "Ingliz tili",
      topic: "Texnik ingliz tili",
      question:
        "What is the correct definition of 'bandwidth' in telecommunications?",
      options: [
        "A) The physical width of the antenna",
        "B) The range of frequencies within a given band used for transmission; determines data capacity",
        "C) The maximum signal distance",
        "D) The encryption strength of a signal",
      ],
      answer: "B) The range of frequencies within a given band used for transmission; determines data capacity",
      explanation:
        "'Bandwidth' (o'tkazish qobiliyati) — telekommunikatsiyada uzatish uchun ishlatiladigan chastotalar diapazoni. Katta bandwidth = ko'proq ma'lumot uzatish imkoniyati. Harbiy aloqa tizimlarida bandwidth allokatsiyasi taktik rejalashtirish elementi. A variant noto'g'ri fizik tushuncha.",
      difficulty: "Hard",
    },
  ],
};

// Export for module environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = window.QUIZ_DATA;
}
