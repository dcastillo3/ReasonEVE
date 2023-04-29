import React from 'react';
import { formatArtistNames } from '../../../utils/reactUtils';
import { TextCaption, TitleSmall } from '../../styled';
import { ProductCardFlexBoxColumnContainer } from '../productCardStyledComponents';

function ProductCardDetails({ artistName, additionalArtistNames, productName }) {
    const artists = formatArtistNames(artistName, additionalArtistNames);

    return (
        <ProductCardFlexBoxColumnContainer $m={[0, 0, 4, 0]}>
            <TitleSmall>{productName}</TitleSmall>
            <TextCaption>{artists}</TextCaption>
        </ProductCardFlexBoxColumnContainer>
    );
};

export default ProductCardDetails;