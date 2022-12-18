import React, { useContext } from 'react';
import _ from 'lodash/core';
import { TrackContext } from '../../app';
import { Track } from '../../components/track';
import { Box } from '../../components/styled';

function Tracks() {
    const tracks = useContext(TrackContext);
    const renderTracks = !_.isEmpty(tracks) 
        && tracks.map((track, idx) => <Track key={idx} track={track} />);

    return (
        <Box>
            {renderTracks}
        </Box>
    );
};

export default Tracks;