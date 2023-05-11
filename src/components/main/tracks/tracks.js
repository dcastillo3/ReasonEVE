import React, { useContext } from 'react';
import { Box, FlexBoxColumn, Grid } from '../../styled';
import { ProductCard } from '../../productCard';
import { Heading, headingProps } from '../../common';
import { TrackContext } from '../../../context';
import { useMediaQuery } from '../../../hooks';
import { tracksHeading } from './tracksConsts';

function Tracks() {
    const { isDesktop } = useMediaQuery();
    const { tracks } = useContext(TrackContext);
    const headingMargin = isDesktop ? [0, 8] : [0, 5];
    const tracksMargin = isDesktop ? [0, 8] : null;
    const tracksItemSize = isDesktop ? 87 : 36;

    const renderTracks = !_.isEmpty(tracks) 
        && tracks.map((track, idx) => <ProductCard key={idx} product={track} isDesktop={isDesktop} />);

    return (
        <FlexBoxColumn>
            <Box $m={headingMargin}>
                <Heading variant={headingProps.variant.success} heading={tracksHeading} />
            </Box>

            <Grid $m={tracksMargin} $center={true} $isDesktop={isDesktop} $itemSize={tracksItemSize}>
                {renderTracks}
            </Grid>
        </FlexBoxColumn>
    );
};

export default Tracks;