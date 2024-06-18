import React, { useEffect, useState } from "react";
import { accState } from "../constant/recoil";
import { useRecoilValue } from "recoil";
import CartShopApi from "../api/CartShopApi";
import Loading from "../components/common/Loading";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ProductsChekOut, ItemsCartState } from "../constant/recoil";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { Button } from "react-bootstrap";
function CartShop() {
  const acc = useRecoilValue(accState);
  const [, setListCradGlobal] = useRecoilState(ItemsCartState);
  const [ListCrad, setListCrad] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [deletes, setListDeletes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [CartSubtotal, setCartSubtotal] = useState(0);
  const [CheckOutProducts, setCheckOutProducts] =useRecoilState(ProductsChekOut);
  useEffect(() => {
    if (Object.keys(acc).length !== 0) {
      const ListItemApi = async () => {
        const data = await CartShopApi.get(acc._id);
        if (data.success) {
          setListCrad(data.CardShops.items);
          setListCradGlobal(data.CardShops.items)
        }
      };
      ListItemApi();
    } else {
      const storedItems = JSON.parse(
        localStorage.getItem("listItemInCart") || "[]"
      );
      setListCrad(storedItems);
      setListCradGlobal(storedItems)
    }
  }, []);

  useEffect(() => {
    getCheckedCheckboxes();
    return () => {
      const cleanupFunction = async () => {
        if (Object.keys(acc).length !== 0) {
          if (updates.length !== 0) {
            const data = await CartShopApi.put(acc._id, updates);
            console.log(data);
          }

          if (deletes.length !== 0) {
            const data = await CartShopApi.delete(acc._id, deletes);
            console.log(data);
          }
        } else {
          if (ListCrad.length !== 0 || deletes.length !== 0) {
            localStorage.setItem("listItemInCart", JSON.stringify(ListCrad));
          }
        }
        if (ListCrad.length !== 0) {
          setListCradGlobal(ListCrad);
        }
        if (ListCrad.length == 0 && deletes.length !== 0) {
          setListCradGlobal(ListCrad);
        }
      };
      cleanupFunction();
    };
  }, [updates, deletes, ListCrad]);

  const SetQuanTity = (type, _id, Quantity) => {
    const index = ListCrad.findIndex((item) => item._id === _id);
    if (index !== -1) {
      const updatedListCrad = [...ListCrad]; // Make a shallow copy of ListCrad
      updatedListCrad[index] = {
        ...updatedListCrad[index],
        Quantity: type ? Quantity + 1 : Quantity - 1,
      };
      setListCrad(updatedListCrad);
    }
    const SetUpDateCart = updates.find((item) => item._id === _id);
    if (SetUpDateCart) {
      setUpdates(
        updates.map((item) =>
          item._id === _id
            ? { ...item, Quantity: type ? Quantity + 1 : Quantity - 1 }
            : item
        )
      );
    } else {
      setUpdates([...updates, { _id: _id, Quantity: Quantity }]);
    }
  };

  const deleteProduct = (_id) => {
    setListCrad((prevListCrad) =>
      prevListCrad.filter((item) => item._id !== _id)
    );
    if (Object.keys(acc).length !== 0) {
      setListDeletes((prevUpdates) => [...prevUpdates, _id]);
    } else {
      setListDeletes((prevUpdates) => [...prevUpdates, _id]);
    }

    toast.success("remove Product in Cart", {
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
  };

  function getCheckedCheckboxes() {
    const checkboxes = document.querySelectorAll(".check:checked");
    const checkedValues = [];
    checkboxes.forEach((checkbox) => {
      checkedValues.push(checkbox.value);
    });

    let monny = 0;
    let irtmCheckOut = [];
    checkedValues.forEach((item1) => {
      ListCrad.forEach((item) => {
        if (item._id === item1) {
          console.log(item);
          irtmCheckOut.push({
            _id: item._id,
            ProductId: item.ProductId._id,
            Quantity: item.Quantity,
          });
          monny += item.Quantity * item.ProductId.Price;
        }
      });
    });

    

    setCheckOutProducts({ Item: irtmCheckOut, Total: monny });

    setCartSubtotal(monny);
  }

  const checkCheckOut = (e) => {
    
    if (CheckOutProducts.Item.length > 0 && CheckOutProducts.Item) {
      toast.success("to check Out", {
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
      e.preventDefault();
      toast.warning("choose product please", {
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

  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bread-inner">
                <ul className="bread-list">
                  <li>
                    <Link to="/">Home /</Link>
                  </li>
                  <li className="active">
                    <a href="#">Cart</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="shopping-cart section">
          <div className="container">
            {!ListCrad || ListCrad.length == 0 ? (
              <h1>Chưa có sản Phẩm</h1>
            ) : (
              <>
                <div className="row">
                  <div className="col-12">
                    {/* <!-- Shopping Summery --> */}
                    <table className="table shopping-summery">
                      <thead>
                        <tr className="main-hading">
                          <th
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              textAlign: "center",
                            }}
                          >
                            <p style={{ margin: "auto 0" }}>check all</p>
                            <input
                              style={{ margin: "auto 0" }}
                              type="checkbox"
                              name=""
                              id="CheckAll"
                            />
                          </th>
                          <th>PRODUCT</th>
                          <th>NAME</th>
                          <th className="text-center">UNIT PRICE</th>
                          <th className="text-center">QUANTITY</th>
                          <th className="text-center">TOTAL</th>
                          <th className="text-center">
                            <i className="ti-trash remove-icon"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ListCrad.map((item) => (
                          <tr key={item._id}>
                            <td>
                              {item.ProductId.Quantity > 0 ? (
                                <>
                                  <input
                                    onChange={getCheckedCheckboxes}
                                    type="checkbox"
                                    className="text-center check"
                                    name=""
                                    value={item._id}
                                  />
                                </>
                              ) : (
                                <>
                                  <p className="text-center">
                                    Hiện Đang Hết Hàng
                                  </p>
                                </>
                              )}
                            </td>
                            <td className="image text-center" data-title="No">
                              <img
                                style={{ objectFit: "cover" }}
                                src={
                                  item.ProductId.Img[0]
                                    ? item.ProductId.Img[0]
                                    : "https://via.placeholder.com/100x100"
                                }
                                alt="#"
                              />
                            </td>
                            <td
                              className="product-des"
                              data-title="Description"
                            >
                              <p className="product-name text-center">
                                <Link
                                  to={"/Productdetails/" + item.ProductId._id}
                                >
                                  {item.ProductId.Name
                                    ? item.ProductId.Name
                                    : "Sản phẩm Test"}
                                </Link>
                              </p>
                            </td>
                            <td className="price" data-title="Price">
                              <span>
                                {item.ProductId.Price
                                  ? item.ProductId.Price.toString().replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      "."
                                    )
                                  : "erro"}{" "}
                                Vnd
                              </span>
                            </td>
                            <td className="qty text-center" data-title="Qty">
                              {/* <!-- Input Order --> */}
                              <div className="input-group">
                                <div className="button minus">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-number"
                                    disabled={
                                      item.Quantity > 1 ? "" : "disabled"
                                    }
                                    onClick={() => {
                                      SetQuanTity(
                                        false,
                                        item._id,
                                        item.Quantity
                                      );
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faMinus} />
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  name="quant[1]"
                                  className="input-number"
                                  data-min="1"
                                  data-max="100"
                                  value={item.Quantity ? item.Quantity : "erro"}
                                />
                                <div className="button plus">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-number"
                                    onClick={() => {
                                      SetQuanTity(
                                        true,
                                        item._id,
                                        item.Quantity
                                      );
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faPlus} />
                                  </button>
                                </div>
                              </div>
                              {/* <!--/ End Input Order --> */}
                            </td>
                            <td className="total-amount" data-title="Total">
                              <span>
                                {item.Quantity && item.ProductId.Price
                                  ? (item.Quantity * item.ProductId.Price)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                                    " Vnd"
                                  : "erro"}
                              </span>
                            </td>
                            <td className="action" data-title="Remove">
                              <a
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteProduct(item._id);
                                }}
                                href="#"
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {/* <!-- Total Amount --> */}
                    <div className="total-amount">
                      <div className="row">
                        <div className="col-lg-8 col-md-5 col-12">
                          <div className="left">
                            <div className="coupon">
                              <form action="#" target="_blank">
                                <input
                                  name="Coupon"
                                  placeholder="Enter Your Coupon"
                                />
                                <button className="btn">Apply</button>
                              </form>
                            </div>
                            <div className="checkbox">
                              <label className="checkbox-inline" for="2">
                                <input name="news" id="2" type="checkbox" />{" "}
                                Shipping (+10$)
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-7 col-12">
                          <div className="right">
                            <ul>
                              <li style={{ display: "grid" }}>
                                Item Check Subtotal
                                <span>
                                  {CartSubtotal.toString().replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    "."
                                  ) + " VND"}{" "}
                                </span>
                              </li>
                              <li>
                                Shipping
                                <span>
                                  {CartSubtotal > 1000000
                                    ? "Free"
                                    : "70.000 VND"}
                                </span>
                              </li>
                              <li>
                                You Save<span>0 VND</span>
                              </li>
                              <li className="last">
                                You Pay
                                <span>
                                  {CartSubtotal > 1000000
                                    ? CartSubtotal.toString().replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        "."
                                      ) + " VND"
                                    : (CartSubtotal + 70000)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                                      " VND"}
                                </span>
                              </li>
                            </ul>
                            <div className="button5">
                              <Link
                                onClick={(e) => checkCheckOut(e)}
                                to={"/Checkout/"}
                              >
                                <Button variant="warning"> Checkout</Button>
                              </Link>

                              <Link to="/">
                                <Button variant="warning">
                                  Continue shopping
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CartShop;
