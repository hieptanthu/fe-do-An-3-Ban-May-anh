import React, { useState, useEffect } from "react";
import ItemList from "../components/User/ItemList";
import BlogApi from "../api/BlogApi";
import { formatTimestamp } from "../tool/";
import Loading from "../components/common/Loading";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  console.log(blogs);
  const handlePageClick = (event) => {
    setPage(event.selected);
    console.log(`User requested page number `, event);
  };

  useEffect(() => {
    const CallAPi = async () => {
      const dataOut = await BlogApi.get({ Page: page });
      if (dataOut.success) {
        setBlogs(dataOut.dataOut);
        setTotalPages(dataOut.totalPages);
      }
    };
    CallAPi();
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
                    <a href="blog-single.html">Blog</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="blog-single section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              {blogs.length <= 0 ? (
                <Loading />
              ) : (
                <>
                  {blogs.map((item) => (
                    <Link key={item._id} to={`/BlogDetail/${item._id}`} >
                      <ItemList
                        Name={item.Name}
                        date={formatTimestamp(item.createdAt)}
                        Title={item.Title}
                      />
                    </Link>
                  ))}
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
                </>
              )}
            </div>

            <div className="col-lg-4 col-12">
              <div className="main-sidebar">
                {/* Single Widget */}
                <div className="single-widget category">
                  <h3 className="title">Blog Categories</h3>
                  <ul className="categor-list">
                    <li>
                      <a href="#">Men's Apparel</a>
                    </li>
                    <li>
                      <a href="#">Women's Apparel</a>
                    </li>
                    <li>
                      <a href="#">Bags Collection</a>
                    </li>
                    <li>
                      <a href="#">Accessories</a>
                    </li>
                    <li>
                      <a href="#">Sun Glasses</a>
                    </li>
                  </ul>
                </div>
                {/*/ End Single Widget */}
                {/* Single Widget */}
                <div className="single-widget recent-post">
                  <h3 className="title">Recent post</h3>
                  {/* Single Post */}
                  <div className="single-post">
                    <div className="image">
                      <img src="https://via.placeholder.com/100x100" alt="#" />
                    </div>
                    <div className="content">
                      <h5>
                        <a href="#">
                          Top 10 Beautyful Women Dress in the world
                        </a>
                      </h5>
                      <ul className="comment">
                        <li>
                          <i className="fa fa-calendar" aria-hidden="true" />
                          Jan 11, 2020
                        </li>
                        <li>
                          <i
                            className="fa fa-commenting-o"
                            aria-hidden="true"
                          />
                          35
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End Single Post */}
                  {/* Single Post */}
                  <div className="single-post">
                    <div className="image">
                      <img src="https://via.placeholder.com/100x100" alt="#" />
                    </div>
                    <div className="content">
                      <h5>
                        <a href="#">
                          Top 10 Beautyful Women Dress in the world
                        </a>
                      </h5>
                      <ul className="comment">
                        <li>
                          <i className="fa fa-calendar" aria-hidden="true" />
                          Mar 05, 2019
                        </li>
                        <li>
                          <i
                            className="fa fa-commenting-o"
                            aria-hidden="true"
                          />
                          59
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End Single Post */}
                  {/* Single Post */}
                  <div className="single-post">
                    <div className="image">
                      <img src="https://via.placeholder.com/100x100" alt="#" />
                    </div>
                    <div className="content">
                      <h5>
                        <a href="#">
                          Top 10 Beautyful Women Dress in the world
                        </a>
                      </h5>
                      <ul className="comment">
                        <li>
                          <i className="fa fa-calendar" aria-hidden="true" />
                          June 09, 2019
                        </li>
                        <li>
                          <i
                            className="fa fa-commenting-o"
                            aria-hidden="true"
                          />
                          44
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End Single Post */}
                </div>
                {/*/ End Single Widget */}
                {/* Single Widget */}
                {/*/ End Single Widget */}
                {/* Single Widget */}
                <div className="single-widget side-tags">
                  <h3 className="title">Tags</h3>
                  <ul className="tag">
                    <li>
                      <a href="#">business</a>
                    </li>
                    <li>
                      <a href="#">wordpress</a>
                    </li>
                    <li>
                      <a href="#">html</a>
                    </li>
                    <li>
                      <a href="#">multipurpose</a>
                    </li>
                    <li>
                      <a href="#">education</a>
                    </li>
                    <li>
                      <a href="#">template</a>
                    </li>
                    <li>
                      <a href="#">Ecommerce</a>
                    </li>
                  </ul>
                </div>
                {/*/ End Single Widget */}
                {/* Single Widget */}
                <div className="single-widget newsletter">
                  <h3 className="title">Newslatter</h3>
                  <div className="letter-inner">
                    <h4>
                      Subscribe &amp; get news <br /> latest updates.
                    </h4>
                    <div className="form-inner">
                      <input type="email" placeholder="Enter your email" />
                      <a href="#">Submit</a>
                    </div>
                  </div>
                </div>
                {/*/ End Single Widget */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-newsletter section">
        <div className="container"></div>
      </section>
    </>
  );
}

export default Blog;
