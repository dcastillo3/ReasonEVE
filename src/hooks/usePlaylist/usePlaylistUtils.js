import _ from 'lodash';
import { Track, PlayerInterface } from 'react-material-music-player';
import { productTypes } from './usePlaylistConsts';

const formatPlaylistForMusicPlayer = tracks => tracks.map(track => new Track(
    track.id,
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

const subscribeToMusicPlayer = (callback) => PlayerInterface.subscribe(callback);

const buildPlaylistTracks = (playlistData, [tracks]) => {
    const playlistTracks = playlistData.map(playlistDataItem => {
        const {
            id: playlistId,
            productId, 
            productType
        } = playlistDataItem;
        let playlistTrack = {
            ...playlistDataItem,
        };
        
        if(productType === productTypes.track) {
            const track = tracks.find(({ id }) => id === productId);

            playlistTrack = {
                playlistId,
                ...track
            };
        };

        return playlistTrack;
    });

    return playlistTracks;
};

export {
    playMusicPlayer,
    pauseMusicPlayer,
    setMusicPlayer,
    initializeMusicPlayer,
    buildPlaylistTracks,
    subscribeToMusicPlayer
};