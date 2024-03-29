import React, { useContext } from 'react';
import { ProductCardImage, ProductCardImageContainer, ProductCardFlexBoxColumnContainer } from './productCardStyledComponents';
import { Overlay } from '../common';
import ProductCardPlayButton from './components/productCardPlayButton';
import ProductCardDetails from './components/productCardDetails';
import ProductCardButton from './components/productCardButton';
import { CartContext } from '../../context';
import { Card, cardProps } from '../styled';

function ProductCard({ product, isDesktop }) {
    const { cart, addCartItem } = useContext(CartContext);
    const { coverArt } = product;

    return (
        <Card rounded={true} $variant={cardProps.variant.backgroundLight} $isDesktop={isDesktop}>
            <ProductCardFlexBoxColumnContainer>
                <Overlay overlayComponent={() => <ProductCardPlayButton isDesktop={isDesktop} product={product} />} >
                    <ProductCardImageContainer>
                        <ProductCardImage src={coverArt} />
                    </ProductCardImageContainer>
                </Overlay>

                <ProductCardFlexBoxColumnContainer $m={[3, 5]}>
                    <ProductCardDetails {...product} isDesktop={isDesktop} />

                    <ProductCardButton isDesktop={isDesktop} product={product} cart={cart} addCartItem={addCartItem} />
                </ProductCardFlexBoxColumnContainer>

            </ProductCardFlexBoxColumnContainer>
        </Card>
    );
};

export default ProductCard;