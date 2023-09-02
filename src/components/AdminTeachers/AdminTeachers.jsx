import axios from "axios";
import { useState, useEffect } from "react";

const AdminTeachers = () => {
  const [users, setUsers] = useState([]);
  const enSession = sessionStorage.getItem("en");
  const fetchUser = () => {
    axios
      .post(
        `https://api.abdullajonov.uz/training-test-api/api/v1/admin/${enSession}/user/list`
      )
      .then((response) => {
        const data = response.data;
        if (data.ok === true) {
          setUsers(data.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const deleteUser = (userId) => {
    axios
      .post(
        `https://api.abdullajonov.uz/training-test-api/api/v1/admin/${enSession}/user/delete/${userId}`
      )
      .then((response) => {
        if (response.data.ok === "true") {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
        }
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

  const approveUser = (token) => {
    axios
      .post(
        `https://api.abdullajonov.uz/training-test-api/api/v1/${token}/user/approve`
      )
      .then((response) => {
        const data = response.data;
        if (data.ok === true && data.code === 200) {
          fetchUser();
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="admin_tests_wrapper">
        <h2>O`qituvchilar</h2>
        <div className="admin_tests_main my-4">
          <div className="table-responsive-md">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
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
                      <td>{user.login}</td>
                      <td>
                        <b>Qo`shildi:</b>
                        {formatDate(user.created_at)} <br /> <b>Yangilandi:</b>
                        {formatDate(user.updated_at)}
                      </td>
                      <td className="col align-items-center">
                        {user.allowed_to_test === null ? (
                          <button
                            onClick={() => approveUser(user.remember_token)}
                            type="button"
                            className="btn btn-success m-2"
                          >
                            <i className="fas fa-check pe-1"></i>Ruxsat
                          </button>
                        ) : (
                          <span className="badge bg-success">
                            Ruxsat berilgan
                          </span>
                        )}
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
                      Foydalanuvchilar topilmadi
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

export default AdminTeachers;
