import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AudioPlayer } from './components/audioPlayer';
import MainRoutes from './routes';
import { Menu } from './components/menu';

export const TrackContext = React.createContext();

function App() {
    const [tracks, setTracks] = useState([]);
    const getTracks = async () => {
        try {
            let res = await axios.get('/api/tracks');

            if (!res?.data?.success) {
                const { err = {} } = res.data;

                console.error(err);
            } else if (res?.data?.success) {
                const { data = {} } = res.data;

                setTracks(data);
            };
        } catch (err) {
            console.error(err.response);
        };
    };

    useEffect(() => {
        // Get tracks for music player
        getTracks();
    }, []);
    
    return (
        <div>
            <TrackContext.Provider value={tracks}>
                <Menu />
                <MainRoutes />
                <AudioPlayer />
            </TrackContext.Provider>
        </div>
    );
};

export default App;