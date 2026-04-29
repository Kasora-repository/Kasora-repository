/**
 * Centralized error response formatter
 * Ensures all API errors have consistent structure
 */

/**
 * Format an error response
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Human-readable error message
 * @param {string} code - Machine-readable error code (e.g., 'VALIDATION_ERROR')
 * @param {any} details - Additional details (validation errors, etc.)
 * @returns {object} Formatted error object
 */
const formatError = (statusCode, message, code = null, details = null) => {
    const error = {
        success: false,
        error: message,
        status: statusCode
    };

    if (code) {
        error.code = code;
    }

    if (details) {
        error.details = details;
    }

    // Include stack trace in development only
    if (process.env.NODE_ENV === 'development') {
        error.stack = new Error().stack;
    }

    return error;
};

/**
 * Predefined error types for common scenarios
 */
const errors = {
    validation: (details) => formatError(400, 'Validation failed', 'VALIDATION_ERROR', details),
    unauthorized: (message = 'Not authenticated') => formatError(401, message, 'UNAUTHORIZED'),
    forbidden: (message = 'Insufficient permissions') => formatError(403, message, 'FORBIDDEN'),
    notFound: (message = 'Resource not found') => formatError(404, message, 'NOT_FOUND'),
    conflict: (message = 'Resource conflict') => formatError(409, message, 'CONFLICT'),
    server: (message = 'Internal server error', details = null) => 
        formatError(500, message, 'SERVER_ERROR', details),
    badRequest: (message = 'Invalid request', details = null) => 
        formatError(400, message, 'BAD_REQUEST', details)
};

module.exports = { formatError, errors };
