import React, { useContext } from 'react';
import { Box, FlexBox, FlexBoxColumn } from '../../styled';
import { ProductCard } from '../../productCard';
import { Heading } from '../../common';
import { TrackContext } from '../../../context';
import { useMediaQuery } from '../../../hooks';
import { TracksContainer } from './tracksStyledComponents';

function Tracks() {
    const { isDesktop } = useMediaQuery();
    const { tracks } = useContext(TrackContext);
    const headingMargin = isDesktop ? [0, 8] : [0, 5];
    const tracksMargin = isDesktop ? [0, 8] : null;
    const tracksCenter = isDesktop ? false : true;

    const renderTracks = !_.isEmpty(tracks) 
        && tracks.map((track, idx) => <ProductCard key={idx} product={track} isDesktop={isDesktop} />);

    return (
        <FlexBoxColumn>
            <Box $m={headingMargin}>
                <Heading variant={'success'} heading={'Find your next sound'} />
            </Box>

            <TracksContainer $m={tracksMargin} $center={tracksCenter} $wrap={true} $isDesktop={isDesktop}>
                {renderTracks}
            </TracksContainer>
        </FlexBoxColumn>
    );
};

export default Tracks;