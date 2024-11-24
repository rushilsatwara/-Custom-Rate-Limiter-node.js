// Middleware to ensure role is stored for the rate limiter
const setUserRole = (req, res, next) => {
    // Retrieve the user's role and store it in req.userRole
    const { role } = req.body;
    const allowedUsers = [
        { role: "guest" },
        { role: "admin" }
    ];
    // Validate against allowed users
    const allowedUser = allowedUsers.find(user => user.role === role);

    if (allowedUser) {
        console.log(allowedUser);
        req.userRole = allowedUser.role; // Store the role in the request object
    } else {
        console.log(allowedUser);
        req.userRole = "guest"; // Default to guest if no valid role is found
    }

    console.log("User role set to:", req.userRole); // Debugging log
    next();
};

module.exports = setUserRole;