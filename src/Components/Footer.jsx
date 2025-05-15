// src/Footer.js

import React from "react";
import "./Footer.css"; // You can add custom styles for the footer here

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            BagFluence Africa connects you to authentic, high-quality bags
            crafted by talented local artisans. We handpick each piece —
            checking for style, durability, and originality — before showcasing
            it in our store and online. Whether you're shopping for standout
            fashion or looking to partner as a maker, we're here to elevate
            African craftsmanship, one bag at a time.
          </p>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a
              href="https://www.wa.me/254783157670"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="bi bi-whatsapp"></i> WhatsApp
            </a>
            <a
              href="https://www.instagram.com/setekdesai"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="bi bi-instagram"></i> Instagram
            </a>
            <a
              href="https://twitter.com/setekdesai"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="bi bi-twitter"></i> Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/meshack-setek/
"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="bi bi-linkedin"></i> Linked in
            </a>
          </div>
        </div>

        <div className="footer-location text-light">
          <h4 className="mb-2">📍 Visit Our Store</h4>
          <p className="mb-1">Lizdams, Kenya</p>
          <p className="mb-1">🕒 Open: Mon – Sat, 10:00 AM – 6:00 PM</p>
          <p className="fst-italic text-light">
            We’d love to welcome you in person!
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Seteque CarryVogue Atelier. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
