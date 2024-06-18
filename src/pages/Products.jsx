import React, { useEffect, useMemo, useState } from "react";
import TrademarkApi from "../api/TrademarkApi";
import CategoryApi from "../api/CategoryApi";
import Loading from "../components/common/Loading";
import { useLocation } from "react-router-dom";
import Btn from "../components/common/btn";
import _isEqual from "lodash/isEqual";
import { Link, useNavigate,useParams } from "react-router-dom";
import productApi from "../api/productApi";
import "../components/GlobalStyles/style.scss";
import CartProduct from "../components/common/CartProduct";
import ReactPaginate from "react-paginate";

function Products() {
  const { state } = useLocation();
  console.log(state)
  const [Trademarks, setTrademarks] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [txtFind, setTxtFinData] = useState({});
  const [Products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const setDataFind = (key, data, e) => {
    if (e != null) {
      e.preventDefault();
    }

    let updatedStates;
    if (txtFind[key] == data) {
      updatedStates = { ...txtFind };
      delete updatedStates[key];
    } else {
      updatedStates = { ...txtFind, [key]: data };
    }

    setTxtFinData(updatedStates);
  };

  useEffect(() => {
    if (state && state.categoryId) {
      setDataFind(
        "categoryId",
        [state.categoryId[state.categoryId.length - 1]],
        null
      );
    }

    if (state && state.TrademarkId) {
      setDataFind("TrademarkId", state.TrademarkId, null);
    }

    const getdataApiTrademarks = async () => {
      const dataOutTrademarks = await TrademarkApi.get();

      let dataOutCategories;

      if (state && state.categoryId) {
        dataOutCategories = await CategoryApi.getById(state.categoryId);
      }

      if (dataOutTrademarks.success) {
        setTrademarks(dataOutTrademarks.dataOut);
      }
      if (
        dataOutCategories &&
        dataOutCategories.success &&
        dataOutCategories.Categories &&
        dataOutCategories.Categories.childCategory
      ) {
        if (dataOutCategories.Categories.childCategory.length > 0) {
          let list = [];

          dataOutCategories.Categories.childCategory.forEach((item) => {
            if (item.childCategory) {
              item.childCategory.forEach((element) => {
                list.push(element._id);
              });
            }
            list.push(item._id);
          });

          setDataFind("categoryId", list, null);
        }
         if (dataOutCategories.Categories.childCategory.length > 0) {
          let list = [];

          dataOutCategories.Categories.childCategory.forEach((item) => {
            if (item.childCategory) {
              item.childCategory.forEach((element) => {
                list.push(element._id);
              });
            }
            list.push(item._id);
          });

          setDataFind("categoryId", list, null);
        }

        setCategories(dataOutCategories.Categories.childCategory); // Wrap in an array for consistency
      }
    };

    getdataApiTrademarks();
  }, [state]);

  useEffect(() => {
    
    const callProduct = async () => {
      const data = await productApi.get(txtFind);

      if (data.success) {
        setProducts(data.dataOut);
        setTotalPages(data.totalPages);
      }
    };

    callProduct();
  }, [txtFind]);

  const handlePageClick = (event) => {
    setPage(event.selected);
    setDataFind("Page", page, null);
    console.log(`User requested page number `, event);
  };

  useEffect(() => {
    
    setDataFind("Page", page, null);

  }, [page]);

  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bread-inner">
                <ul className="bread-list">
                  <li>
                    <a href="index1.html">Home / </a>
                  </li>
                  <li className="active">
                    <a href="blog-single.html">Product</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="product-area shop-sidebar shop section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-12">
              <div className="shop-sidebar">
                {/* <!-- Single Widget --> */}
                <div className="single-widget category">
                  <h3 className="title">Category</h3>
                  <ul className="categor-list" style={{ overflow: "auto" }}>
                    {Categories.length === 0 ? (
                      <Loading />
                    ) : (
                      Categories.map((item) => {
                        return (
                          <li key={item._id}>
                            <Link
                              style={{
                                color:
                                  txtFind.categoryId[0] == item._id
                                    ? "#f7941d"
                                    : "",
                              }}
                              title={item.Title}
                              onClick={(e) => {
                                setDataFind(
                                  "categoryId",
                                  [item._id].concat(
                                    item.childCategory
                                      ? item.childCategory.map(
                                          (element) => element._id
                                        )
                                      : []
                                  ),

                                  e
                                );
                              }}
                            >
                              {item.Name}
                            </Link>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
                {/* <!--/ End Single Widget -->
								{/* <!-- Shop By Price --> */}
                <div className="single-widget range">
                  <h3 className="title">Shop by Price</h3>
                  <div className="price-filter">
                    <div className="price-filter-inner">
                      <div className="price_slider_amount">
                        <div className="label-input">
                          <span>Price Min:</span>
                          <input
                            type="number"
                            id="amountMin"
                            name="price"
                            min={0}
                            placeholder="Add Your Price Max"
                          />
                        </div>
                        <div className="label-input">
                          <span>Price Max:</span>
                          <input
                            type="number"
                            id="amountMax"
                            name="price Max"
                            placeholder="Add Your Price Max"
                          />
                        </div>

                        <div className="label-input">
                          <Btn text={"enter"} type={"btn-warning"}></Btn>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--/ End Shop By Price --> */}

                {/* <!-- Single Widget --> */}
                <div className="single-widget category">
                  <h3 className="title">Manufacturers</h3>
                  <ul className="categor-list">
                    {Trademarks.length == 0 ? (
                      <Loading />
                    ) : (
                      Trademarks.map((item) => {
                        return (
                          <li key={item._id}>
                            <a
                              style={{
                                color:
                                  txtFind.TrademarkId == item._id
                                    ? "#f7941d"
                                    : "",
                              }}
                              onClick={(e) => {
                                setDataFind("TrademarkId", item._id, e);
                              }}
                              title={item.Title}
                              href="#"
                            >
                              {item.Name}
                            </a>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
                {/* <!--/ End Single Widget --> */}
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <div className="row">
                <div className="col-12">
                  {/* <!-- Shop Top --> */}
                  <div className="shop-top">
                    <div className="shop-shorter">
                      <div className="single-shorter">
                        <label>Show :</label>
                        <select>
                          <option selected="selected">09</option>
                          <option>15</option>
                          <option>25</option>
                          <option>30</option>
                        </select>
                      </div>
                      <div className="single-shorter">
                        <label>Sort By :</label>
                        <select>
                          <option selected="selected">Name</option>
                          <option>Price</option>
                          <option>Size</option>
                        </select>
                      </div>
                    </div>
                    <ul className="view-mode">
                      <li className="active">
                        <a href="shop-grid.html">
                          <i className="fa fa-th-large"></i>
                        </a>
                      </li>
                      <li>
                        <a href="shop-list.html">
                          <i className="fa fa-th-list"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* <!--/ End Shop Top --> */}
                </div>
              </div>
              <div className="row">
                {Products.length == 0 || Products == undefined ? (
                  <Loading />
                ) : (
                  Products.map((item) => (
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
              </div>
            </div>
          </div>
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
        </div>
      </section>
    </>
  );
}

export default Products;
