const RsModel = require('../models/Reservations'); // Reservation model

const Reservations = {
  getBookingData: (req, res) => {
    RsModel.get(req, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Data fetch failed", error: err });
      }
      return res.status(200).json({
        message: "Data fetched successfully",
        result: result.data,
        total: result.total,
      });
    });
  },

  update: (req, res) => {
    RsModel.update(req, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Update failed", error: err });
      }
      return res.status(200).json({ message: result.message });
    });
  },

  deleteReservation: (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Reservation ID missing" });
    }

    RsModel.delete(id, (err, result) => {
      if (err) {
        console.error("Reservation delete failed:", err);
        return res.status(500).json({ message: "Failed to delete reservation", error: err });
      }

      return res.status(200).json({ message: "Reservation deleted successfully", result });
    });
  }
};

module.exports = Reservations;
