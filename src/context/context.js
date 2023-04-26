import React from 'react';
import { useCart, useTracks, usePlaylist } from '../hooks';
import { CartContext, PlaylistContext, TrackContext } from './';
import { theme } from '../theme';
import { ThemeProvider } from 'styled-components';
import { buildCustomTheme } from './contextUtils';

function AppContext({children}) {
    const tracks = useTracks();
    const cart = useCart();
    const playlist = usePlaylist();
    // Define props accessible to styled-components
    const customTheme = buildCustomTheme(theme);
    
    return (
        <ThemeProvider theme={customTheme}>
            <TrackContext.Provider value={tracks}>
                <PlaylistContext.Provider value={playlist} >
                    <CartContext.Provider value={cart}>
                        {children}
                    </CartContext.Provider>
                </PlaylistContext.Provider>
            </TrackContext.Provider>
        </ThemeProvider>
    );
};

export default AppContext;