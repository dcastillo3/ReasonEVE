import React from 'react';
import MusicPlayer from 'react-material-music-player';
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from 'styled-components';
import AudioPlayerCartButton from './components/audioPlayerCartButton';
import { AudioPlayerContainer } from './audioPlayerStyledComponents';
import { useMediaQuery } from '../../hooks';

function AudioPlayer() {
    const theme = useTheme();
    const { isDesktop } = useMediaQuery();

    return (
        <AudioPlayerContainer $isDesktop={isDesktop} id="music-player">
            <AudioPlayerCartButton />
            
            <ThemeProvider theme={theme}>
                <MusicPlayer sx={{overflow: 'initial'}} disableDrawer={false} />
            </ThemeProvider>
        </AudioPlayerContainer>
    );
};

export default AudioPlayer;