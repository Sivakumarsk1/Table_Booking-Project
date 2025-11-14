import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Users, MapPin, Clock, CalendarDays } from "lucide-react";
const localizer = momentLocalizer(moment);

const CalendarComponent = ({ selectedDate, handleDateClick, events, dayPropGetter }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-[#D8AB3E]" />
        <h2 className="text-xl font-semibold">Select Date</h2>
        <span>
          Your Selected Date: 
          {
            <span className="text-[#D8AB3E]">
              {selectedDate
                ? moment(selectedDate).format("MMMM D, YYYY")
                : "None"}
            </span>
          }
        </span>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 350 }}
        onSelectSlot={({ start }) => handleDateClick(start)}
        views={["month"]}
        selectable
        dayPropGetter={dayPropGetter}
        min={moment().startOf("month").toDate()}
        max={moment().add(30, "day").toDate()}
        className="rounded-xl overflow-hidden bg-gray-900/50"
      />
    </div>
  );
};

export default CalendarComponent;