import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Home");
  return (
    <>
      <div className="sidebar_wrapper">
        <h3 className="text-center text-primary p-3">N.Abdullayeva</h3>
        <ul className="sidebar_list">
          <li>
            <Link
              className={activeItem === "Home" ? "active" : ""}
              to="/admin"
              onClick={() => setActiveItem("Home")}
            >
              <i className="fas fa-home p-2"></i> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              className={activeItem === "O`qituvchi" ? "active" : ""}
              to="/admin/teachers"
              onClick={() => setActiveItem("O`qituvchi")}
            >
              <i className="fas fa-users p-2"></i> <span>O`qituvchi</span>
            </Link>
          </li>
          <li>
            <Link
              className={activeItem === "Testlar" ? "active" : ""}
              to="/admin/tests"
              onClick={() => setActiveItem("Testlar")}
            >
              <i className="fa-solid fa-circle-question p-2"></i>{" "}
              <span>Testlar</span>
            </Link>
          </li>
          <li>
            <Link
              className={activeItem === "Admin" ? "active" : ""}
              to="/admin/admins"
              onClick={() => setActiveItem("Admin")}
            >
              <i className="fa-solid fa-user-shield p-2"></i>{" "}
              <span>Admin</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
