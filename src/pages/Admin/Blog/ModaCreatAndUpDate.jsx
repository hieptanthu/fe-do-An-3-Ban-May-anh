import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast, Bounce } from "react-toastify";
import BlogApi from "../../../api/BlogApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ModaCreatAndUpDate({ show, handleClose, _id }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  useEffect(() => {
    console.log(_id);
    if (_id&&_id!=undefined&&_id!="") {
      console.log("vao r")
      const callDataApi = async () => {
        const dataOut = await BlogApi.getById(_id);
        console.log(dataOut);
        if (dataOut.success) {
          setName(dataOut.dataOut.Name);
          setTitle(dataOut.dataOut.Title);
          setValue(dataOut.dataOut.Data);
        }
      };
      callDataApi();
    } else {
      setName("");
      setTitle("");
      setValue("");
    }
  }, [_id]);

  async function send() {
    const dataIn = {
      Name: name,
      Title: title,
      Data: value,
    };

    if (_id) {
      const dataApi = await BlogApi.put(_id, dataIn);
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
      const dataApi = await BlogApi.post(dataIn);
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

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{_id == null ? "Create" : "Upload"} Block</Modal.Title>
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
            <ReactQuill
              modules={module}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={send}>
            {_id == null ? "Create" : "Upload"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModaCreatAndUpDate;
