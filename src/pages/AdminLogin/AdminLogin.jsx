import { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";
function AdminLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      "https://api.abdullajonov.uz/training-test-api/api/v1/admin/login";
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      login: login,
      password: password,
    };

    try {
      const response = await axios.post(url, data, { headers: headers });
      if (response.data.status === "success") {
        window.location.href = "/admin";
        sessionStorage.setItem("en", response.data.data.remember_token);
      } else {
        setMessage("Loginda xatolik");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.code === 404) {
          setMessage("Admin topilmadi");
        } else if (error.response.data.code === 401) {
          setMessage("Parol xato");
        } else {
          setMessage("Xatolik yuz berdi");
        }
      } else {
        setMessage("Xatolik yuz berdi");
      }
    }
  };

  return (
    <div
      className="user_login_wrapper d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-center fst-italic text-primary opacity-75">
          Admin
        </h2>
        <div className="mb-3">
          <label htmlFor="userLogin" className="form-label">
            Login
          </label>
          <input
            type="text"
            className="form-control"
            id="userLogin"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userPassword" className="form-label">
            Parol
          </label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 bg-primary bg-gradient"
        >
          Kirish <i className="fa-solid fa-angles-right"></i>
        </button>
        {message && <div className="mt-3 text-danger">{message}</div>}
      </form>
    </div>
  );
}

export default AdminLogin;
