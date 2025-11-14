const db = require("../config/db");

const Offer = {
    create: (data, callback) => {
        const query = `
      INSERT INTO offers (name, description, discount, min_visits, valid_until, email, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
        const values = [
            data.name,
            data.description,
            data.discount,
            data.min_visits,
            data.valid_until,
            data.email,
        ];
        db.query(query, values, callback);
    },
    //for admin page get allll details
    getAll: (callback) => {
        const query = `SELECT * FROM offers ORDER BY created_at DESC`;
        db.query(query, callback);
    },

    //for user registered mail offers only
   getOffersByEmail: (email, callback) => {
  const query = `
    SELECT * FROM offers
    WHERE email = ?
    AND min_visits <= (
      SELECT COUNT(*) FROM bookings
      WHERE user_id = (SELECT id FROM users WHERE email = ?)
    )
    AND valid_until >= CURDATE()
  `;
  db.query(query, [email, email], callback);
},
};

module.exports = Offer;
