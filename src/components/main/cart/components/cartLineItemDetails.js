import React from "react";
import { formatArtistNames } from "../../../../utils/reactUtils";
import { Switcher } from "../../../common";
import { Box, SubTitle, TextCaption } from "../../../styled";
import { CartLineItemDetails as CartLineItemDetailsStyled, CartLineItemDetailsContainer } from '../cartStyledComponents';

function CartLineItemDetails({product, updateCartItem, isDesktop}) {
    const {
        artistName,
        additionalArtistNames,
        productPricing,
        selectedPricing,
        productName
    } = product;
    const artists = formatArtistNames(artistName, additionalArtistNames);
    const handleChooseLicense = productPricingItem => updateCartItem(productPricingItem, product);

    const renderSwitcher = isDesktop && productPricing.length > 1 && (
        <Box>
            <Switcher
                items={productPricing}
                handleChooseItem={handleChooseLicense}
                activeItem={selectedPricing}
                itemProp={'purchaseType'}
            />
        </Box>
    );

    return (
        <CartLineItemDetailsContainer $m={[3, 0, 3, 5]}>
            <CartLineItemDetailsStyled $isDesktop={isDesktop}>
                <SubTitle $truncate={true}>{productName}</SubTitle>
                <TextCaption $truncate={true}>{artists}</TextCaption>
            </CartLineItemDetailsStyled>

            {renderSwitcher}
        </CartLineItemDetailsContainer>
    );
};

export default CartLineItemDetails;