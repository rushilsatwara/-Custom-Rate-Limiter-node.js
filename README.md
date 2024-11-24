<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Custom Rate Limiter Project</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> <!-- For Icons -->
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }

        header {
            background-color: #333;
            color: #fff;
            padding: 10px 20px;
            text-align: center;
        }

        section {
            margin: 20px;
        }

        h1, h2 {
            color: #333;
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        h3 {
            color: #444;
            font-size: 1.5rem;
            margin-top: 1.5rem;
        }

        p {
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 1rem;
        }

        ul {
            list-style-type: none;
            padding-left: 0;
        }

        ul li {
            margin-bottom: 8px;
        }

        .features, .setup, .api, .error-handling {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        .features li, .setup li, .api li {
            margin-bottom: 10px;
            font-size: 1.1rem;
        }

        .code {
            background-color: #f7f7f7;
            padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
            font-family: monospace;
            white-space: pre-wrap;
            overflow-wrap: break-word;
        }

        footer {
            text-align: center;
            padding: 10px;
            background-color: #333;
            color: #fff;
            position: fixed;
            bottom: 0;
            width: 100%;
        }

        a {
            color: #007bff;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .icon {
            font-size: 1.5rem;
            margin-right: 5px;
        }
    </style>
</head>
<body>

<header>
    <h1>Custom Rate Limiter Project</h1>
    <p><i class="fas fa-cogs icon"></i> A Rate-Limiting Solution for Express.js Applications</p>
</header>

<section>
    <h2>Project Overview</h2>
    <p>This project implements a custom rate-limiting solution for Express.js applications. It leverages a sliding window algorithm to manage requests efficiently and fairly, preventing overloading of your API while ensuring users don’t exceed their allotted usage.</p>

    <p>Key features include dynamic rate limits based on user roles (e.g., guest, admin), custom error messages for blocked requests, and logging of blocked attempts with IP addresses and timestamps.</p>

    <h3>Key Features:</h3>
    <ul class="features">
        <li><strong>Custom Rate Limiting:</strong> Middleware tracks requests based on the user's IP address and enforces rate-limiting rules.</li>
        <li><strong>Sliding Window Algorithm:</strong> Fair rate-limiting distribution over a rolling time window, allowing flexibility and fairness in request handling.</li>
        <li><strong>Dynamic Role-Based Limits:</strong> Allows for different rate limits for different user roles (e.g., `guest` vs. `admin`).</li>
        <li><strong>Rate Limit Exceeded Response:</strong> Returns a custom error message (429) if the user exceeds the limit, including retry instructions.</li>
        <li><strong>Logging Blocked Attempts:</strong> Logs IP addresses, timestamps, and endpoint details for every blocked request.</li>
        <li><strong>Scalable:</strong> Easily extendable for more roles and higher scale, such as using Redis for persistent request tracking.</li>
    </ul>
</section>

<section>
    <h2>Technologies Used</h2>
    <ul>
        <li><strong>Node.js</strong> – Server-side runtime for JavaScript.</li>
        <li><strong>Express.js</strong> – Web framework for building the API and middleware integration.</li>
        <li><strong>In-memory Storage or Redis</strong> – Stores request counts temporarily for rate-limiting purposes.</li>
        <li><strong>JavaScript (ES6+)</strong> – Used to implement the rate-limiting logic and middleware functionality.</li>
        <li><strong>Custom Middleware</strong> – For controlling API requests, handling error responses, and logging blocked attempts.</li>
    </ul>
</section>

<section class="setup">
    <h2>Setup and Installation</h2>
    <p>Follow these steps to set up the project on your local machine:</p>
    <ul>
        <li><strong>Clone the Repository:</strong> <code>git clone https://github.com/yourusername/Custom-Rate-Limiter.git</code></li>
        <li><strong>Install Dependencies:</strong> Run <code>npm install</code> to install required packages.</li>
        <li><strong>Start the Application:</strong> Run <code>npm start</code> to launch the app locally on <code>http://localhost:5000</code>.</li>
        <li><strong>Configure Rate Limiting:</strong> Modify the <code>RATE_LIMITS</code> object to adjust rate limits per role.</li>
    </ul>
</section>

<section class="api">
    <h2>API Endpoints</h2>
    <h3>1. POST `/register` - User Registration</h3>
    <p>Registers a user with the specified username, password, and role (either `guest` or `admin`).</p>
    <div class="code">
        <pre>{
  "username": "user123",
  "password": "password123",
  "role": "guest"
}</pre>
    </div>
    <p>If successful, the user will be redirected to the homepage.</p>

    <h3>2. GET `/weather` - Weather Data</h3>
    <p>Fetches weather data for a specified address.</p>
    <div class="code">
        <pre>GET /weather?address=London</pre>
    </div>
    <p>Returns weather information or an error message if no address is provided.</p>
</section>

<section class="error-handling">
    <h2>Error Handling</h2>
    <p>If a user exceeds the rate limit, a custom error response will be returned:</p>
    <div class="code">
        <pre>{
  "status": "error",
  "code": 429,
  "message": "Rate limit exceeded. Too many requests.",
  "details": {
    "allowedRequests": 3,
    "timeWindowSeconds": 60,
    "retryAfterSeconds": 30
  }
}</pre>
    </div>
    <p>Blocked attempts are logged in <code>logmsg.txt</code> for auditing.</p>
</section>

<footer>
    <p>© 2024 Custom Rate Limiter. All rights reserved. | <a href="https://github.com/yourusername/Custom-Rate-Limiter" target="_blank">View on GitHub</a></p>
</footer>

</body>
</html>
