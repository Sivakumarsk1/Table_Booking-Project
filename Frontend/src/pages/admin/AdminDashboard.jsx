import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { RiCalendarLine, RiTableLine, RiUserLine } from "react-icons/ri";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function AdminDashboard() {
    const [dashboardStats, setDashboardStats] = useState({
        totalBookings: 0,
        totalSeats: 0,
        totalTables: 0,
    });

    const stats = [
        {
            icon: RiCalendarLine,
            label: "Total Reservations",
            value: dashboardStats.totalBookings,
            change: "+12%",
            positive: true,
            color: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
            icon: RiTableLine,
            label: "Tables Available",
            value: `${dashboardStats.totalTables}`,
            change: "-2",
            positive: false,
            color: "bg-gradient-to-br from-amber-500 to-orange-600",
        },
        {
            icon: RiUserLine,
            label: "Today's Guests",
            value: dashboardStats.totalSeats,
            change: "+5",
            positive: true,
            color: "bg-gradient-to-br from-emerald-500 to-teal-600",
        },
    ];

    const [latustBooking, setLatustBooking] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`/api/admin/lst_bk`, {
                params: { page: currentPage, limit: 5 },
            })
            .then((res) => {
                setLatustBooking(res.data.result);
                setTotalPages(Math.ceil(res.data.total / 5));
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [currentPage]);

    useEffect(() => {
        setIsLoading(true);
        axios.get("api/admin/das_datums").then((res) => {
            const { totalBookings, totalSeats, totalTables } = res.data.result;
            setDashboardStats({ totalBookings, totalSeats, totalTables });
            setTotalPages(Math.ceil(totalBookings / 5));
            setIsLoading(false);
        });
    }, []);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
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

    const statCardVariants = {
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
        hover: {
            y: -10,
            scale: 1.03,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
            transition: {
                duration: 0.3,
            },
        },
    };

    const activityItemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.05,
                type: "spring",
                stiffness: 120,
            },
        }),
        hover: {
            scale: 1.02,
            backgroundColor: "rgba(30, 41, 59, 0.7)",
            transition: {
                duration: 0.2,
            },
        },
    };

    const shimmerVariants = {
        initial: { backgroundPosition: "-200% 0" },
        animate: {
            backgroundPosition: "200% 0",
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
            },
        },
    };

    const pulseVariants = {
        initial: { opacity: 0.6, scale: 0.98 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-6"
        >
            {/* Animated background elements */}
            <motion.div
                className="absolute top-0 left-0 w-full h-64 -z-10 opacity-10"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 0.1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 left-20 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-20 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </motion.div>

            <motion.h1
                className="absolute bottom-10 right-10 text-4xl font-bold text-white mb-0 relative"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                Dashboard
            </motion.h1>

            {/* Stats Cards */}
            <motion.div
                className="right-5 grid grid-cols-1 md:grid-cols-4 gap-3 mb-0 relative"
                style={{ top: "-1.5rem" }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={statCardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className={`${stat.color} p-6 rounded-2xl shadow-lg relative overflow-hidden`}
                    >
                        {/* Animated floating dots */}
                        <motion.div
                            className="absolute top-0 right-0 w-16 h-16 opacity-20"
                            animate={{
                                y: [0, 10, 0],
                                x: [0, 5, 0],
                            }}
                            transition={{
                                duration: 4 + index,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </motion.div>

                        {/* Glow effect */}
                        <motion.div
                            className="absolute -inset-1 bg-white opacity-0 rounded-2xl filter blur-md"
                            whileHover={{ opacity: 0.1 }}
                        />

                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <motion.div
                                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm inline-flex items-center justify-center"
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                >
                                    <stat.icon className="text-2xl text-white" />
                                </motion.div>
                                <h3 className="text-sm text-white/80 mt-3">
                                    {stat.label}
                                </h3>
                                {isLoading ? (
                                    <motion.div
                                        variants={shimmerVariants}
                                        initial="initial"
                                        animate="animate"
                                        className="h-8 w-24 bg-gradient-to-r from-white/20 via-white/40 to-white/20 bg-[length:200%_100%] rounded mt-2"
                                    />
                                ) : (
                                    <motion.p
                                        className="text-3xl font-bold mt-2 text-white"
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring" }}
                                    >
                                        {stat.value}
                                    </motion.p>
                                )}
                            </div>
                            <motion.div
                                className="flex flex-col items-end"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        stat.positive
                                            ? "bg-green-900/30 text-green-200"
                                            : "bg-red-900/30 text-red-200"
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {stat.change}
                                </motion.span>
                                <motion.div
                                    className="mt-2 text-xs text-white/60"
                                    animate={{
                                        opacity: [0.6, 1, 0.6],
                                    }}
                                    transition={{
                                        duration: 2 + index,
                                        repeat: Infinity,
                                    }}
                                >
                                    {stat.positive
                                        ? "↑ Increase"
                                        : "↓ Decrease"}
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <motion.h2
                        className="text-2xl font-bold text-white"
                        whileHover={{ x: 5 }}
                    >
                        Recent Activity
                    </motion.h2>
                    <motion.div
                        className="text-sm text-slate-400 flex items-center"
                        variants={pulseVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                        Live Updates
                    </motion.div>
                </div>

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    variants={shimmerVariants}
                                    initial="initial"
                                    animate="animate"
                                    className="h-16 w-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] rounded-lg"
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-3"
                        >
                            <AnimatePresence>
                                {latustBooking.map((bookings, index) => (
                                    <motion.div
                                        key={index}
                                        custom={index}
                                        variants={activityItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, x: 20 }}
                                        whileHover="hover"
                                        className="flex items-center justify-between py-4 px-5 bg-slate-800/50 rounded-xl hover:shadow-lg cursor-pointer transition-all border border-slate-700/30"
                                    >
                                        <div className="flex items-center">
                                            <motion.div
                                                className="mr-4 relative"
                                                whileHover={{ rotate: 15 }}
                                            >
                                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                    <RiCalendarLine className="text-blue-400" />
                                                </div>
                                                {index === 0 && (
                                                    <motion.div
                                                        className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"
                                                        animate={{
                                                            scale: [1, 1.2, 1],
                                                        }}
                                                        transition={{
                                                            duration: 1.5,
                                                            repeat: Infinity,
                                                        }}
                                                    />
                                                )}
                                            </motion.div>
                                            <div>
                                                <p className="font-medium text-white">
                                                    New Reservation
                                                </p>
                                                <p className="text-sm text-slate-400">
                                                    Table {bookings.number} •{" "}
                                                    {bookings.seats} seats •{" "}
                                                    {bookings.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <motion.div
                                                className={`px-3 py-1 rounded-full text-xs mr-4 ${
                                                    index === 0
                                                        ? "bg-emerald-900/30 text-emerald-400"
                                                        : "bg-slate-700/50 text-slate-400"
                                                }`}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {bookings.time_duration_days !==
                                                0
                                                    ? `${bookings.time_duration_days} Days ago`
                                                    : bookings.time_duration_hours !==
                                                      0
                                                    ? `${bookings.time_duration_hours} Hours ago`
                                                    : bookings.time_duration_minutes !==
                                                      0
                                                    ? `${bookings.time_duration_minutes} Minutes ago`
                                                    : "Just now"}
                                            </motion.div>
                                            <motion.div
                                                className="w-2 h-2 rounded-full bg-blue-400"
                                                animate={{
                                                    opacity: [0.4, 1, 0.4],
                                                }}
                                                transition={{
                                                    duration: 1.5 + index / 2,
                                                    repeat: Infinity,
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MUI Pagination */}
                <motion.div
                    className="flex justify-center items-center mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Stack spacing={4}>
                        <Pagination
                            count={totalPages}
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
                                        color: "white",
                                        backgroundColor: "#334155",
                                        "&.Mui-selected": {
                                            backgroundColor: "#3B82F6",
                                            color: "white",
                                            transform: "scale(1.1)",
                                            boxShadow:
                                                "0 0 10px rgba(59, 130, 246, 0.5)",
                                        },
                                        "&:hover": {
                                            backgroundColor: "#3B82F6",
                                            transform: "scale(1.1)",
                                        },
                                        "&.Mui-disabled": {
                                            color: "#64748B",
                                            backgroundColor: "#1E293B",
                                        },
                                        transition: "all 0.3s ease",
                                    }}
                                />
                            )}
                            siblingCount={1}
                            boundaryCount={1}
                        />
                    </Stack>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default AdminDashboard;
