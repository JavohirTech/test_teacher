import axios from "axios";
import { useEffect, useState } from "react";

const AdminList = () => {
  const [users, setUsers] = useState([]);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    login: "",
    password: "",
  });

  const [updateAdminData, setUpdateAdminData] = useState({
    name: "",
    login: "",
    password: "",
  });
  const enSession = sessionStorage.getItem("en");

  // fetchAdmins using axios post
  const fetchAdmins = () => {
    axios
      .post(
        `https://api.abdullajonov.uz/training-test-api/api/v1/admin/${enSession}/list`
      )
      .then((response) => {
        const data = response.data;
        if (data.ok === true) {
          setUsers(data.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchAdmins();
  }, []);

  const addNewAdmin = () => {
    const apiUrl = `https://api.abdullajonov.uz/training-test-api/api/v1/admin/${enSession}/add`;
    axios
      .post(apiUrl, newAdmin, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("newadmin", newAdmin);
        clearInitialValue();
        fetchAdmins();
      });
  };

  const updateAdmin = async (userId) => {
    try {
      const res = await axios.post(
        `https://api.abdullajonov.uz/training-test-api/api/v1/admin/${enSession}/update/${userId}`,
        updateAdminData
      );

      console.log(updateAdminData);
      console.log(res);
      fetchAdmins();
      setUpdateAdminData({
        name: "",
        login: "",
        password: "",
      });
      // Reset the editingAdminId after updating
      setEditingAdminId(null);
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const deleteUser = (userId) => {
    axios
      .post(
        `https://api.abdullajonov.uz/training-test-api/api/v1/admin/${enSession}/delete/${userId}`
      )
      .then((response) => {
        fetchAdmins();
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}.${month}.${year}`;
  }

  const setInitialValue = (user) => {
    setUpdateAdminData({
      name: user.name,
      login: user.login,
      password: user.password,
    });
  };

  const clearInitialValue = () => {
    setNewAdmin({
      name: "",
      login: "",
      password: "",
    });
  };

  console.log(users);

  return (
    <>
      <div
        className="modal fade"
        id="addTest"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Admin qo`shish
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={clearInitialValue}
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="adminName" className="form-label">
                    Ism
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="adminName"
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="adminName" className="form-label">
                    Login
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="adminName"
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, login: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="adminName" className="form-label">
                    Parol
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="adminName"
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                  />
                </div>
              </div>
            </form>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={clearInitialValue}
              >
                Bekor qilish
              </button>
              <button
                onClick={addNewAdmin}
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Qo`shish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin_tests_wrapper">
        <h2>Adminlar</h2>

        <div className="d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-primary my-3"
            data-bs-toggle="modal"
            data-bs-target="#addTest"
          >
            Admin qo`shish
          </button>

          {editingAdminId && (
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control my-3"
                placeholder="Ism"
                value={updateAdminData.name}
                onChange={(e) =>
                  setUpdateAdminData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                className="form-control my-3"
                placeholder="Login"
                value={updateAdminData.login}
                onChange={(e) =>
                  setUpdateAdminData((prevState) => ({
                    ...prevState,
                    login: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                className="form-control my-3"
                placeholder="Parol"
                value={updateAdminData.password}
                onChange={(e) =>
                  setUpdateAdminData((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
              <button
                type="button"
                className="btn btn-primary my-3"
                onClick={() => updateAdmin(editingAdminId)}
              >
                Yangilash
              </button>
            </div>
          )}
        </div>
        <div className="admin_tests_main my-4">
          <div className="table-responsive-md">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ismi, familiyasi</th>
                  <th scope="col">Login</th>
                  <th scope="col">Vaqt</th>
                  <th scope="col">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.name}</td>
                      <td>{user.login}</td>
                      <td>
                        <b>Qo`shildi:</b>
                        {formatDate(user.created_at)} <br /> <b>Yangilandi:</b>
                        {formatDate(user.updated_at)}
                      </td>

                      <td className="col align-items-center">
                        <button
                          type="button"
                          onClick={() => {
                            setInitialValue(user);
                            setEditingAdminId(user.id);
                          }}
                          className="btn btn-primary"
                          title="Tahrirlash"
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger  m-2"
                          onClick={() => deleteUser(user.id)}
                        >
                          <i className="fa-light fa-trash pe-1"></i> O`chirish
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center p-5"
                      style={{ opacity: "0.3" }}
                    >
                      <i className="fa-light fa-folder-open fa-3x py-3"></i>
                      <br />
                      Adminlar topilmadi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminList;
