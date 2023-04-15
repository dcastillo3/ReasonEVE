import React, { useContext, useEffect } from 'react';
import MusicPlayer from 'react-material-music-player';
import { initializePlayer } from './audioPlayerUtils';
import { ThemeProvider } from "@mui/material/styles";
import { Box } from '../styled';
import { useTheme } from 'styled-components';
import { PlaylistContext } from '../../utils/context';

function AudioPlayer() {
    const theme = useTheme();
    const { playlist } = useContext(PlaylistContext);

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