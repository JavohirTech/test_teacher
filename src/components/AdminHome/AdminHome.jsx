import axios from "axios";
import { useEffect, useState } from "react";
import "./AdminHome.css";
import AdminTeachers from "../AdminTeachers/AdminTeachers";
const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const enSession = sessionStorage.getItem("en");

  const fetchStats = () => {
    const apiUrl = `https://api.abdullajonov.uz/training-test-api/api/v1/${enSession}/test/statistics`;
    axios.post(apiUrl).then((res) => {
      setStats(res.data);
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <div className="admin_home_wrapper">
        <div className="admin_home_stats">
          {stats && stats.data && (
            <>
              <div className="admin_stats_card">
                <h4 className="d-flex align-items-center">
                  <i className="fa-solid fa-users fa-2x p-3 m-3"></i>{" "}
                  Foydalanuvchi: {stats.data.all_users}
                </h4>
              </div>
              <div className="admin_stats_card">
                <h4 className="d-flex align-items-center">
                  <i className="fa-regular fa-circle-question fa-2x p-3 m-3"></i>{" "}
                  Testlar: {stats.data.all_tests}
                </h4>
              </div>
              <div className="admin_stats_card">
                <h4 className="d-flex align-items-center">
                  <i className="fa-regular fa-shield-check fa-2x p-3 m-3 bg-success"></i>{" "}
                  Ruxsat berilgan: {stats.data.aproved_users}
                </h4>
              </div>
              <div className="admin_stats_card">
                <h4 className="d-flex align-items-center">
                  <i className="fa-regular fa-user-minus fa-2x p-3 m-3 bg-warning"></i>{" "}
                  Ruxsat berilmagan:{" "}
                  {stats.data.all_users - stats.data.aproved_users}
                </h4>
              </div>
            </>
          )}
        </div>
        <div
          className="d-flex gap-3 mb-5"
          style={{ width: "100%", flexWrap: "wrap" }}
        >
          {stats &&
            stats.data &&
            Object.entries(stats.test_by_category).map(([subject, value]) => (
              <div key={subject} className="badge bg-success">
                <span>
                  {subject}{" "}
                  <span className="badge bg-white mx-1 text-dark">{value}</span>
                </span>
                <br />
              </div>
            ))}
        </div>
        <AdminTeachers />
      </div>
    </>
  );
};

export default AdminHome;
