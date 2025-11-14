const db = require("../../config/db");
const UserAuthModel = {
    post: (
        userId,
        firstName,
        lastName,
        email,
        mobile,
        address,
        hashedPassword,
        callback
    ) => {
        const query =
            "INSERT INTO old_users (user_id, firstName, lastName, email, password, mobile, address) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(
            query,
            [
                userId,
                firstName,
                lastName,
                email,
                hashedPassword,
                mobile,
                address,
            ],
            callback
        );
    },
    savejwt: async ({ id, jwt_token, callback }) => {
        const query =
            "INSERT INTO auth (old_users_id, jwt_token) VALUES (?, ?)";
        db.query(query, [id, jwt_token], callback);
    },
    checkAuth: async ({ email, password }, callback) => {
        const query = `SELECT * FROM old_users WHERE email = ?`;
        db.query(query, [email], callback);
    },
    checkRegUser: async ({ email }, callback) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        db.query(query, [email], callback);
    },
    
    jwtUpdated: async ({ t } = {}) => {},
    googleInsertUser: (userId, firstName, lastName, email, callback) => {
        const query = `INSERT INTO old_users (user_id, firstName, lastName, email) VALUES (?, ?, ?, ?) ;`;
        db.query(query, [userId, firstName, lastName, email], callback);
    },
};
module.exports = UserAuthModel;
