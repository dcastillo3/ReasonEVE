import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './theme';
import App from './app';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
);