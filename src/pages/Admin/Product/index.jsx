import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.model.scss";
import productApi from "../../../api/productApi";
import { toast, Bounce } from "react-toastify";
import ReactPaginate from "react-paginate";
import ProductCreateUpdate from "./ProductCreateUpdate";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Product() {
  const [products, setProducts] = useState([]);
  const [textSeach, setTextSeach] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [datainModal, SetdataInModa] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const CallAPi = async () => {
      const dataOut = await productApi.get({ Name: textSeach, Page: page });
      if (dataOut.success) {
        setProducts(dataOut.dataOut);
        setTotalPages(dataOut.totalPages);
      }
    };
    CallAPi();
  }, [textSeach, page]);

  async function Delete(_id) {
    const answer = window.confirm("Do you want delete?");
    if (answer) {
      const dataOut = await productApi.delete(_id);
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

        setProducts((prevProducts) =>
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

  const handlePageClick = (event) => {
    setPage(event.selected);
    console.log(`User requested page number `, event);
  };

  function CallCreateUpdate(_id) {
    if (_id == null) {
      SetdataInModa(null);
      setShow(!show);
    } else {
      SetdataInModa(_id);
      setShow(!show);
    }
  }

  return (
    <>
      {show ? (
        <ProductCreateUpdate
          show={show}
          hinde={() => setShow(!show)}
          _id={datainModal}
        />
      ) : (
        <></>
      )}
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
          {products.length === 0 ? (
            <h3 style={{ color: "#333", textAlign: "center" }}>
              Chưa có Trademark
            </h3>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item._id}>
                      <td>{item.Name}</td>
                      <td>
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          src={
                            item.Img && item.Img[0]
                              ? item.Img[0]
                              : "https://via.placeholder.com/550x750"
                          }
                          alt=""
                        />
                      </td>
                      <td>
                        {item.Price
                          ? item.Price.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              "."
                            )
                          : "error"}{" "}
                        vnd
                      </td>
                      <td>
                        {item.Quantity
                          ? item.Quantity.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              "."
                            )
                          : "error"}
                      </td>
                      <td>
                        <button>
                          <Link to={`/Admin/ProductSpecifications/${item._id}`} type="button"
                          className="btn btn-primary">
                          news Board
                          </Link>
                         
                        </button>
                        <button
                         style={{ marginLeft: "10px" }}
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

export default Product;
