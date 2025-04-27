import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Whale là không gian cà phê được tạo nên từ đam mê và sự tinh tế.
            Chúng tôi không chỉ phục vụ những ly cà phê chất lượng, mà còn mang
            đến trải nghiệm thư giãn, ấm cúng như ở nhà. Mỗi sản phẩm đều được
            chọn lọc kỹ lưỡng, để bạn tận hưởng trọn vẹn từng khoảnh khắc cùng
            bạn bè và người thân.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>CÔNG TY</h2>
          <ul>
            <li>Trang Chủ</li>
            <li>Về Chúng Tôi</li>
            <li>Vận Chuyển</li>
            <li>Điều Khoản</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Liên Hệ</h2>
          <ul>
            <li>098.152.7473</li>
            <li>contact@whale.com</li>
          </ul>
        </div>
      </div>
      <p className="footer-copy-right">
        Copyright 2025 @ Whale.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
