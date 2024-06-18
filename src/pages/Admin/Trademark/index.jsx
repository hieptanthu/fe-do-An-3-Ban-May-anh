import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.model.scss";
import TrademarkApi from "../../../api/TrademarkApi";
import { toast, Bounce } from "react-toastify";
import ModaTrademark from "./ModaTrademark";

const cx = classNames.bind(styles);

function Trademark() {
  const [trademarks, setTrademarks] = useState([]);
  const [textSeach, setTextSeach] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const CallAPi = async () => {
      const dataOut = await TrademarkApi.get();
      if (dataOut.success) {
        setTrademarks(dataOut.dataOut);
      }
    };
    CallAPi();
  }, [textSeach]);

  function CallCreateUpdate(data) {
    setData(data);
    setShow(!show);
  }

  async function Delete(_id) {
    const answer = window.confirm("Do you want delete?");
    if (answer) {
      const dataOut = await TrademarkApi.delete(_id);
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

        setTrademarks((prevProducts) =>
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
      <ModaTrademark
        show={show}
        handleClose={() => {
          setShow(!show);
        }}
        data={data}
      />
      <main className={cx("main-container")}>
        <div className={cx("main-title")}>
          <h3> Trademark</h3>
          <button
            onClick={() => CallCreateUpdate(null)}
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
          >
            Add
          </button>
          <input
            value={textSeach}
            onChange={(e) => setTextSeach(e.target.value)}
            type="text"
            placeholder="seach Product"
          />
        </div>

        <div>
          {trademarks.length === 0 ? (
            <h3 style={{ color: "#333", textAlign: "center" }}>
              Chưa có Trademark
            </h3>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">action</th>
                  </tr>
                </thead>
                <tbody>
                  {trademarks.map((item) => (
                    <tr key={item._id}>
                      <td>{item.Name}</td>
                      <td>
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          src={
                            item.Img
                              ? item.Img
                              : "https://via.placeholder.com/550x750"
                          }
                          alt=""
                        />
                      </td>
                      <td>
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

export default Trademark;
