import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import { Image, Navbar } from "react-bootstrap";
import Logo from '../../../../asset/logo/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMailBulk, faLocation, faAtlas, faUser, faPowerOff, faSearch, faBars, faBagShopping, faHeart ,faChevronRight} from "@fortawesome/free-solid-svg-icons";
import CategoryApi from '../../../../../api/CategoryApi';
import { CategoryState } from "../../../../../constant/recoil";
import { useRecoilState } from "recoil";
import Loading from '../../../../../components/common/Loading';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function Header() {
    const [isSticky, setIsSticky] = useState(false);
    const [Categories, SetCategories] = useState([]);

    const [, setCategoryState] = useRecoilState(CategoryState);

    useEffect(() => {

        const getCategory = async () => {
            const data = await CategoryApi.get()
            if (data.success) {
                SetCategories(data.Categories)
                setCategoryState(data.Categories)
            } else {
                alert("lỗi category")
            }
        }

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        getCategory();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header className={cx("header", "shop", isSticky ? "sticky" : "")}>
                {/* Topbar */}
                <div className="topbar">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-12 col-12">
                                {/* Top Left */}
                                <div className="top-left">
                                    <ul className="list-main">
                                        <li><FontAwesomeIcon icon={faPhone} /> +060 (800) 801-582</li>
                                        <li><FontAwesomeIcon icon={faMailBulk} /> support@shophub.com</li>
                                    </ul>
                                </div>
                                {/* End Top Left */}
                            </div>
                            <div className="col-lg-8 col-md-12 col-12">
                                {/* Top Right */}
                                <div className="right-content">
                                    <ul className="list-main">
                                        <li><FontAwesomeIcon icon={faLocation} /> Store location</li>
                                        <li><FontAwesomeIcon icon={faAtlas} /> <a href="#">Daily deal</a></li>
                                        <li><FontAwesomeIcon icon={faUser} /> <a href="#">My account</a></li>
                                        <li><FontAwesomeIcon icon={faPowerOff} /><a href="login.html#">Login</a></li>
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
                                    <a href="/"><img src={Logo} style={{ width: "100px", filter: "invert(100%)" }} alt="logo" /></a>
                                </div>
                                {/* End Logo */}
                                {/* Search Form */}
                                <div className="search-top">
                                    <div className="top-search"><a href="#0"><FontAwesomeIcon icon={faSearch} /></a></div>
                                    {/* Search Form */}
                                    <div className="search-top">
                                        <form className="search-form">
                                            <input type="text" placeholder="Search here..." name="search" />
                                            <button value="search" type="submit"><FontAwesomeIcon style={{ color: "#fff" }} icon={faSearch} /></button>
                                        </form>
                                    </div>
                                    {/* End Search Form */}
                                </div>
                                {/* End Search Form */}
                                <div className="mobile-nav"></div>
                            </div>
                            <div className="col-lg-8 col-md-7 col-12">
                                <div className="search-bar-top">
                                    <div className="search-bar">
                                        <form>
                                            <input name="search" placeholder="Search Products Here....." type="search" />
                                            <button className="btnn"><FontAwesomeIcon style={{ color: "#fff" }} icon={faSearch} /></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-12">
                                <div className="right-bar">
                                    {/* Search Form */}
                                    <div className="sinlge-bar">
                                     <Link  to="/like" className="single-icon"><FontAwesomeIcon icon={faHeart} /></Link>
                                    </div>
                                    <div className="sinlge-bar">
                                        <a href="#" className="single-icon"><FontAwesomeIcon icon={faUser} /></a>
                                    </div>
                                    <div className="sinlge-bar shopping">
                                        <a href="#" className="single-icon"><FontAwesomeIcon icon={faBagShopping} /> <span className="total-count">2</span></a>
                                        {/* Shopping Item */}
                                        <div className="shopping-item">
                                            <div className="dropdown-cart-header">
                                                <span>2 Items</span>
                                                <a href="#">View Cart</a>
                                            </div>
                                            <ul className="shopping-list">
                                                <li>
                                                    <a href="#" className="remove" title="Remove this item"><i className="fa fa-remove"></i></a>
                                                    <a className="cart-img" href="#"><img src="https://via.placeholder.com/70x70" alt="#" /></a>
                                                    <h4><a href="#">Woman Ring</a></h4>
                                                    <p className="quantity">1x - <span className="amount">$99.00</span></p>
                                                </li>
                                                <li>
                                                    <a href="#" className="remove" title="Remove this item"><i className="fa fa-remove"></i></a>
                                                    <a className="cart-img" href="#"><img src="https://via.placeholder.com/70x70" alt="#" /></a>
                                                    <h4><a href="#">Woman Necklace</a></h4>
                                                    <p className="quantity">1x - <span className="amount">$35.00</span></p>
                                                </li>
                                            </ul>
                                            <div className="bottom">
                                                <div className="total">
                                                    <span>Total</span>
                                                    <span className="total-amount">$134.00</span>
                                                </div>
                                                <a href="checkout.html" className="btn animate">Checkout</a>
                                            </div>
                                        </div>
                                        {/* End Shopping Item */}
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
                                        <h3 className="cat-heading"><FontAwesomeIcon icon={faBars} /> CATEGORIES</h3>
                                        <ul className="main-category">

                                            {
                                                Categories && Categories.length === 0 ? <Loading /> :
                                                    Categories && Categories.map(category => {
                                                        return (
                                                            <li key={category._id}>
                                                                <Link key={category._id} title={category.Title} to="products/" state={{ categoryId: [category._id ]}} >{category.Name}  {category.childCategory.length > 0?<FontAwesomeIcon  style={{float:"right"}} icon={faChevronRight} />:""}</Link>
                                                                {category.childCategory.length > 0 &&
                                                                    <ul className="sub-category">
                                                                        {category.childCategory.map(subCategory => {
                                                                            return (
                                                                                <li key={subCategory.id}>
                                                                                    <Link key={subCategory._id} title={subCategory.Title} to={"products/"}  state={{ categoryId:  [category._id,subCategory._id  ]}}  >{subCategory.Name} {subCategory.childCategory.length > 0?<FontAwesomeIcon style={{float:"right"}} icon={faChevronRight} />:""}</Link>
                                                                                    {subCategory.childCategory.length > 0 &&
                                                                                        <ul className="sub-category">
                                                                                            {subCategory.childCategory.map(child => {
                                                                                                return (
                                                                                                    <li key={child._id}><Link   key={child._id} title={child.Title} to="products/"  state={{ categoryId: [category._id,subCategory._id,child._id] }}  >{child.Name}</Link></li>
                                                                                                );
                                                                                            })}
                                                                                        </ul>
                                                                                    }
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                }
                                                            </li>
                                                        );
                                                    })
                                            }


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
                                                        <li className="active"><a href="#">Home</a></li>
                                                        <li><a href="#">Product</a></li>
                                                        <li><a href="#">Service</a></li>
                                                        <li><a href="#">Shop<i className="ti-angle-down"></i><span className="new">New</span></a>
                                                            <ul className="dropdown">
                                                                <li><a href="shop-grid.html">Shop Grid</a></li>
                                                                <li><a href="cart.html">Cart</a></li>
                                                                <li><a href="checkout.html">Checkout</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#">Pages</a></li>
                                                        <li><a href="#">Blog<i className="ti-angle-down"></i></a>
                                                            <ul className="dropdown">
                                                                <li><a href="blog-single-sidebar.html">Blog Single Sidebar</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="contact.html">Contact Us</a></li>
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
