import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-slate-50">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white font-medium shadow-md shadow-blue-100">
          {getInitials(userInfo ? userInfo.fullName : "")}
        </div>

        <div>
          <p className="text-sm font-medium text-slate-800">{userInfo.fullName || ""}</p>
          <button
            className="text-xs text-slate-600 hover:text-blue-600 transition-colors mt-0.5 flex items-center"
            onClick={onLogout}
          >
            <span className="hover:underline">Logout</span>
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;