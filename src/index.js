import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Track, PlayerInterface } from 'react-material-music-player';
import { AudioPlayer } from './components/audioPlayer';

// Create track
const beat1 = new Track(
    '1',
    'https://media.gettyimages.com/photos/line-subway-train-in-queens-with-manhattan-skyline-new-york-city-picture-id1189547726?s=612x612', //HTML <img> tag
    'Another Evening',
    'ReasonEVE',
    '../api/beats/Another Evening.mp3'
);

// Create playlist
const myPlaylist = [
    beat1
];

// Add playlist to player
PlayerInterface.play(myPlaylist);

// Test axios api call
function ExpressTestComponent() {
    const [expressData, setExpressData] = useState('');
    const textExpressCall = async () => {
        const res = await axios.get('/api/testForReact');
        console.log(res);

        setExpressData(res.data);
    };

    useEffect(() => {
        textExpressCall();
    }, []);

    return(
        <div>{expressData ? expressData : 'no express data found'}</div>
    );
}

render(
    <div>
        <div>index.js</div>
        <ExpressTestComponent />
        <AudioPlayer />
    </div>,
    document.getElementById('root')
);