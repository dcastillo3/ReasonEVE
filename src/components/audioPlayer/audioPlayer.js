import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MusicPlayer from 'react-material-music-player';
import {
    createPlaylist,
    initializePlayer
} from './audioPlayerUtils';
import { ThemeProvider } from "@mui/material/styles";
import { Box } from '../styled';
import { useTheme } from 'styled-components';

function AudioPlayer() {
    const theme = useTheme();
    const [playlist, setPlaylist] = useState([]);
    const getPlaylist = async () => {
        try {
            let res = await axios.get('/api/playlist');

            if (!res?.data?.success) {
                const { err = {} } = res.data;

                console.error(err);
            } else if (res?.data?.success) {
                const { data = [] } = res.data;
                const initialPlaylist = createPlaylist(data);

                setPlaylist([initialPlaylist]);
            };
        } catch (err) {
            console.error(err.response);
        };
    };

    useEffect(() => {
        // Get tracks for music player
        getPlaylist();
    }, []);

    useEffect(() => {
        // Play new playlist
        if(playlist?.length) {
            initializePlayer(playlist);
        };
    }, [playlist]);

    return (
        <Box>
            <ThemeProvider theme={theme}>
                <MusicPlayer sx={{}} disableDrawer={false} />
            </ThemeProvider>
        </Box>
    );
};

export default AudioPlayer;