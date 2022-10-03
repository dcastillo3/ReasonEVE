import { Track, PlayerInterface } from 'react-material-music-player';

const createPlaylist = tracks => tracks.map(track => new Track(
    track.id,
    track.coverArt,
    track.title,
    track.artist,
    track.url
));

const playPlaylist = playlist => {
    PlayerInterface.setVolume(100);
    PlayerInterface.play(...playlist);

    console.log('added playlist to player');
}

export {
    createPlaylist,
    playPlaylist
}