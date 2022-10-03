import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AudioPlayer } from './components/audioPlayer';
import {
    createPlaylist,
    playPlaylist
} from './utils/reactUtils';
import MainRoutes from './routes';
import { Menu } from './components/menu';

function App() {
    const [playlist, setPlaylist] = useState([]);
    const getTracks = async () => {
        const res = await axios.get('/api/getTracks');

        if(res?.data) {
            const tracks = res.data;
            const initialPlaylist = createPlaylist(tracks);
            
            setPlaylist([initialPlaylist]);
        }
    };

    useEffect(() => {
        // Get tracks for music player
        getTracks();
    }, []);

    useEffect(() => {
        // Play new playlist
        if(playlist?.length) {
            playPlaylist(playlist);
        };
    }, [playlist]);

    return (
        <div>
            <Menu />
            <MainRoutes />
            <AudioPlayer />
        </div>
    );
};

export default App;