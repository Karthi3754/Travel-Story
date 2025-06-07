import moment from "moment";
import React from "react";
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import { GrMapLocation  } from "react-icons/gr";

const ViewTravelStory = ({storyInfo, onClose, onEditClick, onDeleteClick}) => {
    return (
        <div className="relative">
          <div className="flex items-center justify-end mb-2">
            <div>
              <div className="flex items-center gap-3 bg-cyan-50 p-2 rounded-l-lg shadow-sm">
                <button className="btn-small flex items-center gap-1 hover:bg-cyan-600 transition-colors" onClick={onEditClick}>
                  <MdUpdate className="text-lg"/> 
                  <span>EDIT</span>
                </button>
      
                <button className="btn-small btn-delete flex items-center gap-1 hover:bg-red-700 transition-colors" onClick={onDeleteClick}>
                  <MdDeleteOutline className="text-lg" /> 
                  <span>DELETE</span>
                </button>
          
                <button className="hover:bg-slate-100 p-1 rounded-full transition-colors" onClick={onClose}>
                  <MdClose className="text-xl text-slate-500" />
                </button>
              </div>
            </div>
          </div>
      
          <div className="bg-white rounded-lg">
            <div className="flex-1 flex flex-col gap-3 py-4">
              <h1 className="text-3xl font-semibold text-slate-800">
                {storyInfo && storyInfo.title}
              </h1>
      
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <span className="text-sm text-slate-500 font-medium">
                  {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
                </span>
      
                <div className="inline-flex items-center gap-2 text-sm text-cyan-700 bg-cyan-100 rounded-full px-4 py-1.5">
                  <GrMapLocation className="text-sm" />
                  <span className="font-medium">
                    {storyInfo && storyInfo.visitedLocation.map((item, index) => 
                      storyInfo.visitedLocation.length === index+1 ? `${item}` : `${item}, `
                    )}
                  </span>
                </div>
              </div>
            </div>
      
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img
                src={storyInfo && storyInfo.imageUrl}
                alt={storyInfo && storyInfo.title}
                className="w-full h-auto object-cover rounded-xl shadow-md"
              />
            </div>
      
            <div className="mt-4 bg-slate-50 p-6 rounded-lg">
              <p className="text-base text-slate-700 leading-7 text-justify whitespace-pre-line">
                {storyInfo.story}
              </p>
            </div>
          </div>
        </div>
      );
};

export default ViewTravelStory;