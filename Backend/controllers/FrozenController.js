const FrozenModel = require("../models/Frozen");

const Frozen = {
    AddFrozen: (req, res) => {
        const { start_date, end_date, reason } = req.body;
        FrozenModel.create(start_date, end_date, reason, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Insert unsuccessful', error: err });
            }
            return res.status(201).json({ message: 'Insert successful', frozen: result });
        });
    },

    GetFrozen: (req, res) => {
        FrozenModel.getAll((err, result) => {
            if (err) {
                console.log(err);

                return res.status(500).json({ message: "Fetch failed", error: err });
            }
            return res.status(200).json({ message: "Fetch successful", data: result });
        });
    },

    UpdateFrozen: (req, res) => {
        const { id } = req.params;
        const { start_date, end_date, reason } = req.body;
        FrozenModel.update(id, start_date, end_date, reason, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Update failed', error: err });
            }
            return res.status(200).json({ message: 'Update successful', updated: result });
        });
    },

    DeleteFrozen: (req, res) => {
        const { id } = req.params;
        FrozenModel.delete(id, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Delete failed', error: err });
            }
            return res.status(200).json({ message: 'Delete successful', deleted: result });
        });
    }
};

module.exports = Frozen;
