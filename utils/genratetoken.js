const jwt = require("jsonwebtoken");
require('dotenv').config();

const genratetoken = (userId) => {
    // Sign the token with the User ID and a secret from your .env file
    return jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "30d", // Token lasts for 30 days
    });
};

module.exports = genratetoken;