<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Neon Login - AcademeForge</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', sans-serif;
    }
    body {
      background: #0f0f0f;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      overflow: hidden;
    }
    .container {
      background: #1e1e1e;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 0 20px #00f0ff, 0 0 20px #ff007a;
      width: 350px;
      text-align: center;
      position: relative;
    }
    .glow-heart {
      font-size: 32px;
      color: #ff007a;
      text-shadow: 0 0 20px #ff007a;
      animation: glowHeart 1.5s infinite alternate;
    }
    @keyframes glowHeart {
      from {
        text-shadow: 0 0 10px #ff007a;
      }
      to {
        text-shadow: 0 0 30px #ff007a, 0 0 50px #ff007a;
      }
    }
    .moving-light {
      position: absolute;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, transparent, #00f0ff, transparent);
      top: 0;
      left: 0;
      animation: slideLight 2s infinite linear;
    }
    @keyframes slideLight {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(100%);
      }
    }
    input, button {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border-radius: 20px;
      border: none;
    }
    input {
      background: #2b2b2b;
      color: #fff;
    }
    button {
      background: #00f0ff;
      color: #000;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="moving-light"></div>
    <div class="glow-heart">LOGIN ❤️</div>
    <div id="step1">
      <input type="email" id="email" placeholder="Enter Gmail" />
      <button onclick="sendOTP()">Send OTP</button>
    </div>
    <div id="step2" style="display: none;">
      <input type="text" id="otp" placeholder="Enter OTP" />
      <input type="text" id="username" placeholder="Choose Username" />
      <input type="password" id="password" placeholder="Set Password" />
      <button onclick="verifyOTP()">Create Account</button>
    </div>
    <div id="login" style="display: none;">
      <input type="text" id="loginUsername" placeholder="Username" />
      <input type="password" id="loginPassword" placeholder="Password" />
      <button onclick="loginUser()">Login</button>
    </div>
  </div>  <script type="module">
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
    import {
      getAuth,
      signInWithEmailLink,
      sendSignInLinkToEmail,
      isSignInWithEmailLink,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
    } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
    import {
      getFirestore,
      doc,
      setDoc,
      getDoc
    } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_BUCKET",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Simulated OTP workflow
    let generatedOTP = null;

    window.sendOTP = async () => {
      const email = document.getElementById('email').value;
      generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      alert(`(Simulated) OTP sent to Gmail: ${generatedOTP}`); // Replace with real email sending in production
      document.getElementById('step1').style.display = 'none';
      document.getElementById('step2').style.display = 'block';
    };

    window.verifyOTP = async () => {
      const enteredOTP = document.getElementById('otp').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;

      if (enteredOTP === generatedOTP) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          await setDoc(doc(db, 'users', username), { email, username });
          window.location.href = 'https://t.me/AcademeForge';
        } catch (err) {
          alert('Error: ' + err.message);
        }
      } else {
        alert('Invalid OTP');
      }
    };

    window.loginUser = async () => {
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
      const userDoc = await getDoc(doc(db, 'users', username));

      if (userDoc.exists()) {
        const email = userDoc.data().email;
        try {
          await signInWithEmailAndPassword(auth, email, password);
          window.location.href = 'https://t.me/AcademeForge';
        } catch (err) {
          alert('Login failed: ' + err.message);
        }
      } else {
        alert('No such user');
      }
    };
  </script></body>
</html>