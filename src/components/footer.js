import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="footer flex-column flex-center palette-two">

    <div className="footer-container flex-column flex-center narrow-content medium-padding">

      <div className="footer-columns flex-row">

        <div className="footer-column-copyright flex-column">
          <div className="footer-column-container flex-column element-center">
            <div className="footer-column-contact-logo"></div>
            <div className="footer-column-copyright-a">
              © 2019 ReasonEVE.
            </div>

            <div className="footer-column-copyright-b">
              All Rights Reserved.
            </div>
          </div>
        </div>

        <div className="footer-column-contact flex-column">
          <div className="footer-column-container flex-column">
            <div className="footer-bottom-text-subtitle bottom-light-red subtitle">Subtitle Here</div>
            <div className="bottom-light-red">Column two text here.</div>
            <div>Column three text here.</div>
          </div>
        </div>

        <div className="footer-column-social flex-column">
          <div className="footer-column-container flex-column element-center">
            <a className="flex-row" href="https://soundcloud.com/ReasonEVE" target="_blank" rel="noopener noreferrer">
              <i className="footer-social fab fa-soundcloud"></i>
              <div className="footer-column-social-text">Soundcloud</div>
            </a>
            <a className="flex-row" href="https://www.instagram.com/ReasonEVEMusic" target="_blank" rel="noopener noreferrer">
              <i className="footer-social fab fa-instagram"></i>
              <div className="footer-column-social-text">Instagram</div>
            </a>
            <a className="flex-row" href="https://www.facebook.com/ReasonEVE" target="_blank" rel="noopener noreferrer">
              <i className="footer-social fab fa-facebook-square"></i>
              <div className="footer-column-social-text">Facebook</div>
            </a>
            <a className="flex-row" href="https://www.youtube.com/user/dcastillo5" target="_blank" rel="noopener noreferrer">
              <i className="footer-social fab fa-youtube"></i>
              <div className="footer-column-social-text">YouTube</div>
            </a>
          </div>
        </div>

        <div className="footer-column-menu flex-column">
          <div className="footer-column-container flex-column element-center">
            <Link to="/">Home</Link>
            <Link to="/packs">Packs</Link>
            <Link to="/beats">Beats</Link>
            <Link to="/music">Music</Link>
            <Link to="/bio">Bio</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

      </div>

      <div className="footer-bottom-text flex-column medium-padding flex-center">
        <div className="footer-bottom-text-title title text-center">Some title here</div>
        <div className="footer-bottom-text-content text-center">Some descriptive text that goes on for about a paragraph here. It also includes two sentences to make it a bit longer. Font size is much smaller than the title.</div>
      </div>

    </div>

  </div>
)

export default Footer;
