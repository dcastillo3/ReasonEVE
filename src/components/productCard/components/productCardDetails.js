import React from 'react';
import { formatArtistNames } from '../../../utils/reactUtils';
import { FlexBoxColumn, TextCaption, TitleSmall } from '../../styled';

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