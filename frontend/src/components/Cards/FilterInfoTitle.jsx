import moment from "moment";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";

const FilterInfoTitle = ({ filterType, filterDates, onClear }) => {
  const DateRangeChip = ({ date }) => {
    const startDate = date?.from
      ? moment(date?.from).format("Do MMM YYYY")
      : "N/A";
    const endDate = date?.to 
      ? moment(date?.to).format("Do MMM YYYY") 
      : "N/A";

    return (
      <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-colors duration-200 shadow-sm">
        <p className="text-xs font-medium text-slate-700">
          {startDate} - {endDate}
        </p>

        <button 
          onClick={onClear}
          className="ml-1 text-slate-500 hover:text-slate-700 transition-colors rounded-full p-1 hover:bg-slate-300/50"
          aria-label="Clear filter"
        >
          <MdOutlineClose className="text-sm" />
        </button>
      </div>
    );
  };

  return filterType && (
    <div className="mb-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-slate-100">
      {filterType === "search" ? (
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-1.5 rounded-full">
            <IoFilterOutline className="text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-slate-800">Search Results</h3>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-1.5 rounded-full">
              <IoFilterOutline className="text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-800">Travel Stories from</h3>
          </div>

          <DateRangeChip date={filterDates} />
        </div>
      )}
    </div>
  );
};

export default FilterInfoTitle;