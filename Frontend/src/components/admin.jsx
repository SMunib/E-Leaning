import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useLocation } from 'react-router-dom';
import AdminNav from "./adminNav";

//Token is used in place of id for searching

//had to update the API URL
const admin = () => {
    const location = useLocation();
    const userType = location.state.userType;
  return(
    <>
    <AdminNav/>
    </>
  )
};

export default admin;
