import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.model.scss";
import BlogApi from "../../../api/BlogApi";
import { toast, Bounce } from "react-toastify";
import ModaCreatAndUpDate from "./ModaCreatAndUpDate";
import ReactPaginate from "react-paginate";

const cx = classNames.bind(styles);

function Blog() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [blog, setblog] = useState([]);
  const [textSeach, setTextSeach] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const CallAPi = async () => {
      const dataOut = await BlogApi.get({ Name: textSeach, Page: page });
      if (dataOut.success) {
        setblog(dataOut.dataOut);
        setTotalPages(dataOut.totalPages);
      }
    };
    CallAPi();
  }, [textSeach, page]);

  function CallCreateUpdate(data) {
    setData(data);
    setShow(!show);
  }
  const handlePageClick = (event) => {
    setPage(event.selected);
    console.log(`User requested page number `, event);
  };

  async function Delete(_id) {
    const answer = window.confirm("Do you want delete?");
    if (answer) {
      const dataOut = await BlogApi.delete(_id);
      if (dataOut.success) {
        toast.success("delete success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setblog((prevProducts) =>
          prevProducts.filter((item) => item._id !== _id)
        );
      } else {
        toast.error("not delete", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      console.log("User clicked no", _id);
    }
  }
  return (
    <>
      <ModaCreatAndUpDate
        show={show}
        handleClose={() => {
          setShow(!show);
        }}
        _id={data}
      />
      <main className={cx("main-container")}>
        <div className={cx("main-title")}>
          <h3>Product</h3>
          <button
            onClick={() => CallCreateUpdate(null)}
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
          >
            Add
          </button>
          <input
            value={textSeach}
            onChange={(e) => setTextSeach(e.target.value)}
            type="text"
            placeholder="seach Product"
          />
        </div>

        <div>
          {blog.length === 0 ? (
            <h3 style={{ color: "#333", textAlign: "center" }}>Chưa có Blog</h3>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">action</th>
                  </tr>
                </thead>
                <tbody>
                  {blog.map((item) => (
                    <tr key={item._id}>
                      <td>{item.Name ? item.Name : ""}</td>

                      <td>{item.Title ? item.Title : ""}</td>
                      <td>
                        <button
                          onClick={() => CallCreateUpdate(item._id)}
                          type="button"
                          className="btn btn-warning"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => Delete(item._id)}
                          type="button"
                          className="btn btn-danger"
                          style={{ marginLeft: "10px" }}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row">
                <div className="Pagination" style={{ color: "#333" }}>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={page}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Blog;
