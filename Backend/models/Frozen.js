const db = require('../config/db');

const Frozen = {
    create: (start_date, end_date, reason, callback) => {
        const query = `
            INSERT INTO frozen (start_date, end_date, title)
            VALUES (?, ?, ?)
        `;
        db.query(query, [start_date, end_date, reason], callback);
    },

    getAll: (callback) => {
        const query = 'SELECT id,title,start_date,end_date,created_at,updated_at FROM frozen';
        db.query(query, callback);
    },

    update: (id, start_date, end_date, reason, callback) => {
        const query = `
            UPDATE frozen
            SET start_date = ?, end_date = ?, title = ?
            WHERE id = ?
        `;
        db.query(query, [start_date, end_date, reason, id], callback);
    },

    delete: (id, callback) => {
        const query = `DELETE FROM frozen WHERE id = ?`;
        db.query(query, [id], callback);
    },
};

module.exports = Frozen;
