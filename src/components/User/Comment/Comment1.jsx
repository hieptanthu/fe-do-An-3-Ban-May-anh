import React, { useState,useEffect } from "react";
import { formatTimestamp } from "../../../tool";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { faStar } from "@fortawesome/free-solid-svg-icons";
import Comment2Container from "./Comment2Container";
import { socket } from "../../../context/socket";
import classNames from "classnames/bind";
import styles from "./style.model.scss";
const cx = classNames.bind(styles);

function Comment1({ item }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if(show){
      socket.emit("joinRoomCommnet2",item._id )
      socket.emit("leaveRoomCommnet1", item.ProductId);
      
    }else{
      socket.emit("leaveRoomCommnet2", item._id);
      socket.emit("joinRoomCommnet1",item.ProductId )

    }
   
   

  
  }, [item]);

  console.log("key", item);
  return (
    <div key={item._id} className={cx("single-comment")}>
      <div>
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon
            icon={faStar}
            key={i}
            className={`fa-solid fa-star ${i < item.star ? "active" : ""}`}
          />
        ))}
      </div>
      <div className={cx("content")}>
        <h4>
          {item.UserId.firstName ||
            "erro" + " " + item.UserId.lastName ||
            "erro"}{" "}
          <span>{formatTimestamp(item.createdAt)}</span>
        </h4>
        <p style={{ wordWrap: "break-word" }}>{item.CommentText}</p>

        <ul style={{ display: "flex", flex: "wrap" }}>
          {item.Image &&
            item.Image.map((img, index) => (
              <li key={index}>
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                  src={img}
                  alt=""
                />
              </li>
            ))}
        </ul>
        <div
          onClick={() => {
            setShow(!show);
          }}
          className="button"
        >
          <a className="btn">
            <i className="fa fa-reply" aria-hidden="true" />
            Reply
          </a>
        </div>
        {show && <Comment2Container commentId={item._id} ProductId={item.ProductId} />}
      </div>
    </div>
  );
}

export default Comment1;
