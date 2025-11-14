import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addBooking } from "../redux/actions/bookingActions";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";

import CalendarComponent from "./components/CalendarComponent";
import TimeSlotComponent from "./components/TimeSlotComponent";
import TableSelectionComponent from "./components/TableSelectionComponent";
import ReservationSummaryComponent from "./components/ReservationSummaryComponent";

const TableBooking = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // Initially empty
  const [selectedTime, setSelectedTime] = useState("");
  const [tables, setTables] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [frozenData, setFrozenData] = useState([]);
  const [timeSlot, setTimeslot] = useState(["Loading..."]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch booking and frozen dates
  const fetchBookings = useCallback(() => {
    axios.get("api/user/getBooking")
      .then((res) => setBookingData(res.data.result))
      .catch((err) => alert("Failed to load bookings."));

    axios.get("api/user/Frozen")
      .then((res) => setFrozenData(res.data.result))
      .catch((error) => alert("Failed to load frozen dates."));
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Fetch tables and time slots
  useEffect(() => {
    axios.get("/api/user/all-in-tbl")
      .then((res) => setTables(res.data.tables))
      .catch((error) => console.error("Error fetching tables:", error));

    axios.get("/api/admin/time-slots")
      .then((res) => {
        const timeSlot = res.data.slot.map((item) => {
          const [hours, minutes] = item.start_time.split(":");
          return `${hours}:${minutes}`;
        });
        setTimeslot(timeSlot);
      })
      .catch((error) => console.error("Error fetching time slots:", error));
  }, []);

  // Check if a table is available
  const isTableAvailable = (tableId) => {
    return !bookingData.some(
      (booking) =>
        booking.tableId === tableId &&
        booking.date === selectedDate &&
        booking.time === selectedTime
    );
  };

  // Handle date selection
  const handleDateClick = (date) => {
    const selectedDateMoment = moment(date).tz("Asia/Kolkata").format("YYYY-MM-DD");
    const currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

    if (moment(selectedDateMoment).isBefore(currentDate, "day")) {
      alert("You cannot select a past date.");
      return;
    }

    if (moment(selectedDateMoment).isAfter(moment().add(30, "days").format("YYYY-MM-DD"), "day")) {
      alert("You can only select dates up to 30 days ahead.");
      return;
    }

    if (frozenData.some((frozenDate) =>
      moment(selectedDateMoment).isBetween(
        moment(frozenDate.start_date).format("YYYY-MM-DD"),
        moment(frozenDate.end_date).format("YYYY-MM-DD"),
        "day",
        "[]"
      )
    )) {
      alert("This date is frozen and cannot be selected.");
      return;
    }

    setSelectedDate(selectedDateMoment);
    setSelectedTime(""); // Reset time when date changes
    setSelectedTable(null); // Reset table when date changes
  };

  // Handle time selection (only if a date is chosen)
  const handleTimeSelect = (time) => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }
    setSelectedTime(time);
    setSelectedTable(null); // Reset table when time changes
  };

  // Handle table selection (only if date & time are chosen)
  const handleTableSelect = (tableId) => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time first.");
      return;
    }

    if (isTableAvailable(tableId)) {
      const table = tables.find((t) => t.id === tableId);
      setSelectedTable(table);
    } else {
      alert("This table is already booked for the selected date and time.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !selectedTable) {
      alert("Please select a date, time, and table before proceeding.");
      return;
    }

    const newBooking = { selectedTable, selectedDate, selectedTime };
    dispatch(addBooking(newBooking));
    navigate("/reservation");
  };

  // Custom styling for calendar days
  const dayPropGetter = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const isFrozen = frozenData.some((frozenDate) =>
      moment(formattedDate).isBetween(
        moment(frozenDate.start_date).format("YYYY-MM-DD"),
        moment(frozenDate.end_date).format("YYYY-MM-DD"),
        "day",
        "[]"
      )
    );

    const isPastDate = moment(formattedDate).isBefore(moment().format("YYYY-MM-DD"), "day");
    const isBeyond30Days = moment(formattedDate).isAfter(moment().add(30, "days").format("YYYY-MM-DD"), "day");

    return {
      style: {
        backgroundColor: formattedDate === selectedDate
          ? "#D8AB3E"
          : isFrozen
          ? "#ddd"
          : isPastDate
          ? "#e0e0e063"
          : isBeyond30Days
          ? "#f0f0f0"
          : undefined,
        cursor: isFrozen || isPastDate || isBeyond30Days ? "not-allowed" : "pointer",
        visibility: isFrozen || isBeyond30Days ? "hidden" : "visible",
        color: formattedDate === selectedDate ? "white" : undefined,
      },
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#D8AB3E] to-yellow-500"
        >
          Reserve Your Perfect Table
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-8">
            <TimeSlotComponent
              timeSlot={timeSlot}
              selectedTime={selectedTime}
              setSelectedTime={handleTimeSelect}
            />
            <CalendarComponent
              selectedDate={selectedDate}
              handleDateClick={handleDateClick}
              dayPropGetter={dayPropGetter}
            />
          </div>

          <TableSelectionComponent
            tables={tables}
            selectedTable={selectedTable}
            handleTableSelect={handleTableSelect}
            isTableAvailable={isTableAvailable}
          />
        </div>

        {selectedTable && selectedDate && selectedTime && (
          <ReservationSummaryComponent
            selectedTable={selectedTable}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default TableBooking;
