import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast, Bounce } from "react-toastify";
import TrademarkApi from "../../../api/TrademarkApi";

function ModaTrademark({ show, handleClose, data }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [linkImg, setLinkImg] = useState("");


  useEffect(() => {
   if(data!=null){
    setName(data.Name)
    setTitle(data.Title)
    setLinkImg(data.Img)
   }else{
    setName("")
    setTitle("")
    setLinkImg("")
    setFile("")
   }
  }, [data]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(linkImg);
    };
  }, [linkImg]);

  async function send() {
    const fromData = new FormData();
    fromData.append("Name", name);
    fromData.append("Title", title);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    if (file) {
      fromData.append("files", file);
    }
    console.log(file)
    if (data) {
      const dataApi = await TrademarkApi.put(data._id, fromData, config);
      if (dataApi.success) {
        toast.success("Update success", {
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
      const dataApi = await TrademarkApi.post(fromData, config);
      if (dataApi.success) {
        toast.success("create success", {
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

  const handleFileChange = (event) => {
    const filesIn = event.target.files[0];
    const UrlImg = URL.createObjectURL(filesIn);
    setLinkImg(UrlImg);
    setFile(filesIn);
  };




  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data==null ? "Create" : "Upload"} Trademark</Modal.Title>
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

            <Form.Group as={Col} controlId="Title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="Image">
              <Form.Label>Image</Form.Label>
              <Form.Control onChange={(e) => handleFileChange(e)} type="file" />
            </Form.Group>
            <Form.Group  as={Col}>

              {linkImg === "" ? (
                <h4>Chưa có Hình</h4>
              ) : (
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                  src={linkImg}
                  alt=""
                />
              )}
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={send}>
            {data==null ? "Create" : "Upload"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModaTrademark;
