import { createContext } from "react";

const TrackContext = createContext();

const CartContext = createContext();

const PlaylistContext = createContext();

const buildCustomTheme = theme => {
    const customTheme = {
        ...theme
    };

    return customTheme;
};

export {
    TrackContext,
    CartContext,
    PlaylistContext,
    buildCustomTheme
};