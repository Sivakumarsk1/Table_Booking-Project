import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function AdminReservations() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchDate, setSearchDate] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [reservations, setReservations] = useState([]);
    const reservationsPerPage = 5;
    const [totalReservations, setTotalReservations] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editReservation, setEditReservation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const statusColors = {
        Confirmed: {
            bg: "bg-green-100 dark:bg-green-900/30",
            text: "text-green-800 dark:text-green-300",
            border: "border-green-200 dark:border-green-800",
            icon: (
                <svg
                    className="ml-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        Cancelled: {
            bg: "bg-red-100 dark:bg-red-900/30",
            text: "text-red-800 dark:text-red-300",
            border: "border-red-200 dark:border-red-800",
            icon: (
                <svg
                    className="ml-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        Pending: {
            bg: "bg-yellow-100 dark:bg-yellow-900/30",
            text: "text-yellow-800 dark:text-yellow-300",
            border: "border-yellow-200 dark:border-yellow-800",
            icon: (
                <svg
                    className="ml-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        Expired: {
            bg: "bg-gray-200 dark:bg-gray-700/50",
            text: "text-gray-700 dark:text-gray-300",
            border: "border-orange-300 dark:border-orange-600",
            icon: (
                <svg
                    className="ml-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
    };

    const fetchReservations = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/admin/gd_bk_data", {
                params: {
                    date: searchDate,
                    status: searchStatus,
                    query: searchQuery,
                    page: currentPage,
                    limit: reservationsPerPage,
                },
            });
            setReservations(response.data.result);
            setTotalReservations(response.data.total);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteReservation = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this reservation?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/admin/reservations/${id}`);
            fetchReservations();
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete reservation");
        }
    };

    useEffect(() => {
        fetchReservations();
    }, [searchDate, searchStatus, searchQuery, currentPage]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleUpdateReservation = async () => {
        try {
            await axios.put("/api/admin/update_booking", {
                id: editReservation.id,
                email: editReservation.email,
                bk_dates: editReservation.date,
                eventType:editReservation.eventType,
                table: editReservation.table,
                status: editReservation.status,
                table_status: editReservation.table_status,
            });

            fetchReservations();
            setShowEditModal(false);
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update reservation");
        }
    };

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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-6 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 min-h-screen"
        >
            {/* Animated background elements */}
            <motion.div
                className="fixed inset-0 overflow-hidden -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D8AB3E] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </motion.div>

            <div className="max-w-7xl mx-auto">
                <motion.h1
                    className="text-3xl font-bold text-[#D8AB3E] mb-8 relative pb-2"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    Reservations Management
                    <motion.span
                        className="absolute bottom-0 left-0 w-24 h-1 bg-[#D8AB3E]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.h1>

                {/* Filters */}
                <motion.div
                    className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg dark:shadow-xl border border-gray-200 dark:border-slate-700/50 mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                                Filter by Date
                            </label>
                            <input
                                type="date"
                                value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 focus:border-[#D8AB3E] focus:outline-none text-gray-900 dark:text-white"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                                Filter by Status
                            </label>
                            <select
                                value={searchStatus}
                                onChange={(e) =>
                                    setSearchStatus(e.target.value)
                                }
                                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 focus:border-[#D8AB3E] focus:outline-none text-gray-900 dark:text-white"
                            >
                                <option value="">All Status</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Expired">Expired</option>
                            </select>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                                Search Guest
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 focus:border-[#D8AB3E] focus:outline-none text-gray-900 dark:text-white"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Reservations Table */}
                <motion.div
                    className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-xl border border-gray-200 dark:border-slate-700/50 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-slate-700/50">
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                        Guest
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                        Table
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700/50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8">
                                            <div className="flex justify-center">
                                                <motion.div
                                                    className="h-8 w-8 border-4 border-[#D8AB3E] border-t-transparent rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        ease: "linear",
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <AnimatePresence>
                                        {reservations.map((reservation) => {
                                            const status =
                                                reservation.status ||
                                                "Confirmed";
                                            const colors =
                                                statusColors[status] ||
                                                statusColors.Confirmed;

                                            return (
                                                <motion.tr
                                                    key={reservation.id}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                    className={`hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors ${
                                                        status === "Expired"
                                                            ? "opacity-80"
                                                            : ""
                                                    }`}
                                                    whileHover={{
                                                        scale: 1.005,
                                                    }}
                                                >
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <div className="font-medium text-gray-900 dark:text-white">
                                                                {
                                                                    reservation.name
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-slate-400">
                                                                {
                                                                    reservation.email
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <div className="text-gray-900 dark:text-white">
                                                                {
                                                                    reservation.date
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-slate-400">
                                                                {
                                                                    reservation.time
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                                                        Table{" "}
                                                        {reservation.table}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <motion.div
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`}
                                                            whileHover={{
                                                                scale: 1.05,
                                                            }}
                                                        >
                                                            {status}
                                                            {colors.icon}
                                                        </motion.div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex space-x-2">
                                                            <motion.button
                                                                onClick={() => {
                                                                    setEditReservation(
                                                                        reservation
                                                                    );
                                                                    setShowEditModal(
                                                                        true
                                                                    );
                                                                }}
                                                                className="px-3 py-1 text-sm rounded bg-[#D8AB3E]/10 text-[#D8AB3E] hover:bg-[#D8AB3E]/20 transition"
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.95,
                                                                }}
                                                            >
                                                                Edit
                                                            </motion.button>
                                                            <motion.button
                                                                onClick={() =>
                                                                    handleDeleteReservation(
                                                                        reservation.id
                                                                    )
                                                                }
                                                                className="px-3 py-1 text-sm rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.95,
                                                                }}
                                                            >
                                                                Delete
                                                            </motion.button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            );
                                        })}
                                    </AnimatePresence>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 dark:border-slate-700/50">
                        <div className="text-sm text-gray-500 dark:text-slate-400 mb-4 md:mb-0">
                            Showing {reservations.length} of {totalReservations}{" "}
                            reservations
                        </div>
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(
                                    totalReservations / reservationsPerPage
                                )}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                shape="rounded"
                                renderItem={(item) => (
                                    <PaginationItem
                                        slots={{
                                            previous: ArrowBackIcon,
                                            next: ArrowForwardIcon,
                                        }}
                                        {...item}
                                        sx={{
                                            color: "inherit",
                                            backgroundColor: "transparent",
                                            "&.Mui-selected": {
                                                backgroundColor: "#D8AB3E",
                                                color: "white",
                                                "&:hover": {
                                                    backgroundColor: "#D8AB3E",
                                                },
                                            },
                                            "&:hover": {
                                                backgroundColor:
                                                    "rgba(216, 171, 62, 0.1)",
                                            },
                                            "&.Mui-disabled": {
                                                color: "rgba(156, 163, 175)",
                                            },
                                            transition: "all 0.3s ease",
                                        }}
                                    />
                                )}
                                siblingCount={1}
                                boundaryCount={1}
                            />
                        </Stack>
                    </div>
                </motion.div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {showEditModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700/50 w-full max-w-md"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <h2 className="text-xl font-bold text-[#D8AB3E] mb-4">
                                Edit Reservation
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={editReservation?.email || ""}
                                        onChange={(e) =>
                                            setEditReservation({
                                                ...editReservation,
                                                email: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 focus:border-[#D8AB3E] focus:outline-none text-gray-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                                        Booking Date
                                    </label>
                                    <input
                                        type="date"
                                        value={editReservation?.date || ""}
                                        onChange={(e) =>
                                            setEditReservation({
                                                ...editReservation,
                                                date: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 focus:border-[#D8AB3E] focus:outline-none text-gray-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                                        Table Number
                                    </label>
                                    <input
                                        type="text"
                                        value={editReservation?.table || ""}
                                        onChange={(e) =>
                                            setEditReservation({
                                                ...editReservation,
                                                table: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 focus:border-[#D8AB3E] focus:outline-none text-gray-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                                        Status
                                    </label>
                                    <select
                                        value={
                                            editReservation?.status ||
                                            "Confirmed"
                                        }
                                        onChange={(e) =>
                                            setEditReservation({
                                                ...editReservation,
                                                status: e.target.value,
                                            })
                                        }
                                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none ${
                                            statusColors[
                                                editReservation?.status ||
                                                    "Confirmed"
                                            ].border
                                        } ${
                                            statusColors[
                                                editReservation?.status ||
                                                    "Confirmed"
                                            ].bg
                                        } ${
                                            statusColors[
                                                editReservation?.status ||
                                                    "Confirmed"
                                            ].text
                                        }`}
                                    >
                                        <option
                                            value="Confirmed"
                                            className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                        >
                                            Confirmed
                                        </option>
                                        <option
                                            value="Cancelled"
                                            className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                                        >
                                            Cancelled
                                        </option>
                                        <option
                                            value="Pending"
                                            className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                                        >
                                            Pending
                                        </option>
                                        <option
                                            value="Expired"
                                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                        >
                                            Expired
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <motion.button
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    onClick={handleUpdateReservation}
                                    className="px-4 py-2 bg-[#D8AB3E] text-slate-900 font-medium rounded-lg hover:bg-[#D8AB3E]/90 transition"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Save Changes
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default AdminReservations;
