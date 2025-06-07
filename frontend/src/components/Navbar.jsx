import React from "react";

import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./Input/SearchBar";

const Navbar = ({ userInfo,
    searchQuery,
    setSearchQuery,
    onSearchNote,
    handleClearSearch
 }) => {

    const isToken = localStorage.getItem("token");
    const navigate = useNavigate();
    
    const onLogout = () =>{
        localStorage.clear();
        navigate("/");
    };

    const handleSearch = () => {
        if(searchQuery){
            onSearchNote(searchQuery);
        }
    };

    const onClearSearch = () => {
        handleClearSearch();
        setSearchQuery("");
    };

    return (
        <div className="bg-white flex items-center justify-between px-4 md:px-8 py-3 shadow-md sticky top-0 z-50 border-b border-slate-100">
          <div className="flex items-center">
            <img src="/assets/images/logo3.jpg" alt="Travel Story" className="h-8 md:h-10" />
          </div>
      
          {isToken && ( 
            <div className="flex items-center justify-between flex-1 md:flex-none md:justify-end gap-3 md:gap-6 ml-4 md:ml-0">
              <div className="w-full md:w-auto max-w-md">
                <SearchBar
                  value={searchQuery}
                  onChange={({ target }) => {
                    setSearchQuery(target.value);
                  }}
                  handleSearch={handleSearch}
                  onClearSearch={onClearSearch}
                />
              </div>
      
              <div className="flex-shrink-0">
                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
              </div>
            </div>
          )}
        </div>
      );
};

export default Navbar;