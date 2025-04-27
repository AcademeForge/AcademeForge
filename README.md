<html lang="en">
<head>
<meta name="google-site-verification" content="F1L0xfSoJ09Jp0SjvlmTnzkWK_fuYyhBw36QvRdDGwM" />



<!-- Logo -->
<div class="logo-container">
    <a href="https://ibb.co/23qH49sJ" target="_blank">
        <img src="https://i.ibb.co/k2KvC79Z/IMG-20250320-164334-559.jpg" alt="AcademeForge Logo">
    </a>
</div>

<style>

    /* Logo Styling */
    .logo-container {
        position: fixed;
        top: 120px; /* Adjust this to position it under the banner */
        Right: 10px; /* Positions the logo on the Right side */
        z-index: 9997;
    }

    .logo-container img {
        height: 40px; /* Reduced size */
        width: auto; 
        border-radius: 5px;
    }
</style>
<!-- Your existing login form here -->
<div class="login-container">
    <!-- Login form content -->
</div>

<!-- CSS for styling the banner -->
<style>
    .banner-container {
        background-color: #ffcc00; /* Background color */
        padding: 10px;
        color: #000; /* Text color */
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 9999;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Shadow effect */
    }

    marquee {
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
    }
</style>
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
        }
        .container {
            background: #1e1e1e;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 345px rgba(0, 255, 255, 0.5);
            text-align: center;
            width: 300px;
            transition: transform 0.3s ease;
        }
        h2 {
            color: #ff4081;
        }
        .option, .access-button, .back-button {
            background-color: #292929;
            color: white;
            padding: 12px;
            margin: 8px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s ease;
            width: 90%;
            display: inline-block;
        }
        .option:hover, .access-button:hover, .back-button:hover {
            background-color: #00e5ff;
            color: black;
        }
        .hidden {
            display: none;
        }
        .back-button {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
            display: none;
        }
    </style>
</head>
<body>

<!-- Back Button -->
<button class="back-button" id="backButton" onclick="goBack()">Back</button>


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class Selection Page with Sidebar</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            height: 100vh;
            flex-direction: column;
        }

        /* Header for Hamburger Icon */
        #menuIcon {
            font-size: 30px;
            color: white;
            padding: 15px;
            background-color: #333;
            cursor: pointer;
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 100;
        }

        /* Sidebar Styles */
        #sidebar {
            width: 250px;
            background-color: #333;
            color: white;
            padding: 20px;
            position: fixed;
            top: 0;
            left: -250px; /* Initially hide sidebar */
            height: 100%;
            transition: left 0.3s ease;
            z-index: 100; /* Higher z-index to overlap the marquee */
        }

        #sidebar h2 {
            text-align: center;
            margin-top: 20px;
        }

        /* Button Styles */
        .sidebar-button {
            width: 100%;
            padding: 15px;
            margin: 10px 0;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-align: left;
            font-size: 18px;
        }

        .sidebar-button:hover {
            background-color: #45a049;
        }

        /* Sidebar Style for Login Page */
        body.login-page #sidebar {
            display: block;
        }

    /* Back Button Style */
        #backButton {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            margin: 10px;
            text-align: center;
            font-size: 16px;
        }

        #backButton:hover {
            background-color: #d32f2f;
        }

        /* Container Styles */
        #loginContainer {
            margin: 20px;
            max-width: 400px;
            margin-top: 50px;
            transition: margin-left 0.3s ease; /* Adjust form position when sidebar appears */
        }

        #loginContainer h2 {
            text-align: center;
        }

        #loginContainer input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        #loginContainer button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        #loginContainer button:hover {
            background-color: #45a049;
        }

        marquee {
            font-size: 18px;
            font-weight: bold;
            z-index: 10; /* Lower z-index to be behind the sidebar */
        }

        /* Footer text */
        .footer {
            margin-top: 30px;
            font-size: 14px;
            text-align: center;
            color: #aaa;
        }
    </style>
