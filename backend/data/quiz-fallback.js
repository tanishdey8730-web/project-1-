window.QUIZ_FALLBACK={
  "title": "Learn with Game",
  "description": "Test your knowledge with fun quizzes — Government exams (Maths, Physics, Chemistry, GS & Current Affairs) and IT placement prep (DSA, Python, Aptitude, TCS NQT & more).",
  "categories": [
    {
      "id": "government",
      "name": "Government Exams",
      "icon": "🏛️",
      "subjects": [
        "maths",
        "physics",
        "chemistry",
        "general-studies"
      ]
    },
    {
      "id": "it-tech",
      "name": "IT & Engineering Placements",
      "icon": "💻",
      "subjects": [
        "aptitude",
        "dsa",
        "python",
        "fullstack",
        "hr-interview",
        "tcs-nqt"
      ]
    }
  ],
  "subjects": [
    {
      "id": "maths",
      "name": "Mathematics",
      "icon": "📐",
      "color": "#2b6ef4",
      "category": "government"
    },
    {
      "id": "physics",
      "name": "Physics",
      "icon": "⚛️",
      "color": "#8b5cf6",
      "category": "government"
    },
    {
      "id": "chemistry",
      "name": "Chemistry",
      "icon": "🧪",
      "color": "#22a36a",
      "category": "government"
    },
    {
      "id": "general-studies",
      "name": "General Studies & Current Affairs",
      "icon": "📰",
      "color": "#d97706",
      "category": "government"
    },
    {
      "id": "aptitude",
      "name": "Aptitude",
      "icon": "🧠",
      "color": "#f59e0b",
      "category": "it-tech"
    },
    {
      "id": "dsa",
      "name": "DSA",
      "icon": "💻",
      "color": "#6366f1",
      "category": "it-tech"
    },
    {
      "id": "python",
      "name": "Python",
      "icon": "🐍",
      "color": "#3776ab",
      "category": "it-tech"
    },
    {
      "id": "fullstack",
      "name": "Full Stack",
      "icon": "🌐",
      "color": "#06b6d4",
      "category": "it-tech"
    },
    {
      "id": "hr-interview",
      "name": "HR Interview",
      "icon": "🤝",
      "color": "#ec4899",
      "category": "it-tech"
    },
    {
      "id": "tcs-nqt",
      "name": "TCS NQT",
      "icon": "🏢",
      "color": "#dc2626",
      "category": "it-tech"
    }
  ],
  "questionsPerQuiz": 10,
  "ranks": [
    {
      "id": "gold",
      "minPercent": 90,
      "medal": "gold",
      "label": "Gold",
      "title": "Perfect Learner",
      "emoji": "🏆",
      "remark": "Outstanding! You have mastered this subject. You are a Perfect Learner — exam-ready confidence!"
    },
    {
      "id": "silver",
      "minPercent": 75,
      "medal": "silver",
      "label": "Silver",
      "title": "Good Learner",
      "emoji": "⭐",
      "remark": "Excellent work! You are a Good Learner with strong fundamentals. A little more practice and you will reach Gold!"
    },
    {
      "id": "bronze",
      "minPercent": 60,
      "medal": "bronze",
      "label": "Bronze",
      "title": "Promising Learner",
      "emoji": "📚",
      "remark": "Good effort! You are building a solid base. Review the topics you missed and try again to climb to Silver or Gold."
    },
    {
      "id": "none",
      "minPercent": 0,
      "medal": "none",
      "label": "Practice More",
      "title": "Keep Learning",
      "emoji": "💪",
      "remark": "Don't give up! Every attempt makes you stronger. Watch the video lessons and try the quiz again — you can do it!"
    }
  ],
  "quizzes": {
    "maths": [
      {
        "id": "m1",
        "question": "What is 25% of 480?",
        "options": [
          "100",
          "120",
          "125",
          "150"
        ],
        "correct": 1,
        "explanation": "25% of 480 = 480 × 25/100 = 120"
      },
      {
        "id": "m2",
        "question": "If sin 30° = 0.5, what is cos 60°?",
        "options": [
          "0",
          "0.5",
          "0.866",
          "1"
        ],
        "correct": 1,
        "explanation": "cos 60° = sin 30° = 0.5 (complementary angles)"
      },
      {
        "id": "m3",
        "question": "A train 120 m long passes a pole in 6 seconds. Speed of train (km/h)?",
        "options": [
          "60",
          "72",
          "80",
          "90"
        ],
        "correct": 1,
        "explanation": "Speed = 120/6 = 20 m/s = 20 × 18/5 = 72 km/h"
      },
      {
        "id": "m4",
        "question": "Simple interest on ₹5000 at 10% for 2 years is:",
        "options": [
          "₹500",
          "₹1000",
          "₹1500",
          "₹2000"
        ],
        "correct": 1,
        "explanation": "SI = P×R×T/100 = 5000×10×2/100 = ₹1000"
      },
      {
        "id": "m5",
        "question": "HCF of 24 and 36 is:",
        "options": [
          "6",
          "8",
          "12",
          "18"
        ],
        "correct": 2,
        "explanation": "24 = 2³×3, 36 = 2²×3². HCF = 2²×3 = 12"
      },
      {
        "id": "m6",
        "question": "Area of a circle with radius 7 cm (π = 22/7):",
        "options": [
          "144 cm²",
          "154 cm²",
          "164 cm²",
          "176 cm²"
        ],
        "correct": 1,
        "explanation": "Area = πr² = (22/7)×7×7 = 154 cm²"
      },
      {
        "id": "m7",
        "question": "If A:B = 3:4 and B:C = 8:9, then A:C is:",
        "options": [
          "2:3",
          "3:4",
          "6:9",
          "8:9"
        ],
        "correct": 0,
        "explanation": "A:B = 3:4 = 6:8, B:C = 8:9 → A:C = 6:9 = 2:3"
      },
      {
        "id": "m8",
        "question": "Average of first 10 natural numbers is:",
        "options": [
          "5",
          "5.5",
          "10",
          "11"
        ],
        "correct": 1,
        "explanation": "Average = (1+2+...+10)/10 = 55/10 = 5.5"
      },
      {
        "id": "m9",
        "question": "A shopkeeper sells at 20% profit. CP is ₹250. SP is:",
        "options": [
          "₹275",
          "₹300",
          "₹325",
          "₹350"
        ],
        "correct": 1,
        "explanation": "SP = CP + 20% of CP = 250 + 50 = ₹300"
      },
      {
        "id": "m10",
        "question": "Value of √144 + √169 is:",
        "options": [
          "23",
          "25",
          "27",
          "29"
        ],
        "correct": 1,
        "explanation": "√144 = 12, √169 = 13. Sum = 25"
      }
    ],
    "physics": [
      {
        "id": "p1",
        "question": "SI unit of force is:",
        "options": [
          "Joule",
          "Newton",
          "Watt",
          "Pascal"
        ],
        "correct": 1,
        "explanation": "Force is measured in Newton (N) in SI system."
      },
      {
        "id": "p2",
        "question": "Speed of light in vacuum is approximately:",
        "options": [
          "3×10⁶ m/s",
          "3×10⁸ m/s",
          "3×10¹⁰ m/s",
          "3×10¹² m/s"
        ],
        "correct": 1,
        "explanation": "Speed of light c ≈ 3 × 10⁸ m/s in vacuum."
      },
      {
        "id": "p3",
        "question": "Which law states F = ma?",
        "options": [
          "Newton's 1st Law",
          "Newton's 2nd Law",
          "Newton's 3rd Law",
          "Law of Gravitation"
        ],
        "correct": 1,
        "explanation": "Newton's Second Law: Force = mass × acceleration."
      },
      {
        "id": "p4",
        "question": "Unit of electric current is:",
        "options": [
          "Volt",
          "Ohm",
          "Ampere",
          "Coulomb"
        ],
        "correct": 2,
        "explanation": "Electric current is measured in Ampere (A)."
      },
      {
        "id": "p5",
        "question": "Boiling point of water at 1 atm is:",
        "options": [
          "90°C",
          "100°C",
          "110°C",
          "120°C"
        ],
        "correct": 1,
        "explanation": "At standard atmospheric pressure, water boils at 100°C."
      },
      {
        "id": "p6",
        "question": "Lens used to correct myopia (short-sightedness) is:",
        "options": [
          "Convex",
          "Concave",
          "Cylindrical",
          "Bifocal"
        ],
        "correct": 1,
        "explanation": "Concave (diverging) lens is used to correct myopia."
      },
      {
        "id": "p7",
        "question": "Work done is zero when force and displacement are:",
        "options": [
          "Parallel",
          "Perpendicular",
          "Opposite",
          "Equal"
        ],
        "correct": 1,
        "explanation": "W = Fd cos θ. When θ = 90°, cos 90° = 0, so work = 0."
      },
      {
        "id": "p8",
        "question": "Sound cannot travel through:",
        "options": [
          "Air",
          "Water",
          "Steel",
          "Vacuum"
        ],
        "correct": 3,
        "explanation": "Sound needs a medium; it cannot travel through vacuum."
      },
      {
        "id": "p9",
        "question": "1 horsepower is approximately equal to:",
        "options": [
          "746 W",
          "1000 W",
          "550 W",
          "330 W"
        ],
        "correct": 0,
        "explanation": "1 HP ≈ 746 watts (746 J/s)."
      },
      {
        "id": "p10",
        "question": "Rainbow is formed due to:",
        "options": [
          "Reflection only",
          "Refraction and dispersion",
          "Diffraction",
          "Interference"
        ],
        "correct": 1,
        "explanation": "Rainbow forms due to refraction, internal reflection and dispersion of sunlight in water droplets."
      }
    ],
    "chemistry": [
      {
        "id": "c1",
        "question": "Atomic number of Carbon is:",
        "options": [
          "4",
          "6",
          "8",
          "12"
        ],
        "correct": 1,
        "explanation": "Carbon has 6 protons, so atomic number Z = 6."
      },
      {
        "id": "c2",
        "question": "pH of pure water at 25°C is:",
        "options": [
          "0",
          "7",
          "14",
          "1"
        ],
        "correct": 1,
        "explanation": "Pure water is neutral with pH = 7 at 25°C."
      },
      {
        "id": "c3",
        "question": "Chemical formula of common salt is:",
        "options": [
          "NaCl",
          "KCl",
          "CaCl₂",
          "MgCl₂"
        ],
        "correct": 0,
        "explanation": "Common table salt is Sodium Chloride (NaCl)."
      },
      {
        "id": "c4",
        "question": "Which gas is released during photosynthesis?",
        "options": [
          "CO₂",
          "N₂",
          "O₂",
          "H₂"
        ],
        "correct": 2,
        "explanation": "Plants release oxygen (O₂) during photosynthesis."
      },
      {
        "id": "c5",
        "question": "Most abundant gas in Earth's atmosphere is:",
        "options": [
          "Oxygen",
          "Carbon dioxide",
          "Nitrogen",
          "Argon"
        ],
        "correct": 2,
        "explanation": "Nitrogen (N₂) makes up about 78% of the atmosphere."
      },
      {
        "id": "c6",
        "question": "Gold is a:",
        "options": [
          "Metal",
          "Non-metal",
          "Metalloid",
          "Gas"
        ],
        "correct": 0,
        "explanation": "Gold (Au) is a precious metal, malleable and ductile."
      },
      {
        "id": "c7",
        "question": "Rusting of iron is an example of:",
        "options": [
          "Physical change",
          "Oxidation",
          "Reduction",
          "Sublimation"
        ],
        "correct": 1,
        "explanation": "Rusting is oxidation of iron in presence of moisture and oxygen."
      },
      {
        "id": "c8",
        "question": "Molecular formula of water is:",
        "options": [
          "HO",
          "H₂O",
          "H₂O₂",
          "OH"
        ],
        "correct": 1,
        "explanation": "Water molecule consists of 2 hydrogen and 1 oxygen atom: H₂O."
      },
      {
        "id": "c9",
        "question": "Which acid is found in vinegar?",
        "options": [
          "Sulphuric acid",
          "Nitric acid",
          "Acetic acid",
          "Hydrochloric acid"
        ],
        "correct": 2,
        "explanation": "Vinegar contains acetic acid (CH₃COOH), typically 4–8%."
      },
      {
        "id": "c10",
        "question": "Avogadro number is approximately:",
        "options": [
          "6.022 × 10²³",
          "3.14 × 10²³",
          "9.8 × 10²³",
          "1.6 × 10⁻¹⁹"
        ],
        "correct": 0,
        "explanation": "Avogadro's number ≈ 6.022 × 10²³ particles per mole."
      }
    ],
    "aptitude": [
      {
        "id": "a1",
        "question": "If 20% of a number is 40, the number is:",
        "options": [
          "100",
          "150",
          "200",
          "250"
        ],
        "correct": 2,
        "explanation": "20% of x = 40 → x = 40 × 100/20 = 200"
      },
      {
        "id": "a2",
        "question": "A can do a work in 10 days, B in 15 days. Together they finish in:",
        "options": [
          "5 days",
          "6 days",
          "7 days",
          "8 days"
        ],
        "correct": 1,
        "explanation": "Combined rate = 1/10 + 1/15 = 1/6. Time = 6 days"
      },
      {
        "id": "a3",
        "question": "Find the next number: 2, 6, 12, 20, 30, ?",
        "options": [
          "38",
          "40",
          "42",
          "44"
        ],
        "correct": 2,
        "explanation": "Differences: +4, +6, +8, +10 → next +12. 30+12=42"
      },
      {
        "id": "a4",
        "question": "Ratio of ages of A and B is 3:5. If sum is 48, age of B is:",
        "options": [
          "18",
          "24",
          "30",
          "36"
        ],
        "correct": 2,
        "explanation": "3k+5k=48 → k=6. B = 5×6 = 30"
      },
      {
        "id": "a5",
        "question": "A shopkeeper gives 10% discount on MP ₹500. SP is:",
        "options": [
          "₹450",
          "₹460",
          "₹470",
          "₹480"
        ],
        "correct": 0,
        "explanation": "SP = 500 - 10% of 500 = 500 - 50 = ₹450"
      },
      {
        "id": "a6",
        "question": "Speed 60 km/h in m/s is:",
        "options": [
          "12",
          "15",
          "16.67",
          "18"
        ],
        "correct": 2,
        "explanation": "60 × 1000/3600 = 600/36 ≈ 16.67 m/s"
      },
      {
        "id": "a7",
        "question": "Average of 5 numbers is 20. Sum is:",
        "options": [
          "80",
          "100",
          "120",
          "140"
        ],
        "correct": 1,
        "explanation": "Sum = average × count = 20 × 5 = 100"
      },
      {
        "id": "a8",
        "question": "If A:B = 2:3 and B:C = 4:5, then A:C is:",
        "options": [
          "8:15",
          "2:5",
          "3:5",
          "4:5"
        ],
        "correct": 0,
        "explanation": "A:B = 8:12, B:C = 12:15 → A:C = 8:15"
      },
      {
        "id": "a9",
        "question": "Simple interest on ₹2000 at 5% for 3 years:",
        "options": [
          "₹200",
          "₹250",
          "₹300",
          "₹350"
        ],
        "correct": 2,
        "explanation": "SI = 2000×5×3/100 = ₹300"
      },
      {
        "id": "a10",
        "question": "A clock shows 3:15. Angle between hands is:",
        "options": [
          "0°",
          "7.5°",
          "15°",
          "30°"
        ],
        "correct": 1,
        "explanation": "At 3:15, angle ≈ 7.5° (standard clock problem)"
      }
    ],
    "dsa": [
      {
        "id": "d1",
        "question": "Time complexity of binary search on sorted array:",
        "options": [
          "O(n)",
          "O(log n)",
          "O(n log n)",
          "O(1)"
        ],
        "correct": 1,
        "explanation": "Binary search halves search space each step → O(log n)"
      },
      {
        "id": "d2",
        "question": "Which data structure uses LIFO?",
        "options": [
          "Queue",
          "Stack",
          "Tree",
          "Graph"
        ],
        "correct": 1,
        "explanation": "Stack follows Last In First Out (LIFO) principle"
      },
      {
        "id": "d3",
        "question": "Worst-case time complexity of Quick Sort:",
        "options": [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(log n)"
        ],
        "correct": 2,
        "explanation": "Quick Sort worst case O(n²) when pivot is always min/max"
      },
      {
        "id": "d4",
        "question": "BFS uses which data structure?",
        "options": [
          "Stack",
          "Queue",
          "Heap",
          "Set"
        ],
        "correct": 1,
        "explanation": "Breadth-First Search uses a Queue"
      },
      {
        "id": "d5",
        "question": "In a binary tree, max nodes at level L (root=0) is:",
        "options": [
          "L",
          "2L",
          "2^L",
          "L²"
        ],
        "correct": 2,
        "explanation": "Level L can have at most 2^L nodes in a full binary tree"
      },
      {
        "id": "d6",
        "question": "Hash table average search time (good hash):",
        "options": [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n²)"
        ],
        "correct": 0,
        "explanation": "Average case O(1) for insert/search/delete with good hash function"
      },
      {
        "id": "d7",
        "question": "Which is NOT a linear data structure?",
        "options": [
          "Array",
          "Linked List",
          "Tree",
          "Stack"
        ],
        "correct": 2,
        "explanation": "Tree is hierarchical/non-linear; others are linear"
      },
      {
        "id": "d8",
        "question": "Merge Sort time complexity:",
        "options": [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(log n)"
        ],
        "correct": 1,
        "explanation": "Merge Sort always runs in O(n log n)"
      },
      {
        "id": "d9",
        "question": "Dynamic Programming is used when problem has:",
        "options": [
          "Greedy choice",
          "Overlapping subproblems",
          "No optimal substructure",
          "Only recursion"
        ],
        "correct": 1,
        "explanation": "DP requires overlapping subproblems and optimal substructure"
      },
      {
        "id": "d10",
        "question": "Space complexity of iterative Fibonacci (two variables):",
        "options": [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(n²)"
        ],
        "correct": 0,
        "explanation": "Iterative Fibonacci with two variables uses O(1) extra space"
      }
    ],
    "python": [
      {
        "id": "py1",
        "question": "Which is mutable in Python?",
        "options": [
          "Tuple",
          "String",
          "List",
          "Integer"
        ],
        "correct": 2,
        "explanation": "Lists are mutable; tuples and strings are immutable"
      },
      {
        "id": "py2",
        "question": "Output of: print(2 ** 3)",
        "options": [
          "6",
          "8",
          "9",
          "5"
        ],
        "correct": 1,
        "explanation": "2 ** 3 = 2³ = 8"
      },
      {
        "id": "py3",
        "question": "Which keyword defines a function in Python?",
        "options": [
          "func",
          "def",
          "function",
          "define"
        ],
        "correct": 1,
        "explanation": "Python functions are defined with the def keyword"
      },
      {
        "id": "py4",
        "question": "len([1, 2, [3, 4]]) equals:",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "correct": 1,
        "explanation": "List has 3 top-level elements: 1, 2, and [3,4]"
      },
      {
        "id": "py5",
        "question": "Which creates an empty dictionary?",
        "options": [
          "[]",
          "()",
          "{}",
          "set()"
        ],
        "correct": 2,
        "explanation": "{} creates an empty dict; [] is list, () is tuple"
      },
      {
        "id": "py6",
        "question": "List comprehension: [x*2 for x in range(3)] gives:",
        "options": [
          "[0,2,4]",
          "[2,4,6]",
          "[1,2,3]",
          "[0,1,2]"
        ],
        "correct": 0,
        "explanation": "x = 0,1,2 → x*2 = 0,2,4"
      },
      {
        "id": "py7",
        "question": "Which is used to handle exceptions?",
        "options": [
          "try/except",
          "if/else",
          "for/while",
          "import"
        ],
        "correct": 0,
        "explanation": "try/except blocks handle exceptions in Python"
      },
      {
        "id": "py8",
        "question": "Type of None in Python:",
        "options": [
          "null",
          "NoneType",
          "void",
          "empty"
        ],
        "correct": 1,
        "explanation": "None is of type NoneType"
      },
      {
        "id": "py9",
        "question": "Which method adds item to end of list?",
        "options": [
          "add()",
          "append()",
          "insert()",
          "push()"
        ],
        "correct": 1,
        "explanation": "list.append(x) adds x to the end of the list"
      },
      {
        "id": "py10",
        "question": "Output of 'hello'[1:4]:",
        "options": [
          "hel",
          "ell",
          "ello",
          "h"
        ],
        "correct": 1,
        "explanation": "Slicing [1:4] gives indices 1,2,3 → 'ell'"
      }
    ],
    "fullstack": [
      {
        "id": "fs1",
        "question": "HTML stands for:",
        "options": [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Mark Language",
          "Home Tool Markup Language"
        ],
        "correct": 0,
        "explanation": "HTML = Hyper Text Markup Language"
      },
      {
        "id": "fs2",
        "question": "Which CSS property changes text color?",
        "options": [
          "font-color",
          "text-color",
          "color",
          "foreground"
        ],
        "correct": 2,
        "explanation": "The color property sets text color in CSS"
      },
      {
        "id": "fs3",
        "question": "JavaScript runs primarily on:",
        "options": [
          "Server only",
          "Browser & Node.js",
          "Database only",
          "Compiler only"
        ],
        "correct": 1,
        "explanation": "JS runs in browsers and on server via Node.js"
      },
      {
        "id": "fs4",
        "question": "React is a:",
        "options": [
          "Database",
          "JavaScript library for UI",
          "Backend framework",
          "Operating system"
        ],
        "correct": 1,
        "explanation": "React is a JavaScript library for building user interfaces"
      },
      {
        "id": "fs5",
        "question": "HTTP status code 404 means:",
        "options": [
          "OK",
          "Server Error",
          "Not Found",
          "Unauthorized"
        ],
        "correct": 2,
        "explanation": "404 Not Found — requested resource doesn't exist"
      },
      {
        "id": "fs6",
        "question": "Which is a NoSQL database?",
        "options": [
          "MySQL",
          "PostgreSQL",
          "MongoDB",
          "SQLite"
        ],
        "correct": 2,
        "explanation": "MongoDB is a popular NoSQL document database"
      },
      {
        "id": "fs7",
        "question": "REST API typically uses HTTP method for reading data:",
        "options": [
          "POST",
          "GET",
          "DELETE",
          "PATCH"
        ],
        "correct": 1,
        "explanation": "GET retrieves/read resources in REST APIs"
      },
      {
        "id": "fs8",
        "question": "npm is package manager for:",
        "options": [
          "Python",
          "Java",
          "Node.js",
          "PHP"
        ],
        "correct": 2,
        "explanation": "npm (Node Package Manager) is for Node.js/JavaScript"
      },
      {
        "id": "fs9",
        "question": "Git command to clone a repository:",
        "options": [
          "git copy",
          "git clone",
          "git pull origin",
          "git download"
        ],
        "correct": 1,
        "explanation": "git clone <url> copies a remote repository locally"
      },
      {
        "id": "fs10",
        "question": "MERN stack includes:",
        "options": [
          "MySQL, Express, React, Node",
          "MongoDB, Express, React, Node",
          "MongoDB, Ember, Ruby, Node",
          "MariaDB, Express, Redux, Node"
        ],
        "correct": 1,
        "explanation": "MERN = MongoDB, Express, React, Node.js"
      }
    ],
    "hr-interview": [
      {
        "id": "hr1",
        "question": "Best way to start 'Tell me about yourself':",
        "options": [
          "Personal life story",
          "Present role + relevant skills + goal",
          "Salary expectations",
          "Company history"
        ],
        "correct": 1,
        "explanation": "Use present-past-future format focused on career relevance"
      },
      {
        "id": "hr2",
        "question": "When asked about weakness, you should:",
        "options": [
          "Say you have none",
          "Give honest weakness + improvement steps",
          "Blame others",
          "Refuse to answer"
        ],
        "correct": 1,
        "explanation": "Show self-awareness and how you're working to improve"
      },
      {
        "id": "hr3",
        "question": "STAR method stands for:",
        "options": [
          "Start, Task, Action, Result",
          "Situation, Task, Action, Result",
          "Story, Time, Action, Review",
          "Skill, Team, Aim, Result"
        ],
        "correct": 1,
        "explanation": "STAR = Situation, Task, Action, Result for behavioral answers"
      },
      {
        "id": "hr4",
        "question": "Why do you want to join our company — best approach:",
        "options": [
          "For salary only",
          "Research company + align your skills",
          "Any job is fine",
          "My friend works here"
        ],
        "correct": 1,
        "explanation": "Show you've researched the company and fit the role"
      },
      {
        "id": "hr5",
        "question": "Where do you see yourself in 5 years:",
        "options": [
          "CEO immediately",
          "Realistic growth aligned with company",
          "Don't know",
          "Retired"
        ],
        "correct": 1,
        "explanation": "Show ambition aligned with realistic career progression"
      },
      {
        "id": "hr6",
        "question": "If you disagree with a teammate, you should:",
        "options": [
          "Argue loudly",
          "Listen, discuss professionally, find solution",
          "Ignore them",
          "Report immediately"
        ],
        "correct": 1,
        "explanation": "Show teamwork and conflict resolution skills"
      },
      {
        "id": "hr7",
        "question": "Questions to ask interviewer at end:",
        "options": [
          "Nothing",
          "About team, role growth, projects",
          "Only about leaves",
          "When is salary credited"
        ],
        "correct": 1,
        "explanation": "Ask thoughtful questions about role, team, and growth"
      },
      {
        "id": "hr8",
        "question": "Body language tip for interview:",
        "options": [
          "Avoid eye contact",
          "Maintain eye contact & good posture",
          "Slouch in chair",
          "Look at phone"
        ],
        "correct": 1,
        "explanation": "Confident posture and eye contact show professionalism"
      },
      {
        "id": "hr9",
        "question": "Handling 'Why should we hire you':",
        "options": [
          "I'm desperate",
          "Highlight unique skills matching job requirements",
          "I'm cheaper",
          "I need experience"
        ],
        "correct": 1,
        "explanation": "Connect your strengths directly to what the role needs"
      },
      {
        "id": "hr10",
        "question": "After interview, you should:",
        "options": [
          "Do nothing",
          "Send a thank-you email within 24 hours",
          "Call 10 times",
          "Post complaints online"
        ],
        "correct": 1,
        "explanation": "A brief thank-you email shows professionalism and interest"
      }
    ],
    "tcs-nqt": [
      {
        "id": "t1",
        "question": "TCS NQT has how many main sections (typical pattern)?",
        "options": [
          "2",
          "3",
          "4-5",
          "1"
        ],
        "correct": 2,
        "explanation": "Typically: Foundation/Numerical, Advanced, Coding, etc."
      },
      {
        "id": "t2",
        "question": "TCS NQT coding section often tests:",
        "options": [
          "Only HTML",
          "Programming logic & basic coding",
          "Only SQL",
          "Only HR"
        ],
        "correct": 1,
        "explanation": "Coding section tests logic, loops, conditions, arrays"
      },
      {
        "id": "t3",
        "question": "For TCS NQT, negative marking usually applies to:",
        "options": [
          "All sections always",
          "MCQ sections (varies by year)",
          "Never",
          "Only HR"
        ],
        "correct": 1,
        "explanation": "Check current year pattern; MCQs often have negative marking"
      },
      {
        "id": "t4",
        "question": "Best prep for TCS NQT quant:",
        "options": [
          "Only coding",
          "Percentage, ratio, time-work, series",
          "Only English",
          "Skip aptitude"
        ],
        "correct": 1,
        "explanation": "Quant covers standard aptitude topics heavily"
      },
      {
        "id": "t5",
        "question": "TCS NQT advanced section may include:",
        "options": [
          "Only GK",
          "Advanced quant & reasoning",
          "Only drawing",
          "Sports"
        ],
        "correct": 1,
        "explanation": "Advanced section has harder aptitude and reasoning"
      },
      {
        "id": "t6",
        "question": "Programming logic questions test:",
        "options": [
          "Memorizing syntax only",
          "Flow charts, pseudocode, output prediction",
          "Typing speed",
          "Hardware"
        ],
        "correct": 1,
        "explanation": "Logic section tests understanding of program flow without full IDE"
      },
      {
        "id": "t7",
        "question": "Minimum qualification for TCS NQT (general):",
        "options": [
          "10th pass",
          "Graduation / final year engineering",
          "PhD only",
          "No qualification"
        ],
        "correct": 1,
        "explanation": "TCS NQT targets graduates and final-year students"
      },
      {
        "id": "t8",
        "question": "Time management in TCS NQT means:",
        "options": [
          "Spend all time on one question",
          "Attempt easy questions first, skip hard ones",
          "Leave exam early",
          "Random guessing only"
        ],
        "correct": 1,
        "explanation": "Smart time allocation is key in timed aptitude tests"
      },
      {
        "id": "t9",
        "question": "TCS NQT communication section tests:",
        "options": [
          "Only coding",
          "English grammar, comprehension",
          "Only math",
          "Physical fitness"
        ],
        "correct": 1,
        "explanation": "Communication/Verbal ability is part of foundation section"
      },
      {
        "id": "t10",
        "question": "After clearing TCS NQT, next step is usually:",
        "options": [
          "Direct CEO",
          "Technical/Managerial interview rounds",
          "No further rounds",
          "Only document verification"
        ],
        "correct": 1,
        "explanation": "NQT is followed by interview rounds for final selection"
      }
    ],
    "general-studies": [
      {
        "id": "gs1",
        "question": "Who is known as the Father of the Indian Constitution?",
        "options": [
          "Mahatma Gandhi",
          "Dr. B.R. Ambedkar",
          "Jawaharlal Nehru",
          "Dr. Rajendra Prasad"
        ],
        "correct": 1,
        "explanation": "Dr. B.R. Ambedkar chaired the Drafting Committee of the Constitution."
      },
      {
        "id": "gs2",
        "question": "The Indian Constitution was adopted on:",
        "options": [
          "15 August 1947",
          "26 January 1950",
          "26 November 1949",
          "1 January 1950"
        ],
        "correct": 2,
        "explanation": "Constitution was adopted on 26 Nov 1949; came into force on 26 Jan 1950."
      },
      {
        "id": "gs3",
        "question": "Which article of the Indian Constitution deals with Fundamental Rights?",
        "options": [
          "Article 12–35",
          "Article 36–51",
          "Article 52–78",
          "Article 79–122"
        ],
        "correct": 0,
        "explanation": "Part III (Articles 12–35) contains Fundamental Rights."
      },
      {
        "id": "gs4",
        "question": "Headquarters of the Reserve Bank of India (RBI) is in:",
        "options": [
          "New Delhi",
          "Mumbai",
          "Kolkata",
          "Chennai"
        ],
        "correct": 1,
        "explanation": "RBI headquarters is in Mumbai."
      },
      {
        "id": "gs5",
        "question": "GST (Goods and Services Tax) was implemented in India from:",
        "options": [
          "1 July 2016",
          "1 July 2017",
          "1 April 2017",
          "26 January 2017"
        ],
        "correct": 1,
        "explanation": "GST was rolled out nationwide on 1 July 2017."
      },
      {
        "id": "gs6",
        "question": "Which organ of the UN is responsible for maintaining international peace?",
        "options": [
          "General Assembly",
          "Security Council",
          "ECOSOC",
          "International Court of Justice"
        ],
        "correct": 1,
        "explanation": "The UN Security Council has primary responsibility for peace and security."
      },
      {
        "id": "gs7",
        "question": "The Green Revolution in India is mainly associated with:",
        "options": [
          "Milk production",
          "Food grain / wheat production",
          "Cotton production",
          "Tea production"
        ],
        "correct": 1,
        "explanation": "Green Revolution boosted high-yield wheat and rice production in the 1960s–70s."
      },
      {
        "id": "gs8",
        "question": "Panchayati Raj was constitutionalized by which amendment?",
        "options": [
          "42nd Amendment",
          "44th Amendment",
          "73rd Amendment",
          "86th Amendment"
        ],
        "correct": 2,
        "explanation": "73rd Amendment (1992) gave constitutional status to Panchayati Raj."
      },
      {
        "id": "gs9",
        "question": "Which river is known as the 'Sorrow of Bihar'?",
        "options": [
          "Ganga",
          "Kosi",
          "Yamuna",
          "Son"
        ],
        "correct": 1,
        "explanation": "Kosi causes frequent floods in Bihar, hence the nickname."
      },
      {
        "id": "gs10",
        "question": "For competitive exams, staying updated on current affairs means:",
        "options": [
          "Only sports news",
          "National/international news, schemes, appointments & reports",
          "Only Bollywood news",
          "Only state news"
        ],
        "correct": 1,
        "explanation": "GS & current affairs cover government schemes, appointments, summits, reports and major national/international events."
      }
    ]
  }
};