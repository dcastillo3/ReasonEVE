import React from 'react';
import { AudioPlayer } from './components/audioPlayer';
import MainRoutes from './routes';
import { Menu } from './components/menu';

function App() {
    return (
        <div>
            <Menu />
            <MainRoutes />
            <AudioPlayer />
        </div>
    );
};

export default App;