</head>
<body class="Class Selection Page">
    <!-- Hamburger Menu Icon -->
    <div id="menuIcon" onclick="toggleSidebar()">&#9776;</div>

    <!-- Sidebar -->
    <div id="sidebar">
        <h2>Menu</h2>
        <button class="sidebar-button" onclick="window.location.href='https://academeforge.pages.dev/'">Notes</button>
        <button class="sidebar-button" onclick="window.location.href='https://academeforge.github.io/TimeTable/'">Time Table</button>
        <button class="sidebar-button" onclick="window.location.href='http://academeforge.wordpress.com/'">About AST</button>
        <button class="sidebar-button" onclick="window.location.href='https://academeforge.github.io/AST'">AST Registration Form</button>
        <button class="sidebar-button" onclick="window.location.href='https://academeforge.github.io/ForgeFlix/'">Motivational Reels / Video Lecture</button>
        <button class="sidebar-button" onclick="window.location.href='https://academeforge.github.io/FAQ'">Frequently Asked Questions</button>
        <button class="sidebar-button" onclick="window.location.href='https://academeforge.github.io/AFcode/'">Back Button</button>
    </div>

    <!-- Login Form -->
    <div class="container" id="loginContainer">
        <marquee behavior="scroll" direction="left">
            Welcome to AcademeForge – Something Out Of The Box 🎁!
        </marquee>
        <h2>LOGIN</h2>
        <input type="text" id="username" placeholder="username : Auto-filled" />
        <input type="password" id="password" placeholder="Password : Pre-filled" />
        <button onclick="login()">Sign In</button>
    </div>

    <!-- Footer -->
    <div class="footer">Powered by AcademeForge</div>

    <script>
        // Function to toggle the sidebar visibility
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const loginContainer = document.getElementById('loginContainer');
            
            // Toggle the sidebar's left position
            if (sidebar.style.left === '-250px') {
                sidebar.style.left = '0';
                loginContainer.style.marginLeft = '250px'; // Adjust the login form when sidebar appears
            } else {
                sidebar.style.left = '-250px';
                loginContainer.style.marginLeft = '20px'; // Reset the margin when sidebar is hidden
            }
        }

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // If there's no history, redirect to the specified URL
        window.location.href = 'https://academeforge.github.io/AcademeForge/';
    }
}
        
    </script>
</body>




<!-- Class Selection Page -->
<div class="container hidden" id="classContainer">
    <h2>Select Your Class</h2>
    <div class="option" onclick="selectClass(9)">Class 9</div>
    <div class="option" onclick="selectClass(10)">Class 10</div>
    <div class="option" onclick="selectClass(11)">Class 11</div>
    <div class="option" onclick="selectClass(12)">Class 12</div>
</div>

<!-- Stream Selection Page -->
<div class="container hidden" id="streamContainer">
    <h2>Select Your Stream</h2>
    <div class="option" onclick="selectStream('Science')">Science</div>
    <div class="option" onclick="selectStream('Commerce')">Commerce</div>
    <div class="option" onclick="selectStream('Arts')">Arts</div>
</div>

<!-- Subjects Page -->
<div class="container hidden" id="subjectContainer">
    <h2>Subjects</h2>
    <div id="subjectsList"></div>
</div>

