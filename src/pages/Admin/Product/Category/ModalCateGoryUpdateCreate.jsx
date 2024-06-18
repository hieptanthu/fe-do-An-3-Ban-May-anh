import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import style from "./style.model.scss";
import classNames from "classnames/bind";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast, Bounce } from "react-toastify";
import CategoryApi from "../../../../api/CategoryApi";

const cx = classNames.bind(style);

function ModalCateGoryUpdateCreate({ show, hinde, data }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  async function send() {
    const dataIn = {
      ListId: data.ListId,
      Name: name,
      Title: title,
    };
    console.log(dataIn)
   
    if(data.dataIn){
      
      const postcateory= await CategoryApi.put(dataIn)

        if(postcateory.success){
         
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
    }
    else{
      
      const postcateory= await CategoryApi.post(dataIn)
      if(postcateory.success){
       
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
    }
   


  }
  return (
    <>
      <Button variant="primary" onClick={hinde}>
        Launch demo modal
      </Button>

      <Modal className={cx("Modal")} show={show} onHide={hinde}>
        <Modal.Header closeButton>
          <Modal.Title>{data.in ? "Update" : "Create"} Ctegory</Modal.Title>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hinde}>
            Close
          </Button>
          <Button variant="primary" onClick={send}>
            {data.in ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCateGoryUpdateCreate;
