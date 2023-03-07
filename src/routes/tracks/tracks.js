import React, { useContext } from 'react';
import _ from 'lodash/core';
import { TrackContext } from '../../app';
import { Track } from '../../components/track';
import { FlexBox } from '../../components/styled';

function Tracks() {
    const tracks = useContext(TrackContext);
    const renderTracks = !_.isEmpty(tracks) 
        && tracks.map((track, idx) => <Track key={idx} track={track} />);

    return (
        <FlexBox style={{flexWrap: 'wrap'}}>
            {renderTracks}
        </FlexBox>
    );
};

export default Tracks;