import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      // Check for duplicates
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="flex items-center gap-2 text-sm text-cyan-700 bg-cyan-100 px-3 py-1.5 rounded-full shadow-sm group hover:bg-cyan-200 transition-colors duration-200"
            >
              <GrMapLocation className="text-sm" /> {tag}
              <button 
                onClick={() => handleRemoveTag(tag)}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-cyan-200 group-hover:bg-cyan-300 transition-colors"
                aria-label={`Remove ${tag}`}
              >
                <MdClose className="text-sm" />
              </button>
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <div className={`flex-1 relative border rounded-lg transition-all duration-300 ${
          isFocused ? 'border-cyan-500 shadow-sm shadow-cyan-100' : 'border-slate-200'
        }`}>
          <input 
            type="text" 
            value={inputValue}
            className="w-full text-sm bg-transparent px-4 py-2.5 outline-none text-slate-700"
            placeholder="Add Location"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          {inputValue && (
            <button
              onClick={addNewTag}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-cyan-100 hover:bg-cyan-200 transition-colors"
              aria-label="Add tag"
            >
              <MdAdd className="text-xl text-cyan-600" />
            </button>
          )}
        </div>

        <button
          className="min-w-10 h-10 flex items-center justify-center gap-1 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
          onClick={addNewTag}
          disabled={!inputValue.trim()}
          aria-label="Add location"
        >
          <MdAdd className="text-xl" />
          <span className="font-medium">Add</span>
        </button>
      </div>
    </div>
  );
};

export default TagInput;