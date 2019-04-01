import React, {Component} from 'react'
import {Home, Packs, Beats, Music, Bio, Contact} from './sections';

class Main extends Component {

  render() {
    return (
      <div className="main flex-column">
        <Home />
        <Packs />
        <Beats />
        <Music />
        <Bio />
        <Contact />
      </div>
    )
  }
}

export default Main
