const { createClient } = require('@supabase/supabase-js');
const db = require('../config/database');
const { errors } = require('../utils/errorFormatter');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json(errors.unauthorized('No token provided'));
        }

        const token = authHeader.substring(7);
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json(errors.unauthorized('Invalid token'));
        }

        const result = await db.query(
            'SELECT id, email, role, is_verified, verification_status FROM users WHERE supabase_uid = $1',
            [user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json(errors.notFound('User not found in system'));
        }

        req.user = result.rows[0];
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json(errors.server('Authentication failed'));
    }
};

module.exports = authenticate;
