import React from 'react';

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-4 py-8 animate-fadeIn">
      <div className="relative mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 blur-lg"></div>
        <img 
          src={imgSrc} 
          alt="No content available" 
          className="w-48 md:w-56 relative drop-shadow-md transition-transform duration-300 hover:scale-105" 
        />
      </div>

      <p className="max-w-md text-center text-base font-medium text-slate-600 leading-relaxed">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
