import React from "react";
import { CartSummaryLineItemDetails, CartSummaryLineItemImage, CartSummaryLineItemImageContainer, CartSummaryLineItemPriceContainer } from "../cartSummaryStyledComponents";
import { FlexBox, SubTitle, TextCaption } from "../../styled";
import { formatPriceDisplay } from "../../../utils/reactUtils";

function CartSummaryLineItem({product}) {
    const {
        coverArt,
        selectedPricing,
        productName,
        productType
    } = product;
    const priceDisplay = formatPriceDisplay(selectedPricing.price);

    return (
        <FlexBox>
            <CartSummaryLineItemImageContainer $m={[3, 0, 3, 5]}>
                <CartSummaryLineItemImage src={coverArt} />
            </CartSummaryLineItemImageContainer>

            <CartSummaryLineItemDetails $m={[3, 0, 3, 5]}>
                <SubTitle $truncate={true}>{productName}</SubTitle>
                <TextCaption $truncate={true}>{productType}</TextCaption>
            </CartSummaryLineItemDetails>

            <CartSummaryLineItemPriceContainer $m={[3, 5]}>
                <SubTitle>{priceDisplay}</SubTitle>
            </CartSummaryLineItemPriceContainer>
        </FlexBox>
    );
};

export default CartSummaryLineItem;