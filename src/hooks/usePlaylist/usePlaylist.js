import { useEffect, useRef, useState } from "react";
import { apis, initialStates } from "../../utils/consts";
import axios from "axios";
import { initializeMusicPlayer, playMusicPlayer, pauseMusicPlayer, buildPlaylistTracks, subscribeToMusicPlayer } from "./usePlaylistUtils";
import { mediaStates } from "./usePlaylistConsts";

function usePlaylist() {
    const [playlist, setPlaylist] = useState(initialStates.playlist);
    const [currTrack, setCurrTrack] = useState(initialStates.currTrack);
    const [trackPlaying, setTrackPlaying] = useState(initialStates.trackPlaying);
    const playlistRef = useRef(playlist);
    const trackPlayingRef = useRef(trackPlaying);
    const currTrackRef = useRef(currTrack);

    // Keep a reference to the latest states for music player subscription callback
    useEffect(() => {
        playlistRef.current = playlist;

        trackPlayingRef.current = trackPlaying;

        currTrackRef.current = currTrack;
    }, [playlist, trackPlaying, currTrack]);

    const fetchPlaylist = async products => {
        try {
            const res = await axios.get(apis.playlist);

            if (!res?.data?.success) {
                const { err = {} } = res.data;

                console.error(err);
            } else if (res?.data?.success) {
                const { data = [] } = res.data;
                const playlistTracks = buildPlaylistTracks(data, products);
                const firstTrack = playlistTracks[0];
                
                initializeMusicPlayer(playlistTracks);

                setPlaylist(playlistTracks);

                setCurrTrack(firstTrack);
            };
        } catch (err) {
            const errorMessage = err?.reponse ? err.response : err;

            console.error(errorMessage);
        };
    };

    const togglePlay = track => {
        if (track.id === currTrack.id) {
            if (trackPlaying) pauseMusicPlayer();
            else playMusicPlayer();
        } else addTrackToPlaylist(track);
    };

    const addTrackToPlaylist = track => {
        //Find track in playlist or use incoming track
        const newTrack = playlist.find(({ id }) => id === track.id) || track;
        //If track is in playlist, remove it.
        const filteredPlaylist = playlist.filter(({ id }) => id !== track.id);
        //Add new track to top of queue
        const newPlaylist = [newTrack, ...filteredPlaylist];

        playMusicPlayer(newPlaylist);
    };

    const updatePlaylistState = musicPlayerState => {
        const musicPlayerTrack = musicPlayerState.playlist[musicPlayerState.currentTrack];
        const newCurrTrack = playlistRef.current.find(({ id }) => id === musicPlayerTrack?.ID);
        const newTrackPlaying = musicPlayerState.mediaState === mediaStates.playing;

        if(currTrackRef.current?.id !== newCurrTrack?.id) {
            setCurrTrack(newCurrTrack);
        };

        if(trackPlayingRef.current !== newTrackPlaying) {
            setTrackPlaying(newTrackPlaying);
        };
    };

    // Subscribe to music player state
    useEffect(() => {
        subscribeToMusicPlayer(updatePlaylistState);
    }, []);

    return {
        playlist,
        trackPlaying,
        currTrack,
        fetchPlaylist,
        togglePlay
    };
};

export default usePlaylist;