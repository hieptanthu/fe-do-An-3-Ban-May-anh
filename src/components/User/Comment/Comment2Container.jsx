import Loading from "../../../components/common/Loading";
import React, { useEffect, useState } from "react";
import { accState } from "../../../constant/recoil";
import { useRecoilValue } from "recoil";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ReplyCommentApi from "../../../api/ReplyCommentApi";
import classNames from "classnames/bind";
import styles from "./style.model.scss";
import { toast, Bounce } from "react-toastify";
import { formatTimestamp } from "../../../tool";
import { socket } from "../../../context/socket";
const cx = classNames.bind(styles);
function Comment2Container({ commentId,ProductId }) {
  const [comments, setComments] = useState([]);
  const acc = useRecoilValue(accState);
  console.log(acc);
  const [comment, setComment] = useState({
    UserId: acc._id || "",
    CommentText: "",
  });
  const [imgs, setImgs] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (acc._id) {
      ChageCommet("UserId", acc._id);
    }
    const fetchData = async () => {
      try {
        const data = await ReplyCommentApi.get(commentId);
        if (data.success) {
          setComments(data.dataOut);
          console.log(data.dataOut);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [commentId]);
  function ChageCommet(key, value) {
    setComment((dataProvider) => {
      return {
        ...dataProvider,
        [key]: value,
      };
    });
  }

  const handleFileChange = (event) => {
    const filesIn = event.target.files;
    const fileListArray = Array.from(filesIn);
    const listUrl = fileListArray.map((item) => URL.createObjectURL(item));
    setImgs(listUrl);
    setFiles(fileListArray);
  };


  useEffect(() => {
    socket.emit("joinRoomCommnet2",commentId )
   

    socket.on('receiveComent2', (comment) => {
      setComments(prevComments => [...prevComments,comment]);
    });
   

    return () => {
      socket.emit("leaveRoomCommnet2", commentId);
    };
  }, [commentId,socket]);

  async function send() {
    if(comment.CommentText==""){
      alert("Nhập Commnet")
      return
    }
    if (acc._id) {
      const fromData = new FormData();
      const keys = Object.keys(comment);
      keys.forEach((key) => {
        fromData.append(key, comment[key]);
      });
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      if (files.length >= 1) {
        for (let i = 0; i < files.length; i++) {
          console.log(files[i]);
          fromData.append(`files`, files[i]); // Append each file to the 'files' field
        }
      }
      console.log(commentId);
      if (commentId) {
        const dataoutApi = await ReplyCommentApi.post(
          commentId,
          fromData,
          config
        );

        if (dataoutApi.success) {
          const Update = dataoutApi.dataOut;
          Update.UserId = {};
          Update.UserId.lastName = acc.lastName;
          Update.UserId.firstName = acc.firstName;
          socket.emit("sendComnet2",{_id:commentId,value:Update})
          console.log(dataoutApi);
          toast.success("Create success", {
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
      }
    }
  }
  return (
    <div className="container">
      <div className="row">
        {" "}
        {loading ? (
          <Loading />
        ) : (
          <>
            {comments.length == 0 ? (
              <h3 className="text-center">No comments yet</h3>
            ) : (
              <>
                <div className="col-12">
                  <div
                    style={{ overflow: "auto", height: "auto" }}
                    className="comments"
                  >
                    <h5 className={cx("comment-title")}>
                    reply ({comments.length})
                    </h5>
                    {/* Single Comment */}

                    {comments.map((item) => (
                        <div key={item._id} className={cx("single-comment")}>
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
                        </div>
                      </div>
                      ))}

                    {/* End Single Comment */}
                  </div>
                </div>
              </>
            )}
          </>
        )}
        {acc == {} ? (
          <div className="row">
            <h1>Login comment</h1>
          </div>
        ) : (
          <>
            <Form.Group as={Col}>
              {imgs.length === 0 ? (
               <></>
              ) : (
                <ul
                  className="ProductImg"
                  style={{
                    maxHeight: "200px",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {imgs.map((item, index) => (
                    <li key={index}>
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        src={item}
                        alt=""
                      />
                    </li>
                  ))}
                </ul>
              )}
            </Form.Group>
            <Row>
              <Form.Group className="col-2" controlId="Image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  onChange={(e) => handleFileChange(e)}
                  type="file"
                  multiple
                />
              </Form.Group>
              <Form.Group className="col-10" controlId="Name">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Comment"
                  value={comment.CommentText}
                  onChange={(e) => ChageCommet("CommentText", e.target.value)}
                />
              </Form.Group>
            </Row>

            <div style={{ margin: "10px" }} className="row">
              <button onClick={send}>send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment2Container;
