
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login</title>
  <style>
    * {
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    body {
      background-color: #121212;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .login-box {
      background: #1c1c1c;
      border-radius: 20px;
      box-shadow: 0 0 20px #00f0ff, 0 0 20px #ff007a;
      padding: 40px 30px;
      width: 320px;
      color: white;
      position: relative;
    }
    .login-box h2 {
      text-align: center;
      margin-bottom: 30px;
      font-weight: 600;
      color: #fff;
    }
    .login-box h2::before {
      content: "🔊 ";
      color: #ff007a;
    }
    .login-box h2::after {
      content: " ❤️";
      color: #ff007a;
    }
    .login-box input {
      width: 100%;
      padding: 12px 15px;
      margin-bottom: 20px;
      border: none;
      border-radius: 25px;
      background-color: #2c2c2c;
      color: #fff;
      font-size: 14px;
    }
    .login-box input::placeholder {
      color: #888;
    }
    .login-box button {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 25px;
      background: #00f0ff;
      color: #000;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .login-box button:hover {
      background: #00c0cc;
    }
    .login-box .links {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-top: 15px;
    }
    .login-box .links a {
      color: #ff007a;
      text-decoration: none;
    }
    .login-box .links a:first-child {
      color: #ccc;
    }
  </style>
</head>
<body>
  <div class="login-box">
    <h2>LOGIN</h2>
    <form>
      <input type="text" placeholder="Username" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Sign in</button>
    </form>
    <div class="links">
      <a href="#">Forgot Password</a>
      <a href="#">Sign up</a>
    </div>
  </div>
</body>
</html>