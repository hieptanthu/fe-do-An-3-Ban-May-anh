import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.model.scss";
import { useParams } from "react-router-dom";
import ProductSpecificationsApi from "../../../api/ProductSpecificationsApi";
import ModalProductSpecifications from "./ModalProductSpecifications";
import { toast, Bounce } from "react-toastify";

const cx = classNames.bind(styles);
function ProductSpecifications() {
  const { productId } = useParams();

  const [productSpecifications, setProductSpecifications] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const callApi = async () => {
      const dataOutApi = await ProductSpecificationsApi.get(productId);
      if (dataOutApi.success) {
        setProductSpecifications(dataOutApi.dataOut);
      }
      console.log(dataOutApi);
    };

    callApi();
  }, [productId]);


  function CallCreateUpdate(data) {
    setData(data);
    setShow(!show);
  }


  async function Delete(_id) {
    const answer = window.confirm("Do you want delete?");
    if (answer) {
      const dataOut = await ProductSpecificationsApi.delete(_id);
      if (dataOut.success) {
        toast.success("delete success", {
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

        setProductSpecifications((prevProducts) =>
          prevProducts.filter((item) => item._id !== _id)
        );
      } else {
        toast.error("not delete", {
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
    } else {
      console.log("User clicked no", _id);
    }
  } 

  return (
    <>
      <ModalProductSpecifications
        show={show}
        handleClose={() => {
          setShow(!show);
        }}
        data={data}
      />
      <main className={cx("main-container")}>
        <div className={cx("main-title")}>
          <h3>ProductSpecifications</h3>
          <button
            onClick={() => CallCreateUpdate({productId})}
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
          >
            Add
          </button>
        </div>

        <div>
          {productSpecifications.length === 0 ? (
            <h3 style={{ color: "#333", textAlign: "center" }}>
              Chưa có ProductSpecifications
            </h3>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center" scope="col">
                      Name
                    </th>
                    <th className="text-center" scope="col">
                      Quantyti ListDetail
                    </th>
                    <th className="text-center" scope="col">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productSpecifications.map((item) => (
                    <tr key={item._id}>
                      <td className="text-center">{item.Name}</td>
                      <td className="text-center">
                        {item.ListDetail ? item.ListDetail.length : 0}
                      </td>

                      <td className="text-center">
                        <button
                          onClick={() => CallCreateUpdate(item)}
                          type="button"
                          className="btn btn-warning"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => Delete(item._id)}
                          type="button"
                          className="btn btn-danger"
                          style={{ marginLeft: "10px" }}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default ProductSpecifications;
