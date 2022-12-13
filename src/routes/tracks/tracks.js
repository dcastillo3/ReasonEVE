import React, { useContext } from 'react';
import _ from 'lodash/core';
import './tracks.css';
import { TrackContext } from '../../app';
import { Track } from '../../components/track';

function Tracks() {
    const tracks = useContext(TrackContext);
    const renderTracks = !_.isEmpty(tracks) 
        && tracks.map((track, idx) => <Track key={idx} track={track} />);

    return (
        <div>
            {renderTracks}
        </div>
    );
};

export default Tracks;