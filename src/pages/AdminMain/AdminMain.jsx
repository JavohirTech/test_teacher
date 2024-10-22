import React from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminHome from "../../components/AdminHome/AdminHome";
import AdminTests from "../../components/AdminTests/AdminTests";
import AdminTeachers from "../../components/AdminTeachers/AdminTeachers";
import "./AdminMain.css";
import AdminList from "../../components/AdminList/AdminList";

const AdminMain = () => {
  const navigate = useNavigate();
  const isAdminLogin = sessionStorage.getItem("en");
  if (!isAdminLogin) {
    navigate("/adminLogin");
  }
  return (
    <>
      <div className="admin_main_wrapper">
        <Sidebar />
        <div className="admin_main_right">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="tests" element={<AdminTests />} />
            <Route path="admins" element={<AdminList />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminMain;
