import React from 'react';
import { FlexBoxColumn, Text, TextCaption, TitleSmall } from '../../styled';

function ProductCardDetails({ artistName, additionalArtistNames, trackName, productDescription }) {

    return (
        <FlexBoxColumn m={[0, 0, 4, 0]}>
            <TitleSmall>{trackName}</TitleSmall>
            <TextCaption>{artistName} {additionalArtistNames ? `, ${additionalArtistNames}` : ''}</TextCaption>
            <Text>{productDescription}</Text>
        </FlexBoxColumn>
    );
};

export default ProductCardDetails;