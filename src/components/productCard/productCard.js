import React, { useContext } from 'react';
import { FlexBoxColumn } from '../styled';
import { ProductCard as ProductCardStyled, ProductCardImage } from './productCardStyledComponents';
import { Overlay } from '../common';
import ProductCardPlayButton from './components/productCardPlayButton';
import ProductCardDetails from './components/productCardDetails';
import ProductCardButton from './components/productCardButton';
import { CartContext } from '../../context';

function ProductCard({ product }) {
    const { cart, addCartItem } = useContext(CartContext);
    const { coverArt } = product;

    return (
        <ProductCardStyled rounded={true} m={[2, 2]} variant={"backgroundLight"}>
            <FlexBoxColumn>
                <Overlay center={true} overlayComponent={() => <ProductCardPlayButton product={product} />} >
                    <ProductCardImage src={coverArt} />
                </Overlay>

                <FlexBoxColumn m={[3, 5]}>
                    <ProductCardDetails {...product} />

                    <ProductCardButton product={product} cart={cart} addCartItem={addCartItem} />
                </FlexBoxColumn>

            </FlexBoxColumn>
        </ProductCardStyled>
    );
};

export default ProductCard;