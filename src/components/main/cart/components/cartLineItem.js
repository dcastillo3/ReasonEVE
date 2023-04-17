import React from "react";
import { formatPriceDisplay } from "../../../../utils/reactUtils";
import { Card, FlexBox, SubTitle } from "../../../styled";
import { CartLineItemEndContainer, CartLineItemImage } from "../cartStyledComponents";
import CartLineItemDetails from "./cartLineItemDetails";
import CartLineItemRemoveButton from "./cartLineItemRemoveButton";
import { Overlay } from "../../../common";
import CartLineItemPlayButton from "./cartLineItemPlayButton";

function CartLineItem({cartItem, removeCartItem, updateCartItem}) {
    const {
        coverArt,
        selectedPricing
    } = cartItem;
    const priceDisplay = formatPriceDisplay(selectedPricing.price);

    return (
        <Card $rounded={true} variant={'backgroundLight'} m={[2, 2]} >
            <FlexBox m={[3, 5]}>
                <FlexBox>
                    <Overlay center={true} overlayComponent={() => <CartLineItemPlayButton />} >
                        <CartLineItemImage src={coverArt} />
                    </Overlay>
                </FlexBox>

                <CartLineItemDetails cartItem={cartItem} updateCartItem={updateCartItem} />

                <CartLineItemEndContainer>
                    <CartLineItemRemoveButton cartItem={cartItem} removeCartItem={removeCartItem} />

                    <SubTitle>{priceDisplay}</SubTitle>
                </CartLineItemEndContainer>
            </FlexBox>
        </Card>
    );
};

export default CartLineItem;