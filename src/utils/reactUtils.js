import { Track, PlayerInterface } from 'react-material-music-player';

const createPlaylist = tracks => tracks.map(track => new Track(
    track.id,
    track.coverArt,
    track.title,
    track.artist,
    track.url
));

const playPlaylist = playlist => {
    PlayerInterface.setPlaylist(...playlist);
    PlayerInterface.play(...playlist);
};

const initializePlayer = playlist => {
    PlayerInterface.setVolume(100);
    playPlaylist(playlist);
};

const getCurrTrackTitle = () => {
    // DC-NOTE: Dependent on music player DOM tree. Requested better solution in music player repo.
    const currTrackTitleElem = document.querySelector('#music-player > div > div > div > div');
    const currTrackTitle = currTrackTitleElem.innerHTML;

    return currTrackTitle;
}

export {
    createPlaylist,
    playPlaylist,
    initializePlayer,
    getCurrTrackTitle
};