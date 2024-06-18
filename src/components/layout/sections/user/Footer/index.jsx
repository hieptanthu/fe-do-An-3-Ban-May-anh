import classNames from "classnames/bind"
import style from './style.module.scss'
import Logo from '../../../../asset/logo/logo.png'

const cx=classNames.bind(style)
function Footer() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-12">
              <div className="single-footer about">
                <div className="logo">
                  <a href="index.html"><img src={Logo} width="100px" alt="#" /></a>
                </div>
                <p className="text">Welcome to Đức Hiệp Camera Shop – your ultimate destination for all things photography! Located in the heart of the city, Đức Hiệp Camera Shop offers a wide range of high-quality cameras, lenses, and accessories to meet the needs of both amateur and professional photographers. Our knowledgeable and friendly staff are always ready to assist you in finding the perfect equipment to capture your best moments. At Đức Hiệp Camera Shop, we pride ourselves on providing exceptional customer service, competitive prices, and a diverse selection of products from top brands. Whether you're a seasoned photographer or just starting out, come visit us and discover the world of photography at Đức Hiệp Camera Shop!</p>
                <p className="call">Got Question? Call us 24/7<span><a href="tel:123456789">+0123 456 789</a></span></p>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-12">
              <div className="single-footer links">
                <h4>Information</h4>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Faq</a></li>
                  <li><a href="#">Terms & Conditions</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Help</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-12">
              <div className="single-footer links">
                <h4>Customer Service</h4>
                <ul>
                  <li><a href="#">Payment Methods</a></li>
                  <li><a href="#">Money-back</a></li>
                  <li><a href="#">Returns</a></li>
                  <li><a href="#">Shipping</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-footer social">
                <h4>Get In Tuch</h4>
                <div className="contact">
                  <ul>
                    <li>NO. 342 - Ân thi Hưng Yên</li>
                    <li>VIÊT NAM.</li>
                    <li>info@shopVip</li>
                    <li>0999999999</li>
                  </ul>
                </div>
                <ul>
                  <li><a href="#"><i className="ti-facebook"></i></a></li>
                  <li><a href="#"><i className="ti-twitter"></i></a></li>
                  <li><a href="#"><i className="ti-flickr"></i></a></li>
                  <li><a href="#"><i className="ti-instagram"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;