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
                  Ruxsat berilmagan: {stats.data.not_aproved_users}
                </h4>
              </div>
            </>
          )}
        </div>
        <AdminTeachers />
      </div>
    </>
  );
};

export default AdminHome;
