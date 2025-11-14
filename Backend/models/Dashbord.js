const db = require("../config/db");
const util = require("util"); // To use promisify for db.query

// Convert db.query into a promise-based function
const query = util.promisify(db.query).bind(db);

const DashbordModel = {
    getLatest: async (page = 1, limit = 5, callback) => {
        try {
            const offset = (page - 1) * limit;

            const dataQuery = `
            SELECT
                b.id,
                b.table_id,
                t.seats,
                t.number,
                b.bk_dates,
                TIMESTAMPDIFF(SECOND, b.created_at, NOW()) AS time_duration_seconds,
                TIMESTAMPDIFF(MINUTE, b.created_at, NOW()) AS time_duration_minutes,
                TIMESTAMPDIFF(HOUR, b.created_at, NOW()) AS time_duration_hours,
                TIMESTAMPDIFF(DAY, b.created_at, NOW()) AS time_duration_days
            FROM bookings b
            INNER JOIN tables t ON b.table_id = t.id
            ORDER BY b.created_at DESC
            LIMIT ? OFFSET ?;
        `;

            const countQuery = `SELECT COUNT(*) AS total FROM bookings`;

            const [data, countResult] = await Promise.all([
                query(dataQuery, [limit, offset]),
                query(countQuery),
            ]);

            callback(null, {
                result: data,
                total: countResult[0].total,
            });
        } catch (err) {
            callback(err, null);
        }
    },

    dasBox: (page = 100, limit = 20, callback) => {
        const offset = (page - 1) * limit;

        const countBookingsQuery = `SELECT COUNT(*) AS total_bookings FROM bookings`;
        const todayBookingsQuery = `
        SELECT *
        FROM bookings
        WHERE DATE(created_at) = CURDATE()
        LIMIT ? OFFSET ?
    `;
        const countTablesQuery = `SELECT COUNT(*) AS total_tables FROM tables`;
        const seatsCountQuery = `
        SELECT SUM(t.seats) AS total_seats
        FROM bookings b
        INNER JOIN tables t ON b.table_id = t.id
        WHERE DATE(b.created_at) = CURDATE()`;

        db.query(countBookingsQuery, (err, totalBookings) => {
            if (err) return callback(err, null);

            db.query(
                todayBookingsQuery,
                [limit, offset],
                (err, todayBookings) => {
                    if (err) return callback(err, null);

                    db.query(countTablesQuery, (err, totalTables) => {
                        if (err) return callback(err, null);

                        db.query(seatsCountQuery, (err, totalSeats) => {
                            if (err) return callback(err, null);

                            // Combine results into a single object
                            callback(null, {
                                totalBookings: totalBookings[0].total_bookings,
                                todayBookings,
                                totalTables: totalTables[0].total_tables,
                                totalSeats: totalSeats[0].total_seats || 0,
                            });
                        });
                    });
                }
            );
        });
    },
};

module.exports = DashbordModel;
