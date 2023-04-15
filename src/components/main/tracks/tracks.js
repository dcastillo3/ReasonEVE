import React, { useContext } from 'react';
import { Box, FlexBox, FlexBoxColumn } from '../../styled';
import { ProductCard } from '../../productCard';
import { Heading } from '../../common';
import { TrackContext } from '../../../utils/context';

function Tracks() {
    const { tracks } = useContext(TrackContext);
    const renderTracks = !_.isEmpty(tracks) 
        && tracks.map((track, idx) => <ProductCard key={idx} product={track} />);

    return (
        <FlexBoxColumn>
            <Box m={[0, 8]}>
                <Heading variant={'success'} heading={'Find your next sound'} />
            </Box>

            <FlexBox m={[0, 8]} $wrap={true}>
                {renderTracks}
            </FlexBox>
        </FlexBoxColumn>
    );
};

export default Tracks;