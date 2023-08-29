const AdminTests = () => {
  return (
    <>
      <div className="admin_tests_wrapper">
        <h2>Testlar</h2>
        <div className="admin_tests_header">
          <button type="button" className="btn btn-primary m-1">
            <i className="fas fa-plus pe-1"></i> Test qo`shish
          </button>
          <button type="button" className="btn btn-primary m-1">
            <i className="fa-solid fa-circle-plus"></i> Kategoriya
          </button>
          <button type="button" className="btn btn-success m-1">
            <i className="fa-sharp fa-solid fa-file-excel pe-1"></i> Excel
          </button>
          <button type="button" className="btn btn-info m-1">
            <i className="fa-sharp fa-solid fa-arrow-down-to-line pe-1"></i>{" "}
            Yuklab olish
          </button>
        </div>
        <div className="admin_tests_main my-4">
          <div className="table-responsive-md">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Test savoli</th>
                  <th scope="col">Variantlar</th>
                  <th scope="col">Amallar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    O`zbekistondagi viloyatlar soni? Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Ipsum cumque, fuga aliquam
                    incidunt eius atque reprehenderit deserunt magni optio
                    assumenda ipsa ullam earum eos voluptatem neque quod
                    consequuntur iure. Labore.
                  </td>
                  <td>
                    <ol>
                      <li>12</li>
                      <li>15</li>
                      <li>16</li>
                      <li>10</li>
                    </ol>
                  </td>
                  <td className="col align-items-center">
                    <button type="button" className="btn btn-success m-2">
                      <i className="fa-light fa-pen-to-square pe-1"></i>{" "}
                      Tahrirlash
                    </button>
                    <button type="button" className="btn btn-danger  m-2">
                      <i className="fa-light fa-trash pe-1"></i> O`chirish
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Namangan viloyatidagi tumanlar?</td>
                  <td>
                    <ol>
                      <li>20</li>
                      <li>12</li>
                      <li>10</li>
                      <li>15</li>
                    </ol>
                  </td>
                  <td>
                    <button type="button" className="btn btn-success m-2">
                      <i className="fa-light fa-pen-to-square pe-1"></i>{" "}
                      Tahrirlash
                    </button>
                    <button type="button" className="btn btn-danger  m-2">
                      <i className="fa-light fa-trash pe-1"></i> O`chirish
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Dunyodagi eng uzun to`g` chizmasi?</td>
                  <td>
                    <ol>
                      <li>Himolay</li>
                      <li>Alp</li>
                      <li>Kashmir</li>
                      <li>Sirli</li>
                    </ol>
                  </td>
                  <td>
                    <button type="button" className="btn btn-success m-2">
                      <i className="fa-light fa-pen-to-square pe-1"></i>{" "}
                      Tahrirlash
                    </button>
                    <button type="button" className="btn btn-danger  m-2">
                      <i className="fa-light fa-trash pe-1"></i> O`chirish
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTests;
