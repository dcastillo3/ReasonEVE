import React, { Component } from 'react';
import { Carousel } from '../../widgets';

export class Beats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beats: ['beat1', 'beat2', 'beat3']
    }
  }

  render() {

    return (
      <div id="beats" className="beats flex-column flex-center palette-three large-padding">
        <Carousel items={this.state.beats} />
      </div>
    )
  }
}

export default Beats;
