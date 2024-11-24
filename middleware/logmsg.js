const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logmsg.txt");

// Helper function to format timestamps
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function logBlockedAttempt(ip, endpoint, timestamp) {
    const formattedIP = ip === "::1" ? "127.0.0.1" : ip; // Handle localhost case
    const formattedTime = formatTimestamp(timestamp);
    const logEntry = `[${formattedTime}] IP: ${formattedIP}, Endpoint: ${endpoint}\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err);
        } else {
            console.log("Blocked attempt logged.");
        }
    });
}

module.exports = logBlockedAttempt;
