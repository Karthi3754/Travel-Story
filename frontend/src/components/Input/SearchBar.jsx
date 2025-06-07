import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`w-80 flex items-center px-4 bg-white border rounded-full transition-all duration-300 ${
      isFocused ? 'border-sky-500 shadow-sm shadow-sky-100' : 'border-slate-200'
    }`}>
      <FaMagnifyingGlass 
        className={`transition-colors ${isFocused ? 'text-sky-600' : 'text-slate-400'}`} 
        onClick={handleSearch} 
      />
      
      <input 
        type="text"
        placeholder="Search Notes"
        className="w-full text-sm bg-transparent py-3 px-3 outline-none text-slate-700"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {value && (
        <button
          onClick={onClearSearch}
          className="flex items-center justify-center w-8 h-8 transition-colors hover:bg-slate-100 rounded-full"
          aria-label="Clear search"
        >
          <IoMdClose className="text-lg text-slate-500 hover:text-slate-700" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;