<script>
    let currentPage = 'login';
    let selectedClass = null;
    let selectedStream = null;

    // Define subject links for all classes and streams (PLACEHOLDERS)
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
        11: {
            "Science": {
                "Physics": "https://drive.google.com/drive/folders/100rYQz_YiMNnT7zK_dxW-t8PUYj7GABP", 
                "Chemistry": "https://drive.google.com/drive/folders/10A46iQRdTn0AJGwBfsZ4TRZ_naTsGcJ2", 
                "Math": "https://drive.google.com/drive/folders/1-yiJhKx6TVLZQ9DlHyvQLZli8N8Qd6TB", 
                "Biology": "https://drive.google.com/drive/folders/1-lL_2Z5_4cvklYRMSv2vTWorip9w-RWx" 
            },
            "Commerce": {
                "Business Studies": "https://drive.google.com/drive/folders/10hbeBCGpwKV8AJlMLN-gkT8ROL-mPJnL", 
                "Accountancy": "https://drive.google.com/drive/folders/10bQ9TYUr2qS3U5rerp5UMyX3qnzF1N2o", 
                "Economics": "https://drive.google.com/drive/folders/10akiwYES3pDVQoPfTHiGJUZ_y9z7J6sx" 
            },
            "Arts": {
                "History": "https://drive.google.com/drive/folders/11HZgkLXZWY391tQnU6mAkyepSHH7BnwD", 
                "Political Science": "https://drive.google.com/drive/folders/11McG2nZBPwTOQivoYRLnuHDrCTaxZfDj", 
                "Economics": "https://drive.google.com/drive/folders/11Mz2f1dukzNn7zqNA8FATyQuvDS3to4Z", 
                "Psychology": "https://drive.google.com/drive/folders/11OHqx9uiW0po8Jb7EqCDOgy_hNpQa8OH", 
                "Geography": "https://drive.google.com/drive/folders/11OHXiJxjOtqmN0yg_TeqUg8hJEU4nkbk"
            }
        },
        12: {
            "Science": {
                "Physics": "https://drive.google.com/drive/folders/10QCZZ78wmLGERWwVoCnQysVOzizeervS", 
                "Chemistry": "https://drive.google.com/drive/folders/10TlsfeqLn5PHarO3rclePp5bg6HBq4K4", 
                "Math": "https://drive.google.com/drive/folders/10OfK1z06vhLqAhPnuYt4w7cN0rZDtbES", 
                "Biology": "https://drive.google.com/drive/folders/10I1sPq0wvSMD8gNtaoFEFFvtQ3fZSDIF" 
            },
            "Commerce": {
                "Business Studies": "https://drive.google.com/drive/folders/114ncGbXaaDS_Uq_jFZ6S8XvUPxGqUomy", 
                "Accountancy": "https://drive.google.com/drive/folders/1133qJ8A91II5MwG9dJMeyQxgF88GEJe6", 
                "Economics": "https://drive.google.com/drive/folders/10zTfWiTZEjnip9jQ4_NQ5D-iKdgC2I8z" 
            },
            "Arts": {
                "History": "https://drive.google.com/drive/folders/11gfrxRKkwZg9yEREvyS06N6zNGH4QFRi", 
                "Political Science": "https://drive.google.com/drive/folders/11c9BDCtzO6OjZumMYlXhklSfwJud5D9z", 
                "Economics": "https://drive.google.com/drive/folders/11jMqr1owMcbXsVci7CgYbyyfWrb3zgtd", 
                "Psychology": "https://drive.google.com/drive/folders/11Y7G9_79zt197nQFMYgKpsKcAb99Ge7c", 
                "Geography": "https://drive.google.com/drive/folders/11XmaUWcoB2JPes05FONuxLtFbDIfSln0"
            }
        }
    };

    function showPage(page) {
        document.getElementById(`${currentPage}Container`).classList.add('hidden');
        document.getElementById(`${page}Container`).classList.remove('hidden');
        document.getElementById('backButton').style.display = (page !== 'login') ? 'block' : 'none';
        currentPage = page;
    }

    function login() {
        showPage('class');
    }

    function selectClass(cls) {
        selectedClass = cls;
        if (cls <= 10) {
            loadSubjects(cls);
        } else {
            showPage('stream');
        }
    }

    function selectStream(stream) {
        selectedStream = stream;
        loadSubjects(selectedClass);
    }

    function loadSubjects(cls) {
        const subjectsList = document.getElementById('subjectsList');
        subjectsList.innerHTML = '';

        if (cls <= 10) {
            for (const [subject, link] of Object.entries(subjectLinks[cls])) {
                subjectsList.innerHTML += `
                    <div class="option">
                        ${subject}
                        <button class="access-button" onclick="window.open('${link}', '_blank')">Access to Notes</button>
                    </div>
                `;
            }
        } else {
            for (const [subject, link] of Object.entries(subjectLinks[cls][selectedStream])) {
                subjectsList.innerHTML += `
                    <div class="option">
                        ${subject}
                        <button class="access-button" onclick="window.open('${link}', '_blank')">Access to Notes</button>
                    </div>
                `;
            }
        }
        showPage('subject');
    }

    function goBack() {
        if (currentPage === 'subject') showPage(selectedClass > 10 ? 'stream' : 'class');
        else if (currentPage === 'stream') showPage('class');
        else if (currentPage === 'class') showPage('login');
    }
</script>
<!-- About Us Container -->
<div id="aboutUsContainer" class="hidden">
    <!-- About Us Button -->
    <button onclick="openAboutUs()" class="option" style="background-color: #ff4081; color: white; width: 90%; margin-top: 20px;">
        About Us
    </button>

    <!-- About Us Pop-up -->
    <div id="aboutUsPopup" class="hidden" style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #1e1e1e;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
        z-index: 1000;
        width: 90%;
        max-width: 400px;
        text-align: center;
    ">
        <h2 style="color: #ff4081;">About the Team</h2>
        <p><strong>Devraj Kumar</strong> – Founder & CEO</p>
        <p><strong>Mandeep Boot Jolakiya</strong> – Co-Founder & CEO</p>
        <h3 style="color: #00e5ff;">Special Thanks:</h3>
        <p>We extend our heartfelt gratitude to <strong>Ujjwal</strong>, <strong>Amrit</strong>, <strong>Palak</strong>, <strong>Aadhar Bhattacharya</strong> and <strong>Bhuvam</strong> for their invaluable support in managing our community. Your contributions have made a significant impact!</p>
        <button onclick="closeAboutUs()" class="option" style="background-color: #ff4081; color: white; margin-top: 10px;">Close</button>
    </div>
