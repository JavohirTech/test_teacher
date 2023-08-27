import "./UserLogin.css"

const UserLogin = () => {
  return (
    <>
      <div
        className="user_login_wrapper d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <form>
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userPassword" className="form-label">
              Parol
            </label>
            <input type="password" className="form-control" id="userPassword" />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 bg-primary bg-gradient"
          >
            Test Kirish <i className="fa-solid fa-angles-right"></i>
          </button>
          <p className="p-2 text-center fs-6">Hisobim yo'q <a href="/UserLogin">Ro'yxatdan o'tish</a></p>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
