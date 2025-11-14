import React from "react";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Clock } from "lucide-react";
import moment from "moment";

const ReservationSummaryComponent = ({ selectedTable, selectedDate, selectedTime, handleSubmit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-[#D8AB3E]/20 to-yellow-500/20 p-4 md:p-8 shadow-xl backdrop-blur-sm border-t border-[#D8AB3E]/30 z-50"
    >
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-[#D8AB3E] mb-4 md:mb-6">
          Reservation Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#D8AB3E]" />
            <p className="text-lg font-medium">
              Table {selectedTable.number} ({selectedTable.seats} Seats,{" "}
              {selectedTable.location})
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-[#D8AB3E]" />
            <p className="text-lg font-medium">
              Date: {moment(selectedDate).format("DD-MM-YYYY")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#D8AB3E]" />
            <p className="text-lg font-medium">Time: {selectedTime}</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#D8AB3E] text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-colors duration-200"
        >
          Confirm Reservation
        </button>
      </div>
    </motion.div>
  );
};

export default ReservationSummaryComponent;