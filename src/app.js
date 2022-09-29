import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Track, PlayerInterface } from 'react-material-music-player';
import { AudioPlayer } from './components/audioPlayer';

function App() {
    const [playlist, setPlaylist] = useState([]);
    const getTracks = async () => {
        const res = await axios.get('/api/getTracks');

        if(res?.data) {
            const tracks = res.data;
            const newPlaylist = tracks.map(track => new Track(
                track.id,
                track.coverArt,
                track.title,
                track.artist,
                track.url
            ));
            
            // Set playlist
            setPlaylist([newPlaylist]);
        }
    };

    useEffect(() => {
        // Get tracks for music player
        getTracks();
    }, []);

    useEffect(() => {
        // // Load new playlist
        if(playlist?.length) {
            PlayerInterface.play(...playlist);
            console.log('added playlist to player');
        };
    }, [playlist]);

    return (
        <div>
            <div>{playlist.length ? 'playlist loaded' : 'playlist not loaded'}</div>
            <AudioPlayer />
        </div>
    );
};

export default App;