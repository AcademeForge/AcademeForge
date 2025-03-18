<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AcademeForge</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            padding: 20px;
        }
        #container {
            max-width: 500px;
            margin: auto;
            background: white;
            padding: 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        input, button, select {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
        button {
            background-color: #007BFF;
            color: white;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        #subjectList img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }
        .hidden {
            display: none;
        }
    </style>
</head>
<body>

    <div id="container">
        <h2>Login</h2>
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <button onclick="login()">Sign In</button>
    </div>

    <div id="classSelection" class="hidden">
        <h2>Select Your Class</h2>
        <select id="classSelect" onchange="selectClass()">
            <option value="">--Select Class--</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
        </select>
    </div>

    <div id="streamSelection" class="hidden">
        <h2>Select Your Stream</h2>
        <select id="streamSelect" onchange="selectStream()">
            <option value="">--Select Stream--</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
        </select>
    </div>

    <div id="subjectContainer" class="hidden">
        <h2>Subjects</h2>
        <ul id="subjectList"></ul>
        <button onclick="goBack()">Back</button>
    </div>

    <div id="extraSections" class="hidden">
        <h2>Extra Study Materials</h2>
        <p>Coming soon...</p>
        <h2>Notes</h2>
        <p>Available soon...</p>
        <h2>Timetable</h2>
        <p>Will be updated...</p>
    </div>

    <div id="reviewsSection" class="hidden">
        <h2>Student Reviews</h2>
        <p>"This website helped me so much in my studies!" - Student A</p>
        <p>"AcademeForge is amazing for study materials!" - Student B</p>
    </div>

    <div id="founderSection" class="hidden">
        <h2>About Us</h2>
        <p>AcademeForge was founded by [Founder Name] and co-founded by [Co-founder Name]. Our mission is to provide free study materials to students.</p>
    </div>

<script>
    function login() {
        document.getElementById('container').style.display = 'none';
        document.getElementById('classSelection').classList.remove('hidden');
    }

    function selectClass() {
        const selectedClass = document.getElementById('classSelect').value;

        if (selectedClass === '11' || selectedClass === '12') {
            document.getElementById('classSelection').classList.add('hidden');
            document.getElementById('streamSelection').classList.remove('hidden');
        } else if (selectedClass === '9' || selectedClass === '10') {
            displaySubjects(selectedClass, null);
        }
    }

    function selectStream() {
        const selectedClass = document.getElementById('classSelect').value;
        const selectedStream = document.getElementById('streamSelect').value;
        displaySubjects(selectedClass, selectedStream);
    }

    function displaySubjects(selectedClass, selectedStream) {
        const subjects = {
            '9': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
            '10': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
            '11-Science': ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'],
            '11-Commerce': ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'],
            '11-Arts': ['History', 'Geography', 'Political Science', 'Sociology', 'English'],
            '12-Science': ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'],
            '12-Commerce': ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'],
            '12-Arts': ['History', 'Geography', 'Political Science', 'Sociology', 'English']
        };

        const key = selectedStream ? `${selectedClass}-${selectedStream}` : selectedClass;
        const subjectList = subjects[key] || [];
        const listContainer = document.getElementById('subjectList');

        listContainer.innerHTML = '';
        subjectList.forEach(subject => {
            listContainer.innerHTML += `<li><img src="https://via.placeholder.com/50" alt="subject"> ${subject} <button onclick="alert('Google link coming soon')">Access to Notes</button></li>`;
        });

        document.getElementById('streamSelection').classList.add('hidden');
        document.getElementById('classSelection').classList.add('hidden');
        document.getElementById('subjectContainer').classList.remove('hidden');
        document.getElementById('extraSections').classList.remove('hidden');
        document.getElementById('reviewsSection').classList.remove('hidden');
        document.getElementById('founderSection').classList.remove('hidden');
    }

    function goBack() {
        document.getElementById('subjectContainer').classList.add('hidden');
        document.getElementById('classSelection').classList.remove('hidden');
    }
</script>

</body>
</html>

