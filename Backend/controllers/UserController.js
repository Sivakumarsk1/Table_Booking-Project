const db = require('../config/db');
const Table = require('../models/Table');

const UserTable = {
    getTables: (req, res) => {
        Table.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error retrieving tables', error: err });
            }
            return res.status(200).json({ message: 'Tables retrieved successfully', tables: results });
        });
    },
    postBooking: (req, res) => {
        Table.postBooking(req, res, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Table hasbeen notBooked", error: err });
            }
            return res.status(201).json({ message: "Table Booking successfully", data: result });
        })
    },
    getBooking: (req, res) => {
        Table.getBooking((err, result) => {
            if (err) {
                return res.status(500).json({ message: "Table Booking data get unsuccessfully", error: err });
            }
                return res.status(201).json({ message: "Table Booking data get successfully", result });
        })
    },
    FrozenData: (req, res) => {
        Table.FrozenData((err, result) => {
            if (err) {
                return res.status(500).json({ message: "Table Booking data get unsuccessfully", error: err });
            }
                return res.status(201).json({ message: "Table Booking data get successfully", result });
        })
    }
}

module.exports = UserTable;
