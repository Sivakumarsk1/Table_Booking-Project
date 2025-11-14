import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "../hooks/useDebounce";
import ShowRedirectModel from "../components/user/reg_model";
import { cancelBooking } from "../redux/actions/bookingActions";
import axios from "axios";

function Reservation() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [reservations] = useState(generateSampleReservations());
    const reservationsPerPage = 5;
    const [bookingData, setBookingData] = useState({});
    const bookings = useSelector((state) => state.main.bookings);
    const [ModelFlag, setModelFlag] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        request: "",
        eventType: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
    });

    const debouncedSearchTerm = useDebounce(formData.email, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            axios
                .post("api/user/user-reg-check", { email: debouncedSearchTerm })
                .then((res) => {
                    if (res.data.result.length > 0) {
                        setModelFlag(true);
                    }
                });
            console.log("Searching for:", debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation =
        indexOfLastReservation - reservationsPerPage;
    const currentReservations = reservations.slice(
        indexOfFirstReservation,
        indexOfLastReservation
    );
    const totalPages = Math.ceil(reservations.length / reservationsPerPage);

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: "",
            email: "",
        };

        // Name validation (at least 3 letters)
        if (formData.name.trim().length < 3) {
            newErrors.name = "Name must contain at least 3 letters";
            valid = false;
        }

        // Email validation (must be @gmail.com)
        if (!formData.email.endsWith("@gmail.com")) {
            newErrors.email = "Please use a @gmail.com email address";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log(formData);
        const datatoSend = {
            ...formData,
            bookings,
        };

        try {
            const response = await axios.post("api/user/bk-ant", datatoSend);
            if (response.status === 201) {
                setFormData({
                    name: "",
                    email: "",
                    request: "",
                    eventType: "",
                });
                dispatch(cancelBooking(0));

                toast.success(" Booking confirmed successfully! ✅");
                console.log("Booking saved successfully:", response.data);
            } else {
                console.warn("Unexpected status code:", response.status);
            }
            console.log("Booking saved:", response.data);
        } catch (error) {
            console.error("Error saving booking:", error.message);
        }
        console.log(datatoSend);
    };

    return (
        <div className="min-h-screen pt-20 bg-dark">
            <div className="container mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-[#D8AB3E] mb-8 text-center">
                        Make a Reservation
                    </h1>

                    {/* Reservation Form */}
                    <form
                        className="bg-secondary p-8 rounded-lg shadow-xl mb-12"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-3">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className={`w-full px-4 py-2 rounded bg-dark border ${
                                        errors.name ? "border-red-500" : "border-[#D8AB3E]"
                                    } focus:border-primary focus:outline-none`}
                                    placeholder="Your name"
                                    onChange={handleInputChange}
                                    value={formData.name}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className={`w-full px-4 py-2 rounded bg-dark border ${
                                        errors.email ? "border-red-500" : "border-[#D8AB3E]"
                                    } focus:border-primary focus:outline-none`}
                                    placeholder="your@gmail.com"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-medium mb-3">
                                Event Type
                            </label>
                            <select
                                name="eventType"
                                className="w-full mt-1 px-4 py-2 rounded bg-dark border border-[#D8AB3E] focus:border-primary focus:outline-none"
                                value={formData.eventType}
                                onChange={handleInputChange}
                            >
                                <option value="">Select an event (optional)</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Special Event">
                                    Special Event
                                </option>
                                <option value="Marriage">Marriage</option>
                                <option value="Employee Farewell">
                                    Employee Farewell
                                </option>
                                <option value="Anniversary">Anniversary</option>
                                <option value="Corporate Event">
                                    Corporate Event
                                </option>
                            </select>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium mb-2">
                                Special Requests (optional)
                            </label>
                            <textarea
                                className="w-full px-4 py-2 rounded bg-dark border border-[#D8AB3E] focus:border-primary focus:outline-none"
                                rows="4"
                                placeholder="Any special requests..."
                                name="request"
                                onChange={handleInputChange}
                                value={formData.request}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-6 bg-[#D8AB3E] text-dark py-3 rounded font-semibold hover:bg-[#d8ab3e6b]/90 transition"
                        >
                            Reserve Now
                        </button>
                    </form>

                    {/* Existing Reservations */}
                </motion.div>
            </div>
            <ShowRedirectModel
                open={ModelFlag}
                onClose={() => setModelFlag(false)}
            />
        </div>
    );
}

function generateSampleReservations() {
    return Array.from({ length: 15 }, (_, i) => ({
        name: `Guest ${i + 1}`,
        date: new Date(2024, 2, i + 1).toISOString(),
        time: "7:00 PM",
        status: ["Confirmed", "Pending", "Completed"][
            Math.floor(Math.random() * 3)
        ],
    }));
}

export default Reservation;
