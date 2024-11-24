# Custom Rate Limiter



## Overview

This project implements a custom rate-limiting solution for Express.js applications. It ensures that API usage is controlled by limiting requests based on a sliding window algorithm. The rate-limiter provides different limits for users based on their roles (e.g., guest, admin), and logs blocked requests for auditing purposes.

## Key Features

- **Custom Rate-Limiting**: Tracks requests per IP, enforcing a limit based on a sliding window algorithm.
- **Role-Based Rate Limits**: Different limits for users based on roles (e.g., `guest` with 3 requests per minute, `admin` with 5).
- **Rate Limit Exceeded Error**: Returns custom error messages (HTTP 429) when a user exceeds their request limit.
- **Blocked Attempt Logging**: Logs all blocked requests with the user's IP address, timestamp, and endpoint.
- **Extensibility**: Can be extended to support Redis or other storage for distributed rate-limiting.

---

## Setup and Installation

Follow these steps to set up the project:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/Custom-Rate-Limiter.git
    ```

2. **Install dependencies**:

    ```bash
    cd Custom-Rate-Limiter
    npm install
    ```

3. **Run the application**:

    ```bash
    npm start
    ```

The application will start locally on [http://localhost:5000](http://localhost:5000).

---



```json
{
  "username": "john_doe",
  "password": "password123",
  "role": "guest"
}
