const Timeslot = require('../models/TimeSlot');

const TimeslotTable = {
    createTimeslot: (req, res) => {
        const { slot_name, start_time } = req.body;
        const newTimeslot = { slot_name, start_time };

        Timeslot.create(newTimeslot, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating Timeslot', error: err });
            }
            return res.status(201).json({ message: 'Timeslot created successfully', slotId: result.insertId });
        });
    },

    getTimeslot: (req, res) => {
        Timeslot.getAll((err, result)=> {
            if(err){
                return res.status(500).json({ message: 'Error retrieving Timeslot', error: err });
            } else {
                return res.status(200).json({ message: 'Slots retrieved successfully', slot: result });
            }
        });
    },

    updateSlots: (req, res) => {
        const { id } = req.params;
        const { slot_name, start_time } = req.body;
        const updatedSlots = { slot_name, start_time };

        Timeslot.update(id, updatedSlots, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating slot', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Slot not found' });
            }
            return res.status(200).json({ message: 'Time slot updated successfully', slot: result });
        });
    },

    // ✅ Delete slot
    deleteSlots: (req, res) => {
        const { id } = req.params;

Timeslot.delete(id, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting timeslot', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Timeslot not found' });
            }
            return res.status(200).json({ message: 'Timeslot deleted successfully' });
        });
    }
};

module.exports = TimeslotTable;
