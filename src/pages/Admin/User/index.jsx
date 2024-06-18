import { socket } from "../../../context/socket";
import React, { useEffect, useState } from "react";
import { formatTimestamp } from "../../../tool";
import { FaUsers } from "react-icons/fa";
import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { Row } from "react-bootstrap";

import authApi from "../../../api/authApi";
const cx = classNames.bind(styles);

function User() {
  const [users, setUsers] = useState([]);
  const [usersNumber, setUsersNumber] = useState({});
  const [textSeach, setTextSeach] = useState("");
  const [status, setStatus] = useState(false);
  useEffect(() => {
    socket.emit("getUser", (response) => {
      console.log("Dữ liệu từ server:", response);
      setUsersNumber(response);
      // Xử lý dữ liệu trả về từ server ở đây
    });
  }, [socket]);

  useEffect(() => {
    const callApi = async () => {
      // const dataOut = await authApi.get(
      //   status
      //     ? ""
      //     : { ListId: usersNumber.nonNullKeys ? usersNumber.nonNullKeys : [] }
      // );
      let datain = {};
      if (usersNumber.nonNullKeys && status) {
        datain.ListId = usersNumber.nonNullKeys;
      }
      const dataOut = await authApi.get(datain);

      console.log(datain);
      if (dataOut.success) {
        console.log(dataOut.users);
        setUsers(dataOut.users);
      }
    };

    callApi();
  }, [status]);
  return (
    <>
      <main className={cx("main-container")}>
        <div className={cx("main-title")}>
          <h3>Users</h3>

          <input
            value={textSeach}
            onChange={(e) => setTextSeach(e.target.value)}
            type="text"
            placeholder="seach users"
          />
        </div>

        <div>
          <Row className={cx("header-oder col")}>
            <div className={cx("main-cards")}>
              <div
                onClick={() => {
                  setStatus(!status);
                }}
                className={cx("card")}
              >
                <div className={cx("card-inner")}>
                  <h3>Online users have accounts </h3>
                  <FaUsers className={cx("card_icon")} />
                </div>
                <h3>
                  {usersNumber.nonNullKeyCount
                    ? usersNumber.nonNullKeyCount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "erro"}
                </h3>
              </div>
              <div className={cx("card")}>
                <div className={cx("card-inner")}>
                  <h3>Online users not accounts</h3>
                  <FaUsers className={cx("card_icon")} />
                </div>
                <h3>
                  {usersNumber.nullKeyCount ||
                    (0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </h3>
              </div>
              <div className={cx("card")}>
                <div className={cx("card-inner")}>
                  <h3>Online </h3>
                  <FaUsers className={cx("card_icon")} />
                </div>
                <h3>
                  {usersNumber &&
                    (usersNumber.nonNullKeyCount + usersNumber.nullKeyCount)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </h3>
              </div>
            </div>
          </Row>
          {users.length === 0 ? (
            <h3 style={{ color: "#333", textAlign: "center" }}>
              Chưa có users
            </h3>
          ) : (
            <>
              <h4 style={{ color: "#333", textAlign: "center" }}>
                {status ? "Users OnLine" : "All Users"}
              </h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Email</th>
                    <th scope="col">createdAt</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item) => (
                    <tr key={item._id}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{formatTimestamp(item.createdAt)}</td>

                      {/* <td>
                      <button
                      onClick={()=>CallCreateUpdate(item)}
                       type="button" className="btn btn-warning">
                      
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
                    </td> */}
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

export default User;
