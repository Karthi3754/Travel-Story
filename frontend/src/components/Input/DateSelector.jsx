import React, { useState, useRef, useEffect } from "react";
import { MdOutlineDateRange, MdClose } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import moment from "moment";

const DateSelector = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  // Close date picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setOpenDatePicker(false);
      }
    }
    
    if (openDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDatePicker]);

  return (
    <div className="relative">
      <button 
        className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 bg-sky-100 hover:bg-sky-200 transition-colors duration-200 rounded-full px-4 py-2 cursor-pointer shadow-sm"
        onClick={() => setOpenDatePicker(true)}
        aria-label="Select date"
      >
        <MdOutlineDateRange className="text-lg" />
        <span>
          {date 
            ? moment(date).format("Do MMM YYYY")
            : moment().format("Do MMM YYYY")
          }
        </span>
      </button>

      {openDatePicker && (
        <div 
          ref={datePickerRef}
          className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl border border-sky-100 overflow-hidden animate-fadeIn"
          style={{ minWidth: '320px' }}
        >
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-sky-50 to-blue-50">
            <h4 className="font-medium text-sky-700">Select Date</h4>
            <button 
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-sky-100 transition-colors"
              onClick={() => setOpenDatePicker(false)}
              aria-label="Close date picker"
            >
              <MdClose className="text-lg text-sky-700" />
            </button>
          </div>
          <div className="p-2">
            <DayPicker
              captionLayout="dropdown-buttons"
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setOpenDatePicker(false);
              }}
              pagedNavigation
              className="custom-day-picker"
              classNames={{
                day_selected: "bg-sky-500 text-white rounded-full",
                day_today: "font-bold text-sky-700 border border-sky-200 rounded-full",
                button_reset: "text-sky-600 font-medium",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;