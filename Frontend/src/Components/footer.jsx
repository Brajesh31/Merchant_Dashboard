import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Ethnicize by India Post</p>
        <p>
          Connecting global diaspora sellers and local Indian service providers for a sustainable future.
        </p>
        <p className="links">
          <a href="/about-us">About Us</a> | 
          <a href="/guidelines">Guidelines</a> | 
          <a href="/privacy-policy">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
