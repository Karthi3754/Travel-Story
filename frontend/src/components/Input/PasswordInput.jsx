import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className={`flex items-center bg-white px-4 py-3 border rounded-lg transition-all duration-300 ${
      isFocused ? 'border-sky-500 shadow-sm shadow-sky-100' : 'border-slate-200 hover:border-slate-300'
    }`}>
      <input 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder || "Password"}
        type={isShowPassword ? "text" : "password"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full text-sm bg-transparent mr-3 outline-none text-slate-700" 
      />

      <button
        type="button"
        onClick={toggleShowPassword}
        className="flex items-center justify-center w-10 h-10 transition-colors hover:bg-slate-100 rounded-full"
        aria-label={isShowPassword ? "Hide password" : "Show password"}
      >
        {isShowPassword ? (
          <FaRegEye 
            size={20} 
            className="text-sky-600" 
          /> 
        ) : (
          <FaRegEyeSlash 
            size={20} 
            className="text-slate-400" 
          /> 
        )}
      </button>
    </div>
  );
};

export default PasswordInput;