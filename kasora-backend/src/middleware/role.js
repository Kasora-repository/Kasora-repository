const { errors } = require('../utils/errorFormatter');

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json(errors.unauthorized('Not authenticated'));
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                ...errors.forbidden('Insufficient permissions'),
                required_roles: roles,
                current_role: req.user.role
            });
        }
        next();
    };
};

module.exports = { authorize };
