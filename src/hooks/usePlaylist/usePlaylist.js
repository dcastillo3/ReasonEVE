import { useEffect, useRef, useState } from "react";
import { apis, initialStates } from "../../utils/consts";
import axios from "axios";
import { initializeMusicPlayer, playMusicPlayer, pauseMusicPlayer, setMutationObserver } from "./usePlaylistUtils";

//Can reorder playlist from music player

function usePlaylist() {
    const [playlist, setPlaylist] = useState(initialStates.playlist);
    const [currTrack, setCurrTrack] = useState({});
    const [trackPlaying, setTrackPlaying] = useState(false);
    const playlistRef = useRef(playlist);

    const fetchPlaylist = async () => {
        try {
            const res = await axios.get(apis.playlist);

            if (!res?.data?.success) {
                const { err = {} } = res.data;

                console.error(err);
            } else if (res?.data?.success) {
                const { data = [] } = res.data
                const [ newCurrTrack = {} ] = data;
                
                //Initialize audio player
                initializeMusicPlayer(data);

                //Keep playlist in local state. 
                //Not ideal for sync, but audio player state is private
                setPlaylist(data);

                setCurrTrack(newCurrTrack);
            };
        } catch (err) {
            const errorMessage = err?.reponse ? err.response : err;

            console.error(errorMessage);
        };
    };

    const togglePlay = track => {
        if (track.productName === currTrack.productName) {
            if (trackPlaying) pauseMusicPlayer();
            else playMusicPlayer();
        } else addTrackToPlaylist(track);
    };

    const addTrackToPlaylist = track => {
        //Find track in playlist
        const trackInPlaylist = playlist.find(({ productName }) => productName === track.productName);
        //If track is in playlist, remove it.
        const filteredPlaylist = playlist.filter(({ productName }) => productName !== track.productName);
        //Add new track to top of queue
        const newPlaylist = [trackInPlaylist, ...filteredPlaylist];

        playMusicPlayer(newPlaylist);

        setPlaylist(newPlaylist);
    };

    const syncCurrentTrack = ([mutation]) => {
        const newTrackName = mutation.target.data;
        const newTrack = playlistRef.current.find(({productName}) => newTrackName === productName);

        setCurrTrack(newTrack);
    };

    const syncPlayingStatus = ([mutation]) => {
        const iconNode = mutation.target.querySelector('svg');
        // Not ideal. but data-testid is the only identifiable attribute to sync playing status
        const muiIcon = iconNode.getAttribute('data-testid');
        const newPlayingStatus = muiIcon === 'PlayArrowRoundedIcon' ? false : true;
        
        setTrackPlaying(newPlayingStatus);
    };

    //Cache copy of current state with useRef for MutationObserver callback access
    useEffect(() => {
        playlistRef.current = playlist;
    }, [playlist]);

    //Observe music player track title for changes and sync with local state
    //Observe music player play button for changes and sync with local state
    useEffect(() => {
        const musicPlayerTrackTitleNode = document.querySelector('#music-player > div > div > div > div');
        const musicPlayerTrackTitleConfig = { characterData: true, subtree: true };
        const musicPlayerPlayIconNode = document.querySelector('#music-player > div > div > div.MuiBox-root.css-1vjixiu > button:nth-child(2)');
        const musicPlayerPlayIconNodeConfig = { childList: true };
        
        setMutationObserver(musicPlayerTrackTitleNode, syncCurrentTrack, musicPlayerTrackTitleConfig);
        setMutationObserver(musicPlayerPlayIconNode, syncPlayingStatus, musicPlayerPlayIconNodeConfig);
    }, []);

    return {
        playlist,
        currTrack,
        trackPlaying,
        fetchPlaylist,
        togglePlay
    };
};

export default usePlaylist;