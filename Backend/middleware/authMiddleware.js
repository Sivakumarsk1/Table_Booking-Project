const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Import your MySQL connection file

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization"); // Get token from headers

        if (!token) {
            return res.status(401).json({ message: "Access Denied. No Token Provided!" });
        }

        // Verify the token (ensure you use the same secret key used for signing tokens)
        const secretKey = "your_secret_key";
        const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey); // Remove 'Bearer ' prefix

        // Check if the token exists in the database
        const query = "SELECT * FROM tokens WHERE token = ?";
        db.query(query, [token], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid token. Please log in again." });
            }

            req.user = decoded; // Attach user info to request
            next(); // Proceed to the next middleware or route
        });
    } catch (error) {
        return res.status(400).json({ message: "Invalid Token", error: error.message });
    }
};

module.exports = authMiddleware;
