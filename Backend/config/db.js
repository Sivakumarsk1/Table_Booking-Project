const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 100,

    queueLimit: 0,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error getting DB connection:", err);
        return;
    }
    console.log("Connected to database via pool");
    connection.release(); // Release the connection back to pool
});

module.exports = pool;
