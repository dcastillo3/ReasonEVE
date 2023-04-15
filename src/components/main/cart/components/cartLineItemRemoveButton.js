import React from "react";
import { Button } from "../../../styled";
import { CartLineItemRemoveButtonContainer, CartLineItemRemoveIcon } from "../cartStyledComponents";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

function CartLineItemRemoveButton({cartItem, removeCartItem}) {
    return (
        <CartLineItemRemoveButtonContainer>
            <Button size={'small'} variant={'warning'} onClick={() => removeCartItem(cartItem)}>
                <CartLineItemRemoveIcon component={RemoveShoppingCartIcon} />
            </Button>
        </CartLineItemRemoveButtonContainer>
    );
};

export default CartLineItemRemoveButton;