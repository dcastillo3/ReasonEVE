import React from 'react';
import { FlexBoxColumn, TextCaption, TitleSmall } from '../../styled';
import { formatArtistNames } from '../productCardUtils';

function ProductCardDetails({ artistName, additionalArtistNames, productName }) {
    const artists = formatArtistNames(artistName, additionalArtistNames);

    return (
        <FlexBoxColumn m={[0, 0, 4, 0]}>
            <TitleSmall>{productName}</TitleSmall>
            <TextCaption>{artists}</TextCaption>
        </FlexBoxColumn>
    );
};

export default ProductCardDetails;