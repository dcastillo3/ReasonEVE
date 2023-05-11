import React from "react";
import { Box, Span, TitleSmall, spanProps } from "../../../styled";
import { CartTotalContainer } from '../cartStyledComponents';
import { getCartTotal } from "../cartUtils";
import { cartTotalText } from "../cartConsts";

function CartTotal({cart}) {
    const cartTotal = getCartTotal(cart);

    return (
        <CartTotalContainer $m={[8, 0, 4, 0]}>
            <Box $m={[0, 4]}>
                <TitleSmall>{cartTotalText}</TitleSmall>
            </Box>
            <TitleSmall>
                <Span $rotate={spanProps.rotate.right} $variant={spanProps.variant.success} $p={[1, 3]}>{cartTotal}</Span>
            </TitleSmall>
        </CartTotalContainer>
    );
};

export default CartTotal;