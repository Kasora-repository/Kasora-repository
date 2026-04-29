const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    // If error already has statusCode and message, use them
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Internal server error';
    
    // Build consistent error response
    const errorResponse = {
        success: false,
        error: message,
        status: statusCode
    };
    
    // Add error code if present
    if (err.code) {
        errorResponse.code = err.code;
    }
    
    // Add details if present
    if (err.details) {
        errorResponse.details = err.details;
    }
    
    // Add validation errors specifically
    if (err.array && typeof err.array === 'function') {
        errorResponse.details = err.array();
    }
    
    // Include stack trace in development
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }
    
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
