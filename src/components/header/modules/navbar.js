import React, { Component } from 'react'
import { Slide } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  render() {

    return (
      <Slide direction="down" timeout={1000} in={true} style={{ transitionDelay: 1000 }}>
        <div className="navbar flex-row flex-center palette-one-transparent flex-full-grid">
          <div className="social-media menu-items flex-row flex-center">
            <a href="https://soundcloud.com/ReasonEVE" target="_blank" rel="noopener noreferrer" className="fab fa-soundcloud"><div></div></a>
            <a href="https://www.instagram.com/ReasonEVEMusic" target="_blank" rel="noopener noreferrer" className="fab fa-instagram"><div></div></a>
            <a href="https://www.facebook.com/ReasonEVE" target="_blank" rel="noopener noreferrer" className="fab fa-facebook-square"><div></div></a>
            <a href="https://www.youtube.com/user/dcastillo5" target="_blank" rel="noopener noreferrer" className="fab fa-youtube"><div></div></a>
          </div>

          <div className="logo"></div>

          <div className="nav-links menu-items">
            <Link to="/">Home</Link>
            <Link to="/packs">Packs</Link>
            <Link to="/beats">Beats</Link>
            <Link to="/music">Music</Link>
            <Link to="/bio">Bio</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </Slide>
    )
  }
}

export default Navbar;
