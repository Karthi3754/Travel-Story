import React, { useState } from "react";
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import DateSelector from "../../components/Input/DateSelector";
import ImageSelector from "../../components/Input/ImageSelector";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import uploadImage from "../../utils/uploadImage";
import { toast } from "react-toastify";

const AddEditTravelStory = ({
    storyInfo,
    type,
    onClose,
    getAllTravelStories,
}) => {

    const [title, setTitle] = useState(storyInfo?.title || "");
    const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
    const [story, setStory] = useState(storyInfo?.story || "");
    const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
    const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);

    const [error, setError] = useState("");

    const addNewTravelStory = async () => {
        try{
            let imageUrl = "";

            if(storyImg){
                const imgUploadRes = await uploadImage(storyImg);

                imageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post("/add-travel-story", {
                title,
                story,
                imageUrl: imageUrl || "",
                visitedLocation,
                visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
            });

            if(response.data && response.data.story){
                toast.success("Story Added Successfully");

                getAllTravelStories();
                onClose();
            }
        }catch(error){
            if(
                error.response && error.response.data && error.response.data.message
            ) {
                setError(error.response.data.message);
            }else{
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    const updateTravelStory = async () => {
        const storyId = storyInfo._id;

        try{
            let imageUrl = "";

            let postData = {
                title,
                story,
                imageUrl: storyInfo.imageUrl || "",
                visitedLocation,
                visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
            };

            if(typeof storyImg === "object"){
                const imgUploadRes = await uploadImage(storyImg);
                imageUrl = imgUploadRes.imageUrl || "";

                postData = { ...postData, imageUrl: imageUrl };
            }

            const response = await axiosInstance.put(
                "/edit-story/" + storyId, 
                postData
            );

            if(response.data && response.data.story){
                toast.success("Story Updated Successfully");

                getAllTravelStories();
                onClose();
            }
        }catch(error){
            console.log(error);
            if(
                error.response && error.response.data && error.response.data.message
            ) {
                setError(error.response.data.message);
            }else{
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };
    
    const handleAddOrUpdateClick = () =>{
        console.log("Input Data:", {title, storyImg, story, visitedLocation, visitedDate});

        if(!title){
            setError("Please enter the title");
            return;
        }

        if(!story){
            setError("Please enter the story");
            return;
        }

        setError("");

        if(type === "edit"){
            updateTravelStory();
        }else{
            addNewTravelStory();
        }
    };

    const handleDeleteStoryImg = async () => {
        const deleteImgRes = await axiosInstance.delete("/delete-image", {
            params: {
                imageUrl: storyInfo.imageUrl,
            },
        });

        if(deleteImgRes.data){
            const storyId = storyInfo._id;

            const postData = {
                title,
                story,
                visitedLocation,
                visitedDate: moment().valueOf(),
                imageUrl: "",
            };

            const response = await axiosInstance.put("/edit-story/" + storyId, postData);
            setStoryImg(null);
        }
    };

    return (
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-2xl font-medium text-slate-800">
              {type === "add" ? "Add New Story" : "Update Story"}
            </h5>
      
            <div>
              <div className="flex items-center gap-3 bg-cyan-50 p-2 rounded-l-lg shadow-sm">
                {type === "add" ? (
                  <button className="btn-small flex items-center gap-1 hover:bg-cyan-600" onClick={handleAddOrUpdateClick}>
                    <MdAdd className="text-lg"/> 
                    <span>ADD STORY</span>
                  </button>
                ) : (
                  <button className="btn-small flex items-center gap-1 hover:bg-cyan-600" onClick={handleAddOrUpdateClick}>
                    <MdUpdate className="text-lg" /> 
                    <span>UPDATE STORY</span>
                  </button>
                )}
      
                <button className="hover:bg-slate-100 p-1 rounded-full transition-colors" onClick={onClose}>
                  <MdClose className="text-xl text-slate-500" />
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-xs pt-2 text-right font-medium">{error}</p>
              )}
            </div>
          </div>
      
          <div className="bg-white rounded-lg">
            <div className="flex-1 flex flex-col gap-4">
              <div className="space-y-2">
                <label className="input-label font-medium text-slate-600">TITLE</label>
                <input 
                  type="text"
                  className="text-2xl text-slate-800 outline-none w-full border-b border-slate-200 pb-2 focus:border-cyan-500 transition-colors"
                  placeholder="A Day at the Great Wall"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </div>
      
              <div className="my-4">
                <DateSelector date={visitedDate} setDate={setVisitedDate} />
              </div>
      
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <ImageSelector image={storyImg} setImage={setStoryImg} handleDeleteImg={handleDeleteStoryImg} />
              </div>
      
              <div className="flex flex-col gap-2 mt-4">
                <label className="input-label font-medium text-slate-600">STORY</label>
                <textarea
                  type="text"
                  className="text-sm text-slate-800 outline-none bg-slate-50 p-4 rounded-lg border border-slate-200 focus:border-cyan-500 transition-colors"
                  placeholder="Share your travel experience..."
                  rows={10}
                  value={story}
                  onChange={({ target }) => setStory(target.value)}
                /> 
              </div>
      
              <div className="pt-4">
                <label className="input-label font-medium text-slate-600">VISITED LOCATIONS</label>
                <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
              </div>
            </div>
          </div>
        </div>
      );
};

export default AddEditTravelStory;