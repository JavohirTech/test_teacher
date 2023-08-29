import { useNavigate } from "react-router-dom";
import "./AllTests.css";

const AllTests = () => {
  const navigate = useNavigate();
  const isUserLogin = sessionStorage.getItem("enus");
  if (!isUserLogin) {
    navigate("/");
  }
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="all_tests_wrapper">
        <div className="test_cards">
          <div className="test_card">
            <small>Test soni: 40ta</small>
            <h4 className="mb-3">Matematika</h4>
            <small>Tuzuvchi: N.Abdullayeva</small>
            <span>
              Boshlash<i className="fas fa-arrow-right"></i>
            </span>
          </div>
          <div className="test_card">
            <small>Test soni: 40ta</small>
            <h4 className="mb-3">Ona tili</h4>
            <small>Tuzuvchi: N.Abdullayeva</small>
            <span>
              Boshlash<i className="fas fa-arrow-right"></i>
            </span>
          </div>
          <div className="test_card">
            <small>Test soni: 40ta</small>
            <h4 className="mb-3">Tabiiy fanlar</h4>
            <small>Tuzuvchi: N.Abdullayeva</small>
            <span>
              Boshlash<i className="fas fa-arrow-right"></i>
            </span>
          </div>
          <div className="test_card" style={{ background: "green" }}>
            <small>Test soni: 40ta</small>
            <h4 className="mb-3">Aralash test</h4>
            <small>Tuzuvchi: N.Abdullayeva</small>
            <span>
              Boshlash<i className="fas fa-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTests;
