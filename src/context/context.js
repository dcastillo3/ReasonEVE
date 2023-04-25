import React from 'react';
import { useCart, useTracks, usePlaylist, useMediaQuery } from '../hooks';
import { CartContext, MediaQueryContext, PlaylistContext, TrackContext } from './';
import { theme } from '../theme';
import { ThemeProvider } from 'styled-components';
import { buildCustomTheme } from './contextUtils';

function AppContext({children}) {
    const tracks = useTracks();
    const cart = useCart();
    const playlist = usePlaylist();
    const mediaQuery = useMediaQuery();
    // Define props accessible to styled-components
    const customTheme = buildCustomTheme(theme);
    
    return (
        <ThemeProvider theme={customTheme}>
            <MediaQueryContext.Provider value={mediaQuery}>
                <TrackContext.Provider value={tracks}>
                    <PlaylistContext.Provider value={playlist} >
                        <CartContext.Provider value={cart}>
                            {children}
                        </CartContext.Provider>
                    </PlaylistContext.Provider>
                </TrackContext.Provider>
            </MediaQueryContext.Provider>
        </ThemeProvider>
    );
};

export default AppContext;