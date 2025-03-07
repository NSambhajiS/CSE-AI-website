import React from "react";
import "./Footer.css";
import fb from "../../assets/fbimg.png";
import twitter from "../../assets/twitterimg.png";
import linkedin from "../../assets/linkedinimg.png";
import insta from "../../assets/instaimg.png";
import email from "../../assets/email.png";
import phone from "../../assets/phone.png";
import address from "../../assets/address.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          {/* Developer Info */}
          <div className="sb_footer-links_div">
            <h4>Website Developer</h4>
            <p>Neha Sawant</p>
            <div className="socialmedia">
            <a href="https://www.linkedin.com/in/neha-sawant-b004ba258/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src={insta} alt="Instagram" />
            </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contct">
            <h4>Connect with us</h4>
            <ul className="list">
              <li>
                <img src={email} alt="Email" className="email-icon" />
                <a href="mailto:hodcseai@viit.ac.in"> hodcseai@viit.ac.in</a>
              </li>
              <li>
                <img src={phone} alt="Phone" className="email-icon" />
                <a href="tel:+912026950200"> (020) 26950200/400</a>
              </li>
              <li>
                <img src={address} alt="Address" className="email-icon" />
                <span className="address-line">
                  Vishwakarma Institute of Information Technology, Survey No. 3/4,
                </span>
                <span className="address-line">
                  Kondhwa (Budruk) Pune – 411048, Maharashtra (India)
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="sb_footer-links_div">
            <h4>Find us here on social media</h4>
            <div className="socialmedia">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={fb} alt="Facebook" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src={linkedin} alt="LinkedIn" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={insta} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>

        <hr />

        {/* Copyright */}
        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>@{new Date().getFullYear()} CSEAI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
