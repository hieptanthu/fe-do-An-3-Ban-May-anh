import React, { useEffect, useState } from "react";
import productApi from "../api/productApi";

import CartProduct from "../components/common/CartProduct";
import { ProductLikeState } from "../constant/recoil";
import { useRecoilState } from "recoil";
import Loading from "../components/common/Loading";

function ProductLike() {
  const [listIdProduct, setlistIdProduct] = useRecoilState(ProductLikeState);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const listSpLike = JSON.parse(localStorage.getItem("productLike")) || [];
    setlistIdProduct(listSpLike);
  }, []);

  useEffect(() => {
    const callData = async (listId) => {
      const data = await productApi.get({ ListProduct: listId });

      if (data.success) {
        setProducts(data.dataOut);
      }
    };

    if (listIdProduct.length > 0) {
      callData(listIdProduct);
    }
  }, [listIdProduct]);
  return (
    <>
      <div class="breadcrumbs">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="bread-inner">
                <ul class="bread-list">
                  <li>
                    <a href="/">
                      Home  /
                    </a>
                  </li>

                  <li class="active">
                    <a href="blog-single.html">Product Like</a>
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
            {Products.length === 0 ? (
              <Loading />
            ) : (
              Products.map((item) => (
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
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductLike;
