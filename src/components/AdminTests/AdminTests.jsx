import axios from "axios";
import { useState, useEffect } from "react";

const AdminTests = () => {
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({
    image: null,
    question: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    answer_4: "",
    correct_answer: "",
    category: "",
  });
  const [isMessage, setIsMessage] = useState(false);
  const [testCategory, setTestCategory] = useState("");
  const [categories, setCategories] = useState("");
  const enSession = sessionStorage.getItem("en");

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
        `http://192.168.0.150:8000/api/v1/${enSession}/test/listForAdmin?page=1`
      )
      .then((response) => {
        setTests(response.data.tests.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // addNewTest using axios post
  const addNewTest = () => {
    axios
      .post(
        `http://192.168.0.150:8000/api/v1/admin/${enSession}/test/create`,
        newTest
      )
      .then((response) => {
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
        `http://192.168.0.150:8000/api/v1/admin/${enSession}/test/delete/${testId}`
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
    axios
      .post(
        `http://192.168.0.150:8000/api/v1/admin/${enSession}/test/update/`,
        newTest
      )
      .then((response) => {
        if (response.data.code === 200) {
          fetchAllTests();
          clearInitialValue();
        }
      })
      .catch((error) => {
        console.error("Error deleting test:", error);
      });
  };

  // setInitialValue for input initials
  const setInitialValue = (
    id,
    question,
    ans_1,
    ans_2,
    ans_3,
    ans_4,
    ans_cor,
    category
  ) => {
    setNewTest({
      id: id,
      question: question,
      answer_1: ans_1,
      answer_2: ans_2,
      answer_3: ans_3,
      answer_4: ans_4,
      correct_answer: ans_cor,
      category: category,
      image: null,
    });
    console.log(newTest);
  };

  // clearInitialValue for clear initial value of input
  const clearInitialValue = () => {
    setNewTest({
      image: null,
      question: "",
      answer_1: "",
      answer_2: "",
      answer_3: "",
      answer_4: "",
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
        `http://192.168.0.150:8000/api/v1/admin/${enSession}/category/create`,
        formData
      )
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          setTestCategory("");
        }
        setIsMessage(false);
      })
      .catch((error) => {
        console.error("Error:", error.response);
        setIsMessage(true);
      });
  };

  const categoryDetails = () => {
    axios
      .post(
        `http://192.168.0.150:8000/api/v1/admin/HOekP7PQjIbbfjZrvpuxQi0ottxSW5i3ac5MTER3wfVL2vNjld/category/list`
      )
      .then((res) => {
        console.log(res.data.categories);
        setCategories(res.data.categories.data);
      });
  };

  useEffect(() => {
    fetchAllTests();
  }, []);

  return (
    <>
      <div className="admin_tests_wrapper">
        <h2>Testlar</h2>
        <div className="admin_tests_header">
          <button
            type="button"
            className="btn btn-primary m-1"
            data-bs-toggle="modal"
            data-bs-target="#addTest"
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
          <button type="button" className="btn btn-success m-1">
            <i className="fa-sharp fa-solid fa-file-excel pe-1"></i> Excel
          </button>
          <button type="button" className="btn btn-info m-1">
            <i className="fa-sharp fa-solid fa-arrow-down-to-line pe-1"></i>{" "}
            Yuklab olish
          </button>
          {isMessage ? (
            <span className="badge bg-danger">
              Ma`lumot to`liq kiritilmadi.
            </span>
          ) : null}
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
                        <label htmlFor="formFile" className="form-label">
                          Test uchun rasm (majburiy emas)
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={(e) =>
                            setNewTest({ ...newTest, image: e.target.files[0] })
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
                          <option value="1">Matematika</option>
                          <option value="2">Ona tili</option>
                          <option value="3">Tarix</option>
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
                          4-javob
                        </label>
                        <textarea
                          className="form-control"
                          id="test_question"
                          rows="3"
                          value={newTest.answer_4}
                          onChange={(e) =>
                            setNewTest({ ...newTest, answer_4: e.target.value })
                          }
                          required
                        ></textarea>
                      </div>
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
                          setNewTest({ ...newTest, image: e.target.files[0] })
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
                      >
                        <option hidden>Kategoriya tanlang</option>
                        <option value="1">Matematika</option>
                        <option value="2">Ona tili</option>
                        <option value="3">Tarix</option>
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
                        4-javob
                      </label>
                      <textarea
                        className="form-control"
                        id="test_question"
                        rows="3"
                        value={newTest.answer_4}
                        onChange={(e) =>
                          setNewTest({ ...newTest, answer_4: e.target.value })
                        }
                      ></textarea>
                    </div>
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
                  onClick={updateTest}
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
                    <span className="badge bg-primary m-1">Matematika</span>
                    <span className="badge bg-primary m-1">Ona tili</span>
                    <span className="badge bg-primary m-1">Tarix</span>
                    <span className="badge bg-primary m-1">Tarix</span>
                    <span className="badge bg-primary m-1">Tarix</span>
                    <span className="badge bg-primary m-1">Tarix</span>
                    <span className="badge bg-primary m-1">Tarix</span>
                    <span className="badge bg-primary m-1">Tarix</span>
                  </div>
                  {Array.isArray(categories) &&
                    categories.map((category) => {
                      <span key={category.id} className="badge bg-primary">
                        {category.id} dfsdfsd
                      </span>;
                    })}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
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
                {tests.length ? (
                  tests?.map((test) => (
                    <tr key={test.id}>
                      <td>{test.id}</td>
                      <td>{test.question}</td>
                      <td>
                        <ol className="text-danger">
                          <li>{test.answer_1}</li>
                          <li>{test.answer_2}</li>
                          <li>{test.answer_3}</li>
                          <li>{test.answer_4}</li>
                          <li className="text-success">
                            {test.correct_answer}
                          </li>
                        </ol>
                      </td>
                      <td>
                        <b>Qo`shildi:</b> {formatDate(test.created_at)} <br />{" "}
                        <b>Yangilandi:</b> {formatDate(test.updated_at)}
                      </td>
                      <td>{test.category}</td>
                      <td>
                        <td>
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#updateTestModal"
                            type="button"
                            className="btn btn-success m-2"
                            onClick={() =>
                              setInitialValue(
                                test.id,
                                test.question,
                                test.answer_1,
                                test.answer_2,
                                test.answer_3,
                                test.answer_4,
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTests;
