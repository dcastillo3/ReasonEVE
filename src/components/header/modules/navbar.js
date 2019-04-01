import React, {Component} from 'react'
import { Slide } from '@material-ui/core';
import { Link as ScrollLink } from 'react-scroll';

class Navbar extends Component { 

  render() {

    return (
      <Slide direction="down" timeout={1000} in={true} style={{transitionDelay: 1000}}>
        <div className="navbar flex-row flex-center palette-one-transparent flex-full-grid">
          <div className="social-media menu-items flex-row flex-center">
            <a href="https://soundcloud.com/ReasonEVE" target="_blank" rel="noopener noreferrer" className="fab fa-soundcloud"><div></div></a>
            <a href="https://www.instagram.com/ReasonEVEMusic" target="_blank" rel="noopener noreferrer" className="fab fa-instagram"><div></div></a>
            <a href="https://www.facebook.com/ReasonEVE" target="_blank" rel="noopener noreferrer" className="fab fa-facebook-square"><div></div></a>
            <a href="https://www.youtube.com/user/dcastillo5" target="_blank" rel="noopener noreferrer" className="fab fa-youtube"><div></div></a>
          </div>

          <div className="logo"></div>

          <div className="nav-links menu-items">
            <ScrollLink activeClass="active" to="home" spy={true} smooth={true} duration={500} >Home</ScrollLink>
            <ScrollLink activeClass="active" to="packs" spy={true} smooth={true} duration={500} >Packs</ScrollLink>
            <ScrollLink activeClass="active" to="beats" spy={true} smooth={true} duration={500} >Beats</ScrollLink>
            <ScrollLink activeClass="active" to="music" spy={true} smooth={true} duration={500} >Music</ScrollLink>
            <ScrollLink activeClass="active" to="bio" spy={true} smooth={true} duration={500} >Bio</ScrollLink>
            <ScrollLink activeClass="active" to="contact" spy={true} smooth={true} duration={500} >Contact</ScrollLink>
          </div>
        </div>
      </Slide>
    )
  }
}

export default Navbar;
