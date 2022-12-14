import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as PlayerThemeProvider } from "@mui/material/styles";
import { playerTheme, GlobalTheme } from './theme';
import App from './app';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <PlayerThemeProvider theme={playerTheme}>
        <GlobalTheme />
        
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </PlayerThemeProvider>
);