</div>

<!-- JavaScript to Open and Close Pop-up -->
<script>
    function openAboutUs() {
        document.getElementById('aboutUsPopup').classList.remove('hidden');
    }

    function closeAboutUs() {
        document.getElementById('aboutUsPopup').classList.add('hidden');
    }

    function showPage(page) {
        document.getElementById(`${currentPage}Container`).classList.add('hidden');
        document.getElementById(`${page}Container`).classList.remove('hidden');
        document.getElementById('backButton').style.display = (page !== 'login') ? 'block' : 'none';

        // Show "About Us" button only on login page
        if (page === 'login') {
            document.getElementById('aboutUsContainer').classList.remove('hidden');
        } else {
            document.getElementById('aboutUsContainer').classList.add('hidden');
        }

        currentPage = page;
    }
// Show About Us button when the page initially loads
window.onload = () => {
    showPage('login'); // Ensure the login page is set as default
    document.getElementById('aboutUsButton').style.display = 'block'; // Show About Us button
}
</script>
<!-- Announcement Container -->
<div id="announcementContainer" class="hidden">
    <!-- Announcement Button -->
    <button onclick="openAnnouncement()" class="option" style="background-color: #ff9800; color: white; width: 90%; margin-top: 20px;">
        Announcement
    </button>

    <!-- Announcement Pop-up -->
    <div id="announcementPopup" class="hidden" style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #1e1e1e;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(255, 152, 0, 0.5);
        z-index: 1000;
        width: 90%;
        max-width: 400px;
        text-align: center;
    ">
        <h2 style="color: #ff9800;">📢 Announcement</h2>
        <p>AcademeForge Scholars Test (AST) 2025 registrations open soon for <strong>Classes 1 to 10</strong>! 🚀</p>
        <p>Join our <a href="https://t.me/AcademeForge" target="_blank" style="color: #00e5ff;">Telegram Group</a> for updates.</p>
        <button onclick="closeAnnouncement()" class="option" style="background-color: #ff9800; color: white; margin-top: 10px;">Close</button>
    </div>
</div>

<!-- JavaScript for Announcement Pop-up -->
<script>
    function openAnnouncement() {
        document.getElementById('announcementPopup').classList.remove('hidden');
    }

    function closeAnnouncement() {
        document.getElementById('announcementPopup').classList.add('hidden');
    }

    function showPage(page) {
        document.getElementById(`${currentPage}Container`).classList.add('hidden');
        document.getElementById(`${page}Container`).classList.remove('hidden');
        document.getElementById('backButton').style.display = (page !== 'login') ? 'block' : 'none';

        // Show About Us & Announcement buttons only on login page
        if (page === 'login') {
            document.getElementById('aboutUsContainer').classList.remove('hidden');
            document.getElementById('announcementContainer').classList.remove('hidden');
        } else {
            document.getElementById('aboutUsContainer').classList.add('hidden');
            document.getElementById('announcementContainer').classList.add('hidden');
        }

        currentPage = page;
    }

    // Show buttons when the page initially loads
    window.onload = () => {
        showPage('login');
    };
    </script>

<!-- Flashcard Button -->
<button id="flashcardButton" class="option" onclick="openFlashcardPopup()" style="background-color: #3498db; color: white; width: 90%; margin-top: 20px;">
    Social Profiles
</button>
<!-- Flashcard Popup -->
<div id="flashcardPopup" class="hidden" style="
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(52, 152, 219, 0.5);
    z-index: 1000;
    width: 90%;
    max-width: 400px;
    text-align: center;
    display: none;
">
    <h2 style="color: #3498db;">Social Profiles </h2>

    <div class="card" onclick="flipCard(this)" style="
        background-color: #3498db; 
        color: white; 
        padding: 10px; 
        margin: 10px 0;
        border-radius: 5px;
        cursor: pointer;

     ">
        <div class="card-front">YouTube</div>
        <div class="card-back" style="display: none;"><p>Join our <a href="https://youtube.com/@academeforgepro?si=d6ZmWYKcaFYCrspI" target="_blank" style="color: #00e5ff;">YouTube Channel</a> for updates.</p></div>
    </div>

    <div class="card" onclick="flipCard(this)" style="
        background-color: #3498db; 
        color: white; 
        padding: 10px; 
        margin: 10px 0;
        border-radius: 5px;
        cursor: pointer;
    ">
        <div class="card-front">Instagram</div>
        <div class="card-back" style="display: none;"><p>Follow us on <a href="https://www.instagram.com/academeforgee?igsh=MWYzNjAwMDgxbWYyMQ==" target="_blank" style="color: #00e5ff;">Instagram</a> for updates.</p></div>
    </div>

    <button onclick="closeFlashcardPopup()" class="option" style="background-color: #3498db; color: white; margin-top: 10px;">Close</button>
