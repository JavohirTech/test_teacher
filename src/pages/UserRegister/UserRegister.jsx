import "./UserRegister.css";

const UserRegister = () => {
  return (
    <>
      <div
        className="user_register_wrapper d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <form>
          <h2 className="text-center fst-italic text-primary opacity-75">
            Nasiba Abdullayeva
          </h2>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  Ism
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="userLastName" className="form-label">
                  Familiya
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userLastName"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
          </div>
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
            Ro'yxatdan o'tish <i className="fa-solid fa-angles-right"></i>
          </button>
          <p className="p-2 text-center fs-6">Hisobim bor <a href="/UserLogin">Kirish</a></p>
        </form>
      </div>
    </>
  );
};

export default UserRegister;
