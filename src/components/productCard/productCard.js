import React, { useContext } from 'react';
import { ProductCard as ProductCardStyled, ProductCardImage, ProductCardImageContainer, ProductCardFlexBoxColumnContainer } from './productCardStyledComponents';
import { Overlay } from '../common';
import ProductCardPlayButton from './components/productCardPlayButton';
import ProductCardDetails from './components/productCardDetails';
import ProductCardButton from './components/productCardButton';
import { CartContext } from '../../context';

function ProductCard({ product, isDesktop }) {
    const { cart, addCartItem } = useContext(CartContext);
    const { coverArt } = product;

    return (
        <ProductCardStyled rounded={true} $m={[2]} $variant={"backgroundLight"} $isDesktop={isDesktop}>
            <ProductCardFlexBoxColumnContainer>
                <Overlay center={true} overlayComponent={() => <ProductCardPlayButton product={product} />} >
                    <ProductCardImageContainer>
                        <ProductCardImage src={coverArt} />
                    </ProductCardImageContainer>
                </Overlay>

                <ProductCardFlexBoxColumnContainer $m={[3, 5]}>
                    <ProductCardDetails {...product} />

                    <ProductCardButton product={product} cart={cart} addCartItem={addCartItem} />
                </ProductCardFlexBoxColumnContainer>

            </ProductCardFlexBoxColumnContainer>
        </ProductCardStyled>
    );
};

export default ProductCard;