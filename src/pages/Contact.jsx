import React from "react";

function contact() {
  return (
    <div>
      {/* Start Contact */}
      <section id="contact-us" className="contact-us section">
        <div className="container">
          <div className="contact-head">
            <div className="row">
              <div className="col-lg-8 col-12">
                <div className="form-main">
                  <div className="title">
                    <h4>Get in touch</h4>
                    <h3>Write us a message</h3>
                  </div>
                  <form className="form" method="post" action="mail/mail.php">
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>
                            Your Name<span>*</span>
                          </label>
                          <input name="name" type="text" placeholder />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>
                            Your Subjects<span>*</span>
                          </label>
                          <input name="subject" type="text" placeholder />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>
                            Your Email<span>*</span>
                          </label>
                          <input name="email" type="email" placeholder />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>
                            Your Phone<span>*</span>
                          </label>
                          <input name="company_name" type="text" placeholder />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group message">
                          <label>
                            your message<span>*</span>
                          </label>
                          <textarea
                            name="message"
                            placeholder
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group button">
                          <button type="submit" className="btn btn-primary">
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="single-head">
                  <div className="single-info">
                    <i className="fa fa-phone" />
                    <h4 className="title">Call us Now:</h4>
                    <ul>
                      <li>+123 456-789-1120</li>
                      <li>+522 672-452-1120</li>
                    </ul>
                  </div>
                  <div className="single-info">
                    <i className="fa fa-envelope-open" />
                    <h4 className="title">Email:</h4>
                    <ul>
                      <li>
                        <a href="mailto:info@yourwebsite.com">
                          info@yourwebsite.com
                        </a>
                      </li>
                      <li>
                        <a href="mailto:info@yourwebsite.com">
                          support@yourwebsite.com
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="single-info">
                    <i className="fa fa-location-arrow" />
                    <h4 className="title">Our Address:</h4>
                    <ul>
                      <li>
                        999 , ÂN THI, VIỆT NAM
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/ End Contact */}
      {/* Map Section */}
      <div className="map-section">
        <div id="myMap" />
      </div>
      {/*/ End Map Section */}
      {/* Start Shop Newsletter  */}
      <section className="shop-newsletter section">
        <div className="container">
          <div className="inner-top">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-12">
                {/* Start Newsletter Inner */}
                <div className="inner">
                  <h4>Newsletter</h4>
                  <p>
                    {" "}
                    Subscribe to our newsletter and get <span>10%</span> off
                    your first purchase
                  </p>
                  <form
                    action="mail/mail.php"
                    method="get"
                    target="_blank"
                    className="newsletter-inner"
                  >
                    <input
                      name="EMAIL"
                      placeholder="Your email address"
                      required
                      type="email"
                    />
                    <button className="btn btn-primary">Subscribe</button>
                  </form>
                </div>
                {/* End Newsletter Inner */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Shop Newsletter */}
    </div>
  );
}

export default contact;
