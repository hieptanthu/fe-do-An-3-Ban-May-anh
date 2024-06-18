import classNames from "classnames/bind";
import styles from "./style.model.scss";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import BlogApi from "../../../api/BlogApi";
import productApi from "../../../api/productApi";
import Loading from "../../common/Loading";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);


function Seach() {
  const [textSeach, setTextSeach] = useState("");
  const [products, setProducts] = useState([]);
  const [bolgs, setBlogs] = useState([]);

  useEffect(() => {
    async function callApi() {
      const dataOutProducts = await productApi.get({ Name: textSeach });
      const dataOutBolgs = await BlogApi.get({ Name: textSeach });
      if (dataOutProducts.success) {
        setProducts(dataOutProducts.dataOut);
      }
      if (dataOutBolgs.success) {
        setBlogs(dataOutBolgs.dataOut);
      }
      console.log(dataOutProducts);
      console.log(dataOutBolgs);
    }
    if (textSeach != "") {
      callApi();
    }
  }, [textSeach]);
  
  return (
    <>
      <div className="search-bar-top">
        <div className="search-bar">
          <form>
            <div className={cx("seach")}>
              <input
                name="search"
                placeholder="Search Products Here....."
                type="search"
                value={textSeach}
                onChange={(e) => setTextSeach(e.target.value)}
              />
              <div className={cx("ListSeach", textSeach == "" ? "hinde" : "")}>
                {products.length == 0 && bolgs.length == 0 ? (
                  <Loading />
                ) : (
                  <>
                    <div className={cx("ListSeach-Peoducts", "Item")}>
                      <div className={cx("ListSeach-headline")}>
                        {" "}
                        <h5>Products</h5>{" "}
                      </div>
                      <ul>
                        {products.map((item, index) => (
                          <li key={index}>
                            <Link to={`/Productdetails/${item._id}`}>{item.Name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={cx("ListSeach-blogs", "Item")}>
                      <div className={cx("ListSeach-headline")}>
                    
                        <h5>Blogs</h5>{" "}
                      </div>
                      <ul>
                        {bolgs.map((item, index) => (
                          <li key={index}>
                            <Link to={`/BlogDetail/${item._id}`}>{item.Name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button className="btnn">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Seach;
