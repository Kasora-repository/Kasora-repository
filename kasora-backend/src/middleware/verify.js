const db = require('../config/database');
const checkVerification = (requiredStatus = 'verified') => {
    return async (req, res, next) => {
        try {
            const user = req.user;
            
            if (requiredStatus === 'verified' && !user.is_verified) {
                return res.status(403).json({ 
                    error: 'Account not verified. Complete identity verification to proceed.' 
                });
            }
            if (requiredStatus === 'fully_verified') {
                const TABLE_MAP = {
                    supplier: 'supplier_profiles',
                    buyer: 'business_profiles'
                };
                const table = TABLE_MAP[user.role];
                if (!table) {
                    return res.status(400).json({ error: 'Invalid role' });
                }
                // Use parameterized query with table name safely set
                const profileResult = await db.query(
                    `SELECT is_fully_verified, can_list_products, can_place_orders 
                    FROM ${table} WHERE user_id = $1`,
                    [user.id]
                );

                
                if (profileResult.rows.length === 0 || !profileResult.rows[0].is_fully_verified) {
                    return res.status(403).json({ 
                        error: 'Account verification incomplete. Please complete all required steps.' 
                    });
                }
            }
            next();
        } catch (error) {
            console.error('Verification check error:', error);
            res.status(500).json({ error: 'Verification check failed' });
        }
    };
};
module.exports = { checkVerification };