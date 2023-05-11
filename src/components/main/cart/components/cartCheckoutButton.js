import React from "react";
import { Button, buttonProps } from "../../../styled";
import { CartCheckoutButtonContainer } from '../cartStyledComponents';
import { checkoutButtonText } from "../cartConsts";

function CartCheckoutButton({checkoutCart}) {
    return (
        <CartCheckoutButtonContainer>
            <Button $variant={buttonProps.variant.secondary} onClick={checkoutCart} $m={[2, 0]}>{checkoutButtonText}</Button>
        </CartCheckoutButtonContainer>
    );
};

export default CartCheckoutButton;