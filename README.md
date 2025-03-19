
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AcademeForge</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #121212;
            color: white;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            position: relative;
        }
        .back-button {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff4081;
            color: white;
            padding: 8px 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.3s ease;
            z-index: 10;
        }
        .back-button:hover {
            background: #e91e63;
        }
        .login-container, .class-container, .stream-container, .subject-container {
            background: #1e1e1e;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0,255,255,0.5);
            text-align: center;
            width: 300px;
            transition: transform 0.3s ease;
        }
        h2 {
            color: #ff4081;
        }
        input, button {
            width: 90%;
            padding: 10px;
            margin: 10px 0;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            outline: none;
        }
        input {
            background: #292929;
            color: white;
        }
        button {
            background: #00e5ff;
            color: black;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        button:hover {
            background: #00bcd4;
        }
        .hidden {
            display: none;
        }
        .class-option, .stream-option {
            margin: 10px;
            padding: 15px;
            background-color: #292929;
            cursor: pointer;
            border-radius: 5px;
            transition: background 0.3s ease;
        }
        .class-option:hover, .stream-option:hover {
            background-color: #00e5ff;
            color: black;
        }
        .subject-card {
            background-color: #292929;
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
            transition: transform 0.3s ease;
        }
        .access-button {
            background: #ff4081;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .access-button:hover {
            background: #e91e63;
        }
    </style>
</head>
<body>

<!-- Back Button -->
<button class="back-button hidden" id="backButton" onclick="goBack()">Back</button>

<!-- Login Page -->
<div class="login-container" id="loginContainer">
    <h2>LOGIN</h2>
    <input type="text" id="username" placeholder="Username" />
    <input type="password" id="password" placeholder="Password" />
    <button onclick="login()">Sign In</button>
</div>

<!-- Class Selection Page -->
<div class="class-container hidden" id="classContainer">
    <h2>Select Your Class</h2>
    <div class="class-option" onclick="selectClass(9)">Class 9</div>
    <div class="class-option" onclick="selectClass(10)">Class 10</div>
    <div class="class-option" onclick="selectClass(11)">Class 11</div>
    <div class="class-option" onclick="selectClass(12)">Class 12</div>
</div>

<!-- Stream Selection Page -->
<div class="stream-container hidden" id="streamContainer">
    <h2>Select Your Stream</h2>
    <div class="stream-option" onclick="selectStream('Science')">Science</div>
    <div class="stream-option" onclick="selectStream('Commerce')">Commerce</div>
    <div class="stream-option" onclick="selectStream('Arts')">Arts</div>
</div>

<!-- Subjects Page -->
<div class="subject-container hidden" id="subjectContainer">
    <h2>Subjects</h2>
    <div id="subjectsList"></div>
</div>

    <script>
    function login() {
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('classContainer').classList.remove('hidden');
        document.getElementById('backButton').classList.remove('hidden');
    }

    function selectClass(classNumber) {
        if (classNumber === 11 || classNumber === 12) {
            document.getElementById('classContainer').classList.add('hidden');
            document.getElementById('streamContainer').classList.remove('hidden');
        } else {
            loadSubjects(classNumber);
        }
    }

    function selectStream(stream) {
        loadSubjects(stream);
    }

    function loadSubjects(selection) {
        document.getElementById('streamContainer').classList.add('hidden');
        document.getElementById('classContainer').classList.add('hidden');
        document.getElementById('subjectContainer').classList.remove('hidden');

        let subjects = [];
        if (selection === 9 || selection === 10) {
            subjects = ["Science", "Math", "Social Science", "English", "Hindi"];
        } else if (selection === "Science") {
            subjects = ["Physics", "Chemistry", "Math", "Biology"];
        } else if (selection === "Commerce") {
            subjects = ["Business Studies", "Accountancy", "Economics"];
        } else if (selection === "Arts") {
            subjects = ["History", "Political Science", "Geography", "Economics", "Psychology"];
        }

        let subjectsList = document.getElementById('subjectsList');
        subjectsList.innerHTML = "";

        subjects.forEach(subject => {
            let card = document.createElement('div');
            card.classList.add('subject-card');

            let title = document.createElement('h3');
            title.innerText = subject;

            let button = document.createElement('button');
            button.classList.add('access-button');
            button.innerText = 'Access to Notes';
            butto

            card.appendChild(title);
            card.appendChild(button);
            subjectsList.appendChild(card);
        });
    } <script>
    // Define subject links for each class and stream
    const subjectLinks = {
        9: {
            "Science": "https://drive.google.com/drive/folders/1-CtgsAx1kXo67-UUf6HsBunPIgm8FgUl",
            "Math": "https://drive.google.com/drive/folders/1-DH3yoNSnF0iFSIH2CsGGf5RobYwYKyp",
            "Social Science": "https://drive.google.com/drive/folders/1-Dm4Tg6UIlYBiNqGYOYAWZvJExikh7my",
            "English": "https://drive.google.com/drive/folders/1-Gd2i8_7ylzy-gM_sFQMGrtDbiE70vRr",
            "Hindi": "https://drive.google.com/drive/folders/1-EHtC6OQMkNE3qEU5JgPggm5I4ggUWf9"
        },
        10: {
            "Science": "https://drive.google.com/drive/folders/1-bVnCZbCabVmNGCxJ0gY4-FP4BwN9F02",
            "Math": "https://drive.google.com/drive/folders/1-Z7LCbOvKhHvMxqXS3W4qVcAukPVmhXK",
            "Social Science": "https://drive.google.com/drive/folders/1-c9q3sV8BCZjtch0WqWnXnJWSE1il5uS",
            "English": "https://drive.google.com/drive/folders/1-VKypMW3rybYR_0dPrro1JscD8eGtj9u",
            "Hindi": "https://drive.google.com/drive/folders/1-Ud6Gv65aE25yPcul3cbprGvXZrXX2O0"
        },
        "Science": {
            11: {
                "Physics": "https://drive.google.com/drive/folders/100rYQz_YiMNnT7zK_dxW-t8PUYj7GABP",
                "Chemistry": "https://drive.google.com/drive/folders/1-lL_2Z5_4cvklYRMSv2vTWorip9w-RWx",
                "Math": "https://drive.google.com/drive/folders/1-yiJhKx6TVLZQ9DlHyvQLZli8N8Qd6TB",
                "Biology": "https://drive.google.com/drive/folders/1-lL_2Z5_4cvklYRMSv2vTWorip9w-RWx",
                "Computer Science": "#" // Add actual link if available
            },
            12: {
                "Physics": "#", 
                "Chemistry": "#", 
                "Math": "#", 
                "Biology": "#", 
                "Computer Science": "#"
            }
        },
        "Commerce": {
            11: {
                "Business Studies": "https://drive.google.com/drive/folders/114ncGbXaaDS_Uq_jFZ6S8XvUPxGqUomy",
                "Accountancy": "https://drive.google.com/drive/folders/1133qJ8A91II5MwG9dJMeyQxgF88GEJe6",
                "Economics": "https://drive.google.com/drive/folders/10zTfWiTZEjnip9jQ4_NQ5D-iKdgC2I8z",
                "Math": "#"
            },
            12: {
                "Business Studies": "#", 
                "Accountancy": "#", 
                "Economics": "#", 
                "Math": "#"
            }
        },
        "Arts": {
            11: {
                "History": "https://drive.google.com/drive/folders/11gfrxRKkwZg9yEREvyS06N6zNGH4QFRi",
                "Political Science": "https://drive.google.com/drive/folders/11c9BDCtzO6OjZumMYlXhklSfwJud5D9z",
                "Geography": "https://drive.google.com/drive/folders/11XmaUWcoB2JPes05FONuxLtFbDIfSln0",
                "Economics": "https://drive.google.com/drive/folders/11jMqr1owMcbXsVci7CgYbyyfWrb3zgtd",
                "Psychology": "https://drive.google.com/drive/folders/11Y7G9_79zt197nQFMYgKpsKcAb99Ge7c"
            },
            12: {
                "History": "#", 
                "Political Science": "#", 
                "Geography": "#", 
                "Economics": "#", 
                "Psychology": "#"
            }
        }
    };

    let selectedClass = null;
    let selectedStream = null;

    function login() {
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('classContainer').classList.remove('hidden');
        document.getElementById('backButton').classList.remove('hidden');
    }

    function selectClass(classNumber) {
        selectedClass = classNumber;
        if (classNumber === 11 || classNumber === 12) {
            document.getElementById('classContainer').classList.add('hidden');
            document.getElementById('streamContainer').classList.remove('hidden');
        } else {
            loadSubjects(classNumber);
        }
    }

    function selectStream(stream) {
        selectedStream = stream;
        loadSubjects(stream);
    }

    function loadSubjects(selection) {
        document.getElementById('streamContainer').classList.add('hidden');
        document.getElementById('subjectContainer').classList.remove('hidden');

        let subjects = [];
        if (selection === 9 || selection === 10) {
            subjects = Object.keys(subjectLinks[selection]);
        } else if (selection === "Science" || selection === "Commerce" || selection === "Arts") {
            subjects = Object.keys(subjectLinks[selection][selectedClass]);
        }

        let subjectsList = document.getElementById('subjectsList');
        subjectsList.innerHTML = "";

        subjects.forEach(subject => {
            let card = document.createElement('div');
            card.classList.add('subject-card');

            let title = document.createElement('h3');
            title.innerText = subject;

            let button = document.createElement('button');
            button.classList.add('access-button');
            button.innerText = 'Access to Notes';

            // Link based on class and stream
            button.onclick = () => {
                let link = (selection === "Science" || selection === "Commerce" || selection === "Arts") 
                    ? subjectLinks[selection][selectedClass][subject] 
                    : subjectLinks[selection][subject];

                if (link !== "#") {
                    window.open(link, '_blank');
                } else {
                    alert('No link available for this subject.');
                }
            };

            card.appendChild(title);
            card.appendChild(button);
            subjectsList.appendChild(card);
        });
    }

    function goBack() {
        document.getElementById('subjectContainer').classList.add('hidden');
        document.getElementById('streamContainer').classList.add('hidden');
        document.getElementById('classContainer').classList.remove('hidden');
    }
</script>

    function goBack() {
        document.getElementById('subjectContainer').classList.add('hidden');
        document.getElementById('streamContainer').classList.add('hidden');     document.getElementById('classContainer').classList.remove('hidden');
    }
</script>