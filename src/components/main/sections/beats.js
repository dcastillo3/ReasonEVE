import React, { Component } from 'react';
import { Carousel } from '../../widgets';
import { partition } from '../../../utilities';

export class Beats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beats: [
        'beat1', 
        'beat2', 
        'beat3', 
        'beat4', 
        'beat5', 
        'beat6', 
        'beat7', 
        'beat8', 
        'beat9',
        'beat10',
        'beat11',
        'beat12',
        'beat13'
      ]
    }
  }

  render() {
    
    const partitionedItems = partition(this.state.beats);

    return (
      <div id="beats" className="beats flex-column flex-center palette-three large-padding">
        <Carousel items={partitionedItems} />
      </div>
    )
  }
}

export default Beats;
