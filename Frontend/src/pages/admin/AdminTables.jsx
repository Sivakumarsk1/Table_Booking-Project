import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { RiAddLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { useToast } from "../../context/ToastContext";

function AdminTables() {
    const [tables, setTables] = useState([]);
    const { showToast } = useToast();

    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [newTable, setNewTable] = useState({
        number: "",
        seats: "",
        location: "",
        status: "Available",
    });
    const [editTableId, setEditTableId] = useState(null);

    // Fetch tables from backend
    const fetchTables = async () => {
        try {
            const response = await axios.get("/api/admin/tbl-get");
            setTables(response.data.tables);
        } catch (err) {
            showToast("Failed to load tables", "error");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTable((prev) => ({ ...prev, [name]: value }));
    };

    // Save table (add or edit)
    const saveTable = async () => {
        try {
            if (editTableId) {
                // Update existing table
                await axios.put(`/api/admin/tbl-upd/${editTableId}`, newTable);
                showToast("Table Updated Sucessfully", "success");
            } else {
                // Add new table
                await axios.post("/api/admin/in-tbl", newTable);
                showToast("Table added successfully", "success");
            }
            setShowModal(false);
            resetForm();
            fetchTables();
        } catch (error) {
            console.error("Error saving table:", error);
            showToast("Failed to save table. Please try again.");
        }
    };

    // Remove table
    const removeTable = async (id) => {
        try {
            await axios.delete(`/api/admin/tbl-del/${id}`);
            fetchTables(); // Refresh data after deletion
            showToast("Table removed successfully" ,"success");
        } catch (error) {
            console.error("Error removing table:", error);
           showToast("Failed to remove table. Please try again.");
        }
    };

    // Open modal for adding/editing a table
    const openModal = (table = null) => {
        if (table) {
            setEditTableId(table.id);
            setNewTable(table);
        } else {
            resetForm();
        }
        setShowModal(true);
    };

    // Reset form
    const resetForm = () => {
        setEditTableId(null);
        setNewTable({
            number: "",
            seats: "",
            location: "",
            status: "Available",
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Tables</h1>
                <button
                    onClick={() => openModal()}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#D8AB3E] text-dark rounded hover:bg-primary/90 transition"
                >
                    <RiAddLine />
                    <span>Add Table</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {tables.map((table, index) => (
                    <motion.div
                        key={table.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-secondary rounded-lg p-6 hover:scale-105 transform transition-all duration-300 border-[#d8ab3e] border"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold">
                                    Table {table.number}
                                </h3>
                                <p className="text-gray-400">
                                    {table.location}
                                </p>
                            </div>
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                    table.status === "Available"
                                        ? "bg-green-900/50 text-green-400"
                                        : table.status === "Occupied"
                                        ? "bg-red-900/50 text-red-400"
                                        : table.status === "Reserved"
                                        ? "bg-yellow-900/50 text-yellow-400"
                                        : "bg-gray-900/50 text-gray-400"
                                }`}
                            >
                                {table.status}
                            </span>
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Seats</span>
                                <span>{table.seats}</span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={() => openModal(table)}
                                className="flex-1 px-3 py-2 bg-primary/20 text-primary rounded hover:bg-primary/30 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => removeTable(table.id)}
                                className="flex-1 px-3 py-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition"
                            >
                                Remove
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal for Adding/Editing Table */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#505050c4] p-6 rounded-lg w-auto relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-2xl text-[#D8AB3E] hover:text-gray-800"
                        >
                            &times;
                        </button>
                        <h2 className="text-[#D8AB3E] text-2xl font-bold mb-4">
                            {editTableId ? "Edit Table" : "Add Table"}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label
                                    htmlFor="number"
                                    className="block text-sm font-medium text-white"
                                >
                                    Table Number
                                </label>
                                <input
                                    type="text"
                                    id="number"
                                    name="number"
                                    value={newTable.number}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 mt-1 border rounded-md"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="seats"
                                    className="block text-sm font-medium text-white"
                                >
                                    Seats
                                </label>
                                <input
                                    type="number"
                                    id="seats"
                                    name="seats"
                                    value={newTable.seats}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 mt-1 border rounded-md"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium text-white"
                                >
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={newTable.location}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 mt-1 border rounded-md"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-white"
                                >
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={newTable.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 mt-1 border rounded-md"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Occupied">Occupied</option>
                                    <option value="Reserved">Reserved</option>
                                    <option value="Maintenance">
                                        Maintenance
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={saveTable}
                                className="px-4 py-2 bg-[#D8AB3E] text-white rounded-md"
                            >
                                {editTableId ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast container to show toast messages */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default AdminTables;