</div>
<script>
    function openFlashcardPopup() {
        document.getElementById('flashcardPopup').style.display = 'block';
    }

    function closeFlashcardPopup() {
        document.getElementById('flashcardPopup').style.display = 'none';
    }

    function flipCard(card) {
        var front = card.querySelector(".card-front");
        var back = card.querySelector(".card-back");
        
        if (back.style.display === "none") {
            front.style.display = "none";
            back.style.display = "block";
        } else {
            front.style.display = "block";
            back.style.display = "none";
        }
    }

    function showPage(page) {
        document.getElementById(`${currentPage}Container`).classList.add('hidden');
        document.getElementById(`${page}Container`).classList.remove('hidden');
        document.getElementById('backButton').style.display = (page !== 'login') ? 'block' : 'none';

        // Show elements only on login view
        if (page === 'login') {
            document.getElementById('aboutUsContainer').classList.remove('hidden');
            document.getElementById('announcementContainer').classList.remove('hidden');
            document.getElementById('flashcardButton').style.display = 'block'; 
            document.getElementById('flashcardPopup').style.display = 'none';  
        } else {
            document.getElementById('aboutUsContainer').classList.add('hidden');
            document.getElementById('announcementContainer').classList.add('hidden');
            document.getElementById('flashcardButton').style.display = 'none';  
            document.getElementById('flashcardPopup').style.display = 'none';  
        }

        currentPage = page;
    }
</script>


<!-- Chatbox Button -->
<button id="chatbotButton" onclick="toggleChatbot()" style="
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #6200ea;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
">💬</button>

<!-- Chatbox Window -->
<div id="chatbotContainer" class="hidden" style="
    position: fixed;
    bottom: 80px;
    right: 20px;
    background-color: #1e1e1e;
    width: 300px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    display: none;
">
    <div style="background-color: #6200ea; padding: 10px; color: white; text-align: center; border-radius: 10px 10px 0 0;">
        📖 AcademeForge Assistant
    </div>
    <div id="chatbotMessages" style="padding: 10px; height: 200px; overflow-y: auto; color: white;"></div>
    <input id="chatbotInput" type="text" placeholder="Ask something..." onkeypress="handleChat(event)" style="
        width: 100%;
        padding: 8px;
        border: none;
        border-radius: 0 0 10px 10px;
        background-color: #333;
        color: white;
    ">
</div>

<!-- Chatbot Script -->
<script>
    function toggleChatbot() {
        var chatbox = document.getElementById('chatbotContainer');
        chatbox.style.display = (chatbox.style.display === 'none') ? 'block' : 'none';
    }

    function handleChat(event) {
        if (event.key === 'Enter') {
            var input = document.getElementById('chatbotInput').value.toLowerCase();
            var chatbox = document.getElementById('chatbotMessages');

            var responses = {
                "notes": "You can find notes in the study material section of your class.",
                "timetable": "The timetable is available under the 'Timetable' TG group, try asking in TG chat group.",
                "ast": "AST (AcademeForge Scholars Test) is an exam for students from Class 1 to 10. Visit the WordPress website for details!",
                "extra study material": "Extra study materials are available in the 'Extra Material' website.",
                "about us": "AcademeForge is an educational platform founded by Devraj Kumar and co-founded by Aadi & Mandeep.",
                "hello": "Hello! How can I assist you today?",
                "hi": "Hi there! Need help?",
                "bye": "Goodbye! Happy studying!"
            };

            var response = responses[input] || "I'm a small chatbox created by AcademeForge. I can only answer specific questions. Try asking about: Notes, Timetable, AST, Extra Study Material, or About Us";
            chatbox.innerHTML += "<p><strong>You:</strong> " + input + "</p>";
            chatbox.innerHTML += "<p><strong>Bot:</strong> " + response + "</p>";

            document.getElementById('chatbotInput').value = "";
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    }

</script>

</body>
</html>
