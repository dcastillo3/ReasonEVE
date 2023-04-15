import React, { useEffect } from 'react';
import { AudioPlayer } from './components/audioPlayer';
import { MainRoutes } from './routes';
import { Header } from './components/header';
import useCart from './hooks/useCart';
import useTracks from './hooks/useTracks';
import usePlaylist from './hooks/usePlaylist';
import { Box } from './components/styled';
import { CartContext, PlaylistContext, TrackContext } from './utils/context';

function App() {
    const tracks = useTracks();
    const cart = useCart();
    const playlist = usePlaylist();

    useEffect(() => {
        tracks.fetchTracks();
        playlist.fetchPlaylist();
    }, []);
    
    return (
        <Box>
            <TrackContext.Provider value={tracks}>
                <PlaylistContext.Provider value={playlist} >
                    <CartContext.Provider value={cart}>
                        <Header />
                        <MainRoutes />
                        <AudioPlayer />
                    </CartContext.Provider>
                </PlaylistContext.Provider>
            </TrackContext.Provider>
        </Box>
    );
};

export default App;