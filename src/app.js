import React, { useContext, useEffect } from 'react';
import { AudioPlayer } from './components/audioPlayer';
import { MainRoutes } from './routes';
import { Header } from './components/header';
import { PlaylistContext, TrackContext } from './context';
import { Box } from './components/styled';

function App() {
    const { fetchTracks } = useContext(TrackContext);
    const { fetchPlaylist } = useContext(PlaylistContext);

    useEffect(() => {
        fetchTracks();
        fetchPlaylist();
    }, []);

    return (
        <Box>
            <Header />
            <MainRoutes />
            <AudioPlayer />
        </Box>
    );
};

export default App;