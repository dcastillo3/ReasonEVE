import React from "react";
import { Button, buttonProps } from "../../styled";
import { CartSummaryButtonContainer } from "../cartSummaryStyledComponents";
import { cartSummaryButtonText } from "../cartSummaryConsts";

function CartSummaryButton({viewCart}) {
    return (
        <CartSummaryButtonContainer $m={[3]}>
            <Button $variant={buttonProps.variant.secondary} onClick={viewCart} $size={buttonProps.size.small}>{cartSummaryButtonText}</Button>
        </CartSummaryButtonContainer>
    );
};

export default CartSummaryButton;