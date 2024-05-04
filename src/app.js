import React, { useContext, useEffect, useState } from 'react';
import { AudioPlayer } from './components/audioPlayer';
import { MainRoutes } from './routes';
import { Header } from './components/header';
import { PlaylistContext, TrackContext } from './context';
import { Box } from './components/styled';

function App() {
    const { fetchTracks } = useContext(TrackContext);
    const { fetchPlaylist } = useContext(PlaylistContext);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchAppData = async () => {
            setLoading(true);

            // Fetch product apis
            const products = await Promise.all([
                fetchTracks()
            ]);
            
            // Fetch apis that build on product data
            await Promise.all([
                fetchPlaylist(products)
            ]);

            setLoading(false);
        };

        fetchAppData();
    }, []);

    const appRender = (
        <Box>
            <Header />
            <MainRoutes />
            <AudioPlayer />
        </Box>
    );

    const loadingRender = (
        <Box>
            Loading...
        </Box>
    );

    const renderApp = loading ? loadingRender : appRender;

    return (
        <Box>
            {renderApp}
        </Box>
    );
};

export default App;