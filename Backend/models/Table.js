const db = require("../config/db");

const Table = {
    create: (data, callback) => {
        const query = `
            INSERT INTO tables (location, number, seats, status)
            VALUES (?, ?, ?, ?)
        `;
        db.query(
            query,
            [data.location, data.number, data.seats, data.status],
            callback
        );
    },
    update: (id, data, callback) => {
        const query = `
            UPDATE tables
            SET location = ?, number = ?, seats = ?, status = ?, updated_at = NOW()
            WHERE id = ?
        `;
        db.query(
            query,
            [data.location, data.number, data.seats, data.status, id],
            callback
        );
    },
    getAll: (callback) => {
        const query = "SELECT * FROM tables";
        db.query(query, callback);
    },
    getBooking: (callback) => {
        const query = `SELECT
            DATE_FORMAT(b.bk_dates, '%Y-%m-%d') AS date,
            b.table_id AS tableId,
            TIME_FORMAT(t.start_time, '%H:%i') AS time
            FROM bookings b
            JOIN time_slots t ON b.start_time_id = t.id
            WHERE DATE(b.bk_dates) >= CURDATE()
            ORDER BY b.bk_dates;
        `;
        db.query(query, callback);
    },
    postBooking: (req, res, callback) => {
        const data = req.body;

        // Validate request data
        if (
            !data ||
            !data.name ||
            !data.email ||
            !data.bookings ||
            !Array.isArray(data.bookings) ||
            data.bookings.length === 0
        ) {
            return callback(
                new Error(
                    "Invalid request data. Ensure name, email, and at least one booking."
                ),
                null
            );
        }

        const query = `INSERT INTO users (name, email) VALUES (?, ?)`;

        db.query(query, [data.name, data.email], (error, results) => {
            if (error) {
                return callback(error, null);
            }

            const insertedId = results.insertId;
            const bookingData = data.bookings[0];

            // Validate bookingData
            if (
                !bookingData.selectedTime ||
                !bookingData.selectedTable ||
                !bookingData.selectedTable.id ||
                !bookingData.selectedDate
            ) {
                return callback(
                    new Error(
                        "Missing booking fields: selectedTime, selectedTable, or selectedDate."
                    ),
                    null
                );
            }

            const timeSlotQuery = `SELECT id FROM time_slots WHERE start_time = ?`;
            db.query(
                timeSlotQuery,
                [bookingData.selectedTime],
                (err, timeResults) => {
                    if (err) {
                        return callback(err, null);
                    }

                    if (timeResults.length === 0) {
                        return callback(new Error("Time slot not found"), null);
                    }

                    const time_slots_id = timeResults[0].id;

                    const query_two = `INSERT INTO bookings (user_id, table_id, start_time_id, bk_dates) VALUES (?, ?, ?, ?)`;
                    db.query(
                        query_two,
                        [
                            insertedId,
                            bookingData.selectedTable.id,
                            time_slots_id,
                            bookingData.selectedDate,
                        ],
                        (err2, results2) => {
                            if (err2) {
                                return callback(err2, null);
                            }

                            callback(null, insertedId);
                        }
                    );
                }
            );
        });
    },

    FrozenData: (callback) => {
        const query = `SELECT * FROM frozen`;
        db.query(query, callback);
    },
    // Add deleteById method
    deleteById: (id, callback) => {
        const query = `DELETE FROM tables WHERE id = ?`;
        db.query(query, [id], callback);
    },
};

module.exports = Table;
