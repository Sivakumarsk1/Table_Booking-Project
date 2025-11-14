import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiAddLine, RiCalendarLine, RiCloseLine } from "react-icons/ri";
import axios from "axios";
import { useToast } from "../../context/ToastContext";

function AddFrozen() {
    const { showToast } = useToast();
    const [flag, setFlag] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        startDate: "",
        endDate: "",
        reason: "",
    });

    const reservationsPerPage = 10;

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

    useEffect(() => {
        axios
            .get("/api/admin/froz-get")
            .then((response) => {
                if (response.data?.data) {
                    setReservations(response.data.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                showToast("Failed to load reservations", "error");
            });
    }, [flag]);

    const openModal = (reservation = null) => {
        if (reservation) {
            const startDate = reservation.start_date
                ? new Date(reservation.start_date)
                : null;
            const endDate = reservation.end_date
                ? new Date(reservation.end_date)
                : null;

            setFormData({
                id: reservation.id,
                startDate: startDate
                    ? startDate.toISOString().split("T")[0]
                    : "",
                endDate: endDate ? endDate.toISOString().split("T")[0] : "",
                reason: reservation.reason || reservation.title || "",
            });
        } else {
            setFormData({
                id: "",
                startDate: "",
                endDate: "",
                reason: "",
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const startDate = formData.startDate
                ? `${formData.startDate}T00:00:00`
                : null;
            const endDate = formData.endDate
                ? `${formData.endDate}T00:00:00`
                : null;

            if (formData.id) {
                await axios.put(`/api/admin/froz-edit/${formData.id}`, {
                    start_date: startDate,
                    end_date: endDate,
                    reason: formData.reason,
                });
                showToast("Frozen date updated successfully", "success");
            } else {
                await axios.post("/api/admin/froz-add", {
                    start_date: startDate,
                    end_date: endDate,
                    reason: formData.reason,
                });
                showToast("Frozen date added successfully", "success");
            }

            setFlag((prev) => !prev);
            closeModal();
        } catch (error) {
            console.error("Error:", error);
            showToast("Failed to update", "error");
        }
    };

    // Handle delete reservation
    const handleDelete = async (id) => {
        if (
            !window.confirm("Are you sure you want to delete this reservation?")
        )
            return;

        try {
            await axios.delete(`/api/admin/froz-delete/${id}`);
            showToast("Frozen data deleted successfully", "success");
            setFlag((prev) => !prev);
        } catch (error) {
            console.error("Error deleting reservation:", error);
            showToast("Failed to delete reservation", "error");
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Pagination Logic
    const totalPages = Math.ceil(reservations.length / reservationsPerPage);
    const currentReservations = reservations.slice(
        (currentPage - 1) * reservationsPerPage,
        currentPage * reservationsPerPage
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-6 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen"
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

            <div className="max-w-7xl mx-auto">
                <motion.h1
                    className="text-3xl font-bold text-[#D8AB3E] mb-8 relative pb-2"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    Frozen Data Management
                    <motion.span
                        className="absolute bottom-0 left-0 w-24 h-1 bg-[#D8AB3E]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.h1>

                <motion.button
                    onClick={() => openModal()}
                    className="flex items-center space-x-2 px-4 py-3 mb-6 bg-gradient-to-r from-[#D8AB3E] to-amber-600 text-slate-900 font-medium rounded-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <RiAddLine className="text-lg" />
                    <span>Add Frozen Period</span>
                </motion.button>

                {/* Reservations Table */}
                <motion.div
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-700/50">
                                    {[
                                        "ID",
                                        "Start Date",
                                        "End Date",
                                        "Reason",
                                        "Actions",
                                    ].map((header, index) => (
                                        <th
                                            key={index}
                                            className="px-6 py-4 text-left text-sm font-medium text-slate-300 uppercase tracking-wider"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {currentReservations.map((reservation) => (
                                    <motion.tr
                                        key={reservation.id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="hover:bg-slate-700/30 transition-colors"
                                        whileHover={{ scale: 1.005 }}
                                    >
                                        <td className="px-6 py-4 text-white">
                                            {reservation.id}
                                        </td>
                                        <td className="px-6 py-4 text-white">
                                            {reservation.start_date
                                                ? new Date(
                                                      reservation.start_date
                                                  ).toLocaleDateString()
                                                : ""}
                                        </td>
                                        <td className="px-6 py-4 text-white">
                                            {reservation.end_date
                                                ? new Date(
                                                      reservation.end_date
                                                  ).toLocaleDateString()
                                                : ""}
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">
                                            {reservation.reason ||
                                                reservation.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <motion.button
                                                    onClick={() =>
                                                        openModal(reservation)
                                                    }
                                                    className="px-3 py-1 text-sm rounded bg-[#D8AB3E]/20 text-[#D8AB3E] hover:bg-[#D8AB3E]/30 transition"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Edit
                                                </motion.button>
                                                <motion.button
                                                    onClick={() =>
                                                        handleDelete(
                                                            reservation.id
                                                        )
                                                    }
                                                    className="px-3 py-1 text-sm rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Delete
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center border-t border-slate-700/50">
                        <div className="text-sm text-slate-400 mb-4 md:mb-0">
                            Showing{" "}
                            {(currentPage - 1) * reservationsPerPage + 1} to{" "}
                            {Math.min(
                                currentPage * reservationsPerPage,
                                reservations.length
                            )}{" "}
                            of {reservations.length} frozen periods
                        </div>
                        <div className="flex space-x-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded-lg ${
                                        currentPage === i + 1
                                            ? "bg-[#D8AB3E] text-slate-900 font-medium"
                                            : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {i + 1}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Modal Popup Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-slate-700/50 w-full max-w-md"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-[#D8AB3E]">
                                    {formData.id
                                        ? "Edit Frozen Period"
                                        : "Add Frozen Period"}
                                </h2>
                                <motion.button
                                    onClick={closeModal}
                                    className="text-slate-400 hover:text-white"
                                    whileHover={{ rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <RiCloseLine className="text-xl" />
                                </motion.button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-slate-300 flex items-center">
                                        <RiCalendarLine className="mr-2" />{" "}
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-[#D8AB3E] focus:outline-none text-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-slate-300 flex items-center">
                                        <RiCalendarLine className="mr-2" /> End
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-[#D8AB3E] focus:outline-none text-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-slate-300">
                                        Reason
                                    </label>
                                    <input
                                        type="text"
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-[#D8AB3E] focus:outline-none text-white"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <motion.button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700 transition"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        className="px-4 py-2 bg-[#D8AB3E] text-slate-900 font-medium rounded-lg hover:bg-[#D8AB3E]/90 transition"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {formData.id ? "Update" : "Create"}
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default AddFrozen;
