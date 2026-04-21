const database = [
    {
        q: "21 * 18 - 19 * 18 + 18 * 17 - 17 * 16 ifodaning qiymatini hisoblang:",
        o: ["20", "34", "36", "38", "40"],
        t: 2 // 36
    },
    {
        q: "(-1.2) * (-0.5) + 0.6 ifodaning qiymatini toping:",
        o: ["1.2", "0", "1.1", "0.6", "1"],
        t: 0 // 1.2
    },
    {
        q: "0.5 * 0.005 * 0.0005 ko'paytmani toping:",
        o: ["1.25*10^-7", "1.25*10^-6", "1.25*10^-8", "0.125*10^-6", "1.25*10^-5"],
        t: 0
    },
    {
        q: "Hisoblang: (1.23 + 1.77) * (1.21 + 1.79)",
        o: ["6", "9", "8.5", "10", "12"],
        t: 1 // 3 * 3 = 9
    },
    {
        q: "Ifodani hisoblang: (0.2 * 0.3 * 0.4) / (0.02 * 0.03 * 0.04)",
        o: ["10", "100", "1000", "10000", "1"],
        t: 2 // 1000
    },
    {
        q: "2.7 * 3.5 + 2.7 * 6.5 ifodaning qiymatini toping:",
        o: ["27", "2.7", "270", "35", "65"],
        t: 0 // 2.7 * 10 = 27
    },
    {
        q: "12.5 * 0.8 + 1.5 * 0.8 yig'indini hisoblang:",
        o: ["10", "11.2", "12", "14", "11"],
        t: 1 // 14 * 0.8 = 11.2
    },
    {
        q: "Qaysi son 15 ga qoldiqsiz bo'linadi?",
        o: ["2345", "3450", "4565", "5675", "1111"],
        t: 1 // 3450 (ham 3 ga, ham 5 ga bo'linadi)
    },
    {
        q: "1 dan 25 gacha bo'lgan natural sonlar yig'indisini toping:",
        o: ["300", "325", "350", "375", "400"],
        t: 1 // (1+25)*25/2 = 325
    },
    {
        q: "24 va 36 sonlarining eng katta umumiy bo'luvchisini (EKUB) toping:",
        o: ["6", "8", "12", "18", "24"],
        t: 2 // 12
    },
    {
        q: "8 va 12 sonlarining eng kichik umumiy karralisini (EKUK) toping:",
        o: ["16", "24", "32", "48", "60"],
        t: 1 // 24
    },
    {
        q: "720 sonining natural bo'luvchilari sonini toping:",
        o: ["24", "30", "36", "40", "48"],
        t: 1 // 30
    },
    {
        q: "Kasrni qisqartiring: 48/72",
        o: ["1/2", "2/3", "3/4", "4/5", "5/6"],
        t: 1 // 2/3
    },
    {
        q: "0.(3) davriy kasrni oddiy kasrga aylantiring:",
        o: ["1/3", "3/10", "3/99", "1/30", "3/1"],
        t: 0 // 3/9 = 1/3
    },
    {
        q: "Proportsiyaning noma'lum hadini toping: 12 : x = 4 : 5",
        o: ["10", "15", "20", "25", "30"],
        t: 1 // x = 12*5/4 = 15
    }
];
