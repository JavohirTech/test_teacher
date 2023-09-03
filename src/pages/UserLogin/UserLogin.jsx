import React, { useState } from "react";
import "./UserLogin.css";
import logo from "../../assets/online_test.jpg";

const UserLogin = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api.abdullajonov.uz/training-test-api/api/v1/user/login",
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
      if (
        data.ok === "true" &&
        data.code === 200 &&
        data.data.allowed_to_test !== null
      ) {
        sessionStorage.setItem("enus", data.data.remember_token);
        window.location.href = "/alltests";
      } else {
        setError("Login xato.");
      }

      if (data.data.allowed_to_test === null) {
        setError("N.Abdullayeva tomonidan ruxsat berilmagan.");
      }
    } catch (err) {
      setError("Bunday foydalanuvchi mavjud emas");
    }
  };

  return (
    <>
      <div
        className="user_login_wrapper d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="" style={{ width: "100%", height: "100%" }} />
          <h2 className="mt-3 text-center fst-italic text-primary opacity-75">
            N.Abdullayeva
          </h2>
          {error && <h3 className="text-danger text-center">{error}</h3>}
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
              type="text"
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
        </form>
      </div>
    </>
  );
};

export default UserLogin;
