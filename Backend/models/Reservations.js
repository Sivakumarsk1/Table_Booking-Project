const db = require("../config/db");

const Reservations = {
    get: (req, callback) => {
        const { date, status, query, page = 1, limit = 0 } = req.query;
        const offset = (page - 1) * limit;

        let dataQuery = `
      SELECT
        b.id,
        u.name,
        u.email,
        DATE_FORMAT(b.bk_dates, '%Y-%m-%d') AS date,
        DATE_FORMAT(s.start_time, '%H:%i') AS time,
        COALESCE(b.status, 'Confirmed') AS status,
        t.number AS \`table\`,
        b.table_id,
        b.start_time_id
      FROM users u
      JOIN bookings b ON u.id = b.user_id
      JOIN tables t ON b.table_id = t.id
      JOIN time_slots s ON b.start_time_id = s.id
      WHERE 1=1
    `;

        let countQuery = `
      SELECT COUNT(*) AS total
      FROM users u
      JOIN bookings b ON u.id = b.user_id
      JOIN tables t ON b.table_id = t.id
      JOIN time_slots s ON b.start_time_id = s.id
      WHERE 1=1
    `;

        let values = [],
            countValues = [];

        if (date) {
            dataQuery += " AND b.bk_dates = ?";
            countQuery += " AND b.bk_dates = ?";
            values.push(date);
            countValues.push(date);
        }

        if (status === "Expired") {
            dataQuery += " AND DATE(b.bk_dates) < CURDATE()";
            countQuery += " AND DATE(b.bk_dates) < CURDATE()";
        } else if (status) {
            // Normal status filtering
            dataQuery +=
                " AND (b.status = ? OR (b.status IS NULL AND ? = 'Confirmed'))";
            countQuery +=
                " AND (b.status = ? OR (b.status IS NULL AND ? = 'Confirmed'))";
            values.push(status, status);
            countValues.push(status, status);
        }

        if (query) {
            dataQuery += " AND (u.name LIKE ? OR u.email LIKE ?)";
            countQuery += " AND (u.name LIKE ? OR u.email LIKE ?)";
            values.push(`%${query}%`, `%${query}%`);
            countValues.push(`%${query}%`, `%${query}%`);
        }

        dataQuery += " LIMIT ? OFFSET ?";
        values.push(Number(limit), Number(offset));

        db.query(dataQuery, values, (err, results) => {
            if (err) return callback(err);
            db.query(countQuery, countValues, (countErr, countRes) => {
                if (countErr) return callback(countErr);
                callback(null, { data: results, total: countRes[0].total });
            });
        });
    },

    update: (req, callback) => {
        const { id, email, bk_dates, table, status, table_status } = req.body;

        if (!id || !email || !bk_dates || !table) {
            return callback({ message: "Missing required fields" });
        }

        // Step 1: Get new table_id from table number
        const getTableIdQuery = `SELECT id FROM tables WHERE number = ?`;
        db.query(getTableIdQuery, [table], (err, tableRes) => {
            if (err) return callback(err);
            if (tableRes.length === 0) {
                return callback({ message: "Invalid table number" });
            }

            const tableId = tableRes[0].id;

            const updateBookingQuery = `
            UPDATE bookings
            SET bk_dates = ?, status = ?, table_id = ?
            WHERE id = ?
        `;
            db.query(
                updateBookingQuery,
                [bk_dates, status || "Confirmed", tableId, id],
                (err, bookingRes) => {
                    if (err) return callback(err);

                    // Step 3: Update table status
                    const updateTableQuery = `UPDATE tables SET status = ? WHERE id = ?`;
                    db.query(
                        updateTableQuery,
                        [table_status || "Available", tableId],
                        (err, tableUpdateRes) => {
                            if (err) return callback(err);

                            // Step 4: Update user email separately
                            const updateEmailQuery = `
                    UPDATE users
                    SET email = ?
                    WHERE id = (SELECT user_id FROM bookings WHERE id = ?)
                `;
                            db.query(
                                updateEmailQuery,
                                [email, id],
                                (err, userRes) => {
                                    if (err) return callback(err);

                                    return callback(null, {
                                        message:
                                            "Reservation, table, and email updated successfully",
                                    });
                                }
                            );
                        }
                    );
                }
            );
        });
    },
    delete: (id, callback) => {
        const query = `DELETE FROM bookings WHERE id = ?`;
        db.query(query, [id], callback);
    },
};

module.exports = Reservations;
