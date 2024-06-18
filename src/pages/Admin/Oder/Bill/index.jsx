import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import OderApi from "../../../../api/OderApi";
import Loading from "../../../../components/common/Loading";
import { Row } from "react-bootstrap";
import { formatTimestamp } from "../../../../tool";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { toast, Bounce } from "react-toastify";
const cx = classNames.bind(styles);

function BillModal({ show, handleClose, data }) {
  const [bill, setBill] = useState();
  const [status, setStatus] = useState(1);
  let total = 0;
  useEffect(() => {
    async function callApi() {
      const dataOut = await OderApi.getById(data);
      if (dataOut.success) {
        setBill(dataOut.dataOut);
        setStatus(dataOut.dataOut.Status);
        console.log(dataOut.dataOut);
      }
    }

    callApi();
  }, [data]);

 async function send(){

  const dataOutApi = await OderApi.put(data,status)
  if(dataOutApi.success){
    toast.success("Updates success", {
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

 }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Oder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!bill ? (
          <Loading />
        ) : (
          <>
            <Row>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className={cx("card")}>
                      <div className="card-body">
                        <div className="invoice-title">
                          <h4 className="float-end font-size-15">
                            #
                            <span className="badge bg-success font-size-12 ms-2">
                              Bill Id
                            </span>
                          </h4>
                          <div className="mb-4">
                            <h2 className="mb-1 text-muted">Shop Camera ĐH</h2>
                          </div>
                          <div className="text-muted">
                            <p className="mb-1">Ân thi-Hưng-Yên-Việt Nam</p>
                            <p className="mb-1">
                              <FaEnvelope />
                              <a
                                href="/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="790100033940414e571a1614"
                              >
                                NguyenHiep@gmail.com
                              </a>
                            </p>
                            <p>
                              <FaPhoneAlt /> 012-345-6789
                            </p>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="text-muted">
                              <h5 className="font-size-16 mb-3">Billed To:</h5>
                              <h5 className="font-size-15 mb-2">
                                {bill.FullName ? bill.FullName : "erro"}
                              </h5>
                              <p className="mb-1">
                                {bill.Address ? bill.Address : "erro"}
                              </p>
                              <p className="mb-1">
                                <a
                                  href="/cdn-cgi/l/email-protection"
                                  className="__cf_email__"
                                  data-cfemail="66361403151209082b0f0a0a03142607140b1f15161f4805090b"
                                >
                                  {bill.Email ? bill.Email : "erro"}
                                </a>
                              </p>
                              {bill.NumberPhone ? bill.NumberPhone : "erro"}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="text-muted text-sm-end">
                              <div>
                                <h5 className="font-size-15 mb-1">
                                  Invoice No:
                                </h5>
                                <p>{bill._id}</p>
                              </div>
                              <div className="mt-4">
                                <h5 className="font-size-15 mb-1">
                                  Invoice Date:
                                </h5>
                                <p>{formatTimestamp(bill.createdAt)}</p>
                              </div>
                              <div className="mt-4">
                                <h5 className="font-size-15 mb-1">Order No:</h5>
                                <p>{bill._id}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <h5 className="font-size-15">Order Summary</h5>
                          <div className="table-responsive">
                            <table className="table align-middle table-nowrap table-centered mb-0">
                              <thead>
                                <tr>
                                  <th style={{ width: 70 }}>No.</th>
                                  <th>Item</th>
                                  <th>Price</th>
                                  <th>Quantity</th>
                                  <th
                                    className="text-end"
                                    style={{ width: 120 }}
                                  >
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {bill.Detail.map((item, index) => {
                                  const itemTotal = item.Quantity * item.Price;
                                  total += itemTotal; // Accumulate total
                                  return (
                                    <tr key={index}>
                                      <th scope="row">{index + 1}</th>
                                      <td>
                                        <div>
                                          <h5 className="text-truncate font-size-14 mb-1">
                                            {item.ProductId.Name}
                                          </h5>
                                        </div>
                                      </td>
                                      <td>
                                        {item.Price.toString().replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          "."
                                        )}{" "}
                                        VND
                                      </td>
                                      <td>
                                        {item.Quantity.toString().replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          "."
                                        )}
                                      </td>
                                      <td className="text-end">
                                        {itemTotal
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            "."
                                          )}{" "}
                                        VND{" "}
                                      </td>
                                    </tr>
                                  );
                                })}

                                <tr>
                                  <th
                                    scope="row"
                                    colSpan={4}
                                    className="text-end"
                                  >
                                    Sub Total
                                  </th>
                                  <td className="text-end">
                                    {total
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                    VND
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    colSpan={4}
                                    className="border-0 text-end"
                                  >
                                    Discount :
                                  </th>
                                  <td className="border-0 text-end">0</td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    colSpan={4}
                                    className="border-0 text-end"
                                  >
                                    Shipping Charge :
                                  </th>
                                  <td className="border-0 text-end">
                                    {(bill.Total - total)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                    VND
                                  </td>
                                </tr>

                                <tr>
                                  <th
                                    scope="row"
                                    colSpan={4}
                                    className="border-0 text-end"
                                  >
                                    Total
                                  </th>
                                  <td className="border-0 text-end">
                                    <h4 className="m-0 fw-semibold">
                                      {bill.Total.toString().replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        "."
                                      )}
                                      VND
                                    </h4>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="d-print-none mt-4">
                            <div className="float-end">
                              <a
                                href="javascript:window.print()"
                                className="btn btn-success me-1"
                              >
                                <i className="fa fa-print" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
            <Row></Row>
          </>
        )}
        <Row>
          <Form.Group as={Col} controlId="TrademarkId">
            <Form.Label>Trademark</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="">Select Status Oder</option>

              <option value={1}>ĐẶT ĐƠN</option>
              <option value={2}>Gửi Đơn</option>
              <option value={3}>Thành Công</option>
              <option value={4}>Đơn Bị Hủy</option>
            </Form.Control>
          </Form.Group>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={send}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BillModal;
