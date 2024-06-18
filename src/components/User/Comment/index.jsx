import CommentApi from "../../../api/CommentApi";
import Loading from "../../../components/common/Loading";
import React, { useEffect, useState } from "react";
import { accState } from "../../../constant/recoil";
import { useRecoilValue } from "recoil";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast, Bounce } from "react-toastify";
import classNames from "classnames/bind";
import styles from "./style.model.scss";
import Comment1 from "./Comment1";
import { socket } from "../../../context/socket";


const cx = classNames.bind(styles);
function Comment({ ProductId }) {
  const [comments, setComments] = useState([]);
  const acc = useRecoilValue(accState);
  console.log(acc)
  const [comment, setComment] = useState({
    UserId: acc._id||'',
    star: 5,
    CommentText: "",
  });
  const [imgs, setImgs] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    socket.emit("joinRoomCommnet1",ProductId )


    socket.on('receiveComent', (comment) => {
      setComments(prevComments => [comment,...prevComments]);
    });
   

    return () => {
      socket.emit("leaveRoomCommnet1", ProductId);
    };
  }, [ProductId,socket]);

  const handleFileChange = (event) => {
    const filesIn = event.target.files;
    const fileListArray = Array.from(filesIn);
    const listUrl = fileListArray.map((item) => URL.createObjectURL(item));
    setImgs(listUrl);
    setFiles(fileListArray);
  };

  useEffect(() => {
    return () => {
      imgs.forEach((item) => {
        URL.revokeObjectURL(item);
      });
    };
  }, [imgs]);

  function ChageCommet(key, value) {
    setComment((dataProvider) => {
      return {
        ...dataProvider,
        [key]: value,
      };
    });
  }

  useEffect(() => {
    if (acc._id) {
      ChageCommet("UserId", acc._id);
    }
    const fetchData = async () => {
      try {
        const data = await CommentApi.get(ProductId);
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
  }, [ProductId]);

  async function send() {
    if(acc._id){
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
      const dataoutApi = await CommentApi.post(ProductId, fromData, config);
  
      if (dataoutApi.success) {
        
        const Update = dataoutApi.dataOut;
        Update.UserId = {};
        Update.UserId.lastName = acc.lastName;
        Update.UserId.firstName = acc.firstName;
        socket.emit("sendComnet1",{_id:ProductId,value:Update})
        // setComments([Update, ...comments]);
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
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8">
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
                      <div style={{overflow:"auto",height:"600px"}} className="comments">
                        <h3 className={cx("comment-title")}>
                          Comments ({comments.length})
                        </h3>
                        {/* Single Comment */}

                        {comments.map((item) => (
                          <Comment1 item={item} />
                        ))}

                        {/* End Single Comment */}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="col-4">
            {acc == {} ? (
              <div className="row">
                <h1>Login comment</h1>
              </div>
            ) : (
              <>
                <Form.Group as={Col}>
                  {imgs.length === 0 ? (
                    <h4>Chưa có Hình</h4>
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
                              width: "100px",
                              height: "100px",
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
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="Image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      onChange={(e) => handleFileChange(e)}
                      type="file"
                      multiple
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="selection">
                    <Form.Label>star</Form.Label>
                    <Form.Control
                      value={comment.star}
                      onChange={(e) => ChageCommet("star", e.target.value)}
                      as="select"
                    >
                      <option value={1}> 1</option>
                      <option value={2}> 2</option>
                      <option value={3}> 3</option>
                      <option value={4}> 4</option>
                      <option value={5}> 5</option>
                    </Form.Control>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="Name">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Comment"
                      value={comment.CommentText}
                      onChange={(e) =>
                        ChageCommet("CommentText", e.target.value)
                      }
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
      </div>
    </>
  );
}

export default Comment;
