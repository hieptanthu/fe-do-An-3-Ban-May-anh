import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Btn from "../components/common/btn";
import { ProductsChekOut, accState, ItemsCartState } from "../constant/recoil";
import { useRecoilValue, useRecoilState } from "recoil";
import OderApi from "../api/OderApi";
import CartShopApi from "../api/CartShopApi";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { socket } from "../context/socket";
import QrCode from "../components/User/Pay/QrCode";
import { useNavigate } from "react-router-dom";



function generateRandomKey(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
  }

  return key;
}



function Checkout() {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState("payment agent");
  const item = useRecoilValue(ProductsChekOut);
  const acc = useRecoilValue(accState);
  const [, setCart] = useRecoilState(ItemsCartState);
  const [InformationCheckOut, setInformationCheckOut] = useState({});
  const [checkPay, setCheckPay] = useState(false);
  const [qr, setQr] = useState(false);
  const [keyBank,setKeyBank]= useState("");
  console.log(checkPay);

  useEffect(() => {
    const data = {
      UserId: "",
      FullName: "",
      NumberPhone: "",
      Email: "",
      Address: "",
      Node: "",
      DiscountCode: "",
      Pay: paymentType,
      Status: 1,
      Detail: item.Item,
      Total: item.Total > 1000000 ? item.Total : item.Total + 700000,
    };

    if (Object.keys(acc).length !== 0) {
      data.UserId = acc._id;
    }

    setInformationCheckOut(data);
  }, []);

  const [ListpaymentType] = useState([
    "payment agent",
    "Pay now using QR code",
  ]);
  function chageInformationCheckOut(key, value) {
    setInformationCheckOut((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }

  async function PostOder() {

    if (!qr && paymentType != "payment agent") {
      console.log("2")
      if(keyBank==""){
        setKeyBank(generateRandomKey(10))
      }
      setQr(!qr);

      return;
    }
    
    const data = await OderApi.post(InformationCheckOut);
    if (data.success) {
      if (Object.keys(acc).length !== 0) {
        const _idItems = InformationCheckOut.Detail.map((detail) => detail._id);
        const dataCard = await CartShopApi.delete(acc._id, _idItems);
        if (dataCard.success) {
          setCart(dataCard.dataOut.items);
          console.log("item", dataCard.dataOut);
        }
      } else {
        const productIds = InformationCheckOut.Detail.map(
          (detail) => detail.ProductId
        );
        const storedItems = JSON.parse(
          localStorage.getItem("listItemInCart") || "[]"
        );
        const updatedStoredItems = storedItems.filter(
          (item) => !productIds.includes(item.ProductId._id)
        );

        localStorage.setItem(
          "listItemInCart",
          JSON.stringify(updatedStoredItems)
        );

        setCart(updatedStoredItems);
      }
      socket.emit("SETProductPay", {
        Name: data.dataOut.FullName,
        Item: data.dataOut.Detail,
      });
      toast.success(data.message, {
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
      navigate("/");
    }
  }

  return (
    <>
      {qr && (
        <QrCode
          TransactionCode={keyBank}
          DataOut={(data) => {
            console.log("check")
            setCheckPay(data);
            PostOder();
          }}
          amount={2000}
        />
      )}
      {Object.keys(item).length == 0 ? (
        <h1>Chọn sản phẩm thanh toán</h1>
      ) : (
        <>
          <div class="breadcrumbs">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="bread-inner">
                    <ul class="bread-list">
                      <li>
                        <Link to={"/"}>Home /</Link>
                      </li>
                      <li class="active">
                        <a href="#">Checkout</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section class="shop checkout section">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 col-12">
                  <div class="checkout-form">
                    <h2>Make Your Checkout Here</h2>
                    <p>Please register in order to checkout more quickly</p>
                    {/* <!-- Form --> */}
                    <form class="form" method="post" action="#">
                      <div class="row">
                        <div class="col-lg-12 col-md-12 col-12">
                          <div class="form-group">
                            <label>
                              Full Name<span>*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              placeholder=""
                              required="required"
                              value={
                                InformationCheckOut.FullName
                                  ? InformationCheckOut.FullName
                                  : ""
                              }
                              onChange={(e) => {
                                chageInformationCheckOut(
                                  "FullName",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-12">
                          <div class="form-group">
                            <label>
                              Email Address<span>*</span>
                            </label>
                            <input
                              value={
                                InformationCheckOut.Email
                                  ? InformationCheckOut.Email
                                  : ""
                              }
                              onChange={(e) => {
                                chageInformationCheckOut(
                                  "Email",
                                  e.target.value
                                );
                              }}
                              type="email"
                              name="email"
                              placeholder=""
                              required="required"
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-12">
                          <div class="form-group">
                            <label>
                              Phone Number<span>*</span>
                            </label>
                            <input
                              value={
                                InformationCheckOut.NumberPhone
                                  ? InformationCheckOut.NumberPhone
                                  : ""
                              }
                              onChange={(e) => {
                                chageInformationCheckOut(
                                  "NumberPhone",
                                  e.target.value
                                );
                              }}
                              type="number"
                              name="number"
                              placeholder=""
                              required="required"
                            />
                          </div>
                        </div>

                        <div class="col-lg-12 col-md-12 col-12">
                          <div class="form-group">
                            <label>
                              Address <span>*</span>
                            </label>
                            <input
                              value={
                                InformationCheckOut.Address
                                  ? InformationCheckOut.Address
                                  : ""
                              }
                              onChange={(e) => {
                                chageInformationCheckOut(
                                  "Address",
                                  e.target.value
                                );
                              }}
                              type="text"
                              name="address"
                              placeholder=""
                              required="required"
                            />
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12 col-12">
                          <div class="form-group">
                            <label>
                              Node <span>*</span>
                            </label>
                            <input
                              value={
                                InformationCheckOut.Node
                                  ? InformationCheckOut.Node
                                  : ""
                              }
                              onChange={(e) => {
                                chageInformationCheckOut(
                                  "Node",
                                  e.target.value
                                );
                              }}
                              type="text"
                              name="Node"
                              placeholder=""
                              required="required"
                            />
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="form-group create-account">
                            <input id="cbox" type="checkbox" />
                            <label>Create an account?</label>
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* <!--/ End Form --> */}
                  </div>
                </div>
                <div class="col-lg-4 col-12">
                  <div class="order-details">
                    {/* <!-- Order Widget --> */}
                    <div class="single-widget">
                      <h2>CART TOTALS</h2>
                      <div class="content">
                        <ul>
                          <li>
                            Sub Total
                            <span>
                              {item.Total.toString().replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                "."
                              ) + " VND"}{" "}
                            </span>
                          </li>
                          <li>
                            (+) Shipping
                            <span>
                              {item.Total > 1000000 ? "free" : "70.0000 VND"}
                            </span>
                          </li>
                          <li class="last">
                            Total
                            <span>
                              {item.Total > 1000000
                                ? item.Total.toString().replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    "."
                                  ) + " VND"
                                : (item.Total + 700000)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                                  " VND"}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <!--/ End Order Widget --> */}
                    {/* <!-- Order Widget --> */}
                    <div class="single-widget">
                      <h2>Payments</h2>
                      <div class="content">
                        <div class="checkbox">
                          {ListpaymentType.map((item, index) => (
                            <label
                              key={index}
                              onClick={() => {
                                setPaymentType(item);
                                chageInformationCheckOut("Pay", item);
                              }}
                              className={
                                paymentType === item
                                  ? "checkbox-inline checked"
                                  : "checkbox-inline"
                              }
                              htmlFor={index}
                            >
                              <input
                                name="updates"
                                id={index}
                                type="checkbox"
                              />
                              {item}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div class="single-widget get-button">
                      <div class="content">
                        <div onClick={PostOder} class="button">
                          <Btn
                            text={" proceed to checkout"}
                            type={"btn-secondary"}
                          ></Btn>
                        </div>
                      </div>
                    </div>
                    {/* <!--/ End Button Widget --> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Checkout;
