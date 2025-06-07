import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react'

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp"
import Home from "./pages/Home/Home";


const App=()=>{
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

const Root = ()=>{
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default App