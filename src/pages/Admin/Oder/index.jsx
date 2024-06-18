import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsFillClipboardCheckFill,
  BsFillClipboard2XFill,
} from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";

import { Row } from "react-bootstrap";
import BillModal from "./Bill";
import ReactPaginate from "react-paginate";
import OderApi from "../../../api/OderApi";
import { formatTimestamp } from "../../../tool";
import styles from "./style.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Oder() {
  const [textSeach, setTextSeach] = useState("");

  const [oders, setOders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [quantityOder, setQuantityOder] = useState({});
  const [status, setStatus] = useState(0);
  const [show, setShow] = useState(false);
  const [dataInModa, setDataInMoDa] = useState("");

  useEffect(() => {
    const callApi = async () => {
      const dataOutApi = await OderApi.getQuantity();
      if (dataOutApi.success) {
        const dataIn = {
          status1: dataOutApi.status1,
          status2: dataOutApi.status2,
          status3: dataOutApi.status3,
          status4: dataOutApi.status4,
        };

        setQuantityOder(dataIn);
      }
    };

    callApi();
  }, []);

  useEffect(() => {
    const CallAPi = async () => {
      const dataOut = await OderApi.get({
        Name: textSeach,
        Status: status,
        Page: page,
      });
      if (dataOut.success) {
        setOders(dataOut.dataOut);
        setTotalPages(dataOut.totalPages);
      }
    };
    CallAPi();
  }, [textSeach, page, status]);
  const handlePageClick = (event) => {
    setPage(event.selected);
    console.log(`User requested page number `, event);
  };

  function callModal(_id) {
    setDataInMoDa(_id);
    setShow(!show);
  }
  return (
    <>
      {show && (
        <BillModal
          show={show}
          handleClose={() => setShow(false)}
          data={dataInModa}
        />
      )}
      <main className={cx("main-container")}>
        <div className={cx("main-title")}>
          <h3>Oder</h3>

          <input
            value={textSeach}
            onChange={(e) => setTextSeach(e.target.value)}
            type="text"
            placeholder="seach Oder"
          />
        </div>

        <div>
          <Row className={cx("header-oder col")}>
            <div className={cx("main-cards")}>
              <div onClick={() => setStatus(1)} className={cx("card")}>
                <div className={cx("card-inner")}>
                  <h3>New Oder</h3>
                  <BsFillArchiveFill className={cx("card_icon")} />
                </div>
                <h3>
                  {quantityOder.status1
                    ? quantityOder.status1
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "erro"}
                </h3>
              </div>
              <div onClick={() => setStatus(2)} className={cx("card")}>
                <div className={cx("card-inner")}>
                  <h3>Order is being sent</h3>
                  <FaShippingFast className={cx("card_icon")} />
                </div>
                <h3>
                  {quantityOder.status2
                    ? quantityOder.status2
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "erro"}
                </h3>
              </div>
              <div onClick={() => setStatus(3)} className={cx("card")}>
                <div className={cx("card-inner")}>
                  <h3>successful order</h3>
                  <BsFillClipboardCheckFill className={cx("card_icon")} />
                </div>
                <h3>
                  {quantityOder.status3
                    ? quantityOder.status3
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "erro"}
                </h3>
              </div>
              <div onClick={() => setStatus(4)} className={cx("card")}>
                <div className={cx("card-inner")}>
                  <h3>Order failed</h3>
                  <BsFillClipboard2XFill className={cx("card_icon")} />
                </div>
                <h3>
                  {quantityOder.status4
                    ? quantityOder.status4
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "0"}
                </h3>
              </div>
            </div>
          </Row>
          {oders.length === 0 ? (
            <h3 style={{ color: "#333", textAlign: "center" }}>Chưa có Oder</h3>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">FullName</th>
                    <th scope="col">NumberPhone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Node</th>
                    <th scope="col">Pay</th>
                    <th scope="col">CreatedAt</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {oders.map((item) => (
                    <tr key={item._id}>
                      <td>{item.FullName}</td>
                      <td>{item.NumberPhone}</td>
                      <td>{item.Email}</td>
                      <td>{item.Address}</td>
                      <td>{item.Node}</td>
                      <td>{item.Pay}</td>
                      <td>{formatTimestamp(item.createdAt)}</td>
                      <td>
                        <button
                          onClick={() => callModal(item._id)}
                          type="button"
                          className="btn btn-warning"
                        >
                          See Oder
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

export default Oder;
