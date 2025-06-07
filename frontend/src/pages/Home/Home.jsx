import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../../components/Cards/EmptyCard";

import { DayPicker } from "react-day-picker";
import moment from "moment";
import FilterInfoTitle from "../../components/Cards/FilterInfoTitle";
import { getEmptyCardMessage } from "../../utils/helper";

const Home = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [allStories, setAllStories] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("");
    const [dateRange, setDateRange] = useState({ form: null, to: null });

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [openViewModal, setOpenViewModal] = useState({
        isShown: false,
        data: null,
    });

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    const getAllTravelStories = async () =>{
        try{
            const response = await axiosInstance.get("/get-all-stories");
            if(response.data && response.data.stories){
                setAllStories(response.data.stories);
            }
        }catch(error){
            console.log("An unexpected error occurred. Please try again.")
        }
    };

    const handleEdit = (data) => {
        setOpenAddEditModal({ isShown: true, type: "edit", data: data });
    };

    const handleViewStory = (data) => {
        setOpenViewModal({ isShown: true, data });
    };

    const updateIsFavourite = async (storyData) => {
        const storyId = storyData._id;

        try{
            const response = await axiosInstance.put(
                "/update-is-favourite/" + storyId,
                {
                    isFavourite: !storyData.isFavourite,
                }
            );

            if(response.data && response.data.story){
                toast.success("Story Updated Successfully");

                if(filterType === "search" && searchQuery){
                    onSearchStory(searchQuery);
                }else if(filterType === "date"){
                    filterStoriesByDate(dateRange);
                }else{
                    getAllTravelStories();
                }
            }
        }catch(error){
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    const deleteTravelStory = async (data) => {
        const storyId = data._id;

        try{
            const response = await axiosInstance.delete("/delete-story/" + storyId);

            if(response.data && !response.data.error){
                toast.error("Story Deleted Successfully");
                setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
                getAllTravelStories();
            }
        }catch(error){
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    const onSearchStory = async(query)=>{
        try{
            const response = await axiosInstance.get("/search", {
                params: {
                    query,
                },
            });

            if(response.data && response.data.stories){
                setFilterType("search");
                setAllStories(response.data.stories);
            }
        }catch(error){
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    const handleClearSearch = () => {
        setFilterType("");
        getAllTravelStories();
    };

    const filterStoriesByDate = async (day) => {
        try{
            const startDate = day.from ? moment(day.from).valueOf() : null;
            const endDate = day.to ? moment(day.to).valueOf() : null;
            if(startDate && endDate){
                const response = await axiosInstance.get("/travel-stories/filter", {
                    params : { startDate, endDate },
                });

                if(response.data && response.data.stories){
                    setFilterType("date");
                    setAllStories(response.data.stories);
                }
            }
        }catch(error){
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    const handleDayClick = (day) => {
        setDateRange(day);
        filterStoriesByDate(day);
    };

    const resetFilter = () => {
        setDateRange({ from: null, to: null });
        setFilterType("");
        getAllTravelStories();
    };

    useEffect(() => {
        getAllTravelStories();
        getUserInfo();

        return () => {};
    }, []);

    return (
        <>
          <Navbar 
            userInfo={userInfo} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onSearchNote={onSearchStory}
            handleClearSearch={handleClearSearch}
          />
      
          <div className="container mx-auto py-8 px-4 md:px-6">
            <FilterInfoTitle 
              filterType={filterType}
              filterDates={dateRange}
              onClear={() => {
                resetFilter();
              }}
            />
      
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                {allStories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allStories.map((item) => {
                      return (
                        <TravelStoryCard
                          key={item._id}
                          imgUrl={item.imageUrl}
                          title={item.title}
                          story={item.story}
                          date={item.visitedDate}
                          visitedLocation={item.visitedLocation}
                          isFavourite={item.isFavourite}
                          onClick={() => handleViewStory(item)}
                          onFavouriteClick={() => updateIsFavourite(item)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <EmptyCard 
                    imgSrc="/assets/images/download3.jpeg"
                    message={getEmptyCardMessage(filterType)}
                  />
                )}
              </div>
      
              <div className="w-full lg:w-[340px] sticky top-24">
                <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/40 rounded-xl overflow-hidden">
                  <div className="p-4">
                    <DayPicker
                      captionLayout="dropdown-buttons"
                      mode="range"
                      selected={dateRange}
                      onSelect={handleDayClick}
                      pagedNavigation
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 999,
              },
            }}
            appElement={document.getElementById("root")}
            className="model-box"
          >
            <AddEditTravelStory 
              type={openAddEditModal.type}
              storyInfo={openAddEditModal.data}
              onClose={() => {
                setOpenAddEditModal({ isShown: false, type: "add", data: null});
              }}
              getAllTravelStories={getAllTravelStories}
            />
          </Modal>
      
          <Modal
            isOpen={openViewModal.isShown}
            onRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 999,
              },
            }}
            appElement={document.getElementById("root")}
            className="model-box"
          >
            <ViewTravelStory
              storyInfo={openViewModal.data || null} 
              onClose={() => {
                setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
              }} 
              onEditClick={() => {
                setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
                handleEdit(openViewModal.data || null)
              }} 
              onDeleteClick={() => {
                deleteTravelStory(openViewModal.data || null);
              }}
            />
          </Modal>
      
          <button 
            className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-500 transition-colors duration-300 fixed right-6 md:right-10 bottom-6 md:bottom-10 shadow-lg shadow-primary/20"
            onClick={() => {
              setOpenAddEditModal({ isShown: true, type: "add", data: null });
            }}
          >
            <MdAdd className="text-2xl md:text-[32px] text-white" /> 
          </button>
      
          <ToastContainer />
        </>
      );
};

export default Home;