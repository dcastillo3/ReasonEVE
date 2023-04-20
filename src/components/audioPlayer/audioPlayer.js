import React from 'react';
import MusicPlayer from 'react-material-music-player';
import { ThemeProvider } from "@mui/material/styles";
import { Box } from '../styled';
import { useTheme } from 'styled-components';

function AudioPlayer() {
    const theme = useTheme();

    return (
        <Box id="music-player">
            <ThemeProvider theme={theme}>
                <MusicPlayer sx={{}} disableDrawer={false} />
            </ThemeProvider>
        </Box>
    );
};

export default AudioPlayer;