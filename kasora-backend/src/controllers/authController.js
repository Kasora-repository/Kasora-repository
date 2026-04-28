const db = require('../config/database');
const { createClient } = require('@supabase/supabase-js');
const { body, validationResult } = require('express-validator');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Validation rules for registration
const registerValidations = [
    body('email')
        .isEmail().withMessage('Email must be valid')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role')
        .isIn(['supplier', 'buyer']).withMessage('Role must be supplier or buyer'),
    body('business_name')
        .optional()
        .isString()
        .isLength({ max: 100 }).withMessage('Business name too long (max 100 chars)')
        .trim()
];

// Middleware to check validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};

// Register user
const register = async (req, res) => {
    try {
        const { email, password, role, ...profileData } = req.body;
        
        // Create Supabase auth user
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });
        
        if (authError) {
            // Check for duplicate email error from Supabase
            if (authError.message.includes('already been registered') ||
                authError.message.includes('duplicate key') ||
                authError.message.includes('already exists')) {
                return res.status(409).json({
                    error: 'Email already registered'
                });
            }
            return res.status(400).json({
                error: 'Failed to create auth user',
                details: authError.message
            });
        }
        
        // Create local user record
        const result = await db.query(
            'INSERT INTO users (supabase_uid, email, role) VALUES ($1, $2, $3) RETURNING id, email, role, is_verified',
            [authUser.user.id, email, role]
        );
        
        const user = result.rows[0];
        
        // Create role-specific profile
        if (role === 'supplier') {
            await db.query(
                'INSERT INTO supplier_profiles (user_id, business_name) VALUES ($1, $2)',
                [user.id, profileData.business_name || 'Untitled Business']
            );
        } else if (role === 'buyer') {
            await db.query(
                'INSERT INTO business_profiles (user_id, business_name) VALUES ($1, $2)',
                [user.id, profileData.business_name || 'Untitled Business']
            );
        }
        
        res.status(201).json({
            message: 'User registered successfully',
            user: { 
                id: user.id, 
                email: user.email, 
                role: user.role, 
                is_verified: user.is_verified 
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        if (error.code === '23505') {
            return res.status(409).json({ 
                error: 'Email already registered' 
            });
        }
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Get current user
const getMe = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, email, role, is_verified, verification_status, created_at FROM users WHERE id = $1',
            [req.user.id]
        );
        
        const user = result.rows[0];
        
        let profile = null;
        if (user.role === 'supplier') {
            const profileResult = await db.query(
                'SELECT * FROM supplier_profiles WHERE user_id = $1',
                [user.id]
            );
            profile = profileResult.rows[0];
        } else if (user.role === 'buyer') {
            const profileResult = await db.query(
                'SELECT * FROM business_profiles WHERE user_id = $1',
                [user.id]
            );
            profile = profileResult.rows[0];
        }
        
        res.json({ user, profile });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

module.exports = { register, getMe, registerValidations, validate };
