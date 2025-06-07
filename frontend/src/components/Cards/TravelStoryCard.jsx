import moment from "moment/moment";
import React from 'react';
import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineCalendarMonth } from "react-icons/md";

const TravelStoryCard = ({ 
  imgUrl,
  title,
  date,
  story,
  visitedLocation,
  isFavourite,
  onFavouriteClick,
  onClick,
}) => {
  // Handle card click but prevent it from triggering when favorite button is clicked
  const handleCardClick = (e) => {
    // Call the onClick handler passed from parent
    onClick && onClick();
  };

  // Handle favorite button click with stopPropagation to prevent card click
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent the card click event from firing
    onFavouriteClick && onFavouriteClick();
  };

  return (
    <div 
      className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 ease-in-out relative cursor-pointer group"
      onClick={handleCardClick} // Add click handler to the entire card
      role="button"
      aria-label={`View details for ${title}`}
      tabIndex={0} // Make card focusable for accessibility
    >
      <div className="relative overflow-hidden">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <button 
          className="w-10 h-10 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-full border border-white/50 absolute top-4 right-4 shadow-md transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleFavoriteClick} // Use specific handler for favorite button
          aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
          type="button"
        >
          <FaHeart 
            className={`transition-colors duration-300 ${isFavourite ? "text-red-500" : "text-slate-400 group-hover:text-red-400"}`}
            size={16}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start gap-3 mb-2">
          <div className="flex-1">
            <h6 className="text-base font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{title}</h6>
            <div className="flex items-center gap-1 mt-1 text-slate-500">
              <MdOutlineCalendarMonth className="text-sm" />
              <span className="text-xs">
                {date ? moment(date).format("Do MMM YYYY") : "-"}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 mt-2 line-clamp-2">
          {story}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {visitedLocation.map((location, index) => (
            <span 
              key={index}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-700 bg-cyan-100 rounded-full px-3 py-1"
            >
              <GrMapLocation className="text-xs" />
              {location}
            </span>
          ))}
        </div>
      </div>
      
      {/* Visual indicator that the card is clickable */}
      <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </div>
  );
};

export default TravelStoryCard;