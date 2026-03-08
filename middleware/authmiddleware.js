const jwt = require("jsonwebtoken");
require('dotenv').config();

const authmiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token" });
        }
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.userId; // Attach user ID to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authmiddleware;