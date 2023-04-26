import React from "react";
import { Button } from "../../../styled";
import { CartCheckoutButtonContainer } from '../cartStyledComponents';
import { checkoutButtonText } from "../cartConsts";

function CartCheckoutButton({checkoutCart}) {
    return (
        <CartCheckoutButtonContainer>
            <Button variant={'secondary'} onClick={checkoutCart} m={[2, 0]}>{checkoutButtonText}</Button>
        </CartCheckoutButtonContainer>
    );
};

export default CartCheckoutButton;