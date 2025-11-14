const Table = require('../models/Table');

const TableController = {
  createTable: (req, res) => {
    const { location, number, seats, status } = req.body;
    const newTable = { location, number, seats, status };

    Table.create(newTable, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating table', error: err });
      }
      return res.status(201).json({ message: 'Table created successfully', tableId: result.insertId });
    });
  },

  updateTable: (req, res) => {
    const { id } = req.params;
    const { location, number, seats, status } = req.body;
    const updatedTable = { location, number, seats, status };

    Table.update(id, updatedTable, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating table', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Table not found' });
      }
      return res.status(200).json({ message: 'Table updated successfully' });
    });
  },

  getTables: (req, res) => {
    Table.getAll((err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving tables', error: err });
      }
      return res.status(200).json({ message: 'Tables retrieved successfully', tables: results });
    });
  },

  // ✅ Add comma before this method
  deleteTable: (req, res) => {
    const { id } = req.params;

    Table.deleteById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting table', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Table not found or already deleted' });
      }
      return res.status(200).json({ message: 'Table deleted successfully' });
    });
  }
};

module.exports = TableController;
