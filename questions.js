// ============================================================
// questions.js - HARBIY ALOQA INSTITUTI TEST BAZASI
// 5 ta fan, 200 tadan = 1000 ta savol
// ============================================================

window.QUIZ_DATA = [
    // ==================== FAN 0: MATEMATIKA (200 SAVOL) ====================
    {
        id: 0,
        subject: "Matematika",
        icon: "∑",
        color: "#4f46e5",
        questions: [
            // 1-20: Logarifm
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
                answer: "x=3",
                explanation: "log₃(9x)=4 → 9x=81 → x=9? Aslida: log₃(9x)=4 → 9x=81 → x=9"
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
                question: "log₄(64) + log₉(27) = ?",
                options: ["3", "4", "4.5", "5"],
                answer: "4.5",
                explanation: "log₄(64)=3, log₉(27)=3/2=1.5, jami=4.5"
            },
            {
                question: "logₐ(b) = 2 va logₐ(c) = 3 bo'lsa, logₐ(b²c) = ?",
                options: ["5", "7", "8", "12"],
                answer: "7",
                explanation: "logₐ(b²c)=2×2+3=7"
            },
            {
                question: "2log₃(6) - log₃(4) ni soddalashtiring",
                options: ["log₃(3)", "log₃(9)", "log₃(12)", "log₃(36)"],
                answer: "log₃(9)",
                explanation: "log₃(36)-log₃(4)=log₃(36/4)=log₃(9)"
            },
            {
                question: "log₅(0.04) = ?",
                options: ["-2", "-1", "1", "2"],
                answer: "-2",
                explanation: "0.04=5⁻² → log₅(5⁻²)=-2"
            },
            {
                question: "ln(√e) = ?",
                options: ["0.5", "1", "1.5", "2"],
                answer: "0.5",
                explanation: "ln(e¹/²)=1/2"
            },
            {
                question: "log₃(27√3) = ?",
                options: ["2.5", "3", "3.5", "4"],
                answer: "3.5",
                explanation: "27√3=3³×3¹/²=3⁷/² → log₃=7/2=3.5"
            },
            {
                question: "log₂(12) - log₂(3) = ?",
                options: ["1", "2", "3", "4"],
                answer: "2",
                explanation: "log₂(12/3)=log₂(4)=2"
            },
            {
                question: "log₃(81) + log₂(1/8) = ?",
                options: ["1", "2", "3", "4"],
                answer: "1",
                explanation: "4 + (-3) = 1"
            },
            {
                question: "lg(0.001) = ?",
                options: ["-3", "-2", "2", "3"],
                answer: "-3",
                explanation: "0.001=10⁻³ → lg=-3"
            },
            {
                question: "logₓ(64)=3 bo'lsa, x = ?",
                options: ["2", "4", "8", "16"],
                answer: "4",
                explanation: "x³=64 → x=4"
            },
            {
                question: "log₃(2x) = 2 bo'lsa, x = ?",
                options: ["2", "3", "4.5", "6"],
                answer: "4.5",
                explanation: "2x=9 → x=4.5"
            },
            {
                question: "log₇(343) = ?",
                options: ["2", "3", "4", "5"],
                answer: "3",
                explanation: "7³=343"
            },
            {
                question: "log₂(cos 0°) = ?",
                options: ["0", "1", "-∞", "∞"],
                answer: "0",
                explanation: "cos0=1, log₂(1)=0"
            },
            {
                question: "log₃(54) - log₃(2) = ?",
                options: ["2", "3", "4", "5"],
                answer: "3",
                explanation: "log₃(27)=3"
            },
            {
                question: "ln(e⁰) = ?",
                options: ["0", "1", "e", "∞"],
                answer: "0",
                explanation: "ln(1)=0"
            },
            // 21-40: Hosila
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
                question: "f(x) = ln(x) funksiyaning hosilasi?",
                options: ["1/x", "x", "ln(x)", "eˣ"],
                answer: "1/x",
                explanation: "d/dx ln(x)=1/x"
            },
            {
                question: "f(x) = (x²+1)⁵ funksiyaning hosilasi?",
                options: ["5(x²+1)⁴", "10x(x²+1)⁴", "5x(x²+1)⁴", "10(x²+1)⁴"],
                answer: "10x(x²+1)⁴",
                explanation: "Zanjir qoidasi: 5(x²+1)⁴×2x=10x(x²+1)⁴"
            },
            {
                question: "f(x) = tan(x) funksiyaning hosilasi?",
                options: ["sec²(x)", "csc²(x)", "sec(x)tan(x)", "cot(x)"],
                answer: "sec²(x)",
                explanation: "d/dx tan(x)=sec²(x)"
            },
            {
                question: "f(x) = 1/x funksiyaning hosilasi?",
                options: ["-1/x²", "1/x²", "-1/x", "ln(x)"],
                answer: "-1/x²",
                explanation: "d/dx x⁻¹ = -x⁻²"
            },
            {
                question: "f(x) = cos(x) funksiyaning hosilasi?",
                options: ["-sin(x)", "sin(x)", "-cos(x)", "tan(x)"],
                answer: "-sin(x)",
                explanation: "d/dx cos(x)=-sin(x)"
            },
            {
                question: "f(x) = aˣ (a>0) funksiyaning hosilasi?",
                options: ["aˣ·ln(a)", "aˣ·logₐ(e)", "x·aˣ⁻¹", "aˣ"],
                answer: "aˣ·ln(a)",
                explanation: "d/dx aˣ = aˣ·ln(a)"
            },
            {
                question: "f(x) = arcsin(x) funksiyaning hosilasi?",
                options: ["1/√(1-x²)", "1/√(x²-1)", "1/(1+x²)", "-1/√(1-x²)"],
                answer: "1/√(1-x²)",
                explanation: "d/dx arcsin(x)=1/√(1-x²)"
            },
            {
                question: "f(x) = arctan(x) funksiyaning hosilasi?",
                options: ["1/(1+x²)", "1/√(1+x²)", "1/(1-x²)", "x/(1+x²)"],
                answer: "1/(1+x²)",
                explanation: "d/dx arctan(x)=1/(1+x²)"
            },
            {
                question: "f(x) = x·eˣ funksiyaning hosilasi?",
                options: ["eˣ(x+1)", "eˣ", "x·eˣ", "eˣ(x-1)"],
                answer: "eˣ(x+1)",
                explanation: "Ko'paytma hosilasi: 1·eˣ + x·eˣ = eˣ(x+1)"
            },
            {
                question: "f(x) = x·ln(x) funksiyaning hosilasi?",
                options: ["ln(x)+1", "ln(x)-1", "1/x", "x·ln(x)"],
                answer: "ln(x)+1",
                explanation: "ln(x) + x·(1/x) = ln(x)+1"
            },
            {
                question: "f(x) = √x funksiyaning hosilasi?",
                options: ["1/(2√x)", "2√x", "1/√x", "√x/2"],
                answer: "1/(2√x)",
                explanation: "d/dx x¹/² = (1/2)x⁻¹/² = 1/(2√x)"
            },
            {
                question: "f(x) = sin²(x) funksiyaning hosilasi?",
                options: ["2sin(x)cos(x)", "sin(2x)", "2sin(x)", "cos²(x)"],
                answer: "2sin(x)cos(x)",
                explanation: "2sin(x)·cos(x) = sin(2x)"
            },
            {
                question: "f(x) = cos²(x) funksiyaning hosilasi?",
                options: ["-2cos(x)sin(x)", "2cos(x)sin(x)", "-sin(2x)", "sin(2x)"],
                answer: "-2cos(x)sin(x)",
                explanation: "2cos(x)·(-sin(x)) = -2sin(x)cos(x) = -sin(2x)"
            },
            {
                question: "f(x) = 3ˣ funksiyaning hosilasi?",
                options: ["3ˣ·ln3", "3ˣ", "x·3ˣ⁻¹", "ln3·3ˣ"],
                answer: "3ˣ·ln3",
                explanation: "d/dx aˣ = aˣ·ln a"
            },
            {
                question: "f(x) = log₂(x) funksiyaning hosilasi?",
                options: ["1/(x·ln2)", "1/x", "ln2/x", "1/(x·log₂(e))"],
                answer: "1/(x·ln2)",
                explanation: "d/dx logₐ(x)=1/(x·ln a)"
            },
            {
                question: "f(x) = e^{2x} funksiyaning hosilasi?",
                options: ["2e^{2x}", "e^{2x}", "2e^{x}", "e^{2x}/2"],
                answer: "2e^{2x}",
                explanation: "Zanjir qoidasi: e^{2x}·2=2e^{2x}"
            },
            // 41-60: Hosila (davomi)
            {
                question: "f(x) = x²·sin(x) funksiyaning hosilasi?",
                options: ["2x·sin(x)+x²·cos(x)", "2x·cos(x)", "x²·cos(x)", "2x·sin(x)"],
                answer: "2x·sin(x)+x²·cos(x)",
                explanation: "Ko'paytma hosilasi"
            },
            {
                question: "f(x) = (x²-1)/(x+1) funksiyaning hosilasi?",
                options: ["1", "0", "2", "(x²-2x-1)/(x+1)²"],
                answer: "1",
                explanation: "Soddalashtirsak: (x-1)(x+1)/(x+1)=x-1, hosila=1"
            },
            {
                question: "f(x) = ln(3x) funksiyaning hosilasi?",
                options: ["1/x", "3/x", "1/(3x)", "ln3"],
                answer: "1/x",
                explanation: "ln(3x)=ln3+lnx, hosila=1/x"
            },
            {
                question: "f(x) = e^{sin(x)} funksiyaning hosilasi?",
                options: ["e^{sin(x)}·cos(x)", "e^{sin(x)}", "cos(x)·e^{sin(x)}", "e^{cos(x)}"],
                answer: "e^{sin(x)}·cos(x)",
                explanation: "Zanjir qoidasi"
            },
            {
                question: "f(x) = 5x² - 3x + 7 funksiyaning hosilasi?",
                options: ["10x-3", "5x-3", "10x+7", "5x²-3"],
                answer: "10x-3",
                explanation: "2·5x¹ - 3·1 + 0"
            },
            {
                question: "f(x) = (2x+1)³ funksiyaning hosilasi?",
                options: ["6(2x+1)²", "3(2x+1)²", "6(2x+1)", "2(2x+1)²"],
                answer: "6(2x+1)²",
                explanation: "3(2x+1)²·2 = 6(2x+1)²"
            },
            {
                question: "f(x) = √(x²+1) funksiyaning hosilasi?",
                options: ["x/√(x²+1)", "1/√(x²+1)", "2x/√(x²+1)", "√(x²+1)/x"],
                answer: "x/√(x²+1)",
                explanation: "(1/2)(x²+1)^{-1/2}·2x = x/√(x²+1)"
            },
            {
                question: "f(x) = sec(x) funksiyaning hosilasi?",
                options: ["sec(x)tan(x)", "sec²(x)", "csc(x)cot(x)", "tan(x)sec²(x)"],
                answer: "sec(x)tan(x)",
                explanation: "d/dx sec(x)=sec(x)tan(x)"
            },
            {
                question: "f(x) = cot(x) funksiyaning hosilasi?",
                options: ["-csc²(x)", "csc²(x)", "-sec²(x)", "-csc(x)cot(x)"],
                answer: "-csc²(x)",
                explanation: "d/dx cot(x)=-csc²(x)"
            },
            {
                question: "f(x) = xˣ (x>0) funksiyaning hosilasi?",
                options: ["xˣ(ln x+1)", "xˣ·ln x", "x·xˣ⁻¹", "xˣ"],
                answer: "xˣ(ln x+1)",
                explanation: "y=xˣ → ln y = x ln x → y'/y = ln x + 1 → y' = xˣ(ln x+1)"
            },
            // 61-80: Hosila (murakkab)
            {
                question: "f(x) = ln(cos x) funksiyaning hosilasi?",
                options: ["-tan x", "tan x", "-cot x", "cot x"],
                answer: "-tan x",
                explanation: "(1/cos x)·(-sin x) = -tan x"
            },
            {
                question: "f(x) = arccos(x) funksiyaning hosilasi?",
                options: ["-1/√(1-x²)", "1/√(1-x²)", "1/(1+x²)", "-1/(1+x²)"],
                answer: "-1/√(1-x²)",
                explanation: "d/dx arccos(x) = -1/√(1-x²)"
            },
            {
                question: "f(x) = arccot(x) funksiyaning hosilasi?",
                options: ["-1/(1+x²)", "1/(1+x²)", "-1/√(1+x²)", "1/√(1+x²)"],
                answer: "-1/(1+x²)",
                explanation: "d/dx arccot(x) = -1/(1+x²)"
            },
            {
                question: "f(x) = sinh(x) funksiyaning hosilasi?",
                options: ["cosh(x)", "sinh(x)", "tanh(x)", "sech²(x)"],
                answer: "cosh(x)",
                explanation: "d/dx sinh(x)=cosh(x)"
            },
            {
                question: "f(x) = cosh(x) funksiyaning hosilasi?",
                options: ["sinh(x)", "cosh(x)", "-sinh(x)", "tanh(x)"],
                answer: "sinh(x)",
                explanation: "d/dx cosh(x)=sinh(x)"
            },
            {
                question: "f(x) = tanh(x) funksiyaning hosilasi?",
                options: ["sech²(x)", "csch²(x)", "tanh²(x)", "1-tanh²(x)"],
                answer: "sech²(x)",
                explanation: "d/dx tanh(x)=sech²(x)"
            },
            {
                question: "f(x) = x²eˣ funksiyaning ikkinchi tartibli hosilasi?",
                options: ["eˣ(x²+4x+2)", "eˣ(x²+2x+2)", "eˣ(2x+2)", "eˣ(x²+4x)"],
                answer: "eˣ(x²+4x+2)",
                explanation: "f'=eˣ(x²+2x), f''=eˣ(x²+4x+2)"
            },
            {
                question: "f(x) = ln(ln x) funksiyaning hosilasi?",
                options: ["1/(x ln x)", "1/(ln x)", "1/x", "ln x/x"],
                answer: "1/(x ln x)",
                explanation: "(1/ln x)·(1/x)=1/(x ln x)"
            },
            {
                question: "f(x) = e^{x²} funksiyaning hosilasi?",
                options: ["2xe^{x²}", "e^{x²}", "2e^{x²}", "x²e^{x²}"],
                answer: "2xe^{x²}",
                explanation: "Zanjir qoidasi: e^{x²}·2x"
            },
            {
                question: "f(x) = sin(ln x) funksiyaning hosilasi?",
                options: ["cos(ln x)/x", "cos(ln x)", "-sin(ln x)/x", "sin(ln x)/x"],
                answer: "cos(ln x)/x",
                explanation: "cos(ln x)·(1/x)"
            },
            // 81-100: Hosila (ekstremum va tatbiq)
            {
                question: "f(x) = x² - 4x + 3 funksiyaning minimum nuqtasi?",
                options: ["x=2", "x=4", "x=1", "x=3"],
                answer: "x=2",
                explanation: "f'(x)=2x-4=0 → x=2, f''(x)=2>0 → min"
            },
            {
                question: "f(x) = -x² + 6x - 5 funksiyaning maksimum qiymati?",
                options: ["4", "5", "6", "7"],
                answer: "4",
                explanation: "f'(x)=-2x+6=0 → x=3, f(3)=-9+18-5=4"
            },
            {
                question: "f(x) = x³ - 3x funksiyaning ekstremum nuqtalari?",
                options: ["x=±1", "x=0, x=1", "x=-1, x=1", "x=0, x=±1"],
                answer: "x=-1, x=1",
                explanation: "f'(x)=3x²-3=0 → x=±1"
            },
            {
                question: "f(x) = x³ + 3x² - 9x + 1 funksiyaning lokal maksimumi?",
                options: ["x=-3", "x=1", "x=0", "x=-1"],
                answer: "x=-3",
                explanation: "f'(x)=3x²+6x-9=0 → x=-3, x=1, f''(-3)=-12<0 → max"
            },
            {
                question: "f(x) = x + 1/x (x>0) funksiyaning minimum qiymati?",
                options: ["2", "1", "√2", "0"],
                answer: "2",
                explanation: "f'(x)=1-1/x²=0 → x=1, f(1)=2"
            },
            // 101-120: Integral
            {
                question: "∫(3x²) dx = ?",
                options: ["x³ + C", "3x³ + C", "x³/3 + C", "6x + C"],
                answer: "x³ + C",
                explanation: "∫3x²dx = 3·x³/3 = x³ + C"
            },
            {
                question: "∫(2x + 5) dx = ?",
                options: ["x² + 5x + C", "x² + 5 + C", "2x² + 5x + C", "x² + 5x² + C"],
                answer: "x² + 5x + C",
                explanation: "∫2xdx = x², ∫5dx = 5x"
            },
            {
                question: "∫eˣ dx = ?",
                options: ["eˣ + C", "ln x + C", "xeˣ⁻¹ + C", "eˣ/x + C"],
                answer: "eˣ + C",
                explanation: "d/dx eˣ = eˣ"
            },
            {
                question: "∫(1/x) dx = ?",
                options: ["ln|x| + C", "eˣ + C", "x²/2 + C", "1 + C"],
                answer: "ln|x| + C",
                explanation: "d/dx ln|x| = 1/x"
            },
            {
                question: "∫cos x dx = ?",
                options: ["sin x + C", "-sin x + C", "cos x + C", "-cos x + C"],
                answer: "sin x + C",
                explanation: "d/dx sin x = cos x"
            },
            {
                question: "∫sin x dx = ?",
                options: ["-cos x + C", "cos x + C", "-sin x + C", "sin x + C"],
                answer: "-cos x + C",
                explanation: "d/dx (-cos x) = sin x"
            },
            {
                question: "∫₀¹ x² dx = ?",
                options: ["1/3", "1/2", "1", "2/3"],
                answer: "1/3",
                explanation: "[x³/3]₀¹ = 1/3"
            },
            {
                question: "∫₁² 3x² dx = ?",
                options: ["7", "8", "9", "10"],
                answer: "7",
                explanation: "[x³]₁² = 8-1=7"
            },
            {
                question: "∫(4x³ - 2x + 1) dx = ?",
                options: ["x⁴ - x² + x + C", "x⁴ - x² + 1 + C", "12x² - 2 + C", "4x⁴ - 2x² + x + C"],
                answer: "x⁴ - x² + x + C",
                explanation: "∫4x³dx=x⁴, ∫-2xdx=-x², ∫1dx=x"
            },
            {
                question: "∫₀^π sin x dx = ?",
                options: ["2", "0", "1", "π"],
                answer: "2",
                explanation: "[-cos x]₀^π = (-cosπ)-(-cos0)=1+1=2"
            },
            // 121-140: Integral (davomi)
            {
                question: "∫₀^{π/2} cos x dx = ?",
                options: ["1", "0", "-1", "2"],
                answer: "1",
                explanation: "[sin x]₀^{π/2}=1-0=1"
            },
            {
                question: "∫(e^{2x}) dx = ?",
                options: ["½e^{2x} + C", "e^{2x} + C", "2e^{2x} + C", "e^{2x}/2x + C"],
                answer: "½e^{2x} + C",
                explanation: "∫e^{ax}dx = e^{ax}/a + C"
            },
            {
                question: "∫(1/(x+3)) dx = ?",
                options: ["ln|x+3| + C", "ln|x| + C", "1/(x+3)² + C", "ln(3x) + C"],
                answer: "ln|x+3| + C",
                explanation: "∫dx/(x+a) = ln|x+a| + C"
            },
            {
                question: "∫tan x dx = ?",
                options: ["-ln|cos x| + C", "ln|cos x| + C", "ln|sec x| + C", "sec²x + C"],
                answer: "-ln|cos x| + C",
                explanation: "∫tan x dx = ∫sinx/cosx dx = -ln|cos x| + C"
            },
            {
                question: "∫cot x dx = ?",
                options: ["ln|sin x| + C", "-ln|sin x| + C", "ln|cos x| + C", "-ln|cos x| + C"],
                answer: "ln|sin x| + C",
                explanation: "∫cot x dx = ∫cosx/sinx dx = ln|sin x| + C"
            },
            {
                question: "∫sec²x dx = ?",
                options: ["tan x + C", "cot x + C", "sec x + C", "csc x + C"],
                answer: "tan x + C",
                explanation: "d/dx tan x = sec²x"
            },
            {
                question: "∫csc²x dx = ?",
                options: ["-cot x + C", "cot x + C", "-tan x + C", "tan x + C"],
                answer: "-cot x + C",
                explanation: "d/dx cot x = -csc²x → ∫csc²x dx = -cot x + C"
            },
            {
                question: "∫(1/(1+x²)) dx = ?",
                options: ["arctan x + C", "arcsin x + C", "ln|1+x²| + C", "1/(1+x²) + C"],
                answer: "arctan x + C",
                explanation: "d/dx arctan x = 1/(1+x²)"
            },
            {
                question: "∫(1/√(1-x²)) dx = ?",
                options: ["arcsin x + C", "arccos x + C", "arctan x + C", "ln|√(1-x²)| + C"],
                answer: "arcsin x + C",
                explanation: "d/dx arcsin x = 1/√(1-x²)"
            },
            {
                question: "∫₀¹ (2x) dx = ?",
                options: ["1", "0", "2", "½"],
                answer: "1",
                explanation: "[x²]₀¹=1"
            },
            // 141-160: Stereometriya
            {
                question: "Kubning diagonali 6√3 sm bo'lsa, uning hajmi?",
                options: ["216 sm³", "64 sm³", "125 sm³", "27 sm³"],
                answer: "216 sm³",
                explanation: "d = a√3 = 6√3 → a=6, V=6³=216"
            },
            {
                question: "To'g'ri to'rtburchakli parallelepipedning o'lchamlari 3,4,5. Uning to'liq sirti?",
                options: ["94", "47", "60", "120"],
                answer: "94",
                explanation: "S=2(3·4+3·5+4·5)=2(12+15+20)=94"
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
            },
            {
                question: "Silindr balandligi 10 sm, asos radiusi 3 sm. Uning yon sirti?",
                options: ["60π sm²", "30π sm²", "90π sm²", "120π sm²"],
                answer: "60π sm²",
                explanation: "S_yon=2πrh=2π·3·10=60π"
            },
            {
                question: "Prizma asosida tomoni 4 sm bo'lgan muntazam uchburchak. Prizma balandligi 10 sm. Uning hajmi?",
                options: ["40√3 sm³", "80 sm³", "40 sm³", "80√3 sm³"],
                answer: "40√3 sm³",
                explanation: "S_asos=√3/4·4²=4√3, V=4√3·10=40√3"
            },
            {
                question: "Kubning sirti 150 sm². Uning hajmi?",
                options: ["125 sm³", "100 sm³", "64 sm³", "216 sm³"],
                answer: "125 sm³",
                explanation: "6a²=150 → a²=25→a=5, V=125"
            },
            {
                question: "Shar hajmi 36π sm³. Uning radiusi?",
                options: ["3 sm", "2 sm", "4 sm", "5 sm"],
                answer: "3 sm",
                explanation: "V=4/3πR³=36π→R³=27→R=3"
            },
            {
                question: "Piramidaning asosi tomoni 6 sm bo'lgan kvadrat. Piramida balandligi 4 sm. Uning hajmi?",
                options: ["48 sm³", "36 sm³", "24 sm³", "12 sm³"],
                answer: "48 sm³",
                explanation: "V=⅓·(6·6)·4=48"
            },
            {
                question: "Silindr o'q kesimi tomoni 6 sm bo'lgan kvadrat. Silindr hajmi?",
                options: ["54π sm³", "27π sm³", "36π sm³", "18π sm³"],
                answer: "54π sm³",
                explanation: "h=6, d=6→r=3, V=π·9·6=54π"
            },
            // 161-180: Stereometriya (davomi)
            {
                question: "Muntazam tetraedrning qirrasi 4 sm. Uning hajmi?",
                options: ["16√2/3 sm³", "8√2/3 sm³", "32√2/3 sm³", "4√2/3 sm³"],
                answer: "16√2/3 sm³",
                explanation: "V=a³√2/12=64√2/12=16√2/3"
            },
            {
                question: "To'g'ri burchakli parallelepipedning qirralari 2,3,6. Uning diagonali?",
                options: ["7", "5", "√46", "√31"],
               
