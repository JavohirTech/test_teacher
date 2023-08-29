import React, { useState } from "react";
import "./UserLogin.css";

const UserLogin = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://192.168.0.150:8000/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: login,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.ok === "true" && data.code === 200) {
        sessionStorage.setItem("enus", data.token);
        window.location.href = "/alltests";
      } else {
        setError("Login xato.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div
        className="user_login_wrapper d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-center fst-italic text-primary opacity-75">
            N.Abdullayeva
          </h2>
          <div className="mb-3">
            <label htmlFor="userLogin" className="form-label">
              Login
            </label>
            <input
              type="text"
              className="form-control"
              id="userLogin"
              aria-describedby="emailHelp"
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
            Test Kirish <i className="fa-solid fa-angles-right"></i>
          </button>
          <p className="p-2 text-center fs-6">
            Hisobim yo`q <a href="/userRegister">Ro`yxatdan o`tish</a>
          </p>
          {error && <p className="text-danger text-center">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default UserLogin;
