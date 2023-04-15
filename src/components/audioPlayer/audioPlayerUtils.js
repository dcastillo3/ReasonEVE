import { Track, PlayerInterface } from 'react-material-music-player';

const formatPlaylist = tracks => tracks.map(track => new Track(
    track.dateCreated,
    track.coverArt,
    track.productName,
    track.artistName,
    track.url
));

const playPlaylist = playlist => {
    const formattedPlaylist = formatPlaylist(playlist);

    PlayerInterface.setPlaylist(formattedPlaylist);
    PlayerInterface.play(formattedPlaylist);
};

const setPlaylist = playlist => {
    const formattedPlaylist = formatPlaylist(playlist);

    PlayerInterface.setPlaylist(formattedPlaylist);
};

const initializePlayer = playlist => {
    PlayerInterface.setVolume(100);
    setPlaylist(playlist);
};

const getCurrTrackTitle = () => {
    // DC-NOTE: Dependent on music player DOM tree. Requested better solution in music player repo.
    const currTrackTitleElem = document.querySelector('#music-player > div > div > div > div');
    const currTrackTitle = currTrackTitleElem.innerHTML;

    return currTrackTitle;
};

export {
    playPlaylist,
    setPlaylist,
    initializePlayer,
    getCurrTrackTitle
};