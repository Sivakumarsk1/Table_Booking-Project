import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const TimeSlotComponent = ({ timeSlot, selectedTime, setSelectedTime }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-[#D8AB3E]" />
        <h2 className="text-xl font-semibold">Select Time</h2>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-3">
          {timeSlot.map((time) => (
            <motion.button
              key={time}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTime(time)}
              className={`${
                selectedTime === time
                  ? "bg-[#D8AB3E] text-gray-900"
                  : "bg-gray-700/50 hover:bg-gray-700"
              } px-4 py-3 rounded-xl font-medium transition-colors duration-200`}
            >
              {time}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotComponent;
