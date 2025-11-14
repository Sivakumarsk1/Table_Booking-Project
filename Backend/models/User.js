const db = require('../config/db');

const Table = {
  // Get all available tables
  getAll: (callback) => {
    const query = `SELECT * FROM tables WHERE status = 'Available'`;
    db.query(query, callback);
  },

  // Save a new table booking
  postBooking: (req, res, callback) => {
    const { email, table_no, date, time, status } = req.body;

    if (!email || !table_no || !date || !time || !status) {
      return callback({ message: "Missing required fields" });
    }

    const insertQuery = `
      INSERT INTO reservations (email, table_no, date, time, status)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [email, table_no, date, time, status];

    db.query(insertQuery, values, callback);
  },

  // Get all bookings
  getBooking: (callback) => {
    const query = `SELECT * FROM reservations ORDER BY date DESC, time DESC`;
    db.query(query, callback);
  },

  // Get all frozen (reserved or occupied) tables
  FrozenData: (callback) => {
    const query = `SELECT * FROM tables WHERE status IN ('Reserved', 'Occupied')`;
    db.query(query, callback);
  }
};

module.exports = Table;
