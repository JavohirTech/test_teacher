import axios from "axios";
import { useEffect, useState } from "react";
import FileUpload from "../FileUpload";
import "./AdminTests.css";
const AdminTests = () => {
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({
    question_image: null,
    question: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    correct_answer: "",
    category: "",
  });
  const [uploadQuizImage, setUploadQuizImage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [testCategory, setTestCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [updateTestId, setUpdateTestId] = useState("");
  const [indexPage, setIndexPage] = useState(1);
  const [nextPageStatus, setNextPageStatus] = useState("");
  const [prevPageStatus, setPrevPageStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [foundSearchData, setFoundSearchData] = useState("");

  const enSession = sessionStorage.getItem("en");
  const [file, setFile] = useState(null);
  setTimeout(() => {
    setIsMessage(false);
  }, 5000);
  // change fetched API dates
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}.${month}.${year}`;
  }

  // fetchAllTests using axios post
  const fetchAllTests = () => {
    axios
      .post(
        `https://api.nabdullayeva.uz/api/v1/${enSession}/test/listForAdmin?page=${indexPage}`
      )
      .then((response) => {
        setTests(response.data.tests.data);

        setNextPageStatus(response.data.tests.next_page_url);
        setPrevPageStatus(response.data.tests.prev_page_url);
      })
      .catch((error) => {
        console.error("Error fetching data:");
      });
  };

  // addNewTest using axios post
  const addNewTest = () => {
    newTest.question_image = uploadQuizImage;
    axios
      .post(
        `https://api.nabdullayeva.uz/api/v1/admin/${enSession}/test/create`,
        newTest,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setUploadQuizImage(null);
        if (response.data.code === 200) {
          fetchAllTests();
          clearInitialValue();
          setIsMessage(false);
        }
      })
      .catch(() => setIsMessage(true));
  };

  // deleteTest using axios post
  const deleteTest = (testId) => {
    axios
      .post(
        `https://api.nabdullayeva.uz/api/v1/admin/${enSession}/test/delete/${testId}`
      )
      .then((response) => {
        const data = response.data;
        if (data.ok && data.code === 200) {
          const updatedTests = tests.filter((test) => test.id !== testId);
          setTests(updatedTests);
        }
      })
      .catch((error) => {
        console.error("Error deleting test:", error);
      });
  };

  // updateTest using axios post
  const updateTest = () => {
    const formData = new FormData();

    formData.append("id", updateTestId);
    formData.append("question", newTest.question);
    formData.append("answer_1", newTest.answer_1);
    formData.append("answer_2", newTest.answer_2);
    formData.append("answer_3", newTest.answer_3);
    formData.append("correct_answer", newTest.correct_answer);
    formData.append("category", newTest.category);
    formData.append("question_image", newTest.question_image);

    axios
      .post(
        `https://api.nabdullayeva.uz/api/v1/admin/${enSession}/test/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.data.code === 200) {
          fetchAllTests();
          clearInitialValue();
        }
      })
      .catch((error) => {
        console.error("Error update test:", error);
      });
  };

  // setInitialValue for input initials
  const setInitialValue = (
    id,
    question,
    ans_1,
    ans_2,
    ans_3,
    ans_cor,
    category
  ) => {
    setNewTest({
      id: id,
      question: question,
      answer_1: ans_1,
      answer_2: ans_2,
      answer_3: ans_3,
      correct_answer: ans_cor,
      category: category,
      question_image: null,
    });
  };

  // clearInitialValue for clear initial value of input
  const clearInitialValue = () => {
    setNewTest({
      question_image: null,
      question: "",
      answer_1: "",
      answer_2: "",
      answer_3: "",
      correct_answer: "",
      category: "",
    });
  };

  // addCategory using axios post
  const addCategory = () => {
    const formData = new FormData();
    formData.append("name", testCategory);
    axios
      .post(
        `https://api.nabdullayeva.uz/api/v1/admin/${enSession}/category/create`,
        formData
      )
      .then((response) => {
        if (response.data.code == 200) {
          setTestCategory("");
        }
        setIsMessage(false);
      })
      .catch((error) => {
        console.error("Error:", error.response);
        setIsMessage(true);
      });
  };

  // categoryDetails using axios post
  const categoryDetails = () => {
    const apiUrl = `https://api.nabdullayeva.uz/api/v1/admin/${enSession}/category/list`;
    axios
      .post(apiUrl)
      .then((response) => {
        const data = response.data;
        if (data.ok && data.code === 200) {
          setCategories(data.categories);
          setTestCategory("");
        } else {
          console.error("Failed to fetch categories");
        }
      })
      .catch((error) => {
        console.error("Error fetching data category:", error);
      });
  };

  // removeCategory using axios post
  const removeCategory = (id) => {
    const apiUrl = `https://api.nabdullayeva.uz/api/v1/admin/${enSession}/category/delete/${id}`;
    axios.post(apiUrl).then((res) => {
      if (res.data.code === 200) {
        categoryDetails();
      } else {
        setIsMessage(true);
      }
    });
  };

  // uplodaExcel using axios post
  const uploadExcel = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("excel", file);

      try {
        await axios.post(
          `https://api.nabdullayeva.uz/api/v1/${enSession}/test/createExcel`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        fetchAllTests();
      } catch (error) {
        console.error("Error uploading Excel:", error);
      }
    }
  };

  // downloadExcel using axios post
  const downloadExcel = async () => {
    const apiUrl = `https://api.nabdullayeva.uz/api/v1/${enSession}/test/export`;
    axios.post(apiUrl).then((res) => {
      if (res.data.ok && res.data.code === 200) {
        window.location.href = `https://api.abdullajonov.uz/training-test-api/public/storage/tests.xlsx`;
      }
    });
  };

  useEffect(() => {
    fetchAllTests();
    categoryDetails();
  }, [indexPage]);

  const combinedOnClick = (
    id,
    question,
    answer_1,
    answer_2,
    answer_3,
    correct_answer,
    category
  ) => {
    setInitialValue(
      id,
      question,
      answer_1,
      answer_2,
      answer_3,
      correct_answer,
      category
    );
    setUpdateTestId(id);
    categoryDetails();
  };

  const decreasePageIndex = () => {
    if (prevPageStatus) {
      setIndexPage((prev) => prev - 1);
    }
  };

  const increasePageIndex = () => {
    if (nextPageStatus) {
      setIndexPage((prev) => prev + 1);
    }
  };

  const searchingData = () => {
    const apiUrl = `https://api.nabdullayeva.uz/api/v1/${enSession}/test/search/${searchText}`;
    axios
      .post(apiUrl)
      .then((res) => {
        setFoundSearchData(res.data.tests);
      })
      .catch(() => {
        console.log(searchText);
      });
  };

  useEffect(() => {
    searchingData();
  }, [searchText]);

  return (
    <div className="admin_tests_wrapper">
      <h2>Testlar</h2>
      <div className="admin_tests_header row">
        <div className="col">
          <button
            type="button"
            className="btn btn-primary m-1"
            data-bs-toggle="modal"
            data-bs-target="#addTest"
            onClick={() => categoryDetails()}
          >
            <i className="fas fa-plus pe-1"></i> Test qo`shish
          </button>
          <button
            type="button"
            className="btn btn-primary m-1"
            data-bs-toggle="modal"
            data-bs-target="#category"
            onClick={categoryDetails}
          >
            <i className="fa-solid fa-circle-plus"></i> Kategoriya
          </button>
        </div>
        <div className="d-flex col">
          <input
            style={{ width: "300px" }}
            type="file"
            className="form-control"
            id="inputGroupFile02"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="button"
            className="btn btn-success me-2"
            onClick={uploadExcel}
          >
            <i className="fa-sharp fa-solid fa-file-excel"></i>
          </button>
          <button
            onClick={downloadExcel}
            type="button"
            className="btn btn-info"
          >
            <i className="fa-sharp fa-solid fa-arrow-down-to-line"></i>
          </button>
          {isMessage ? (
            <span className="badge bg-danger">
              Ma`lumot to`liq kiritilmadi.
            </span>
          ) : null}
        </div>
        <div className="col">
          <input
            type="search"
            placeholder="Qidiruv"
            className="form-control"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* ADD TEST */}
      <div
        className="modal fade"
        id="addTest"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Test qo`shish
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
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label
                        htmlFor="formFile"
                        className="form-label"
                        title="Rasm yuklashdan oldin uni nusxalab keyin CTRL + V ni bosing"
                      >
                        Test uchun rasmga (majburiy emas)
                      </label>
                      {!uploadQuizImage && (
                        <div className="border rounded p-2">
                          <i className="fas fa-info text-info"></i> Rasm
                          yuklashdan oldin uni nusxalab keyin CTRL + V ni bosing
                        </div>
                      )}
                      <FileUpload setUploadQuizImage={setUploadQuizImage} />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="formFile" className="form-label">
                      Kategoriya
                    </label>
                    <div className="mb-3">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={newTest.category}
                        onChange={(e) =>
                          setNewTest({ ...newTest, category: e.target.value })
                        }
                        selected
                        required
                      >
                        <option hidden>Kategoriya tanlang</option>

                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid state.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="test_question" className="form-label">
                      Test savoli
                    </label>
                    <textarea
                      className="form-control"
                      id="test_question"
                      rows="3"
                      value={newTest.question}
                      onChange={(e) =>
                        setNewTest({ ...newTest, question: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="test_question" className="form-label">
                        1-javob
                      </label>
                      <textarea
                        className="form-control"
                        id="test_question"
                        rows="3"
                        value={newTest.answer_1}
                        onChange={(e) =>
                          setNewTest({ ...newTest, answer_1: e.target.value })
                        }
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="test_question" className="form-label">
                        2-javob
                      </label>
                      <textarea
                        className="form-control"
                        id="test_question"
                        rows="3"
                        value={newTest.answer_2}
                        onChange={(e) =>
                          setNewTest({ ...newTest, answer_2: e.target.value })
                        }
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="test_question" className="form-label">
                        3-javob
                      </label>
                      <textarea
                        className="form-control"
                        id="test_question"
                        rows="3"
                        value={newTest.answer_3}
                        onChange={(e) =>
                          setNewTest({ ...newTest, answer_3: e.target.value })
                        }
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="test_question" className="form-label">
                        To`g`ri javobni kiriting.
                      </label>
                      <textarea
                        className="form-control"
                        id="test_question"
                        rows="3"
                        value={newTest.correct_answer}
                        onChange={(e) =>
                          setNewTest({
                            ...newTest,
                            correct_answer: e.target.value,
                          })
                        }
                        required
                      ></textarea>
                    </div>
                  </div>
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
                onClick={addNewTest}
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

      {/* update test */}
      <div className="modal fade" id="updateTestModal" tabIndex="-1">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Test yangilash
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={clearInitialValue}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Test uchun rasm (majburiy emas)
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={(e) =>
                        setNewTest({
                          ...newTest,
                          question_image: e.target.files[0],
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="formFile" className="form-label">
                    Kategoriya
                  </label>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={newTest.category}
                      onChange={(e) =>
                        setNewTest({ ...newTest, category: e.target.value })
                      }
                      selected
                      required
                    >
                      <option hidden>Kategoriya tanlang</option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="test_question" className="form-label">
                    Test savoli
                  </label>
                  <textarea
                    className="form-control"
                    id="test_question"
                    rows="3"
                    value={newTest.question}
                    onChange={(e) =>
                      setNewTest({ ...newTest, question: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="test_question" className="form-label">
                      1-javob
                    </label>
                    <textarea
                      className="form-control"
                      id="test_question"
                      rows="3"
                      value={newTest.answer_1}
                      onChange={(e) =>
                        setNewTest({ ...newTest, answer_1: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="test_question" className="form-label">
                      2-javob
                    </label>
                    <textarea
                      className="form-control"
                      id="test_question"
                      rows="3"
                      value={newTest.answer_2}
                      onChange={(e) =>
                        setNewTest({ ...newTest, answer_2: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="test_question" className="form-label">
                      3-javob
                    </label>
                    <textarea
                      className="form-control"
                      id="test_question"
                      rows="3"
                      value={newTest.answer_3}
                      onChange={(e) =>
                        setNewTest({ ...newTest, answer_3: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="test_question" className="form-label">
                      To`g`ri javobni kiriting.
                    </label>
                    <textarea
                      className="form-control"
                      id="test_question"
                      rows="3"
                      value={newTest.correct_answer}
                      onChange={(e) =>
                        setNewTest({
                          ...newTest,
                          correct_answer: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
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
                onClick={() => updateTest(newTest)}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Yangilash
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* add category */}
      <div
        className="modal fade"
        id="category"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Kategoriya qo`shish
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="categoryText" className="form-label">
                  Kategoriya nomi
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="categoryText"
                  onChange={(e) => setTestCategory(e.target.value)}
                />
                <div className="form-text">Test uchun fan nomini yozing.</div>
                <div className="categories">
                  {categories.map((category) => (
                    <span
                      onDoubleClick={() => removeCategory(category.id)}
                      key={category.id}
                      className="badge bg-primary m-1"
                      style={{ userSelect: "none" }}
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setTestCategory("")}
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={addCategory}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Qo`shish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin_tests_main my-4">
        <div className="table-responsive-md">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Test savoli</th>
                <th scope="col">Variantlar</th>
                <th scope="col">Vaqt</th>
                <th scope="col">Kategoriya</th>
                <th scope="col">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {foundSearchData !== "" && searchText !== "" ? (
                foundSearchData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {item.image !== null ? (
                        <img
                          src={
                            "https://api.abdullajonov.uz/training-test-api/public/storage/images/" +
                            item.image
                          }
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          className="me-2"
                        />
                      ) : null}
                      {item.question}
                    </td>
                    <td>
                      <ol className="text-danger">
                        <li>{item.answer_1}</li>
                        <li>{item.answer_2}</li>
                        <li>{item.answer_3}</li>
                        <li className="text-success">{item.correct_answer}</li>
                      </ol>
                    </td>
                    <td>
                      <b>Qo`shildi:</b> {formatDate(item.created_at)} <br />{" "}
                      <b>Yangilandi:</b> {formatDate(item.updated_at)}
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#updateTestModal"
                        type="button"
                        className="btn btn-success m-2"
                        onClick={() =>
                          combinedOnClick(
                            item.id,
                            item.question,
                            item.answer_1,
                            item.answer_2,
                            item.answer_3,
                            item.correct_answer,
                            item.category
                          )
                        }
                      >
                        <i className="fa-light fa-pen-to-square pe-1"></i>{" "}
                        Tahrirlash
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTest(item.id)}
                        className="btn btn-danger m-2"
                      >
                        <i className="fa-light fa-trash pe-1"></i> O`chirish
                      </button>
                    </td>
                  </tr>
                ))
              ) : tests.length ? (
                tests?.map((test) => (
                  <tr key={test.id}>
                    <td>{test.id}</td>
                    <td>
                      {test.image !== null ? (
                        <img
                          src={
                            "https://api.abdullajonov.uz/training-test-api/public/storage/images/" +
                            test.image
                          }
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          className="me-2"
                        />
                      ) : null}
                      {test.question}
                    </td>
                    <td>
                      <ol className="text-danger">
                        <li>{test.answer_1}</li>
                        <li>{test.answer_2}</li>
                        <li>{test.answer_3}</li>
                        <li className="text-success">{test.correct_answer}</li>
                      </ol>
                    </td>
                    <td>
                      <b>Qo`shildi:</b> {formatDate(test.created_at)} <br />{" "}
                      <b>Yangilandi:</b> {formatDate(test.updated_at)}
                    </td>
                    <td>{test.category}</td>
                    <td>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#updateTestModal"
                        type="button"
                        className="btn btn-success m-2"
                        onClick={() =>
                          combinedOnClick(
                            test.id,
                            test.question,
                            test.answer_1,
                            test.answer_2,
                            test.answer_3,
                            test.correct_answer,
                            test.category
                          )
                        }
                      >
                        <i className="fa-light fa-pen-to-square pe-1"></i>{" "}
                        Tahrirlash
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTest(test.id)}
                        className="btn btn-danger m-2"
                      >
                        <i className="fa-light fa-trash pe-1"></i> O`chirish
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-5"
                    style={{ opacity: "0.3" }}
                  >
                    <i className="fa-light fa-folder-open fa-3x py-3"></i>
                    <br />
                    Testlar topilmadi
                  </td>
                </tr>
              )}

              {tests.length > 0 ? (
                <tr className="text-center">
                  <td colSpan="12">
                    <button
                      type="button"
                      className="btn btn-primary m-2"
                      onClick={decreasePageIndex}
                      disabled={!prevPageStatus}
                    >
                      <i className="fa-solid fa-chevron-left me-2"></i>
                      Oldingi
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary m-2"
                      onClick={increasePageIndex}
                      disabled={!nextPageStatus}
                    >
                      Keyingi
                      <i className="fa-solid fa-chevron-right ms-2"></i>
                    </button>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTests;
