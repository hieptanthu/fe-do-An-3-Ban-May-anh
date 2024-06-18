import React from "react";
import classNames from "classnames/bind";
import styles from "./style.model.scss";
const cx = classNames.bind(styles);
function BlogdetailCBN({ Name, Title, data, CreatAt }) {

  
  return (
    <section className="blog-single section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="blog-single-main">
              <div className="row">
                <div className="col-12">
                  <div className="blog-detail">
                    <h2 className="blog-title">
                      {Name}
                      <p>{Title}</p>
                    </h2>
                    <div className="blog-meta">
                      <span className="author">
                        <a href="#">
                          <i className="fa fa-user" />
                          By Admin
                        </a>
                        <a href="#">
                          <i className="fa fa-calendar" />
                          {CreatAt}
                        </a>
                        <a href="#">
                          <i className="fa fa-comments" />
                          Comment (15)
                        </a>
                      </span>
                    </div>
                    <div className="content">
                    <div dangerouslySetInnerHTML={{ __html: data }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogdetailCBN;
