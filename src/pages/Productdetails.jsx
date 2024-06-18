import React, { useEffect, useState } from "react";
import productApi from "../api/productApi";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import { Button, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faEye } from "@fortawesome/free-solid-svg-icons";
import "./scss/ProductDetail.scss";
import { socket } from "../context/socket";
import { accState, ItemsCartState } from "../constant/recoil";
import { useRecoilValue, useRecoilState } from "recoil";
import CartShopApi from "../api/CartShopApi";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import ProductSpecifications from "../components/User/ProductSpecifications";
import Comment from "../components/User/Comment";
import RecentlyViewedProducts from "../components/User/Product/RecentlyViewedProducts";
import ProductOverview from "../components/User/ProductOverview";

const chunkArray = (array, size) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

function Productdetails() {
  let { _id } = useParams();
  const acc = useRecoilValue(accState);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [Quantity, setQuantity] = useState(1);
  const [UserInRomm, setUserInRomm] = useState(0);
  const [, setIniemInCart] = useRecoilState(ItemsCartState);
  console.log(product);
  const [productdetailsAction, setProductdetailsAction] = useState("");
  const [ListProductdetailsAction] = useState([
    "Product Overview",
    "Product detail",
    "Comment Product",
  ]);

  async function addCard() {
    const item = {
      _id: _id,
      ProductId: {
        _id: _id,
        Name: product.Name,
        Price: product.Price,
        Img: product.Img || "https://via.placeholder.com/550x750",
        Quantity: product.Quantity,
      },
      Quantity: Quantity,
    };

    console.log(item);
    if (Object.keys(acc).length !== 0) {
      const dataOut = await CartShopApi.post(acc._id, _id, Quantity);
      if (!dataOut.success) {
        setIniemInCart((data) => [...data, item]);
        toast.success("Thêm sản phẩm thành công", {
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
      } else {
        toast.warning("Sản Phẩm đã trong giỏ Hàng", {
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
      const listCart = JSON.parse(
        localStorage.getItem("listItemInCart") || "[]"
      );
      const find = listCart.find((item) => item.ProductId == _id);
      if (find) {
        toast.warning("Sản Phẩm đã trong giỏ Hàng", {
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
      } else {
        listCart.push(item);
        localStorage.setItem("listItemInCart", JSON.stringify(listCart));
        setIniemInCart((data) => [...data, item]);
        toast.success("Thêm sản phẩm thành công", {
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

  useEffect(() => {
    socket.on("UserInRoomProduct", (data) => {
      setUserInRomm(data);
    });
    socket.on("UserOutRoomProduct", (data) => {
      setUserInRomm(data);
    });

    socket.on("Productexcept", (data) => {
      toast.success(`Anh,Chị ${data.Name} đã mua X ${data.Quantity}`, {
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

      setProduct((prevData) => ({
        ...prevData,
        Quantity: prevData.Quantity - data.Quantity, // Subtracting the received quantity
      }));
    });

    return () => {
      socket.emit("leaveRoomProduct", _id);
    };
  }, [socket]);

  const ChageOuantity = (number) => {
    if (number <= product.Quantity) {
      setQuantity(number);
    } else {
      toast.error("Không đủ số lượng Sản Phẩm", {
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
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productApi.getById(_id);
        if (data.success && data.dataOut && data.dataOut) {
          setProduct(data.dataOut);
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const listIdProducts = JSON.parse(
      localStorage.getItem("ProductsViewed") || "[]"
    );

    const updateListIdProdut = listIdProducts.filter(function (value) {
      return value !== _id;
    });

    let limitedUpdateList = updateListIdProdut.slice(0, 8);

    // Tạo mảng mới với tối đa 9 phần tử bao gồm cả _id
    let finalList = [_id, ...limitedUpdateList];
    console.log(finalList);

    localStorage.setItem("ProductsViewed", JSON.stringify(finalList));

    socket.emit("joinRoomProduct", _id);

    return () => {
      socket.emit("leaveRoomProduct", _id);
    };
  }, [_id]);

  return (
    <>
      {!loading ? (
        <Loading />
      ) : (
        <>
          <div class="breadcrumbs">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="bread-inner">
                    <ul class="bread-list">
                      <li>
                        <Link href="/">Home /</Link>
                      </li>

                      <li class="active">
                        <Link
                          to={
                            "/Productdetails/" + product._id ? product._id : ""
                          }
                        >
                          {product.Name ? product.Name : "erro"}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section>
            <div class="container">
              <div class="row">
                <div className="col-sm-12">
                  <div style={{ textAlign: "center", margin: "20px 0" }}>
                    {" "}
                    <FontAwesomeIcon icon={faEye} /> {UserInRomm}
                  </div>
                </div>
              </div>
              <div class="row">
                <div className="col-sm-12">
                  <div className="product-details">
                    <div className="row">
                      <div class="col">
                        <div class="view-product">
                          <img
                            style={{
                              maxHeight: "400px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                            src={
                              product.Img[0]
                                ? product.Img[0]
                                : "https://via.placeholder.com/550x750"
                            }
                            alt=""
                          />
                        </div>
                        <div
                          id="similar-product"
                          class="carousel slide"
                          data-ride="carousel"
                        >
                          <Carousel style={{ marginTop: "10px" }}>
                            {product.Img.length === 0 ? (
                              <Loading />
                            ) : (
                              chunkArray(product.Img, 3).map((chunk, index) => (
                                <Carousel.Item key={index}>
                                  <div style={{ display: "flex" }}>
                                    {chunk.map((item2, index2) => (
                                      <a
                                        key={index2}
                                        style={{ margin: "10px" }}
                                        href={
                                          item2
                                            ? item2
                                            : "https://via.placeholder.com/550x750"
                                        }
                                      >
                                        <img
                                          style={{
                                            maxHeight: "150px",
                                            width: "200px",
                                            objectFit: "cover",
                                          }}
                                          src={
                                            item2
                                              ? item2
                                              : "https://via.placeholder.com/550x750"
                                          }
                                          alt=""
                                        />
                                      </a>
                                    ))}
                                  </div>
                                </Carousel.Item>
                              ))
                            )}
                          </Carousel>
                        </div>
                      </div>
                      <div class="col">
                        <div id="product-information">
                          <h2>{product.Name ? product.Name : "erro"}</h2>
                          <p>Product ID: {_id}</p>
                          <ul>
                            <li>
                              Price:
                              <samp style={{ color: "red", margin: "0 10px" }}>
                                {product.Price
                                  ? product.Price.toString().replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      "."
                                    )
                                  : "erro"}
                              </samp>
                              VND
                            </li>
                            <li>
                              quantity remaining :{" "}
                              {product.Quantity
                                ? product.Quantity.toString().replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    "."
                                  )
                                : "erro"}
                            </li>
                            <li>
                              <label>Quantity: </label>
                              <input
                                type="number"
                                value={Quantity}
                                onChange={(e) => {
                                  ChageOuantity(e.target.value);
                                }}
                              ></input>
                            </li>
                            {product.Quantity >= 1 ? (
                              <>
                                <li>
                                  <div>
                                    <Button
                                      onClick={() => {
                                        addCard();
                                      }}
                                      variant="warning"
                                    >
                                      <FontAwesomeIcon icon={faShoppingCart} />{" "}
                                      Add to cart
                                    </Button>
                                    <Button variant="danger">
                                      <FontAwesomeIcon icon={faShoppingCart} />{" "}
                                      pay now
                                    </Button>
                                  </div>
                                </li>
                              </>
                            ) : (
                              <>
                                <h1>Hiện Đang Hết Hàng</h1>
                              </>
                            )}

                            <li>
                              <ul>
                                <h3>ListHighlights</h3>
                                {!Array.isArray(product.ListHighlights) ||
                                product.ListHighlights.length === 0
                                  ? "sản phẩm của chúng tôi xin"
                                  : product.ListHighlights.map(
                                      (item, index) => (
                                        <li key={index}>* {item}</li>
                                      )
                                    )}
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="product-area section">
            <div className="product-info">
              <div className="nav-main">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  {ListProductdetailsAction.map((item, index) => (
                    <li key={index} className="nav-item">
                      <a
                        style={{ fontSize: "26px" }}
                        className={productdetailsAction == item ? "active" : ""}
                        onClick={() =>
                          productdetailsAction == item
                            ? setProductdetailsAction("")
                            : setProductdetailsAction(item)
                        }
                        data-toggle="tab"
                        href="#man"
                        role="tab"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
                {/* End Tab Nav */}
              </div>
            </div>

            <div
              style={{ marginTop: "40px" }}
              className="tab-content"
              id="myTabContent"
            >
              <div class="tab-single">
                {productdetailsAction === "Product detail" ? (
                  // JSX cho trường hợp action1
                  <ProductSpecifications ProductId={_id} />
                ) : productdetailsAction === "Comment Product" ? (
                  // JSX cho trường hợp action2
                  <Comment ProductId={_id} />
                ) : productdetailsAction === "Product Overview" ? (
                  <ProductOverview txtHtml={product.Describe
                  } />
                ) : (
                  // JSX cho trường hợp mặc định
                  <h4 style={{ marginTop: "40px" }} className="text-center">
                    Nhấn bên Trên để xem Chi Tiết
                  </h4>
                )}
              </div>
            </div>
          </section>
          <section>
            <RecentlyViewedProducts txtHtml={product.Describe} />
          </section>
        </>
      )}
    </>
  );
}

export default Productdetails;
