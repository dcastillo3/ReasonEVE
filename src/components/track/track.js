import React from 'react';
import _ from 'lodash/core';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, Button, Card, FlexBox, FlexBoxColumn, TextCaption, TitleSmall } from '../styled';

function Track({ track }) {
    const {
        artistName,
        additionalArtistNames,
        trackName,
        mp3Price,
        leasePrice,
        exclusivePrice,
        coverArt
    } = track;

    return (
        <Card m={[2, 2]} variant={"backgroundLight"} style={{width: '350px', borderRadius: '5px'}}>
            <FlexBoxColumn>
                <Box>
                    <img style={{width: '350px', height: '350px', borderRadius: '5px 5px 0 0'}} src={coverArt} />
                </Box>

                <FlexBoxColumn m={[3, 5]}>
                    <FlexBoxColumn m={[0, 0, 4, 0]}>
                        <TitleSmall>{trackName}</TitleSmall>
                        <TextCaption>{artistName} {additionalArtistNames ? `, ${additionalArtistNames}` : ''}</TextCaption>
                    </FlexBoxColumn>

                    <FlexBox>
                        <Button variant={"primary"} m={[1, 1, 1, 0]} size={"small"}>{mp3Price}</Button>
                        <Button variant={"primary"} m={[1, 1]} size={"small"}>{leasePrice}</Button>
                        <Button variant={"primary"} m={[1, 0, 1, 1]} size={"small"}>{exclusivePrice}</Button>
                    </FlexBox>
                </FlexBoxColumn>

            </FlexBoxColumn>
        </Card>
    );
};

export default Track;