<h1>Custom Rate Limiter</h1>h1>
This project implements a custom rate-limiting solution using a sliding window algorithm for Express.js applications. It helps prevent abuse and ensures fair usage of your APIs by controlling the number of requests a user can make within a certain time frame. This solution dynamically adjusts rate limits based on user roles (such as guest or admin), providing flexibility in managing API access. It also includes features like logging blocked attempts and returning detailed custom error messages for blocked requests.

💡 Project Overview
In modern web applications, APIs often face the challenge of handling a large number of requests, which can lead to overloading or even denial of service if not properly managed. Rate limiting is a crucial technique to ensure that requests are distributed evenly over time and that users do not exceed a predefined number of API calls.

This project solves the problem by introducing a Custom Rate Limiter Middleware with the following key features:

Request Tracking: The middleware tracks requests based on the user's IP address, preventing abuse from excessive requests.
Sliding Window Algorithm: This algorithm provides a fairer approach by distributing the rate limits over a rolling time window, allowing users to make requests at different intervals rather than restricting them to fixed slots.
Dynamic Rate Limits: The rate limits are adjustable based on user roles (such as guest or admin), allowing for tailored API access.
Custom Error Handling: If a user exceeds their rate limit, they receive a detailed 429 error message, indicating the rate-limiting policy and the time they can retry.
Logging of Blocked Attempts: Every time a user exceeds their allowed limit, an entry is logged with their IP address, the endpoint they attempted to access, and the timestamp.
🚀 Key Features
Custom Rate Limiting: Middleware tracks requests based on the user's IP and enforces rate-limiting rules.
Sliding Window Algorithm: Provides a fair and precise approach to rate-limiting, allowing requests to be spaced out over time.
Dynamic Role-Based Limits: Supports different rate limits for different user roles (e.g., guest, admin), allowing for flexible API usage management.
Rate Limit Exceeded Response: Users receive a 429 error with a detailed message if their rate limit is exceeded.
Logging Blocked Attempts: All blocked requests are logged with critical information (IP address, timestamp, endpoint) for auditing purposes.
Scalable: Easily extendable to include more sophisticated logging mechanisms (e.g., using Redis for persistent storage) or more roles for rate-limiting.
🛠️ Technologies Used
Node.js: A JavaScript runtime built on Chrome’s V8 JavaScript engine, enabling server-side JavaScript execution.
Express.js: A minimal and flexible Node.js web application framework that simplifies routing and middleware integration.
In-memory Storage (or Redis): Stores request counts temporarily for rate-limiting purposes, either in memory or in a more scalable system like Redis.
JavaScript (ES6+): Used for implementing middleware logic, error handling, and request tracking.
Custom Middleware: Allows for rate-limiting and logging of blocked requests.
