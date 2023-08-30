import { useNavigate, Link } from "react-router-dom"; // Import Link component
import "./AllTests.css";
import axios from "axios";
import { useEffect, useState } from "react";

const AllTests = () => {
  const [categories, setCategories] = useState([]);
  const [categoryTestCount, setCategoryTestCount] = useState([]);
  const navigate = useNavigate();
  const isUserLogin = sessionStorage.getItem("enus");
  if (!isUserLogin) {
    navigate("/");
  }

  localStorage.removeItem("fan");

  const allTestCategories = () => {
    const apiUrl = `http://192.168.0.150:8000/api/v1/admin/${isUserLogin}/category/list`;
    axios.post(apiUrl).then((res) => {
      setCategories(res.data.categories);
      setCategoryTestCount(res.data.test_count);
    });
  };

  useEffect(() => {
    allTestCategories();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="all_tests_wrapper">
        <div className="test_cards">
          {categories.map((category) => (
            <Link
              to={`/quiz/${category.slug}`}
              onClick={() => localStorage.setItem("fan", category.slug)}
              key={category.id}
              className="test_card"
            >
              <small>Test soni: {categoryTestCount[category.name]}</small>
              <h4 className="mb-3">{category.name}</h4>
              <small>Tuzuvchi: N.Abdullayeva</small>
              <span>
                Boshlash<i className="fas fa-arrow-right"></i>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTests;
