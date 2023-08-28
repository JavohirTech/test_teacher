import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import QuizMain from "./pages/QuizMain/QuizMain";
import AllTests from "./pages/AllTests/AllTests";
import AdminMain from "./pages/AdminMain/AdminMain";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserRegister from "./pages/UserRegister/UserRegister";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/quiz" element={<QuizMain />} />
        <Route path="/alltests" element={<AllTests />} />
        <Route path="/admin/*" element={<AdminMain />} />
      </Routes>
    </>
  );
};

export default App;
