const db = require('../config/db');

const Timeslot = {
    create: (data, callback) => {
        const query = `
            INSERT INTO time_slots (slot_name, start_time)
            VALUES (?, ?)
        `;
        db.query(query, [data.slot_name, data.start_time], callback);
    },

    update: (id, data, callback) => {
        const updateQuery = `
            UPDATE time_slots
            SET slot_name = ?, start_time = ?, updated_at = NOW()
            WHERE id = ?
        `;
        const fetchAllQuery = `SELECT * FROM time_slots`;

        db.query(updateQuery, [data.slot_name, data.start_time, id], (updateError, updateResult) => {
            if (updateError) return callback(updateError);

            db.query(fetchAllQuery, (fetchError, allRows) => {
                if (fetchError) return callback(fetchError);
                callback(null, allRows);
            });
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM time_slots';
        db.query(query, callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM time_slots WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Timeslot;
