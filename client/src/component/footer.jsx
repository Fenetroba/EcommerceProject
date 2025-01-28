import React from "react";
import logo from "./assets/model-24481_640.png";
import "../page/page Css/footer.css";
import {
  FaFacebookMessenger,
  FaInstagram,
  FaTelegram,
  FaTiktok,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="topContener">
      <div className="footerContener">
          <div className="shaopingStor">
        <img src={logo} alt="logo" style={{ width: "100px", height: "100px" }} />
        <h1>Shopping Store</h1>
        </div>
        <div className="socialmedia">
        <h2>Follow Us</h2>
          <FaInstagram className="socealmediaicons" />
          <span>Instagram</span>
          <FaTiktok className="socealmediaicons" />
          <span>Tiktok</span>
          <FaFacebookMessenger className="socealmediaicons" />
          <span>Facebook</span>
          <FaTelegram className="socealmediaicons" />
          <span>Telegram</span>
        </div>
        <div className="contactUs">
          <input type="text" placeholder="contact us" />
          <button className="contactBtton">submit</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
