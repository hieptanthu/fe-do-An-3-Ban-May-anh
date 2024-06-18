import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ReactPaginate from "react-paginate";
import { toast, Bounce } from "react-toastify";
import trendingItemApi from "../../../api/trendingItemApi";
import productApi from "../../../api/productApi";

function ModalCreateUpdate({ show, handleClose, data ,dataOut}) {
  const [name, setName] = useState("");
  const [textSeach, setTextSeach] = useState("");
  const [listProductsIn, setListProductsIn] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {

    if(data!=null){
      const CallAPi = async () => {
        const dataOut = await productApi.get({ ListProduct: data.ListProduct });
        if (dataOut.success) {
          setListProductsIn(dataOut.dataOut);
          setTotalPages(dataOut.totalPages);
          setName(data.Name)
        }
      };
      CallAPi();

    }

    return ()=>{

      setListProductsIn([])
      setName("")

    }
  }, [data]);

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

  const handlePageClick = (event) => {
    setPage(event.selected);
    console.log(`User requested page number ListProduct`, event);
  };

  function addAndremove(data) {
    if (listProductsIn.find((item) => item._id === data._id)) {
      setListProductsIn((prevList) => {
        return prevList.filter((item) => item._id !== data._id);
      });
    } else {
      setListProductsIn([...listProductsIn, data]);
    }
  }

  async function send() {

    const datalistProductsIn=listProductsIn.map((item) => item._id)
    if(name==""){
      alert("name not null")
      return
    }
    const datain={
      "Name":name,
      "ListProduct":datalistProductsIn
    }

    if(data===null){
      const dataApi= await trendingItemApi.post(datain)
      if(dataApi.success){
        
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
        dataOut(dataApi.dataOut)
      }

    }else{

      const dataApi= await trendingItemApi.put(data._id,datain)
      if(dataApi.success){       
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
        dataOut(dataApi.dataOut)
      }

    }
    
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {data == null ? "Create" : "Upload"} TrendingItem
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
          </Row>

          <Row className="mb-3">
            <Row as={Col}>
              <Form.Group as={Col} controlId="Name">
                <Form.Label>ProductIn</Form.Label>

                <div>
                  {listProductsIn.length === 0 ? (
                    <h3 style={{ color: "#333", textAlign: "center" }}>
                      Chưa có sản Phẩm Trong
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
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listProductsIn.map((item) => (
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
                                  alt={item.Name}
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
                              <button
                                  onClick={() => addAndremove(item)}
                                  type="button"
                                  className="btn btn-danger"
                                  style={{ marginLeft: "10px" }}
                                >
                                  remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </Form.Group>
            </Row>
            <Row as={Col}>
              <Form.Group as={Col} controlId="Seach Product">
                <Form.Label>Seach Product</Form.Label>
                <Form.Control
                  value={textSeach}
                  onChange={(e) => setTextSeach(e.target.value)}
                  type="text"
                  placeholder="Enter Product"
                />
                <div>
                  {products.length === 0 ? (
                    <h3 style={{ color: "#333", textAlign: "center" }}>
                      Chưa có sản Phẩm
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
                          {products.map((item, index) => (
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
                                <button
                                  onClick={() => addAndremove(item)}
                                  type="button"
                                  className= {listProductsIn.find((item2) => item2._id === item._id)?"btn btn-danger":"btn btn-primary"}
                                  style={{ marginLeft: "10px" }}
                                >
                                   {listProductsIn.find((item2) => item2._id === item._id)?"remove":"add"}
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
              </Form.Group>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={send}>
            {data == null ? "Create" : "Upload"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUpdate;
