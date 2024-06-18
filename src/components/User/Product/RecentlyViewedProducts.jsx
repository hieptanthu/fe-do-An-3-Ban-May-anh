import React, { useEffect, useState } from "react";
import CartProduct from "../../../components/common/CartProduct";
import productApi from "../../../api/productApi";
import { Container, Row,Col } from "react-bootstrap";
import style from './style.module.scss'
import Loading from "../../../components/common/Loading";
import classNames from 'classnames/bind';
const cx = classNames.bind(style)
function RecentlyViewedProducts() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const getItem = async () => {
      try {
        const listIdProducts = JSON.parse(
          localStorage.getItem("ProductsViewed") || "[]"
        );
        const data = await productApi.get({ ListProduct: listIdProducts });
        if (data.success) {
          setProduct(data.dataOut);

          console.log(data);
        }
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch trending items", error);
      }
    };

    getItem();
  }, []);

  return (
    <Container>
        <Row>
            <h3>Products viewed</h3>
        </Row>
      <Row>
        <Col>
          <div className={cx("product-info")}>
            
          </div>
          <div className={cx("tab-content")} id="myTabContent">
            <div class="tab-single">
              <Row>
                {products.length === 0 ? (
                  <Loading />
                ) : (
                    products.map((item) => (
                    <CartProduct
                      key={item._id}
                      id={item._id}
                      productName={item.Name}
                      Img1={
                        item.Img[0] || "https://via.placeholder.com/550x750"
                      }
                      Img2={
                        item.Img[1] || "https://via.placeholder.com/550x750"
                      }
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
  );
}

export default RecentlyViewedProducts;
