const errormiddleware = (err, req, res, next) => {
    // Log the error for the developer to see in the terminal
    console.error(err.stack);

    // Default to 500 (Server Error) if no status is provided
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
        success: false,
        message: message
    });
};

module.exports = errormiddleware;