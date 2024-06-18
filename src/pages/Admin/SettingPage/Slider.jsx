import React from "react";
import classNames from "classnames/bind";
import styles from "./style.model.scss";
import SlideApi from "../../../api/SlideApi";
import Loading from "../../../components/common/Loading";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast, Bounce } from "react-toastify";

const cx = classNames.bind(styles);
function Slider() {
  const [slides, setSlides] = useState({
    Describe: "đồ chính hàng \r\nđẹp ",
    Img: "http://localhost:5000\\public\\1716993306627-z5372307552209_c2a5cd00443aa2b6f8c80d3f072ba88e.jpg",
    Link: "",
    Name: "CAMERA sịn",
    Title: "giảm 40%",
    createdAt: "2024-05-29T14:35:06.640Z",
    updatedAt: "2024-05-29T14:35:06.640Z",
    __v: 0,
    _id: "66573d1a4a51ea0dbbece05d",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [linkImg, setLinkImg] = useState(null);
  const [file, setFile] = useState();

  function ChageSlides(key, value) {
    setSlides((dataProvider) => {
      return {
        ...dataProvider,
        [key]: value,
      };
    });
  }
  useEffect(() => {
    SlideApi.get()
      .then((data) => {
        console.log(data);
        // Normalize the image URL
        const normalizedImgUrl = data.Silde.Img.replace(/\\/g, "/");
        // Set slides with the normalized image URL
        setSlides({ ...data.Silde, Img: normalizedImgUrl });
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching slides:", error);
        setError(error);
        setLoading(false);
      });
  }, []);
  const handleFileChange = (event) => {
    const filesIn = event.target.files[0];
    const UrlImg = URL.createObjectURL(filesIn);
    setLinkImg(UrlImg);
    setFile(filesIn);
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(linkImg);
    };
  }, [linkImg]);


  async function Put(){

    const fromData = new FormData();
    const keys = Object.keys(slides);
    keys.forEach(key=>{
      fromData.append(key,slides[key])

    })
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    if (file) {
      fromData.append("files", file);
    }
    const dataOutApi = await SlideApi.put(slides._id,fromData,config)

    if (dataOutApi.success) {
      toast.success("Update success", {
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
  return (
    <main className={cx("main-container")}>
      <div className={cx("main-title")}>
        <h3>Slider</h3>

        <Button onClick={Put}>  Update</Button>
      </div>
      <div>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={slides.Name}
              onChange={(e) => ChageSlides("Name", e.target.value)}
              type="text"
              placeholder="Enter Name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={slides.Title}
              onChange={(e) => ChageSlides("Title", e.target.value)}
              type="text"
              placeholder="Title"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="Name">
            <Form.Label>Link</Form.Label>
            <Form.Control
              value={slides.Link
              }
              onChange={(e) => ChageSlides("Link", e.target.value)}
              type="text"
              placeholder="Enter Link"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="Name">
            <Form.Label>Img</Form.Label>
            <Form.Control
              
              onChange={handleFileChange}
              type="file"
              placeholder="Enter Link"
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="Describe">
            <Form.Label>Describe</Form.Label>
            <Form.Control
              value={slides.Describe}
              onChange={(e) => ChageSlides("Describe", e.target.value)}
              type="text"
              placeholder="Describe"
            />
          </Form.Group>
        </Row>

        <section className="hero-slider">
          {loading ? (
            <Loading />
          ) : error ? (
            <div>Error fetching slides. Please try again later.</div>
          ) : (
            <div
              className="single-slider"
              style={{
                backgroundImage: `url(${
                  linkImg ||
                  slides.Img})`,
              }}
            >
              <div className="container">
                <div className="row no-gutters">
                  <div className="col-lg-9 offset-lg-3 col-12">
                    <div className="text-inner">
                      <div className="row">
                        <div className="col-lg-7 col-12">
                          <div className="hero-text">
                            <h1>
                              <span> {slides.Title} </span>
                              {slides.Name}
                            </h1>
                            <p>{slides.Describe}</p>
                            <div className="button">
                              <a href={slides.Link} className="btn">
                                Shop Now!
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Slider;
