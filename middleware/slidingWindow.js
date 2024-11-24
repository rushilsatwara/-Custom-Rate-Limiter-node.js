
const logBlockedAttempt = require("../middleware/logmsg");

const RATE_LIMITS = {
    guest: {
        limit: 3,  // Max 3 requests per minute for guest
        window: 60 * 1000,  // 1 minute in milliseconds
    },
    admin: {
        limit: 5,  // Max 5 requests per minute for admin
        window: 60 * 1000,  // 1 minute in milliseconds
    },
};

// Rate limiter function based on sliding window algorithm   
const slidingWindowLimiter = (req, res, next) => {

      const { limit, window } = RATE_LIMITS["admin"]; 

    // In-memory storage for tracking request timestamps
    if (!global.requestLogs) global.requestLogs = {};

    const userIP = req.ip; // Identify user by IP address
    const currentTime = Date.now();

    if (!global.requestLogs[userIP]) {
        global.requestLogs[userIP] = [];
    }

    const userRequests = global.requestLogs[userIP];

    // Remove timestamps older than the time window
    global.requestLogs[userIP] = userRequests.filter(
        (timestamp) => currentTime - timestamp <= window
    );

    // Check if the user has exceeded the rate limit for their role
    if (global.requestLogs[userIP].length >= limit) {
        const retryAfter = Math.ceil(
            (window - (currentTime - global.requestLogs[userIP][0])) / 1000
        );

        // Log the blocked attempt to a file (for tracking purposes)
        logBlockedAttempt(userIP, req.originalUrl, currentTime);

        // Send rate limit exceeded response and render a custom error page
        return res.status(429).render("rateLimitExceeded", {
            status: "error",
            code: 429,
            message: "Rate limit exceeded. Too many requests.",
            allowedRequests: limit,
            timeWindowSeconds: window / 1000,
            retryAfterSeconds: retryAfter,
        });
    }

    // Log the current request timestamp
    global.requestLogs[userIP].push(currentTime);

    // Proceed to the next middleware/route handler
    next();
};

module.exports = slidingWindowLimiter;





