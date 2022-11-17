import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MusicPlayer from 'react-material-music-player';
import {
    createPlaylist,
    initializePlayer
} from './audioPlayerUtils';

function AudioPlayer() {
    const [playlist, setPlaylist] = useState([]);
    const getTracks = async () => {
        try {
            let res = await axios.get('/api/tracks/getTracks');

            if(res?.data?.length) {
                const tracks = res.data;
                const initialPlaylist = createPlaylist(tracks);
                
                setPlaylist([initialPlaylist]);
            };
        } catch (err) {
            console.error(err.response);
        };
    };

    useEffect(() => {
        // Get tracks for music player
        getTracks();
    }, []);

    useEffect(() => {
        // Play new playlist
        if(playlist?.length) {
            initializePlayer(playlist);
        };
    }, [playlist]);

    return (
        <div id="music-player">
            <MusicPlayer sx={{}} disableDrawer={false} />
        </div>
    );
};

export default AudioPlayer;