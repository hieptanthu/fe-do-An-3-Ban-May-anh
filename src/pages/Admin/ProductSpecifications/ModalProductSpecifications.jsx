import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast, Bounce } from "react-toastify";
import ProductSpecificationsApi from "../../../api/ProductSpecificationsApi";

function ModalProductSpecifications({ show, handleClose, data }) {
  const [name, setName] = useState("");
  const [listDetail, setListDetail] = useState([]);
  const [formData, setFormData] = useState({ Name: "", Detail: "" });
  console.log(listDetail);
  const handleInputChange = (key, value) => {
    console.log(key);
    setFormData({
      ...formData,
      [key]: value,
    });
  };

 
  const handleAddObject = (e) => {
    e.preventDefault();
    setListDetail([...listDetail, formData]);
    setFormData({ Name: "", Detail: "" }); // Reset form fields
  };
  console.log(data);
  function Delete(index) {
    const updatedList = listDetail
      .slice(0, index)
      .concat(listDetail.slice(index + 1)); // Tạo một mảng mới bằng cách nối mảng trước và sau phần tử cần xóa
    setListDetail(updatedList); // Cập nhật listDetail với mảng mới đã xóa phần tử
  }

  useEffect(() => {
    if (data._id) {
      setName(data.Name);
      setListDetail(data.ListDetail);
    }

    return () => {
      setListDetail([]);
      setName("");
    };
  }, [data]);

  async function send() {
    if (name === "") {
      alert("Nhập Name");
      return;
    }
    const dataIn = {
      Name: name,
      ProductId: data.productId,
      ListDetail: listDetail,
    };

    if (data._id) {
      const dataOut = await ProductSpecificationsApi.put(data._id, dataIn);
      if (dataOut.success) {
        toast.success("Upadte success", {
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
      const dataOut = await ProductSpecificationsApi.post(dataIn);
      if (dataOut.success) {
        toast.success("Create success", {
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
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {data._id ? "Upload" : "Create"} ProductSpecifications
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Name"
              />
            </Form.Group>

            <Form.Group
              style={{
                marginTop: "20px",
                borderTop: "1px solid",
                paddingTop: "10px",
              }}
            >
              <Row>
                <Col>
                  <h3>Table</h3>
                </Col>

                <Col>
                  <button
                    onClick={handleAddObject}
                    type="button"
                    className="btn btn-danger"
                    style={{ marginLeft: "10px", float: "right" }}
                  >
                    Add
                  </button>
                </Col>
              </Row>

              <Row>
                <Form.Group as={Col} controlId="Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={formData.Name}
                    onChange={(e) => {
                      handleInputChange("Name", e.target.value);
                    }}
                    type="text"
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="DetailL">
                  <Form.Label>Detail</Form.Label>
                  <Form.Control
                    value={formData.Detail}
                    onChange={(e) => {
                      handleInputChange("Detail", e.target.value);
                    }}
                    type="text"
                    placeholder="Enter Name"
                  />
                </Form.Group>
              </Row>

              <Row>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-center ">Name</th>
                      <th className="text-center ">Detail</th>
                      <th className="text-center ">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listDetail.length === 0 ? (
                      <tr>
                        <td colSpan="2">
                          <h4 colSpan="2" className="text-center">
                            Chưa có
                          </h4>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {listDetail.map((item, index) => (
                          <tr key={index}>
                            <td className="text-center ">{item.Name}</td>
                            <td className="text-center ">{item.Detail}</td>
                            <td className="text-center ">
                              <button
                                onClick={() => Delete(index)}
                                type="button"
                                className="btn btn-danger"
                                style={{ marginLeft: "10px" }}
                              >
                                delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </Row>
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={send}>
            {data._id ? "Upload" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
      D
    </>
  );
}

export default ModalProductSpecifications;
