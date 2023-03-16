import React from 'react';
import { FlexBoxColumn } from '../styled';
import { formatPricesForCartMenu } from './productCardUtils';
import { ProductCard as ProductCardStyled, ProductCardImage } from './productCardStyledComponents';
import { Overlay } from '../common';
import ProductCardPlayButton from './components/productCardPlayButton';
import ProductCardDetails from './components/productCardDetails';
import ProductCardButton from './components/productCardButton';

function ProductCard({ product }) {
    const {
        mp3Price,
        leasePrice,
        exclusivePrice,
        coverArt
    } = product;
    const formattedPrices = formatPricesForCartMenu(mp3Price, leasePrice, exclusivePrice);

    return (
        <ProductCardStyled rounded={true} m={[2, 2]} variant={"backgroundLight"}>
            <FlexBoxColumn>
                <Overlay center={true} overlayComponent={() => <ProductCardPlayButton />} >
                    <ProductCardImage src={coverArt} />
                </Overlay>

                <FlexBoxColumn m={[3, 5]}>
                    <ProductCardDetails {...product} />

                    <ProductCardButton trackPrices={formattedPrices}/>
                </FlexBoxColumn>

            </FlexBoxColumn>
        </ProductCardStyled>
    );
};

export default ProductCard;