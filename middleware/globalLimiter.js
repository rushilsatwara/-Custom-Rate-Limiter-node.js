const logBlockedAttempt = require("../middleware/logmsg");

const RATE_LIMIT = 5; // Max 5 requests
const TIME_WINDOW = 60 * 1000; // 1 minute in milliseconds

// In-memory store for tracking requests per IP
const requestLogs = {};

// Rate-limiting middleware with custom error messages
function globalLimiter(req, res, next) {
  const userIP = req.ip; // Get user's IP
  const currentTime = Date.now();

  // Initialize or update the request log for the IP
  if (!requestLogs[userIP]) {
    requestLogs[userIP] = [];
  }

  // Filter out timestamps older than the time window
  requestLogs[userIP] = requestLogs[userIP].filter(
    (timestamp) => currentTime - timestamp < TIME_WINDOW
  );

  // Check if the user has exceeded the rate limit
  if (requestLogs[userIP].length >= RATE_LIMIT) {
    // Calculate time until the next request is allowed
    const earliestRequestTime = requestLogs[userIP][0];
    const retryAfter = Math.ceil((TIME_WINDOW - (currentTime - earliestRequestTime)) / 1000);


     // Log the blocked attempt to a file (for tracking purposes)
     logBlockedAttempt(userIP, req.originalUrl, currentTime);


    // Return a custom error message
    return res.status(429).render("rateLimitExceeded", {
      status: "error",
      code: 429,
      message: "Rate limit exceeded. Too many requests.",
      allowedRequests: RATE_LIMIT,
      timeWindowSeconds: TIME_WINDOW / 1000,
      retryAfterSeconds: retryAfter ,
  });
  }

  // Log the current request timestamp
  requestLogs[userIP].push(currentTime);

  next(); // Proceed to the next middleware/route handler
}

module.exports = globalLimiter;
