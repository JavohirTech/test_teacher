import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminHome from "../../components/AdminHome/AdminHome";
import AdminTests from "../../components/AdminTests/AdminTests";
import AdminTeachers from "../../components/AdminTeachers/AdminTeachers";
import "./AdminMain.css";

const AdminMain = () => {
  return (
    <>
      <div className="admin_main_wrapper">
        <Sidebar />
        <div className="admin_main_right">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="tests" element={<AdminTests />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminMain;
