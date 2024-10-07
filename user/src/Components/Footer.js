import React from 'react';
import './Style.css'; // Make sure to create and link this CSS file

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p className="footer-aboutus-p">
            We are a web collaboration platform that helps teams work together efficiently from anywhere in the world.
            Our tools are designed to improve productivity and streamline communication.
          </p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>
            Email: 
            <li><a href="mailto:mridul1940.be22@chitkara.edu.in">mridul1940.be22@chitkara.edu.in</a></li>
            <li><a href="mailto:mridul1889@gmail.com">mridul1889@gmail.com</a></li>
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; Communication Hub</p>
      </div>
    </footer>
  );
}
