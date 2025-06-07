import React, { useEffect, useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ImageSelector = ({ image, setImage, handleDeleteImg }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if(file) {
      setImage(file);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    handleDeleteImg();
  };

  // Handle drag and drop functionality
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  };

  useEffect(() => {
    if(typeof image === 'string') {
      setPreviewUrl(image);
    } else if(image) {
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if(previewUrl && typeof previewUrl !== 'string' && image instanceof File) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image]);

  return (
    <div className="group">
      <input 
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div 
          className={`w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-white rounded-lg border-2 border-dashed transition-all duration-300 ${isDragging ? 'border-sky-500 bg-sky-50' : 'border-slate-200 hover:border-sky-400'}`}
          onClick={onChooseFile}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          aria-label="Upload image"
        >
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-sky-50 to-cyan-50 rounded-full border border-sky-100 shadow-md group-hover:scale-110 transition-transform duration-300">
            <FaRegFileImage className="text-2xl text-sky-500" />
          </div>

          <div className="text-center px-4">
            <p className="text-base font-medium text-slate-700 mb-1">Drop your image here</p>
            <p className="text-sm text-slate-500">Or click to browse files</p>
          </div>
        </div> 
      ) : (
        <div className="w-full relative rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow duration-300">
          <img 
            src={previewUrl} 
            alt="Selected" 
            className="w-full h-[220px] object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <button 
            className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 transform opacity-0 group-hover:opacity-100 shadow-md"
            onClick={handleRemoveImage}
            aria-label="Remove image"
          >
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;