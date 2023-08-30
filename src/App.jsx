import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import QuizMain from "./pages/QuizMain/QuizMain";
import AllTests from "./pages/AllTests/AllTests";
import AdminMain from "./pages/AdminMain/AdminMain";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserRegister from "./pages/UserRegister/UserRegister";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
const App = () => {
  const isAdminLogin = sessionStorage.getItem("en");
  const isUserLogin = sessionStorage.getItem("enus");
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/quiz/*" element={<QuizMain />} />
        <Route
          path="/alltests"
          element={isUserLogin ? <AllTests /> : <UserLogin />}
        />
        <Route
          path="/admin/*"
          element={isAdminLogin ? <AdminMain /> : <AdminLogin />}
        />
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </>
  );
};

export default App;
