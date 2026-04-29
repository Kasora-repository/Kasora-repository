const supabase = require('../config/supabase');

/**
 * Verify a user's email via OTP (for email magic links)
 * @param {string} tokenHash - The token hash from the email link
 * @param {string} type - Type of OTP ('email' or 'phone')
 * @returns {Promise<object>} User data
 */
const verifyOtp = async (tokenHash, type = 'email') => {
    const { data, error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type
    });
    if (error) throw error;
    return data.user;
};

/**
 * Refresh a user's session using refresh token
 * @param {string} refreshToken - The refresh token
 * @returns {Promise<object>} New session data
 */
const refreshSession = async (refreshToken) => {
    const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken
    });
    if (error) throw error;
    return data;
};

/**
 * Generate a password reset link for a user
 * @param {string} email - User's email address
 * @param {string} redirectTo - Frontend URL to redirect after reset
 * @returns {Promise<object>} Response data
 */
const generatePasswordResetLink = async (email, redirectTo) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectTo
    });
    if (error) throw error;
    return data;
};

/**
 * Admin: Create a user with custom metadata (role, etc.)
 * @param {object} params - { email, password, role, emailConfirm }
 * @returns {Promise<object>} Created user
 */
const adminCreateUser = async (email, password, role, emailConfirm = true) => {
    const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: emailConfirm,
        user_metadata: { role }
    });
    if (error) throw error;
    return data.user;
};

/**
 * Update a user's metadata
 * @param {string} userId - Supabase user ID
 * @param {object} metadata - Metadata to update
 * @returns {Promise<object>} Updated user
 */
const updateUserMetadata = async (userId, metadata) => {
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: metadata
    });
    if (error) throw error;
    return data.user;
};

/**
 * Delete a user (admin only)
 * @param {string} userId - Supabase user ID
 * @returns {Promise<object>} Deletion response
 */
const deleteUser = async (userId) => {
    const { data, error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;
    return data;
};

/**
 * Get a user by ID (admin)
 * @param {string} userId - Supabase user ID
 * @returns {Promise<object>} User data
 */
const getUserById = async (userId) => {
    const { data, error } = await supabase.auth.admin.getUserById(userId);
    if (error) throw error;
    return data.user;
};

/**
 * List all users (admin) - with pagination
 * @param {number} page - Page number
 * @param {number} perPage - Items per page
 * @returns {Promise<object>} Users list
 */
const listUsers = async (page = 1, perPage = 10) => {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    const { data, error } = await supabase.auth.admin.listUsers({
        page: page,
        perPage: perPage
    });
    if (error) throw error;
    return data;
};

module.exports = {
    verifyOtp,
    refreshSession,
    generatePasswordResetLink,
    adminCreateUser,
    updateUserMetadata,
    deleteUser,
    getUserById,
    listUsers
};
