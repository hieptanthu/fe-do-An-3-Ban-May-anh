import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faEye } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { ProductLikeState } from '../../../constant/recoil';
import { useRecoilState } from "recoil";

const cx = classNames.bind(style);

function CartProduct({ className = "col-xl-3 col-lg-4 col-md-4 col-12", id, productName, Img1, Img2, Price }) {
    
    const [Heart, SetHeart] = useState(false);
    const [ListHeart, SetListHeart] = useRecoilState(ProductLikeState);

    useEffect(() => {
        const listSpLike = JSON.parse(localStorage.getItem("productLike")) ||[];
        SetListHeart(listSpLike);
        SetHeart(ListHeart.includes(id));

    }, []);

    useEffect(() => {
        localStorage.setItem("productLike", JSON.stringify(ListHeart));
    }, [ListHeart]);

    const toggleWishlist = (e) => {
        e.preventDefault();
        if (ListHeart.includes(id)) {
            SetListHeart(ListHeart.filter(item => item !== id));
            console.log("1.1",ListHeart)
        } else {
            console.log("1.2",ListHeart)
            SetListHeart([...ListHeart, id]);
        }
        console.log("1",ListHeart)
         SetHeart(!Heart);
    };

    return (
        <div className={cx(className)}>
            <div className="single-product">
                <div className="product-img">
                    <a href="product-details.html">
                        <img className="default-img" src={Img1} alt={productName} />
                        <img className="hover-img" src={Img2} alt={productName} />
                    </a>
                    <div className="button-head">
                        <div className="product-action">
                            <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#"><FontAwesomeIcon icon={faEye} /><span>Quick Shop</span></a>
                            <a title="Wishlist"
                                style={{ color: Heart ? "#f6931d" : "inherit" }}
                                href="#" onClick={toggleWishlist}><FontAwesomeIcon icon={faHeart} /><span>Add to Wishlist</span></a>
                            <a title="Compare" href="#"><FontAwesomeIcon icon={faCartShopping} /><span>Add to Compare</span></a>
                        </div>
                        <div className="product-action-2">
                            <a title="Add to cart" href="#">Add to cart</a>
                        </div>
                    </div>
                </div>
                <div className="product-content">
                    <h3><a href="product-details.html">{productName?productName:"errp"}</a></h3>
                    <div className="product-price">
                        <span>{Price?Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : null} VND</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartProduct;
