import React from "react";
import { formatPriceDisplay } from "../../../../utils/reactUtils";
import { Card, FlexBox, SubTitle, cardProps } from "../../../styled";
import { CartLineItemEndContainer, CartLineItemImage, CartLineItemImageContainer, CartLineItemStartContainer } from "../cartStyledComponents";
import CartLineItemDetails from "./cartLineItemDetails";
import CartLineItemRemoveButton from "./cartLineItemRemoveButton";
import { Overlay } from "../../../common";
import CartLineItemPlayButton from "./cartLineItemPlayButton";

function CartLineItem({product, removeCartItem, updateCartItem, isDesktop}) {
    const {
        coverArt,
        selectedPricing
    } = product;
    const priceDisplay = formatPriceDisplay(selectedPricing.price);
    const cartLineItemMargin = isDesktop ? [2, 8] : [0, 0];

    return (
        <Card $rounded={true} $variant={cardProps.variant.backgroundLight} $m={cartLineItemMargin} >
            <FlexBox>
                <CartLineItemStartContainer $m={[3, 0, 3, 5]}>
                    <Overlay overlayComponent={() => <CartLineItemPlayButton product={product} isDesktop={isDesktop} />} >
                        <CartLineItemImageContainer>
                            <CartLineItemImage src={coverArt} />
                        </CartLineItemImageContainer>
                    </Overlay>
                </CartLineItemStartContainer>

                <CartLineItemDetails product={product} updateCartItem={updateCartItem} isDesktop={isDesktop} />

                <CartLineItemEndContainer $m={[3, 5]}>
                    <CartLineItemRemoveButton product={product} removeCartItem={removeCartItem} isDesktop={isDesktop} />

                    <SubTitle>{priceDisplay}</SubTitle>
                </CartLineItemEndContainer>
            </FlexBox>
        </Card>
    );
};

export default CartLineItem;