import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import CartProduct from '../../common/CartProduct';
import trendingItemApi from '../../../api/trendingItemApi';
import productApi from '../../../api/productApi';
import Loading from '../../../components/common/Loading';
import style from './style.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style)

function TrendingItem() {


    const [activeTab, setActiveTab] = useState('');

    const [ListTrendingItem, SetListTrendingItem] = useState([])
    const [ListProduct, SetListProduct] = useState([])


    useEffect(() => {
        const getTrendingItem = async () => {
            try {
                const data = await trendingItemApi.get();
                if (data.success) {
                    SetListTrendingItem(data.dataOut);

                    setActiveTab(data.dataOut[0]._id)
                }
            } catch (error) {
                console.error("Failed to fetch trending items", error);
            }
        };

        getTrendingItem();
    }, []);




    useEffect(() => {
        const inexTrendingItem = ListTrendingItem.findIndex(item => item._id === activeTab)
     
         
       
        

        const getItem = async (inexTrendingItem) => {
            try {
                const data = await productApi.get({ ListProduct:ListTrendingItem[inexTrendingItem].ListProduct });
                if (data.success) {
                    SetListProduct(data.dataOut);
                    
                    console.log(data)
                }
                console.log(data)
            } catch (error) {
                console.error("Failed to fetch trending items", error);
            }
        };

        getItem(inexTrendingItem);
    }, [activeTab]);

    // Function to handle tab click
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };



    // Function to generate classNames for each tab
    const tabClass = (tabName) => {
        return tabName === activeTab ? "nav-link active" : "nav-link";
    };

    return (
        <>
            <div className={cx("product-area section")}>

                {ListTrendingItem.length == 0 ? <Loading /> : (
                    <Container>
                        <Row>
                            <Col>
                                <div className={cx("section-title")}>
                                    <h2>Trending Item</h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={cx("product-info")}>
                                    <div className={cx("nav-main")}>
                                        {/* Tab Nav */}
                                        <ul className={cx("nav nav-tabs")} id="myTab" role="tablist">

                                            {ListTrendingItem.map((item) => (
                                                <li key={item._id} className={cx("nav-item")}>
                                                    <a
                                                        className={cx(tabClass(item._id))}
                                                        onClick={() => handleTabClick(item._id)}
                                                        data-toggle="tab"
                                                        href="#man"
                                                        role="tab"
                                                    >
                                                        {item.Name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* End Tab Nav */}
                                    </div>
                                </div>
                                <div className={cx("tab-content")} id="myTabContent">
                                    <div class="tab-single">
                                        <Row>
                                            {ListProduct.length === 0 ? (
                                                <Loading />
                                            ) : (
                                                ListProduct.map(item => (
                                                    <CartProduct
                                                        key={item._id}
                                                        id={item._id}
                                                        productName={item.Name}
                                                        Img1={item.Img[0] || "https://via.placeholder.com/550x750"}
                                                        Img2={item.Img[1] || "https://via.placeholder.com/550x750"}
                                                        Price={item.Price}
                                                    />
                                                ))
                                            )}
                                        </Row>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                )}

            </div>
        </>
    );
};


export default TrendingItem