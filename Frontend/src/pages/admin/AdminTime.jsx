import React, { useState, useEffect } from "react";
import { Clock, Plus, Pencil, Trash2, X } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../context/ToastContext";

function AddTime() {
    const [timeSlots, setTimeSlots] = useState([]);
    const [newTimeSlot, setNewTimeSlot] = useState({
        slot_name: "",
        start_time: "",
    });
    const { showToast } = useToast();
    const [showModal, setShowModal] = useState(false);
    const [editSlotId, setEditSlotId] = useState(null);
    const [is24HourFormat, setIs24HourFormat] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
            },
        },
        exit: { opacity: 0, scale: 0.9 },
    };

    // Fetch time slots from the backend
    const fetchTimeSlots = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/admin/time-slots");
            setTimeSlots(response.data.slot || []);
        } catch (error) {
            console.error("Error fetching time slots:", error);
            showToast("Failed to load time slots", "error");
        } finally {
            setIsLoading(false);
        }
    };

    // Save (add or update) a time slot
    const saveTimeSlot = async () => {
        if (!newTimeSlot.slot_name || !newTimeSlot.start_time) {
            showToast(
                "Please fill in both slot name and start time",
                "warning"
            );
            return;
        }

        try {
            setIsLoading(true);
            if (editSlotId) {
                await axios.put(
                    `/api/admin/time-slots/${editSlotId}`,
                    newTimeSlot
                );
                showToast("Time slot updated successfully", "success");
            } else {
                await axios.post("/api/admin/time-slots", newTimeSlot);
                showToast("Time slot added successfully", "success");
            }
            await fetchTimeSlots();
            resetModalState();
        } catch (error) {
            console.error("Error saving time slot:", error);
            showToast("Failed to save time slot", "error");
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a time slot
    const deleteTimeSlot = async (id) => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/admin/time-slots/${id}`);
            setTimeSlots((prev) => prev.filter((slot) => slot.id !== id));
            showToast("Time slot deleted successfully", "success");
        } catch (error) {
            console.error("Error deleting time slot:", error);
            showToast("Failed to delete time slot", "error");
        } finally {
            setIsLoading(false);
        }
    };

    // Reset modal state
    const resetModalState = () => {
        setShowModal(false);
        setNewTimeSlot({ slot_name: "", start_time: "" });
        setEditSlotId(null);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTimeSlot((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Format time for 24-hour or 12-hour display
    const formatTime = (time) => {
        if (!time) return "";
        if (is24HourFormat) return time;

        const [hour, minute] = time.split(":");
        const hourInt = parseInt(hour, 10);
        const isPM = hourInt >= 12;
        const formattedHour = hourInt % 12 || 12;
        return `${formattedHour.toString().padStart(2, "0")}:${minute} ${
            isPM ? "PM" : "AM"
        }`;
    };

    // Fetch data when the component is mounted
    useEffect(() => {
        fetchTimeSlots();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white"
        >
            {/* Animated background elements */}
            <motion.div
                className="fixed inset-0 overflow-hidden -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D8AB3E] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </motion.div>

            <div className="container mx-auto px-4 py-8">
                <motion.div
                    className="flex items-center justify-between mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-4xl font-bold text-[#D8AB3E]">
                        Time Slot Management
                    </h1>
                    <motion.button
                        onClick={() => {
                            setNewTimeSlot({ slot_name: "", start_time: "" });
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D8AB3E] to-[#D8AB3E] rounded-lg font-semibold text-gray-900 hover:from-[#cea1367d] hover:to-[#cea1367d] transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Plus className="w-5 h-5" />
                        Add Time Slot
                    </motion.button>
                </motion.div>

                <motion.div
                    className="bg-gray-800/50 rounded-xl p-6 mb-8 backdrop-blur-sm border border-gray-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-4">
                        <Clock className="w-6 h-6 text-[#D8AB3E]" />
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="timeFormat"
                                    checked={is24HourFormat}
                                    onChange={() => setIs24HourFormat(true)}
                                    className="w-4 h-4 text-[#D8AB3E] focus:ring-[#D8AB3E]"
                                />
                                <span>24-Hour</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="timeFormat"
                                    checked={!is24HourFormat}
                                    onChange={() => setIs24HourFormat(false)}
                                    className="w-4 h-4 text-[#D8AB3E] focus:ring-[#D8AB3E]"
                                />
                                <span>12-Hour</span>
                            </label>
                        </div>
                    </div>
                </motion.div>

                {isLoading && timeSlots.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <motion.div
                            className="h-12 w-12 border-4 border-[#D8AB3E] border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {timeSlots.map((slot) => (
                            <motion.div
                                key={slot.id}
                                variants={itemVariants}
                                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-[#D8AB3E]/50 transition-all duration-300"
                                whileHover={{
                                    y: -5,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-[#D8AB3E]">
                                        {slot.slot_name}
                                    </h3>
                                    <div className="flex gap-2">
                                        <motion.button
                                            onClick={() => {
                                                setEditSlotId(slot.id);
                                                setNewTimeSlot({
                                                    slot_name: slot.slot_name,
                                                    start_time: slot.start_time,
                                                });
                                                setShowModal(true);
                                            }}
                                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </motion.button>
                                        <motion.button
                                            onClick={() =>
                                                deleteTimeSlot(slot.id)
                                            }
                                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-red-400"
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Clock className="w-4 h-4 text-[#D8AB3E]" />
                                    <span>{formatTime(slot.start_time)}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-md relative border border-gray-700/50"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.button
                                onClick={resetModalState}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                whileHover={{ rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="w-5 h-5" />
                            </motion.button>

                            <h2 className="text-2xl font-bold mb-6 text-[#D8AB3E]">
                                {editSlotId
                                    ? "Edit Time Slot"
                                    : "Add New Time Slot"}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Slot Name
                                    </label>
                                    <input
                                        type="text"
                                        name="slot_name"
                                        value={newTimeSlot.slot_name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#D8AB3E] focus:border-transparent text-white"
                                        placeholder="Enter slot name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        name="start_time"
                                        value={newTimeSlot.start_time}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#D8AB3E] focus:border-transparent text-white"
                                    />
                                </div>

                                <motion.button
                                    onClick={saveTimeSlot}
                                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#D8AB3E] to-[#D8AB3E]/90 rounded-lg font-semibold text-gray-900 hover:from-[#D8AB3E]/90 hover:to-[#D8AB3E] transition-all duration-300 relative overflow-hidden group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isLoading}
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        {isLoading ? (
                                            <motion.span
                                                className="h-5 w-5 border-2 border-gray-900 border-t-transparent rounded-full mr-2"
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                            />
                                        ) : null}
                                        {editSlotId
                                            ? "Update Time Slot"
                                            : "Add Time Slot"}
                                    </span>
                                    <motion.span
                                        className="absolute inset-0 bg-gradient-to-r from-[#D8AB3E]/90 to-[#D8AB3E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "0%" }}
                                    />
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default AddTime;
