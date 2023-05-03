import React from 'react';
import { formatArtistNames } from '../../../utils/reactUtils';
import { SubTitle, TextCaption, TitleSmall } from '../../styled';
import { ProductCardFlexBoxColumnContainer } from '../productCardStyledComponents';

function ProductCardDetails({ artistName, additionalArtistNames, productName, isDesktop }) {
    const artists = formatArtistNames(artistName, additionalArtistNames);

    const productNameTitle = (
        <TitleSmall $truncate={true}>{productName}</TitleSmall>
    );

    const productNameSubTitle = (
        <SubTitle $truncate={true}>{productName}</SubTitle>
    );

    const renderProductTitle = isDesktop ? productNameTitle : productNameSubTitle;

    return (
        <ProductCardFlexBoxColumnContainer $m={[0, 0, 4, 0]}>
            {renderProductTitle}

            <TextCaption $truncate={true}>{artists}</TextCaption>
        </ProductCardFlexBoxColumnContainer>
    );
};

export default ProductCardDetails;