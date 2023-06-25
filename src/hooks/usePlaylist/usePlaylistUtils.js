import _ from 'lodash';
import { Track, PlayerInterface } from 'react-material-music-player';

const formatPlaylistForMusicPlayer = tracks => tracks.map(track => new Track(
    track.dateCreated,
    track.coverArt,
    track.productName,
    track.artistName,
    track.preview
));

const playMusicPlayer = playlist => {
    const formattedPlaylist = !_.isEmpty(playlist) ? formatPlaylistForMusicPlayer(playlist) : null;

    PlayerInterface.play(formattedPlaylist);
};

const pauseMusicPlayer = () => {
    PlayerInterface.pause();
};

const setMusicPlayer = playlist => {
    const formattedPlaylist = formatPlaylistForMusicPlayer(playlist);

    PlayerInterface.setPlaylist(formattedPlaylist);
};

const initializeMusicPlayer = playlist => {
    PlayerInterface.setVolume(100);
    setMusicPlayer(playlist);
};

//Not ideal, but temporary solution for syncing audio player and local state until react-material-music-player exposes state
const setMutationObserver = (node, callback, config) => {
    if (node) {
        const observer = new MutationObserver(callback);

        observer.observe(node, config);
    };
};

export {
    playMusicPlayer,
    pauseMusicPlayer,
    setMusicPlayer,
    initializeMusicPlayer,
    setMutationObserver
};