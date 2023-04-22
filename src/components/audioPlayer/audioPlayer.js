import React, { useEffect, useState } from 'react';
import MusicPlayer from 'react-material-music-player';
import { ThemeProvider } from "@mui/material/styles";
import { Box } from '../styled';
import { useTheme } from 'styled-components';
import AudioPlayerCartButton from './components/audioPlayerCartButton';
import { attachCartButtonToAudioPlayer } from './audioPlayerUtils';

function AudioPlayer() {
    const [mounted, setMounted] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        //Not ideal. Attach cart button to audio player after mounted.
        if(!mounted) setMounted(true);
        else attachCartButtonToAudioPlayer();
    }, [mounted]);

    return (
        <Box id="music-player">
            <ThemeProvider theme={theme}>
                <AudioPlayerCartButton />
                <MusicPlayer sx={{overflow: 'initial'}} disableDrawer={false} />
            </ThemeProvider>
        </Box>
    );
};

export default AudioPlayer;