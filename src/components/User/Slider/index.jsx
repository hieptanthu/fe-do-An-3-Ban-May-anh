import SlideApi from '../../../api/SlideApi';
import Loading from '../../common/Loading';
import { useState, useEffect } from 'react';

function Slider() {
    const [slides, setSlides] = useState({
        _id: "66573d1a4a51ea0dbbece05d",
        Name: "CAMERA sịn",
        Title: "giảm 40%",
        Describe: "đồ chính hàng \r\nđẹp ",
        Link: "",
        Img: "http://localhost:5000\\public\\1716993306627-z5372307552209_c2a5cd00443aa2b6f8c80d3f072ba88e.jpg",
        createdAt: "2024-05-29T14:35:06.640Z",
        updatedAt: "2024-05-29T14:35:06.640Z",
        __v: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        SlideApi.get()
        .then((data) => {
            console.log(data)
            // Normalize the image URL
            const normalizedImgUrl = data.Silde.Img.replace(/\\/g, '/');
            // Set slides with the normalized image URL
            setSlides({ ...data.Silde, Img: normalizedImgUrl });
            setLoading(false);
            console.log(data);
        })
            .catch((error) => {
                console.error('Error fetching slides:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <section  className="hero-slider">
            {loading ? (
                <Loading />
            ) : error ? (
                <div>Error fetching slides. Please try again later.</div>
            ) : (
                <div className="single-slider" style={{backgroundImage: `url(${slides.Img})`}}>
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
    );
}

export default Slider;
