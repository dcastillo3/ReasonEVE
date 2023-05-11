import React from "react";
import { Button, buttonProps } from "../../../styled";
import { CartLineItemRemoveButtonContainer, CartLineItemRemoveIcon } from "../cartStyledComponents";
import RemoveIcon from '@mui/icons-material/Remove';

function CartLineItemRemoveButton({product, removeCartItem, isDesktop}) {
    const buttonPadding = !isDesktop ? [0, 1] : null;

    return (
        <CartLineItemRemoveButtonContainer>
            <Button $p={buttonPadding} $size={buttonProps.size.small} $variant={buttonProps.variant.warning} onClick={() => removeCartItem(product)}>
                <CartLineItemRemoveIcon component={RemoveIcon} />
            </Button>
        </CartLineItemRemoveButtonContainer>
    );
};

export default CartLineItemRemoveButton;