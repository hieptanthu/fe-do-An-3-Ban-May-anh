import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast, Bounce } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import productApi from "../../../../api/productApi";
import CategoryApi from "../../../../api/CategoryApi";
import TrademarkApi from "../../../../api/TrademarkApi";
import { BsChevronRight } from "react-icons/bs";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";

function ProductCreateUpdate({ show, hinde, _id }) {
  const [product, setProduct] = useState({});
  const [Categories, setCategories] = useState([]);
  const [Trademars, setTrademars] = useState([]);
  const [ListHighlights, setListHighlights] = useState([]);
  const [Highlights, setHighlights] = useState("");
  const [imgs, setImgs] = useState([]);
  const [files, setFiles] = useState([]);
  const [listChooseCategory, setListChooseCategory] = useState([]);
  const [categories2, setCategories2] = useState({});
  const [categories3, setCategories3] = useState({});
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [dataInModaCategory, setDataInModaCategory] = useState({});
  const [value, setvalue] = useState("");
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
    const callApi = async () => {
      const dataCategoryCall = await CategoryApi.get();
      if (dataCategoryCall.success) {
        setCategories(dataCategoryCall.Categories);
      }

      const dataTrademarsCall = await TrademarkApi.get();
      if (dataTrademarsCall.success) {
        setTrademars(dataTrademarsCall.dataOut);
      }
    };

    callApi();
  }, []);
  useEffect(() => {
    if (_id === null) {
      setProduct({
        _id: "",
        Name: "",
        Title: "",
        categoryId: "",
        TrademarkId: "",
        Price: 0,
        Img: [],
        Describe: "",
        Quantity: 0,
        ListHighlights: [],
      });
    } else if (typeof _id === "string") {
      const callApi = async () => {
        try {
          const data = await productApi.getById(_id);
          if (data.success) {
            setProduct(data.dataOut);
            setImgs(data.dataOut.Img);
            setvalue(data.dataOut.Describe)
            setListHighlights(data.dataOut.ListHighlights);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          // Handle API call error
        }
      };

      callApi();
    }
  }, [_id]);

  useEffect(() => {
    if (
      product.categoryId != "" &&
      product.categoryId != listChooseCategory[listChooseCategory.length - 1]
    ) {
      Categories.forEach((item) => {
        if (item._id == product.categoryId) {
          fillCateGory([item._id]);
          return;
        }
        if (item.childCategory) {
          item.childCategory.forEach((item2) => {
            if (item2._id == product.categoryId) {
              fillCateGory([item._id, item2._id]);
              return;
            }
            if (item2.childCategory) {
              item2.childCategory.forEach((item3) => {
                if (item3._id == product.categoryId) {
                  fillCateGory([item._id, item2._id]);
                  fillCateGory([item._id, item2._id, item3._id]);
                  return;
                }
              });
            }
          });
        }
      });
    }
  }, [product, _id]);

  function chageInProduct(key, value) {
    setProduct((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }

  function addListHighlights() {
    setListHighlights((prevData) => [...prevData, Highlights]);
    setHighlights("");
    chageInProduct("ListHighlights", ListHighlights);
  }

  function fillCateGory(thamChieu) {
    const leg = thamChieu.length;

    if (listChooseCategory != thamChieu) {
      setListChooseCategory(thamChieu);
      chageInProduct("categoryId", thamChieu[leg - 1]);
    }
    if (leg > 0 && Categories.length > 0) {
      const Category = Categories.find((item) => item._id == thamChieu[0]);
      setCategories2({ ListId: thamChieu, item: Category.childCategory || [] });
      setCategories3({});
    }
    if (leg > 1) {
      const Category2 = Categories.find((item) => item._id == thamChieu[0]);
      const Category = Category2.childCategory.find(
        (item) => item._id == thamChieu[1]
      );
      setCategories3({ ListId: thamChieu, item: Category.childCategory || [] });
    }
  }

  const handleFileChange = (event) => {
    const filesIn = event.target.files;
    const fileListArray = Array.from(filesIn);
    const listUrl = fileListArray.map((item) => URL.createObjectURL(item));
    setImgs(listUrl);
    setFiles(fileListArray);
  };

  function deleteListHighlights(index) {
    const newListHighlights = [...ListHighlights];
    newListHighlights.splice(index, 1);
    setListHighlights(newListHighlights);
    chageInProduct("ListHighlights", newListHighlights);
  }

  async function Send() {
    const data = new FormData();
    if (files.length >= 1) {
      for (let i = 0; i < files.length; i++) {
        data.append(`files`, files[i]); // Append each file to the 'files' field
      }
    }

    const keys = Object.keys(product);
    keys.forEach((item) => {
      if(item=="Describe")
      {
        data.append(item, value);
      }else{
        data.append(item, product[item]);
      }
      
    });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      if (_id) {
        const dataout = await productApi.put(_id, data, config);

        if (dataout.success) {
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
        const dataout = await productApi.post(data, config);

        if (dataout.success) {
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
    } catch (error) {
      console.log("oke3s");
      console.error("Error submitting form:", error.message);
    }
  }

  function callModaCategory(ListId, data) {}

  useEffect(() => {
    return () => {
      imgs.forEach((item) => {
        URL.revokeObjectURL(item);
      });
    };
  }, [imgs]);

  return (
    <>
      {showModalCategory && (
        <showModelCategory
          show={showModalCategory}
          hinde={() => setShowModalCategory(!showModalCategory)}
          data={dataInModaCategory}
        ></showModelCategory>
      )}
      <Button variant="primary" onClick={hinde}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={hinde}>
        <Modal.Header closeButton>
          <Modal.Title>{_id ? "Update" : "Create"} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <div className="row align-items-start">
                <div className="col">
                  <ul className="list-group">
                    <li style={{ textAlign: "center" }}>
                      <h4>Category1</h4>
                    </li>
                    {Categories.length === 0 ? (
                      <li>not Category</li>
                    ) : (
                      <>
                        {Categories.map((item) => (
                          <li
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            className={
                              listChooseCategory.includes(item._id)
                                ? "active list-group-item"
                                : "list-group-item"
                            }
                            onClick={() =>
                              chageInProduct("categoryId", item._id)
                            }
                          >
                            <a href="#">{item.Name}</a>

                            {item.childCategory &&
                            item.childCategory.length > 0 ? (
                              <div>
                                <BsChevronRight />
                              </div>
                            ) : (
                              ""
                            )}
                          </li>
                        ))}
                      </>
                    )}
                    <li style={{ textAlign: "center" }}>
                      <a href="#">
                        <FontAwesomeIcon icon={faCirclePlus} />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="list-group">
                    <li style={{ textAlign: "center" }}>
                      <h4>Category2</h4>
                    </li>
                    {!categories2.item || categories2.item.length === 0 ? (
                      <li>not Category</li>
                    ) : (
                      <>
                        {categories2.item.map((item) => (
                          <li
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            className={
                              listChooseCategory.includes(item._id)
                                ? "active list-group-item"
                                : "list-group-item"
                            }
                            onClick={() =>
                              chageInProduct("categoryId", item._id)
                            }
                          >
                            <a href="#">{item.Name}</a>
                            {item.childCategory &&
                            item.childCategory.length > 0 ? (
                              <div>
                                <BsChevronRight />
                              </div>
                            ) : (
                              ""
                            )}
                          </li>
                        ))}
                      </>
                    )}
                    {listChooseCategory.length > 0 && (
                      <li style={{ textAlign: "center" }}>
                        <a href="#">
                          <FontAwesomeIcon icon={faCirclePlus} />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="col">
                  <ul className="list-group">
                    <li style={{ textAlign: "center" }}>
                      <h4>Category3</h4>
                    </li>
                    {!categories3.item || categories3.item.length === 0 ? (
                      <li>not Category</li>
                    ) : (
                      <>
                        {categories3.item.map((item) => (
                          <li
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            className={
                              listChooseCategory.includes(item._id)
                                ? "active list-group-item"
                                : "list-group-item"
                            }
                            onClick={() =>
                              chageInProduct("categoryId", item._id)
                            }
                          >
                            <a href="#">{item.Name}</a>
                          </li>
                        ))}
                      </>
                    )}
                    {listChooseCategory.length > 1 && (
                      <li style={{ textAlign: "center" }}>
                        <a href="#">
                          <FontAwesomeIcon icon={faCirclePlus} />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </Row>
          </Form>

          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={product.Name ? product.Name : ""}
                  onChange={(e) => chageInProduct("Name", e.target.value)}
                  type="text"
                  placeholder="Enter Name"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={product.Title ? product.Title : ""}
                  onChange={(e) => chageInProduct("Title", e.target.value)}
                  type="text"
                  placeholder="Title"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="TrademarkId">
                <Form.Label>Trademark</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    chageInProduct("TrademarkId", e.target.value)
                  }
                  value={product.TrademarkId ? product.TrademarkId : ""}
                >
                  <option value="">Select Trademark</option>
                  {Trademars.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.Name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="Quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  value={product.Quantity ? product.Quantity : ""}
                  onChange={(e) => chageInProduct("Quantity", e.target.value)}
                  type="number"
                  placeholder="Enter Quantity"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="Price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  value={product.Price ? product.Price : ""}
                  onChange={(e) => chageInProduct("Price", e.target.value)}
                  type="number"
                  placeholder="Enter Price"
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="Highlights">
                <Form.Label>Highlights</Form.Label>
                <div style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    onChange={(e) => setHighlights(e.target.value)}
                    value={Highlights ? Highlights : ""}
                  />

                  <Button
                    onClick={addListHighlights}
                    style={{ marginLeft: "10px" }}
                    variant="primary"
                  >
                    Add
                  </Button>
                </div>
                <ul style={{ maxHeight: "100px", overflow: "auto" }}>
                  {ListHighlights.length === 0 ? (
                    <h4>Chưa có Highlights</h4>
                  ) : (
                    <>
                      {ListHighlights.map((item, index) => (
                        <li key={index}>
                          {item}{" "}
                          <samp
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              deleteListHighlights(index);
                            }}
                          >
                            &#10006;
                          </samp>{" "}
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="Image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  onChange={(e) => handleFileChange(e)}
                  type="file"
                  multiple
                />

                {imgs.length === 0 ? (
                  <h4>Chưa có Hình</h4>
                ) : (
                  <ul
                    className="ProductImg"
                    style={{
                      maxHeight: "200px",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {imgs.map((item, index) => (
                      <li key={index}>
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          src={item}
                          alt=""
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </Form.Group>
              <Row>
                <Form.Group as={Col} controlId="dasd">
                  <Form.Label>Describe</Form.Label>
                  <ReactQuill
              modules={module}
              theme="snow"
              value={value}
              onChange={setvalue}
            />
                </Form.Group>
              </Row>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hinde}>
            Close
          </Button>
          <Button onClick={Send} variant="primary">
            {_id ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductCreateUpdate;
