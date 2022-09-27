import React from 'react';
import { render } from 'react-dom';
import { Track, PlayerInterface } from 'react-material-music-player';
import { AudioPlayer } from './components/audioPlayer';

// Create track
const beat1 = new Track(
    '1',
    'https://media.gettyimages.com/photos/line-subway-train-in-queens-with-manhattan-skyline-new-york-city-picture-id1189547726?s=612x612', //HTML <img> tag
    'Another Evening',
    'ReasonEVE',
    '../beats/Another%20Evening.mp3'
);

// Create playlist
const myPlaylist = [
    beat1
]

// Add playlist to player
PlayerInterface.play(myPlaylist);

render(
    <div>
        <div>index.js</div>
        <AudioPlayer />
    </div>,
    document.getElementById('root')
);