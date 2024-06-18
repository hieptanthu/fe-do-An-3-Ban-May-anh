import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./style.module.scss";
import Logo from "../../../../asset/logo/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMailBulk,
  faLocation,
  faAtlas,
  faUser,
  faPowerOff,
  faSearch,
  faBars,
  faBagShopping,
  faHeart,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import CategoryApi from "../../../../../api/CategoryApi";
import CartShopApi from "../../../../../api/CartShopApi";
import { CategoryState, ItemsCartState } from "../../../../../constant/recoil";
import { useRecoilValue, useRecoilState } from "recoil";
import Loading from "../../../../common/Loading";
import { accState } from "../../../../../constant/recoil";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import Search from "../../../../User/Seach";
const cx = classNames.bind(style);

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [Categories, SetCategories] = useState([]);
  const acc = useRecoilValue(accState);
  const [, setCategoryState] = useRecoilState(CategoryState);
  const [ListCrad, setListCrad] = useRecoilState(ItemsCartState);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  console.log(Object.keys(acc).length !== 0);
  useEffect(() => {
    const getCategory = async () => {
      const data = await CategoryApi.get();
      if (data.success) {
        SetCategories(data.Categories);
        setCategoryState(data.Categories);
      } else {
        alert("lỗi category");
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    getCategory();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (Object.keys(acc).length !== 0) {
      const ListItemApi = async () => {
        const data = await CartShopApi.get(acc._id);
        if (data.success) {
          setListCrad(data.CardShops.items);
        }
      };
      ListItemApi();
    } else {
      const storedItems = JSON.parse(
        localStorage.getItem("listItemInCart") || "[]"
      );
      setListCrad(storedItems);
    }
  }, []);

  function logOut() {
    localStorage.setItem("token", "");
    toast.success("logOut", {
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

  return (
    <>
      <ToastContainer />
      <header className={cx("header", "shop", isSticky ? "sticky" : "")}>
        {/* Topbar */}
        <div className="topbar">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-12">
                {/* Top Left */}
                <div className="top-left">
                  <ul className="list-main">
                    <li>
                      <FontAwesomeIcon icon={faPhone} /> +060 (800) 801-582
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faMailBulk} /> support@shophub.com
                    </li>
                  </ul>
                </div>
                {/* End Top Left */}
              </div>
              <div className="col-lg-8 col-md-12 col-12">
                {/* Top Right */}
                <div className="right-content">
                  <ul className="list-main">
                    <li>
                      <FontAwesomeIcon icon={faLocation} /> Store location
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faAtlas} />{" "}
                      <a href="#">Daily deal</a>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faUser} />{" "}
                      <a href="#">My account</a>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faPowerOff} />
                      {Object.keys(acc).length !== 0 ? (
                        <Link onClick={logOut} to={"/login"}>
                          LogOut
                        </Link>
                      ) : (
                        <Link to={"/login"}>Login</Link>
                      )}
                    </li>
                  </ul>
                </div>
                {/* End Top Right */}
              </div>
            </div>
          </div>
        </div>
        {/* End Topbar */}
        <div className="middle-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-12">
                {/* Logo */}
                <div className="logo">
                  <Link to={"/"}>
                    <img
                      src={Logo}
                      style={{ width: "100px", filter: "invert(100%)" }}
                      alt="logo"
                    />
                  </Link>
                </div>
                {/* End Logo */}
                {/* Search Form */}
                <div className="search-top">
                  <div className="search-form">
                    <input
                      type="text"
                      placeholder="Search here..."
                      name="Name"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <Link
                      className="btn"
                      to={{
                        pathname: "products/",
                        state: { Name: searchTerm },
                      }}
                    >
                      <button type="submit">
                        <FontAwesomeIcon
                          style={{ color: "#fff" }}
                          icon={faSearch}
                        />
                      </button>
                    </Link>
                  </div>
                </div>
                {/* End Search Form */}
                <div className="mobile-nav"></div>
              </div>
              <div className="col-lg-8 col-md-7 col-12">
                <Search></Search>
              </div>
              <div className="col-lg-2 col-md-3 col-12">
                <div className="right-bar">
                  {/* Search Form */}
                  <div className="sinlge-bar">
                    <Link to="/like" className="single-icon">
                      <FontAwesomeIcon icon={faHeart} />
                    </Link>
                  </div>
                  <div className="sinlge-bar">
                    <a href="#" className="single-icon">
                      <FontAwesomeIcon icon={faUser} />
                    </a>
                  </div>
                  <div className="sinlge-bar shopping">
                    <Link to={"/CartShop/"} className="single-icon">
                      <FontAwesomeIcon icon={faBagShopping} />{" "}
                      <span className="total-count">
                        {ListCrad ? ListCrad.length : 0}
                      </span>
                    </Link>
                    {/* Shopping Item */}
                    <div className="shopping-item">
                      <div className="dropdown-cart-header">
                        <span>{ListCrad ? ListCrad.length : 0} Items</span>
                        <Link to="/CartShop/">View Cart</Link>
                      </div>
                      <ul className="shopping-list">
                        {ListCrad.length == 0 ? (
                          <h3>Chưa có Sản Phẩm nào </h3>
                        ) : (
                          <>
                            {ListCrad.map((items) => (
                              <li key={items.ProductId._id}>
                                <Link
                                  to={"/Productdetails/" + items.ProductId._id}
                                >
                                  <img
                                    style={{
                                      width: "70px",
                                      height: "70px",
                                      objectFit: "cover",
                                    }}
                                    className="cart-img"
                                    src={
                                      items.ProductId.Img &&
                                      items.ProductId.Img[0]
                                        ? items.ProductId.Img[0]
                                        : "https://via.placeholder.com/70x70"
                                    }
                                    alt="#"
                                  />
                                </Link>
                                <h4>
                                  <a href="#">
                                    {items.ProductId.Name || "test"}
                                  </a>
                                </h4>
                                <p className="quantity">
                                  {items.Quantity || "error"} X{" "}
                                  <span className="amount">
                                    {items.ProductId.Price
                                      ? items.ProductId.Price.toString().replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          "."
                                        )
                                      : "error"}{" "}
                                    Vnd
                                  </span>
                                </p>
                              </li>
                            ))}
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Header Inner */}
        <div className="header-inner">
          <div className="container">
            <div className="cat-nav-head">
              <div className="row">
                <div className="col-lg-3">
                  <div className="all-category">
                    <h3 className="cat-heading">
                      <FontAwesomeIcon icon={faBars} /> CATEGORIES
                    </h3>
                    <ul className="main-category">
                      {Categories && Categories.length === 0 ? (
                        <Loading />
                      ) : (
                        Categories &&
                        Categories.map((category) => {
                          return (
                            <li key={category._id}>
                              <Link
                                key={category._id}
                                title={category.Title}
                                to="products/"
                                state={{ categoryId: [category._id] }}
                              >
                                {category.Name}{" "}
                                {category.childCategory.length > 0 ? (
                                  <FontAwesomeIcon
                                    style={{ float: "right" }}
                                    icon={faChevronRight}
                                  />
                                ) : (
                                  ""
                                )}
                              </Link>
                              {category.childCategory.length > 0 && (
                                <ul className="sub-category">
                                  {category.childCategory.map((subCategory) => {
                                    return (
                                      <li key={subCategory.id}>
                                        <Link
                                          key={subCategory._id}
                                          title={subCategory.Title}
                                          to={"products/"}
                                          state={{
                                            categoryId: [
                                              category._id,
                                              subCategory._id,
                                            ],
                                          }}
                                        >
                                          {subCategory.Name}{" "}
                                          {subCategory.childCategory.length >
                                          0 ? (
                                            <FontAwesomeIcon
                                              style={{ float: "right" }}
                                              icon={faChevronRight}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </Link>
                                        {subCategory.childCategory.length >
                                          0 && (
                                          <ul className="sub-category">
                                            {subCategory.childCategory.map(
                                              (child) => {
                                                return (
                                                  <li key={child._id}>
                                                    <Link
                                                      key={child._id}
                                                      title={child.Title}
                                                      to="products/"
                                                      state={{
                                                        categoryId: [
                                                          category._id,
                                                          subCategory._id,
                                                          child._id,
                                                        ],
                                                      }}
                                                    >
                                                      {child.Name}
                                                    </Link>
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-9 col-12">
                  <div className="menu-area">
                    {/* Main Menu */}
                    <nav className="navbar navbar-expand-lg">
                      <div className="navbar-collapse">
                        <div className="nav-inner">
                          <ul className="nav main-menu menu navbar-nav">
                            <li className="active">
                              <Link to="/">Home</Link>
                            </li>
                            <li>
                              <Link to="/products/">Product</Link>
                            </li>
                            <li>
                              <Link href="#">sale</Link>
                            </li>

                            <li>
                              <Link href="#">Q&A</Link>
                            </li>
                            <li>
                              <Link to="/Blog/">Blog</Link>
                            </li>
                            <li>
                              <Link to="/Contact">Contact Us</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </nav>
                    {/* End Main Menu */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Header Inner */}
      </header>
    </>
  );
}

export default Header;
