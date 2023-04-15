import React from "react";
import { Button } from "../../../styled";
import { CartLineItemRemoveButtonContainer, CartLineItemRemoveIcon } from "../cartStyledComponents";
import NotInterestedIcon from '@mui/icons-material/NotInterested';

function CartLineItemRemoveButton({cartItem, removeCartItem}) {
    return (
        <CartLineItemRemoveButtonContainer>
            <Button size={'small'} variant={'warning'} onClick={() => removeCartItem(cartItem)}>
                <CartLineItemRemoveIcon component={NotInterestedIcon} />
            </Button>
        </CartLineItemRemoveButtonContainer>
    );
};

export default CartLineItemRemoveButton;