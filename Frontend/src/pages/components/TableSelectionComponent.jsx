import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";

const TableSelectionComponent = ({ tables, selectedTable, handleTableSelect }) => {
  // Function to check if table is available for booking
  const isTableAvailable = (table) => {
    return table.status === "Available";
  };

  // Function to get status message
  const getStatusMessage = (table) => {
    switch(table.status) {
      case "Occupied":
        return "Table is currently occupied";
      case "Reserved":
        return "Table is reserved for another booking";
      case "Maintenance":
        return "Table is under maintenance";
      default:
        return "Available for booking";
    }
  };

  // Function to handle table selection with status check
  const handleTableClick = (table) => {
    if (!isTableAvailable(table)) {
      // Show appropriate message based on status
      alert(`Cannot book this table: ${getStatusMessage(table)}`);
      return;
    }
    handleTableSelect(table.id);
  };

  return (
    <div className="lg:col-span-7 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-[#D8AB3E]" />
        <h2 className="text-xl font-semibold">Select Your Table</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map((table) => (
          <motion.div
            key={table.id}
            whileHover={{ scale: isTableAvailable(table) ? 1.03 : 1 }}
            whileTap={{ scale: isTableAvailable(table) ? 0.98 : 1 }}
            className={`relative p-4 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedTable?.id === table.id
                ? "bg-[#D8AB3E]/20 border-2 border-[#D8AB3E]"
                : isTableAvailable(table)
                ? "bg-gray-700/30 border-2 border-gray-700 hover:border-[#D8AB3E]/50"
                : "bg-gray-700/30 border-2 border-gray-700"
            } ${
              !isTableAvailable(table) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleTableClick(table)}
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center items-center gap-1">
                <Users className="w-5 h-5 text-[#D8AB3E]" />
                <span className="font-medium">{table.seats} Seats</span>
              </div>
              <p className="font-semibold text-lg">Table {table.number}</p>
              <p className="text-sm text-gray-400">{table.location}</p>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  isTableAvailable(table)
                    ? "bg-green-900/30 text-green-400 border border-green-500/30"
                    : table.status === "Occupied"
                    ? "bg-red-900/30 text-red-400 border border-red-500/30"
                    : table.status === "Reserved"
                    ? "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30"
                    : "bg-gray-900/30 text-gray-400 border border-gray-500/30"
                }`}
              >
                {table.status}
              </span>
              {!isTableAvailable(table) && (
                <p className="text-xs text-gray-400 mt-1">
                  {getStatusMessage(table)}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TableSelectionComponent;